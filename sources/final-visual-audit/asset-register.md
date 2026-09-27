# Final Visual & Interaction Audit — asset register

- **Tarih:** 2026-09-28
- **Kapsam:** 30 dk Scene 01–12; inventory and planned use only.
- **Status vocabulary:** `PLANNED`, `NOT_NEEDED`, `PENDING_AUTHENTIC_EVIDENCE` only. Status describes a future production decision, not a claim this audit created or integrated an asset.
- **Evidence basis:** inventory under `assets/`, application imports, Phase 4 Roadmap QA, Scene 11 source, and G4/G5/G6 requirements. No new screenshot/video/asset was created.

## Counts

| Media type | Count | Meaning |
|---|---:|---|
| React/CSS scene carriers | 12 scene slots / 11 unique components / 48 reveal beats | All 48 beats currently render in existing scene components with text/state in React/CSS; S09/S11 share `GenericVisual`. |
| Approved local v2 SVGs | 6 distinct files | 2 currently wired to S02/S03; 4 local, approved but not wired. |
| Current SVG scene/reveal exposures | 8 / 48 | Journey appears across S02's 3 reveal states; Context Desk across S03's 5. Counts scene-state exposures, not new copies. |
| Additional proposed SVG exposures | 20 / 48 | If four unused matched SVGs are integrated: S06 3 + S07 11 + S10 3 + S12 3. This is a plan, not current integration. |
| Rejected/archived V1 PNGs | 6 | Excluded from production; no evidence value. Existing local files are not changed. |
| Existing source-only Claude Code checklist image | 1 | Sourced example only, not a live project session; does not satisfy Codex or Vi3ecode G4 evidence. |
| Authentic Codex capture for G4 | 0 present | Pending genuine capture/provenance/privacy review. |
| Authentic Vi3ecode screenshots/video/fallback frames | 0 present | Plan A–D materials are absent; no G5/G6 fallback is represented as ready. |
| Local video files in `assets/` | 0 | Plan C may require a local MP4/WebM only after authentic run and privacy pass. |
| Bundled font files / remote font dependencies | 0 / 0 observed | CSS uses system font stacks; no `@font-face`/external font loading observed. |
| AI-generated visual candidates | **0** | None proposed; do not generate product UI or slide artwork. |
| Additional automatic-motion assets | **0** | None proposed; current user-controlled reveal is sufficient. |

## Register

| Asset / source | Present condition and intended placement | Status | Offline / privacy note |
|---|---|---|---|
| `assets/phase-4/v2/journey-v2.svg` | Existing accepted local SVG, imported by `SceneVisual.tsx`, S02. | NOT_NEEDED | Already local. Keep; no external fetch. |
| `assets/phase-4/v2/context-desk-v2.svg` | Existing accepted local SVG, imported by `SceneVisual.tsx`, S03. | NOT_NEEDED | Already local. Keep; no external fetch. |
| `assets/phase-4/v2/vibe-coding-wall-v2.svg` | Existing accepted local SVG; matched S06, not currently wired. | PLANNED | Use local path only; verify semantic fit/layout before integration. |
| `assets/phase-4/v2/agent-anatomy-v2.svg` | Existing accepted local SVG; matched S07, not currently wired. | PLANNED | Use local path only; avoid duplicate/dense component labels. |
| `assets/phase-4/v2/orchestration-v2.svg` | Existing accepted local SVG; matched S10, not currently wired. | PLANNED | Use local path only; preserve conditional Analyst and QA return semantics. |
| `assets/phase-4/v2/final-system-v2.svg` | Existing accepted local SVG; matched S12, not currently wired. | PLANNED | Optional only; final statement must remain dominant and PRD order discrepancy needs explicit resolution. |
| `assets/phase-4/{agent-anatomy,context-desk,final-system,journey,orchestration-conductor,vibe-coding-wall}.png` | Six user-rejected V1 assets kept in archive; no production slot. | NOT_NEEDED | Do not load into presentation components, copy, rename, overwrite or stage as evidence. |
| `sources/phase-5/claude/claude-code-todo-source.png` | Existing referenced Claude Code checklist image. It is a sourced example, not a live project session. | NOT_NEEDED | Do not call it authentic session evidence or use it as Codex/Vi3ecode proof. |
| Authentic Codex product capture | No file currently recorded as satisfying G4. Candidate placement only if it illustrates an actually discussed product claim; final scene choice follows capture review. | PENDING_AUTHENTIC_EVIDENCE | Capture real product state, retain provenance, remove private data, package locally. No marketing/synthetic UI. |
| Vi3ecode Plan A — live real Agent Mode workflow | No authentic capture/run evidence currently recorded. | PENDING_AUTHENTIC_EVIDENCE | Use a real accessible project/branch and small task; record actual Lead/Developer/QA results only. No secrets in recording/log. |
| Vi3ecode Plan B — verifiable completed authentic thread | No qualifying thread has been registered in the evidence pack. | PENDING_AUTHENTIC_EVIDENCE | Confirm project/branch/source and a real Lead, Developer, handoff, test, QA result in the same thread; exclude this chat, another agent chat and marketing simulation. |
| Vi3ecode Plan C — 60–90 sec local MP4/WebM from real run | No video file exists in `assets/`. | PENDING_AUTHENTIC_EVIDENCE | Derive only from authentic run/thread; privacy-redact then test local playback with internet off. |
| Vi3ecode Plan D — 5–7 authentic local UI frames | No authentic frame sequence exists. | PENDING_AUTHENTIC_EVIDENCE | Frames must come from real Vi3ecode UI and same sourced workflow; preserve source/session record, redact private content, offline-open locally. |
| System typography | Existing Georgia/Times, Segoe UI/Arial, ui-monospace/Consolas/Liberation Mono fallbacks. | NOT_NEEDED | No download or remote font call required; if a future font file is selected, bundle locally and re-check offline. |
| Current progressive reveal/navigation | Existing React state, buttons, URL state and keyboard handling; not an asset file. | NOT_NEEDED | Current preview was navigated in Run 1; no new interaction package or external runtime required. |
| AI-generated illustration/screenshot/product UI | No candidate selected. | NOT_NEEDED | Candidate count remains zero. |
| Automatic animation/motion asset | No candidate selected. | NOT_NEEDED | Candidate count remains zero; add no remote motion library or autoplay effect. |

## Retention and inclusion rules

- The recorded preview observed loopback JS/CSS, data URI artwork and no external request. This is a browser observation, not an isolated-offline gate result.
- Every future screenshot, video, font or illustration used in the 30-minute app must be a local asset. No CDN, externally hosted fonts, remote images or telemetry are planned.
- Scene 11's workflow drawing remains conceptual. Until authentic evidence is captured and privacy-reviewed, its media remains `PENDING_AUTHENTIC_EVIDENCE`; do not describe it as ready.
- No asset is assigned a completion state in this register. Rejected V1 assets and unrelated local files remain excluded.
