/* global hexo */

'use strict';

const path = require('path');

hexo.extend.filter.register('template_locals', locals => {
  const { env, config } = hexo;
  const { __ } = locals;
  const { i18n } = hexo.theme;
  locals.hexo_version = env.version;
  locals.fluid_version = require(path.normalize(path.join(hexo.theme_dir, 'package.json'))).version;
  locals.title = __('title') !== 'title' ? __('title') : config.title;
  locals.subtitle = __('subtitle') !== 'subtitle' ? __('subtitle') : config.subtitle;
  locals.author = __('author') !== 'author' ? __('author') : config.author;
  locals.description = __('description') !== 'description' ? __('description') : config.description;
  locals.languages = [...i18n.languages];
  locals.languages.splice(locals.languages.indexOf('default'), 1);
  locals.page.lang = locals.page.lang || locals.page.language;
});
