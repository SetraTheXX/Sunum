# Final Visual & Interaction Audit — interaction and motion plan

- **Tarih:** 2026-09-28
- **Kapsam:** Interaction/motion feasibility for existing 48 reveal beats, 30-minute route only.
- **Durum:** Audit plan only. No implementation, scene edit, asset, screenshot or animation was added.

## Current interaction baseline

- `App.tsx` owns the 30-minute mode, scene/step URL state, reveal index, next/previous and keyboard navigation. `content.ts` parses the Markdown Ekranda steps. `SceneVisual.tsx` selects a scene component; `styles.css` owns responsive layout and typography.
- The user advances individual reveal beats. Phase 11A production-preview Run 1 covered all 48 reveal states and 47 forward transitions. Button and synthetic key/URL controls were exercised; the synthetic-key limitation and lack of human rehearsal remain documented in `sources/phase-11/run-1-navigation-dry-run-2026-09-28.md`.
- No `@keyframes`, transition, autoplay, CSS animation, remote motion library or video is present in the inspected CSS/source. Text reveals are state changes, not animation. Keep them immediate and presenter-controlled.
- Phase 9's 48-row Edge/CDP matrix reports stable scene/header/footer boxes and no page-level horizontal/vertical scroll or sidebar overlap; at 1366×768, 110%-equivalent viewport, internal scene scroll is recorded for S01, S07 and S11. 110% was emulated, not browser-toolbar zoom. G7 remains open.

## Scene interaction/component map

| Scene | Reveals | Existing component / repeated primitive | Interaction plan | Motion/capture constraint |
|---:|---:|---|---|---|
| 01 | 4 | `OpeningVisual` | Keep one user advance per authored beat; reset/URL behavior stays in `App.tsx`. | No auto terminal typing or fake live run. |
| 02 | 3 | `EvolutionVisual`, local Journey SVG | Keep sequential labels/result mapping. | No timeline animation; static journey art. |
| 03 | 5 | `ModelContextVisual`, local Context Desk SVG | Reveal definitions/context layers in source order. | No moving “information” particles; static desk model. |
| 04 | 4 | `ComparisonVisual`, `FlowDiagram` | Keep chatbot then coding-agent distinction in controlled reveal. | No vendor UI motion; authentic product capture only if separate G4 evidence supports a real claim. |
| 05 | 3 | `VibeCodingVisual` | Preserve request → visible-result progression under user control. | No automatic typing or fake product screenshot. |
| 06 | 3 | `VibeWallVisual` | Reveal claim, risk questions, observation/evidence contrast. | No simulated test run; optional matched SVG remains static. |
| 07 | 11 | `AnatomyVisual` | Preserve one concept at a time and optional Skill/MCP/Git markers. Avoid reveal regression if a static overview is added. | No component fly-ins; static local anatomy SVG candidate only. |
| 08 | 3 | `EngineeringVisual`, `FlowDiagram` | Reveal teaching flow, evidence points, summary. | No animated pipeline; no fake file/test/review records. |
| 09 | 2 | `GenericVisual` | Two-step question/caveat; no extra controls. | No added diagram or motion. |
| 10 | 3 | `OrchestrationVisual` | Keep conditional Analyst, QA PASS/FAIL, Git checkpoint order. | No moving conductor; local static SVG candidate only. |
| 11 | 4 | `GenericVisual`, conceptual placeholder | Keep product name secondary; if authentic media is later integrated, don't make it a new route or auto-playing demo. | Authentic capture only; Plan A/B/C/D evidence and offline fallback are pending. No fake UI/video. |
| 12 | 3 | `FinalVisual` | Preserve question → system components → final statement reveal. Keep final statement dominant. | No flourish/exit animation; optional final SVG only if subordinate. |

## Motion decisions (required field set)

An added-motion candidate count is **0**. These rows document why movement is not needed; they do not schedule animation.

| Interaction | Purpose | Trigger | Duration | Fallback |
|---|---|---|---:|---|
| Existing user-driven reveal | Explain one authored beat at a time and let the presenter pace the story. | Next/Space/ArrowRight/J updates the current step; previous controls reverse it. | 0 ms; immediate state update, no animated interpolation. | Render the selected reveal directly from React state; visible navigation buttons and URL step state remain the equivalent path. |
| Scene change | Keep the route and scene counter easy to follow. | Existing Next/Previous scene navigation or supported keys. | 0 ms; immediate render. | Render the destination scene and its selected step without transition; browser reload restores URL state. |
| Scene 11 video autoplay | Not selected: autoplay is unnecessary and can add surprise, audio and offline failure. | None; a future Plan C video, if authentic and approved, starts only by explicit presenter action. | 0 ms until an explicit play action; no autoplay transition. | Use a locally verified Plan B/D authentic asset, or narrate the conceptual workflow and clearly leave evidence gates open. |

If any future motion is proposed, its review must fill the same Purpose/Trigger/Duration/Fallback fields, confirm reduced-motion behavior, preserve immediate navigation and pass offline browser QA. Current recommendation stays no added movement.

## Reusable component plan

1. Preserve current scene components and `FlowDiagram`; do not create a new abstraction solely to make the manifest appear uniform.
2. The local `ScreenshotAnnotation` primitive in `VisualPrimitives.tsx` can be considered only for real, privacy-reviewed evidence. Do not feed it mock content. `CodeDiff` can be considered only for a genuine sourced diff, not fabricated product state; both helpers are currently outside the `SceneVisual` route map.
3. Approved SVG reuse should remain static and local. Avoid duplicating component labels if an SVG and HTML list tell the same thing.
4. Keep component content sourced from current scene Markdown; do not let asset-level text change the 48-beat teaching sequence.

## Offline and failure behavior

- Current recorded preview had no external request; React/CSS and two imported SVGs are bundled/local, and system font stacks avoid remote font availability. This observation is not a G6 pass.
- If Scene 11 capture later fails to load, the fallback must be a pre-verified local authentic Plan B, C or D asset. Do not silently replace it with a schematic and call that evidence.
- If a video codec/player is unavailable, use locally verified still frames from the same authentic source, or narrate only the conceptual workflow and report that G4/G5/G6 evidence is still absent.
- Because Scene 01/07/11 had controlled internal scroll in the Phase 9 110%-equivalent small viewport, any future component addition in those scenes requires a fresh target viewport/reveal check before G7 evaluation.

## Adopted Plan Delta — Audience mode and Golden Scene prototype (2026-09-28)

This later user-directed prototype extends the 2026-09-28 audit baseline above; the earlier “no implementation” status records the state at audit time. The default presenter/editor view and the Visual Contract V2 field-manual identity remain in place. During presentation, audience mode deliberately hides the rail, route picker, wordmark, header tools, step counter, next hint, speaker notes, keyboard legend, and bottom navigation. It keeps a narrow route-progress rule, scene index, scene title where the large scene composition does not already carry it, and a small Escape exit control. This is the explicit exception to V2’s always-visible audience footer/header navigation guidance; the default view still follows V2.

The header presentation control sets `view=audience` in the existing URL and requests native browser fullscreen when available. CSS audience mode remains usable if the embedded browser blocks fullscreen. `Escape` exits audience/fullscreen; Arrow keys and Space continue the current reveal, and J/K/R remain available. `mode`, `scene`, and `step` retain their existing meanings and survive audience-mode entry, reload, reveal, and scene navigation. A direct `view=audience` URL restores the visual mode after reload without forcing fullscreen without a user gesture.

Only S01, S07, and S12 receive audience-specific compositions. Their existing 4 / 11 / 3 beats and copy stay in source order:

- **S01:** the opening question owns the first frame; the example request joins it; the request → file change → working result path forms on the third reveal; the separate reliability questions appear on the fourth.
- **S07:** one authored SVG map reveals the existing component names in order, brightens the active component and its described relationships, and distinguishes optional Skill/MCP/Git with dashed rules. The current component description gets the focus column. The last beat changes the focus to “Model ≠ Agent ≠ Workflow.”
- **S12:** “EVET” is the first large answer; the six existing trust components arrive as a combined list on beat two; the locked final statement takes the dominant scale on beat three.

No new beat, product claim, captured UI, separate media asset file, video, external asset, autoplay, transition, or CSS motion is added. The S07 audience map is authored inline SVG/React using V2 tokens; the existing local anatomy SVG remains the regular-view illustration. `final-system-v2.svg` is not integrated: the new final composition already carries the sourced six-part list, and the static asset would duplicate it. No loop has enough teaching value here to justify its continuous motion: S01 already advances its process under presenter control, S07 is a discrete relationship map, and S12 needs a quiet final hold. This prototype does not redesign the other nine scene visuals, close a gate, or imply rollout approval. G4/G5 stay OPEN, G6 PARTIAL / BLOCKED, G7 OPEN, and G9 OPEN.

Production build, target-resolution Golden Scene render review, mode/URL/reload, reveal-order, and navigation checks remain acceptance evidence for this implementation; independent QA is required before commit/push.
