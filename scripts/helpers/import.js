/* global hexo */

'use strict';

hexo.extend.helper.register('import_js', function(base, relative, ex = '') {
  if (!Array.isArray(this.page.script_snippets)) {
    this.page.script_snippets = [];
  }
  this.page.script_snippets.push(this.js_ex(base, relative, ex));
});

hexo.extend.helper.register('import_script', function(snippet) {
  if (!Array.isArray(this.page.script_snippets)) {
    this.page.script_snippets = [];
  }
  this.page.script_snippets.push(snippet);
});

hexo.extend.helper.register('import_css', function(base, relative, ex = '') {
  if (!Array.isArray(this.page.css_snippets)) {
    this.page.css_snippets = [];
  }
  this.page.css_snippets.push(this.css_ex(base, relative, ex));
});
