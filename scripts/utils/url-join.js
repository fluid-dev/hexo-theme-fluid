'use strict';

const urlJoin = function(base, relative) {
  if (relative && /^https*:\/\//.test(relative)) {
    return relative;
  }
  return relative
    ? base.replace(/\/+$/, '') + '/' + relative.replace(/^\/+/, '')
    : base;
};

module.exports = urlJoin;
