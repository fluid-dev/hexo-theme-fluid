/* global hexo */

'use strict';

const pageInScope = (page, scope) => {
  switch (scope) {
    case 'home':
      return Boolean(page.__index);
    case 'post':
      return Boolean(page.__post);
    case 'archives' || 'archive':
      return Boolean(page.archive);
    case 'categories' || 'category':
      return page.layout === 'categories' || page.layout === 'category';
    case 'tags' || 'tag':
      return page.layout === 'tags' || page.layout === 'tag';
    case 'about':
      return page.layout === 'about';
    case 'links' || 'link':
      return page.layout === 'links';
    case '404':
      return page.layout === '404';
    case 'page' || 'custom':
      return Boolean(page.__page);
  }
};

hexo.extend.helper.register('in_scope', function(scope) {
  if (!scope || scope.length === 0) {
    return true;
  }

  if (Array.isArray(scope)) {
    for (const each of scope) {
      if (pageInScope(this.page, each)) {
        return true;
      }
    }
  } else {
    return pageInScope(this.page, scope);
  }

  return false;
});
