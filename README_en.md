<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%203.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%208.1.0-yellowgreen?style=flat"></a>
  <a title="License" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <br>
  <a title="GitHub Release" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid?style=flat"></a>
  <a title="GitHub Commits" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/commits/master"><img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/fluid-dev/hexo-theme-fluid.svg?style=flat&color=brightgreen"></a>
  <a title="Last Commit" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/commits/master"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/fluid-dev/hexo-theme-fluid/master.svg?style=flat&color=FF9900"></a>
  <br><br>
  <a title="GitHub Watchers" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/watchers"><img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/fluid-dev/hexo-theme-fluid.svg?label=Watchers&style=social"></a>  
  <a title="GitHub Stars" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/fluid-dev/hexo-theme-fluid.svg?label=Stars&style=social"></a>  
  <a title="GitHub Forks" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/network/members"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/fluid-dev/hexo-theme-fluid.svg?label=Forks&style=social"></a>  
</p>

<p align="center"><a title="Chinese" href="README.md">🇨🇳 中文简体</a>  |  🇬🇧 English</p>

<p align="center">
  <span>Docs：</span>
  <a href="https://hexo.fluid-dev.com/docs/en/guide/">Theme-Guide</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://hexo.io/docs/front-matter">Post-Guide</a>
</p>

<p align="center">
  <span>Preview: </span>
  <a href="https://hexo.fluid-dev.com/">demo</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://zkqiang.cn">zkqiang's blog</a>
</p>

## Quick Start

#### 1. Install Hexo

If you don't have a hexo blog, please follow [Hexo Docs](https://hexo.io/docs/) to install and initialize your blog。

#### 2. Download Fluid

**Way A:**

If your Hexo version >= 5.0.0, you can be installed via Npm:

```sh
npm install --save hexo-theme-fluid
```

Then create `_config.fluid.yml` in the blog directory and copy the content of [_config.yml](https://github.com/fluid-dev/hexo-theme-fluid/blob/release/_config.yml)

**Way B:**

Download the [latest release](https://github.com/fluid-dev/hexo-theme-fluid/releases), then extract it to `themes` directory and renamed to `fluid`.

#### 3. Set theme

Edit `_config.yml` in the blog root directory as follows:

```yaml
theme: fluid
```

#### 4. Create about page

The about page needs to be created manually:

```bash
hexo new page about
```

Then edit `/source/about/index.md` and add `layout` attribute.

The modified example is as follows:

```yaml
---
title: about
date: 2020-02-23 19:20:33
layout: about
---

About content
```

## How to Upgrade

[Please follow here](https://hexo.fluid-dev.com/docs/en/start/#theme-upgrade)

## Features

- [x] Image lazyload
- [x] Custom code highlighting scheme
- [x] Internationalization
- [x] Support for multiple comment plugins
- [x] Support for storing configuration in [Data Files](https://hexo.io/docs/data-files.html)
- [x] Custom static resource CDN
- [x] Detailed [documents](https://hexo.fluid-dev.com/docs/en/)
- [x] Built-in search plugin
- [x] Website analysis
- [x] Support for footnote
- [x] Support for LaTeX
- [x] Support for mermaid
- [x] Dark mode

## Contributors

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

English docs translator：[@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top)

Contributors outside PR：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

## Star Trending

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
