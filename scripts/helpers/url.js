/* global hexo */

'use strict';

const urlJoin = require('../utils/url-join');

hexo.extend.helper.register('css_ex', function(base, relative, ex = '') {
  return `<link ${ex} rel="stylesheet" href="${this.url_for(urlJoin(base, relative))}" />`;
});

hexo.extend.helper.register('js_ex', function(base, relative, ex = '') {
  return `<script ${ex} src="${this.url_for(urlJoin(base, relative))}" ></script>`;
});

hexo.extend.helper.register('url_join', function(base, relative) {
  return this.url_for(urlJoin(base, relative));
});
