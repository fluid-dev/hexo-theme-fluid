<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid"></a>
  <a href="https://hexo.io/zh-cn/"><img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
</p>

<p align="center"><a title="Chinese" href="README.md">中文简体</a>  |  English</p>

<p align="center">
  <span>Docs：</span>
  <a href="https://hexo.fluid-dev.com/docs/en/">Theme Guide</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://hexo.io/docs/front-matter">Post Front-matter</a>
</p>

<p align="center">
  <span>Demo：</span>
  <a href="https://rook1e.com">Rook1e's blog</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://zkqiang.cn">zkqiang's blog</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://eatrice.top">EatRice's blog</a>
</p>

## Quick Start

#### 1. Install Hexo

If you don't have a hexo blog, please follow [Hexo Docs](https://hexo.io/docs/) to install and initialize your blog。

#### 2. Download Theme

Please download the [latest release](https://github.com/fluid-dev/hexo-theme-fluid/releases) first, or the master branch can't guarantee stability.

After downloading, extract it to the themes directory and rename it to `fluid`.

#### 3. Set theme

Edit `_config.yml` in the blog root directory as follows:

```yaml
theme: fluid
```

#### 4. Create About Page

Since v1.7.0, the about page needs to be created manually:

```bash
$ hexo new page about
```

Then edit `/source/about/index.md` and add `layout` attribute.

The modified file example is as follows:

```yml
title: about
date: 2020-02-23 19:20:33
layout: about
---

You can write the content here
Support Markdown, HTML
```

## Features

- [x] Img lazyload
- [x] Custom code highlighting scheme
- [x] Internationalization
- [x] Support for multiple comment plugins
- [x] Support for storing configuration in [Data Files](https://hexo.io/docs/data-files.html)
- [x] Custom static resource CDN
- [x] Built-in search plugin
- [x] Website analysis
- [x] Support for LaTeX
- [x] Music player

## FAQ

#### Code highlighting exception

- Please confirm that the above "Turn off default highlighting" step has been completed.
- Try "clean" command: `hexo clean && hexo g` `hexo clean && hexo g`

#### Configuration cannot take effect

- Please check if the configuration file conforms to the yml syntax, such as spaces after the colon, 2 spaces for indentation, etc.

## Contributors

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

English docs translator：[@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top)

Contributors outside PR：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

## Feedback

- WeChat: After the scan, add, **reply "fluid"** (in chat reply, not request note) automatically pull you into the group<details> <summary>Qr code</summary><img width="250" src="https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/wechat.jpeg"></details>

## Star trending

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
