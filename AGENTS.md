# AGENTS.md

## Project shape
- This repo is a **Hexo theme**, not a standalone app. Build-time logic lives in `scripts/`; rendered HTML lives in `layout/`; browser code ships directly from `source/js/`; Stylus entrypoint is `source/css/main.styl`.
- There is **no bundler and no npm script pipeline** in `package.json`. Client files are loaded as globals, so keep browser JS in IIFEs or on `window.Fluid`; keep Node/Hexo code in CommonJS.
- `package.json` only declares a peer dependency on `nunjucks`; the local-search generator in `scripts/generators/local-search.js` requires it at generate time.

## Request-to-file map
- Theme config semantics: `_config.yml`, plus merge rules in `scripts/events/lib/merge-configs.js`.
- Hexo lifecycle / generated pages / config migration: `scripts/events/`, `scripts/generators/`, `scripts/filters/`.
- Template structure and page composition: `layout/layout.ejs` and `layout/_partials/**/*.ejs`.
- Browser interactions and PJAX-safe behavior: `source/js/*.js`.
- Theme styles and CSS injection points: `source/css/main.styl` and `source/css/_pages/**`.

## Core flow to understand before editing
- `scripts/events/index.js` runs `generateBefore` hooks to merge config, set injections, highlight, lazyload, and footnote behavior before Hexo renders templates.
- `layout/_partials/head.ejs` exports merged theme settings through `export_config()` as global `CONFIG`, then loads `source/js/utils.js` and `source/js/color-schema.js` first.
- `layout/_partials/scripts.ejs` loads `events.js`, `plugins.js`, optional `pjax.js`, then `boot.js` last. `boot.js` registers persistent handlers on `DOMContentLoaded` and exposes `Fluid.boot.refresh()` for PJAX re-init.

## Repo-specific extension patterns
- Prefer the injection system over hard-coding new partials into templates: `scripts/events/lib/injects.js` defines view slots such as `head`, `footer`, `postMetaTop`, `postComments`; `scripts/helpers/engine.js` renders them with `inject_point()`; `scripts/filters/default-injects.js` installs the defaults.
- CSS has matching injection hooks in `source/css/main.styl` via separate `hexo-config("injects.variable")`, `hexo-config("injects.mixin")`, and `hexo-config("injects.style")` loops.
- In EJS partials, enqueue assets with `import_js`, `import_css`, or `import_script` instead of emitting duplicate tags directly. `layout/layout.ejs` deduplicates `page.script_snippets` inside `#pjax-wrapper`.
- Use `js_ex`, `css_ex`, and `url_join` helpers for CDN/local asset URLs; do not hardcode library paths when `theme.static_prefix.*` already configures them.

## PJAX / Swup rules
- Swup only replaces `#pjax-wrapper` (`source/js/pjax.js`). Anything outside that container persists across navigation.
- Scripts inside swapped HTML do **not** auto-run; `source/js/pjax.js` manually replays inline scripts, clears tracked scroll listeners, resets `Fluid.events._refreshCallbacks`, restores scroll position, and calls `Fluid.boot.refresh()`.
- If a feature must re-run after PJAX, register it with `Fluid.events.registerRefreshCallback(...)` as seen in `layout/_partials/plugins/anchorjs.ejs` and `layout/_partials/post/toc.ejs`.
- Avoid duplicate listeners on persistent nodes (navbar, scroll-top button, document-level handlers). Existing code uses dataset flags and module-level variables for that reason.

## Config and compatibility rules
- Effective config precedence is: theme `_config.yml` → site `_config.yml` `theme_config` → `source/_data/fluid_static_prefix.yml` → `source/_data/fluid_config.yml`; language overrides come from `source/_data/languages/*.yml`.
- Preserve public config semantics. This theme is published for external users, so change behavior through existing config keys instead of inventing new assumptions.
- Page-scoped features usually rely on helper checks like `in_scope(...)` in `scripts/helpers/scope.js`.

## Code style actually used here
- `.editorconfig`: 2 spaces, LF, UTF-8, final newline.
- `.eslintrc`: ECMAScript 2018, single quotes, `console.warn` allowed but `console.log` is not, object literals often align colons, and browser files rely on globals instead of modules.
- Keep browser code defensive: check element/global existence before acting (`if (!navbar) { return; }` is the common pattern).

## Validation workflow
- This repo has no built-in test runner. Validate changes from a consuming Hexo site, not from this theme folder alone.
- Typical verification loop: `hexo clean && hexo generate`, and for UI/PJAX work also `hexo server` plus a manual check of both first load and in-site navigation.
