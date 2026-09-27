# Phase 8 — offline / resilience execution

**Result: PARTIAL.** The 30-minute core route passed the offline browser run. G6 remains open because no authentic Vi3ecode demo fallback is available.

## Build and environment

- Starting Git revision: f1344b4; the tested working tree also included the small index.html favicon fix described below.
- npm run build: PASS (tsc --noEmit && vite build, 30 modules; local production JS/CSS emitted).
- Production preview: npm run preview -- --host 127.0.0.1 --port 4173 --strictPort.
- The shared browser panel opened the production preview and its page content was inspected. The offline run used a separate fresh headless Edge profile.
- Offline isolation: a temporary localhost HTTP proxy allowed only http://127.0.0.1:4173. Other HTTP requests and every HTTPS CONNECT were rejected with HTTP 403. A direct CONNECT external-block-probe.invalid:443 probe returned 403, confirming the block. No OS-wide network or firewall settings were changed.
- No generated or saved screenshots were used as product evidence.

## Checks: 28 PASS, 0 FAIL

- Production page opened in mode=30; all 12 scenes and their revealed steps were traversed forward and back (47 reverse transitions).
- Trusted browser keyboard input: Space, ArrowRight/ArrowLeft, J/K, and R; Space also activated the focused Next button.
- Next/Previous buttons revealed/reversed steps and crossed scene boundaries.
- ?mode=30&scene=1, scene=7, scene=11, and scene=12 reloaded to the expected scene; step=3 restored and R reset URL step state.
- Fullscreen control successfully entered fullscreen in the test browser; a second toggle was issued, but the exit state was not separately asserted.
- Runtime JS and CSS came from the allowlisted loopback origin. Scene 02 and Scene 03 illustrations loaded from bundled data: SVGs (282×150 and 267×150). The font stack is local system fonts; no remote font file was requested.
- The page initiated no remote requests. Edge itself attempted 28 background requests to Microsoft/Bing endpoints (edge.microsoft.com, go.microsoft.com, www.bing.com, mss.office.com, substrate.office.com, clients.config.office.net, graph.microsoft.com); the proxy rejected them, and they were not page requests. The JSON labels these as blocked Edge background requests, separate from appRemoteRequests=0.
- Final run: the saved HTTP-error, loading-failure, and Runtime-exception arrays were empty; font files were not requested and available scene illustrations loaded. The JSON did not persist a separate console-error field, so no independent console-error PASS is claimed.

## Fix found during the run

The initial production preview requested /favicon.ico and returned 404. Added an empty data-URI favicon declaration to index.html; rebuilt and reran offline checks. The final run had no HTTP 404s; console status is not asserted separately.

## Remaining Phase 8/G6 limitation

The 30-minute presentation route and available local artwork work offline. The app has no screenshot/PNG assets in this route and no CSS/JS animation flow to test. The required authentic, privacy-reviewed Vi3ecode demo fallback is not present; therefore this is not a full G6 PASS. Record G6 PARTIAL / BLOCKED until the fallback evidence exists. Phase 6 Vi3ecode intro/workflow and G4/G5 remain open. package.json has no test or lint script.
