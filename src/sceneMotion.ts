import { useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion, useEnteringReveal } from './motion';

// Shared scene motion for every scene visual, using Scene 03's language without per-element wiring.
// After each commit the root is diffed against the previous commit:
// - elements that did not exist before are the new reveal: they fly in from the nearest stage edge with a
//   small spring overshoot, their stroked paths draw, long paths carry a one-shot packet and dots pulse;
// - elements that stayed but moved get a spring FLIP ("breathing");
// - paths/groups whose class changed (a traveled track, an active station) get a packet or a pulse;
// - the background aura makes a short parallax push.
// Entering a scene forward animates its parts as one entrance with the main object emphasised.
// Back/K/R/reload record the DOM without animating. The next commit cancels everything still running, so
// fast navigation always lands on the static final state. Each reveal finishes within ~900 ms; nothing loops.

export type SceneMotionMode = '' | 'entry' | 'step';

const ease = 'cubic-bezier(.16, 1, .3, 1)';
const SKIP = new Set(['defs', 'title', 'desc', 'marker', 'tspan', 'stop', 'linearGradient', 'radialGradient', 'filter']);
const MAX_ROOTS = 8;

type Rects = Map<Element, DOMRect>;

const GEOMETRY = ['x', 'y', 'cx', 'cy', 'r', 'width', 'height', 'd', 'points', 'x1', 'x2', 'y1', 'y2', 'transform'];

/**
 * Visual identity of an element: tag, class, geometry attributes and text. React sometimes recreates a node that
 * looks exactly the same (a conditional branch or a changed parent); such a node is not a new reveal.
 */
function signature(el: Element) {
  const geometry = GEOMETRY.map((name) => el.getAttribute(name) ?? '').join(',');
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 120);
  return `${el.localName}|${el.getAttribute('class') ?? ''}|${geometry}|${el.childElementCount}|${text}`;
}

const near = (a: DOMRect, b: DOMRect) => Math.abs(a.left - b.left) < 2 && Math.abs(a.top - b.top) < 2;

function isSvg(el: Element): el is SVGGraphicsElement {
  return el instanceof SVGGraphicsElement;
}

/** Screen pixels per SVG user unit for an element inside an svg with a viewBox. */
function svgScale(el: Element) {
  const svg = el instanceof SVGElement ? el.ownerSVGElement : null;
  if (!svg || !svg.viewBox.baseVal || !svg.viewBox.baseVal.width) return 1;
  return svg.getBoundingClientRect().width / svg.viewBox.baseVal.width || 1;
}

function visible(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 || rect.height > 0;
}

function trackable(el: Element) {
  if (SKIP.has(el.localName)) return false;
  // [data-motion-skip] marks content with its own choreography (e.g. Scene 12's final sentence).
  return !el.closest('defs, title, desc, marker, .scene-aura, .scene-motion-packet, .final-audience-ghost, [data-motion-skip]');
}

function strokedPaths(root: Element) {
  const list = root.matches('path, line, polyline') ? [root] : [...root.querySelectorAll('path, line, polyline')];
  return list.filter((el): el is SVGGeometryElement => {
    if (!(el instanceof SVGGeometryElement) || el.closest('defs, marker')) return false;
    const style = getComputedStyle(el);
    return style.stroke !== 'none' && (style.strokeDasharray === 'none' || style.strokeDasharray === '') && el.getTotalLength() > 24;
  });
}

function dots(root: Element) {
  const list = root.matches('circle') ? [root] : [...root.querySelectorAll('circle')];
  return list.filter((el): el is SVGCircleElement => el instanceof SVGCircleElement && el.r.baseVal.value <= 14);
}

/** Unit vector from the stage centre to the element, with a fallback "from below" for central elements. */
function direction(el: Element, center: { x: number; y: number }) {
  const rect = el.getBoundingClientRect();
  const dx = rect.left + rect.width / 2 - center.x;
  const dy = rect.top + rect.height / 2 - center.y;
  const length = Math.hypot(dx, dy);
  if (length < 40) return { x: 0, y: 1 };
  return { x: dx / length, y: dy / length };
}

export function useSceneMotion<E extends HTMLElement>(reveal: number, sceneEntry: boolean, enabled = true) {
  const rootRef = useRef<E | null>(null);
  const known = useRef(new WeakSet<Element>());
  const classes = useRef(new WeakMap<Element, string>());
  const texts = useRef(new WeakMap<Element, string>());
  const rects = useRef<Rects>(new Map());
  const signatures = useRef(new Map<string, DOMRect[]>());
  const entering = useEnteringReveal(reveal);
  const reduced = prefersReducedMotion();
  const mode: SceneMotionMode = !enabled || reduced ? '' : sceneEntry && reveal === 1 ? 'entry' : entering ? 'step' : '';

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Back, R, reload and reduced motion: stop anything still running (WAAPI, CSS animations and the
    // Scene 05 colour transitions) so the static final state shows at once.
    if (!mode) root.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());

    // Geometry is recorded from the static final layout, before any animation of this commit starts; the
    // previous commit's animations were already cancelled by its cleanup.
    const all = [...root.querySelectorAll('*')].filter(trackable);
    const nextRects: Rects = new Map(all.map((el) => [el, el.getBoundingClientRect()]));
    const nextSignatures = new Map<string, DOMRect[]>();
    all.forEach((el) => {
      const key = signature(el);
      nextSignatures.set(key, [...(nextSignatures.get(key) ?? []), nextRects.get(el)!]);
    });
    const previousRects = rects.current;
    const previousSignatures = signatures.current;
    // A recreated node with the same signature as a node of the previous commit is the same static element.
    const twin = (el: Element) => previousSignatures.get(signature(el))?.[0];
    const fresh = all.filter((el) => !known.current.has(el) && !twin(el));
    const reclassed = all.filter((el) => known.current.has(el) && classes.current.get(el) !== (el.getAttribute('class') ?? ''));
    // A persisted, previously empty block that now has text (a caption or note filled in place) is new content.
    const filled = all.filter((el) => el instanceof HTMLElement && known.current.has(el) && el.childElementCount === 0
      && !texts.current.get(el) && (el.textContent ?? '').trim() !== '');
    const record = () => {
      all.forEach((el) => {
        known.current.add(el);
        classes.current.set(el, el.getAttribute('class') ?? '');
        texts.current.set(el, (el.textContent ?? '').trim());
      });
      rects.current = nextRects;
      signatures.current = nextSignatures;
    };

    if (!mode) {
      record();
      return;
    }

    const animations: Animation[] = [];
    const temporary: Element[] = [];
    const add = (animation: Animation | undefined) => animation && animations.push(animation);
    // The wrappers are display: contents, so measure the visual itself.
    const box = (root.querySelector('.scene-motion-frame > *') ?? root.parentElement ?? root).getBoundingClientRect();
    const center = { x: box.left + box.width / 2, y: box.top + box.height / 2 };

    // Aura: parallax push (back layer moves less and slower than the foreground).
    const aura = root.querySelector('.scene-aura');
    add(aura?.animate(
      mode === 'entry'
        ? [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }]
        : [{ transform: 'scale(.92)' }, { transform: 'scale(1.03)', offset: 0.65 }, { transform: 'none' }],
      { duration: 640, easing: ease },
    ));

    // New roots: fresh elements whose parent is not fresh. A group of only-new children counts as one root,
    // a fresh <g> made only of <g> children is split so each part arrives from its own edge.
    const freshSet = new Set(fresh);
    let roots = mode === 'entry'
      ? entryRoots(root)
      : [...fresh.filter((el) => !el.parentElement || !freshSet.has(el.parentElement)), ...filled];
    roots = roots.flatMap((el) => {
      const children = [...el.children].filter(trackable);
      return el.localName === 'g' && children.length >= 2 && children.every((child) => child.localName === 'g') ? children : [el];
    }).filter(visible);
    // Stagger is capped: beyond MAX_ROOTS pieces arrive together, so a reveal stays within ~900 ms.
    const staggered = Math.min(roots.length, MAX_ROOTS);
    const stagger = staggered > 1 ? Math.min(70, 280 / (staggered - 1)) : 0;

    // Entry: the largest piece is the main object; it scales in with an overshoot instead of flying.
    const main = mode === 'entry'
      ? roots.reduce<Element | null>((best, el) => {
        const area = (r: DOMRect) => r.width * r.height;
        return !best || area(el.getBoundingClientRect()) > area(best.getBoundingClientRect()) ? el : best;
      }, null)
      : null;

    roots.forEach((el, index) => {
      const delay = Math.min(index, MAX_ROOTS - 1) * stagger;
      const element = el as HTMLElement | SVGElement;
      if (isSvg(el)) {
        element.style.transformBox = 'fill-box';
        element.style.transformOrigin = 'center';
      }
      if (el === main) {
        add(el.animate(
          [{ opacity: 0, transform: 'scale(.86)' }, { opacity: 1, transform: 'scale(1.025)', offset: 0.7 }, { transform: 'none' }],
          { duration: 560, delay, easing: ease, fill: 'backwards' },
        ));
      } else {
        const unit = svgScale(el);
        const dir = direction(el, center);
        const reach = (mode === 'entry' ? 36 : 56) / unit;
        const from = `translate(${dir.x * reach}px, ${dir.y * reach}px)`;
        const over = `translate(${-dir.x * reach * 0.06}px, ${-dir.y * reach * 0.06}px)`;
        add(el.animate(
          [{ opacity: 0, transform: from }, { opacity: 1, transform: over, offset: 0.72 }, { transform: 'none' }],
          { duration: 420, delay, easing: ease, fill: 'backwards' },
        ));
      }

      // Lines draw after the element starts arriving; the longest ones carry a packet.
      const paths = strokedPaths(el).slice(0, 8);
      paths.forEach((path) => {
        const length = path.getTotalLength();
        add(path.animate(
          [{ strokeDasharray: `${length}`, strokeDashoffset: `${length}` }, { strokeDasharray: `${length}`, strokeDashoffset: '0' }],
          { duration: 360, delay: delay + 100, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'backwards' },
        ));
      });
      paths.filter((path) => path.getTotalLength() > 160).slice(0, 1).forEach((path) => packet(path, delay + 140, animations, temporary));

      // Dots pulse once when they land.
      dots(el).slice(0, 6).forEach((dot) => {
        dot.style.transformBox = 'fill-box';
        dot.style.transformOrigin = 'center';
        add(dot.animate([{ transform: 'none' }, { transform: 'scale(1.7)', offset: 0.45 }, { transform: 'none' }], { duration: 240, delay: delay + 380, easing: 'ease-out' }));
      });
    });

    if (mode === 'step') {
      // Breathing: persisted elements that moved spring from their old place (only where they move
      // differently from their parent, so a moved group animates once).
      const moved = new Map<Element, { x: number; y: number }>();
      all.forEach((el) => {
        const before = previousRects.get(el) ?? (known.current.has(el) ? undefined : twin(el));
        if (!before || freshSet.has(el) || el.localName === 'text') return;
        const after = nextRects.get(el)!;
        if (near(before, after)) return;
        const delta = { x: before.left - after.left, y: before.top - after.top };
        if (Math.abs(delta.x) < 6 && Math.abs(delta.y) < 6) return;
        const parentDelta = el.parentElement ? moved.get(el.parentElement) : undefined;
        moved.set(el, delta);
        if (parentDelta && Math.abs(parentDelta.x - delta.x) < 4 && Math.abs(parentDelta.y - delta.y) < 4) return;
        const unit = svgScale(el);
        const dx = delta.x / unit;
        const dy = delta.y / unit;
        add(el.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: `translate(${-dx * 0.05}px, ${-dy * 0.05}px)`, offset: 0.65 }, { transform: 'none' }],
          { duration: 460, easing: ease },
        ));
      });

      // State changes: a path that became traveled carries a packet; a group that became active pulses.
      // Only SVG groups smaller than half the stage pulse, so a whole visual or a full-width lane never wobbles.
      reclassed.slice(0, 6).forEach((el) => {
        if (el instanceof SVGGeometryElement && el.localName === 'path') {
          packet(el, 80, animations, temporary);
        } else if (el instanceof SVGGElement && !fresh.some((item) => el.contains(item))) {
          const rect = el.getBoundingClientRect();
          if (rect.width > box.width * 0.5 || rect.width * rect.height > box.width * box.height * 0.3) return;
          el.style.transformBox = 'fill-box';
          el.style.transformOrigin = 'center';
          add(el.animate([{ transform: 'none' }, { transform: 'scale(1.06)', offset: 0.4 }, { transform: 'none' }], { duration: 420, delay: 120, easing: ease }));
        }
      });
    }

    record();
    return () => {
      animations.forEach((animation) => animation.cancel());
      temporary.forEach((el) => el.remove());
    };
  }, [reveal, sceneEntry, mode]);

  return { rootRef, mode };
}

/** Entry pieces: descend through single-child wrappers, then take the visual's parts (SVG parts individually). */
function entryRoots(root: Element) {
  const frame = root.querySelector('.scene-motion-frame') ?? root;
  let node: Element = frame;
  const children = (el: Element) => [...el.children].filter((child) => trackable(child) && !child.classList.contains('scene-aura'));
  while (children(node).length === 1) node = children(node)[0];
  return children(node).flatMap((el) => (el.localName === 'svg' ? children(el) : [el]));
}

/** One-shot bright segment travelling along a path; a temporary clone removed on finish or cancel. */
function packet(path: SVGGeometryElement, delay: number, animations: Animation[], temporary: Element[]) {
  if (animations.length > 40) return;
  const length = path.getTotalLength();
  const clone = path.cloneNode(false) as SVGGeometryElement;
  clone.removeAttribute('marker-end');
  clone.removeAttribute('marker-start');
  clone.setAttribute('class', 'scene-motion-packet');
  clone.setAttribute('aria-hidden', 'true');
  path.parentNode?.insertBefore(clone, path.nextSibling);
  temporary.push(clone);
  const dash = Math.min(46, length * 0.12);
  const animation = clone.animate(
    [
      { strokeDasharray: `${dash} ${length * 2}`, strokeDashoffset: `${dash}`, opacity: 1 },
      { opacity: 1, offset: 0.85 },
      { strokeDasharray: `${dash} ${length * 2}`, strokeDashoffset: `${-length}`, opacity: 0 },
    ],
    { duration: 480, delay, easing: 'cubic-bezier(.5, 0, .3, 1)', fill: 'both' },
  );
  animation.onfinish = () => clone.remove();
  animations.push(animation);
}
