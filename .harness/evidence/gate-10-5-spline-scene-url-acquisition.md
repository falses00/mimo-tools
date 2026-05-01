# Gate 10.5 Spline Scene URL Acquisition

Date: 2026-05-02

## Scope

- Portfolio Hub and 6 standalone MIMO projects now use public Spline demo scene URLs as temporary validation assets.
- These scenes are marked as `temporary-demo-scene`, `usageDecision: use-temporary`, and `licenseConfidence: medium`.
- They are not marked as final brand assets or personal-owned assets.
- Validation clone synced under `I:\MIMO-validation\gate-10-final-validation`.

## Scene Mapping

| Project | Scene URL | sourceType | status |
|---|---|---|---|
| Portfolio Hub | `https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode` | `official-homepage-demo` | `temporary-demo-scene` |
| LifePilot | `https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode` | `official-demo` | `temporary-demo-scene` |
| InterviewPilot | `https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode` | `official-demo` | `temporary-demo-scene` |
| RepoPilot | `https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode` | `official-demo` | `temporary-demo-scene` |
| KnowledgePilot | `https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode` | `official-demo` | `temporary-demo-scene` |
| OpsPilot | `https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode` | `official-demo` | `temporary-demo-scene` |
| MIMO Utilities | `https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode` | `official-demo` | `temporary-demo-scene` |

## Implementation Evidence

- Updated `apps/blog/src/data/splineScenes.ts` with required metadata fields.
- Updated `apps/blog/src/components/visual/SplineScene.astro` to lazy-inject iframe on desktop, keep mobile fallback, retain fallback on load failure, and set iframe `pointer-events: none`.
- Connected Spline scenes to Portfolio Hub, LifePilot, InterviewPilot, RepoPilot, KnowledgePilot, OpsPilot, and Utilities pages.
- Added `apps/web/src/data/splineScenes.ts` to each standalone repo.
- Added standalone `SplineScene.astro` components and temporary product-showcase pages where needed.
- Added minimal API smoke tests so standalone `npm run test` verifies a runnable Vitest harness.
- Updated `docs/spline-integration.md` from "needs URL" to current temporary demo-scene status.

## Verification

| Command / Probe | Result | Notes |
|---|---:|---|
| `npm run build` in `I:\MIMO` | PASS | Astro built 47 pages. |
| `npm run test:links` in `I:\MIMO` | PASS | All dist links use `/mimo-tools/` base path. |
| `npm run test:live-links` in `I:\MIMO` | FAIL | Current deployed GitHub Pages homepage is stale and missing required text: LaunchGuard, RepoLens, DataForge, SpecPilot, IncidentLab, KnowledgeBase Studio. |
| `npm run test:e2e --if-present` in `I:\MIMO` | FAIL | 227 passed, 63 failed. Failures are pre-existing/outdated selector and content expectations such as `/tools` links without base path, old "精选工具" text, and old blog/tool card selectors. |
| 6 standalone `npm run build` | PASS | All standalone web apps built after dependency install. |
| 6 standalone `npm run test` | PASS | Each API workspace ran `src/smoke.test.ts` successfully. |
| Requested `grep -R ...` commands | BLOCKED | PowerShell environment has no `grep` or Unix `true`. |
| PowerShell equivalent dist check | PASS | `prod.spline.design` and `temporary-demo-scene` both appear in 7 built HTML files. |
| Playwright desktop probe | PASS | Desktop width 1280: `iframeCount=1`, `loadedCount=1`, `iframePointerEvents=none`, status `temporary-demo-scene`. |
| Playwright mobile probe | PASS | Mobile width 390: `iframeCount=0`, `loadedCount=0`, wrapper present, status `temporary-demo-scene`. |

## Security / Ownership Checks

- No private Spline URL was added.
- No token or secret was added.
- Public demo scenes are documented as temporary validation assets.
- Fallback remains available for mobile, reduced motion, save-data, missing URL, and iframe load failure.
