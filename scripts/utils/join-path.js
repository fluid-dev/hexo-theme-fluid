const joinPath = function (base, relative) {
  return relative
    ? base.replace(/\/+$/, '') + '/' + relative.replace(/^\/+/, '')
    : base;
};

module.exports = joinPath;
