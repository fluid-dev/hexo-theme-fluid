'use strict';

module.exports = (hexo) => {
  const process = require('process');
  const ver = (process.version || '0.0').replace('v', '').split('.');
  if (parseInt(ver[0], 10) <= 8 && parseInt(ver[1], 10) < 10) {
    const isZh = hexo.config.language.search(/zh-CN/i) !== -1;
    if (isZh) {
      throw new Error('Fluid 依赖的 Node.js 版本必须等于或高于 v8.10，请进行升级');
    } else {
      throw new Error('node version must be >= 8.10 to use Fluid theme');
    }
  }
};
