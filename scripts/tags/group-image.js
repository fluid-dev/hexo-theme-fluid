/* global hexo */

'use strict';

const LAYOUTS = {
  2: {
    1: [1, 1],
    2: [2]
  },
  3: {
    1: [3],
    2: [1, 2],
    3: [2, 1]
  },
  4: {
    1: [1, 2, 1],
    2: [1, 3],
    3: [2, 2],
    4: [3, 1]
  },
  5: {
    1: [1, 2, 2],
    2: [2, 1, 2],
    3: [2, 3],
    4: [3, 2]
  },
  6: {
    1: [1, 2, 3],
    2: [1, 3, 2],
    3: [2, 1, 3],
    4: [2, 2, 2],
    5: [3, 3]
  },
  7: {
    1: [1, 2, 2, 2],
    2: [1, 3, 3],
    3: [2, 2, 3],
    4: [2, 3, 2],
    5: [3, 2, 2]
  },
  8: {
    1: [1, 2, 2, 3],
    2: [1, 2, 3, 2],
    3: [1, 3, 2, 2],
    4: [2, 2, 2, 2],
    5: [2, 3, 3],
    6: [3, 2, 3],
    7: [3, 3, 2]
  },
  9: {
    1: [1, 2, 3, 3],
    2: [1, 3, 2, 3],
    3: [2, 2, 2, 3],
    4: [2, 2, 3, 2],
    5: [2, 3, 2, 2],
    6: [3, 2, 2, 2],
    7: [3, 3, 3]
  },
  10: {
    1: [1, 3, 3, 3],
    2: [2, 2, 3, 3],
    3: [2, 3, 2, 3],
    4: [2, 3, 3, 2],
    5: [3, 2, 2, 3],
    6: [3, 2, 3, 2],
    7: [3, 3, 2, 2]
  }
};

const groupBy = (group, data) => {
  const r = [];
  for (let count of group) {
    r.push(data.slice(0, count));
    data = data.slice(count);
  }
  return r;
};

const templates = {

  dispatch: (images, group, layout) => {
    const rule = LAYOUTS[group] ? LAYOUTS[group][layout] : null;
    return rule ? this.getHTML(groupBy(rule, images)) : templates.defaults(images);
  },

  /**
   * Defaults Layout
   *
   * □ □ □
   * □ □ □
   * ...
   *
   * @param images
   */
  defaults: (images) => {
    const ROW_SIZE = 3;
    const rows = images.length / ROW_SIZE;
    const imageArr = [];

    for (let i = 0; i < rows; i++) {
      imageArr.push(images.slice(i * ROW_SIZE, (i + 1) * ROW_SIZE));
    }

    return this.getHTML(imageArr);
  },

  getHTML: (rows) => {
    const rowHTML = rows.map(row => {
      return `<div class="group-image-row">${this.getColumnHTML(row)}</div>`;
    }).join('');

    return `<div class="group-image-container">${rowHTML}</div>`;
  },

  getColumnHTML: (images) => {
    const columnWidth = 100 / images.length;
    const columnStyle = `style="width: ${columnWidth}%;"`;
    return images.map(image => {
      return `<div class="group-image-column" ${columnStyle}>${image}</div>`;
    }).join('');
  }
};

const groupImage = (args, content) => {
  args = args[0].split('-');
  const group = parseInt(args[0], 10);
  const layout = parseInt(args[1], 10);

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  const images = content.match(/<img[\s\S]*?>/g);

  return `<div class="group-image">${templates.dispatch(images, group, layout)}</div>`;
};

/*
  {% groupimage 3-x %}
  ![]()
  ![]()
  ![]()
  {% endgroupimage %}
 */
hexo.extend.tag.register('grouppicture', groupImage, { ends: true });
hexo.extend.tag.register('gp', groupImage, { ends: true });
hexo.extend.tag.register('groupimage', groupImage, { ends: true });
hexo.extend.tag.register('gi', groupImage, { ends: true });
