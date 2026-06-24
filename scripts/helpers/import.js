/* global hexo */

'use strict';

function pushPageSnippet(page, type, snippet) {
  if (!Array.isArray(page[type])) {
    page[type] = [];
  }
  page[type].push(snippet);
}

hexo.extend.helper.register('import_js', function(base, relative, ex = '') {
  pushPageSnippet(this.page, 'script_snippets', this.js_ex(base, relative, ex));
});

hexo.extend.helper.register('import_script', function(snippet) {
  pushPageSnippet(this.page, 'script_snippets', snippet);
});

hexo.extend.helper.register('import_css', function(base, relative, ex = '') {
  pushPageSnippet(this.page, 'css_snippets', this.css_ex(base, relative, ex));
});
