/* global hexo */

'use strict';

const { hasMermaidElement } = require('../utils/mermaid');

// EJS 模板里不能 require，检测逻辑通过 helper 暴露给 layout
// EJS templates cannot require modules, so expose the detector as a helper
hexo.extend.helper.register('has_mermaid', (content) => hasMermaidElement(content));
