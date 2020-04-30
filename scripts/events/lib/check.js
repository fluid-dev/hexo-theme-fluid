'use strict';

module.exports = (hexo) => {
  const process = require('process');
  if (parseInt((process.version || '0').replace('v', ''), 10) < 10) {
    const isZh = hexo.config.language.search(/zh-CN/i) !== -1;
    if (isZh) {
      throw new Error('Fluid 依赖的 Node.js 版本必须等于或高于 v10.0.0，请进行升级');
    } else {
      throw new Error('node version must be >= 10.0.0 to use Fluid theme');
    }
  }
};
