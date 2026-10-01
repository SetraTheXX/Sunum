import { useLayoutEffect, useRef } from 'react';

// Shared reveal motion. Only the reveal reached by a single forward step animates.
// A scene's entrance plays only when it is entered forward (→, J, later scene in the list);
// reload, Back/K, an earlier scene in the list and R show the finished state at once.
// Removing the `motion-enter` class on the next step cancels any running CSS animation.

export const motionDurations = { enter: 220, line: 380, spring: 420, depth: 640 } as const;
const easing = 'cubic-bezier(.2, 0, 0, 1)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Returns the reveal number that should animate in this render, or 0. */
export function useEnteringReveal(reveal: number) {
  const previous = useRef<number | null>(null);
  const entering = previous.current !== null && reveal === previous.current + 1 ? reveal : 0;
  useLayoutEffect(() => {
    previous.current = reveal;
  }, [reveal]);
  return entering;
}

export function enterClass(entering: number, reveal: number) {
  return entering === reveal ? ' motion-enter' : '';
}

interface Box { x: number; y: number; width: number; height: number }

/**
 * FLIP for an SVG rect whose geometry changes between reveals: it is rendered at the
 * new box and springs from the previous one, overshooting slightly before it settles
 * ("breathing"). The label translates without scaling.
 * A newer reveal cancels the running animation so the element snaps to its final box.
 */
export function useBoxMorph<R extends SVGElement, L extends SVGElement>(box: Box | null, entering: number) {
  const rectRef = useRef<R | null>(null);
  const labelRef = useRef<L | null>(null);
  const previous = useRef<Box | null>(null);

  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = box;
    if (!box || !from || !entering || prefersReducedMotion()) return;
    if (from.x === box.x && from.y === box.y && from.width === box.width && from.height === box.height) return;
    // Overshoot box: 4% past the target, measured along the change.
    const over = {
      x: box.x + (box.x - from.x) * 0.04,
      y: box.y + (box.y - from.y) * 0.04,
      width: box.width + (box.width - from.width) * 0.04,
      height: box.height + (box.height - from.height) * 0.04,
    };
    const rectTransform = (b: Box) => {
      const sx = b.width / box.width;
      const sy = b.height / box.height;
      return `translate(${b.x - sx * box.x}px, ${b.y - sy * box.y}px) scale(${sx}, ${sy})`;
    };
    const options: KeyframeAnimationOptions = { duration: motionDurations.spring, easing };
    const animations = [
      rectRef.current?.animate(
        [{ transform: rectTransform(from) }, { transform: rectTransform(over), offset: 0.6 }, { transform: 'none' }],
        options,
      ),
      labelRef.current?.animate(
        [{ transform: `translate(${from.x - box.x}px, ${from.y - box.y}px)` }, { transform: `translate(${over.x - box.x}px, ${over.y - box.y}px)`, offset: 0.6 }, { transform: 'none' }],
        options,
      ),
    ];
    return () => animations.forEach((animation) => animation?.cancel());
  }, [box?.x, box?.y, box?.width, box?.height, entering]);

  return { rectRef, labelRef };
}

/**
 * Depth layer (background aura): on each forward reveal it shifts less and slower than the
 * foreground elements, which reads as a short parallax push. It never loops.
 */
export function useDepthShift<E extends SVGElement>(entering: number) {
  const ref = useRef<E | null>(null);
  useLayoutEffect(() => {
    if (!entering || prefersReducedMotion() || !ref.current) return;
    const keyframes = entering === 1
      ? [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }]
      : [{ transform: 'scale(.9)' }, { transform: 'scale(1.025)', offset: 0.65 }, { transform: 'none' }];
    const animation = ref.current.animate(keyframes, { duration: motionDurations.depth, easing });
    return () => animation.cancel();
  }, [entering]);
  return ref;
}
