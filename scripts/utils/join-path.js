const joinPath = function (base, relative) {
  return relative
    ? base.replace(/\/+$/, '') + '/' + relative.replace(/^\/+/, '')
    : base;
};

export default joinPath;
