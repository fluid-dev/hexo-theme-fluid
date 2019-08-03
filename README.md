<h1 align="center">Material-T</h1>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange">
  <img alt="contributors" src="https://img.shields.io/github/contributors/0x2e/Material-T.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/0x2e/Material-T.svg?style=flat">
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/0x2E/CDN@master/Material-T/screenshots/index.png)


## Demo

[Rook1e's blog](https://0x2e.github.io)

## [文档 Docs](http://0x2e.github.io/Material-T-docs)

## 快速开始 Quick Start

**1. 获取最新版本**

```bash
cd themes
git clone -b master https://github.com/0x2e/Material-T.git Material-T
  ```

**2. 必要的配置**

按如下内容修改根目录中的 `_config.yml` 

```yml
// 关闭归档页的默认分页：
archive_generator:
  per_page: 0  
  yearly: true
  monthly: true
  daily: false
  order_by: -date

// 关闭默认的代码高亮
highlight:
  enable: false
  line_number: false
  auto_detect: false
  tab_replace:
```

**3. 在根目录中的 `_config.yml` 中启用 `Material-T`**

## 更新 Update

> `v0.9` 向上升级时，建议先备份，然后直接用新版本替换，以免 `git pull` 时出现过多冲突。


建议更新前备份 _config.yml。

```bash
cd /themes/Material-T
git pull
```

## [Changelog](https://github.com/0x2E/Material-T/blob/master/Changelog.md)

## Contributors

按首次 commit 的时间排序，感谢：@zhugaoqi, @ChungZH, @aptend, @zkqiang

## License

MIT
