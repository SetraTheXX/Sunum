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
