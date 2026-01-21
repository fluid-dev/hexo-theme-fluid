'use strict';

const fs = require('fs');
const path = require('path');

const IMAGE_EXTS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif'
]);

module.exports = (hexo) => {
  const themeConfig = hexo.theme && hexo.theme.config;
  if (!themeConfig || !themeConfig.post) {
    return;
  }

  const randomEnabled = themeConfig.banner && typeof themeConfig.banner.random_img === 'boolean'
    ? themeConfig.banner.random_img
    : false;
  if (!randomEnabled) {
    return;
  }

  const randomDir = path.join(hexo.theme_dir, 'source', 'img', 'random');
  if (!fs.existsSync(randomDir)) {
    hexo.log.warn(`[Fluid] Random banner directory not found: ${randomDir}`);
    return;
  }

  const files = fs.readdirSync(randomDir)
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()));

  if (files.length === 0) {
    hexo.log.warn('[Fluid] Random banner directory is empty.');
    return;
  }

  themeConfig.banner_img_list = files.map((file) => `/img/random/${file}`);
  hexo.log.debug(`[Fluid] Random banner images loaded: ${themeConfig.banner_img_list.length}`);
};

