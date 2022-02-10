<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%205.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%2010.13.0-yellowgreen?style=flat"></a>
  <a title="License" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <br>
  <a title="GitHub Release" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid?style=flat"></a>
  <a title="Npm Downloads" target="_blank" href="https://www.npmjs.com/package/hexo-theme-fluid"><img alt="Npm Downloads" src="https://img.shields.io/npm/dt/hexo-theme-fluid?color=red&label=npm"></a>
  <a title="GitHub Commits" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/commits/master"><img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/fluid-dev/hexo-theme-fluid.svg?style=flat&color=brightgreen&label=commits"></a>
  <br><br>
  <a title="GitHub Watchers" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/watchers"><img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/fluid-dev/hexo-theme-fluid.svg?label=Watchers&style=social"></a>  
  <a title="GitHub Stars" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/fluid-dev/hexo-theme-fluid.svg?label=Stars&style=social"></a>  
  <a title="GitHub Forks" target="_blank" href="https://github.com/fluid-dev/hexo-theme-fluid/network/members"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/fluid-dev/hexo-theme-fluid.svg?label=Forks&style=social"></a>  
</p>

<p align="center"><a title="Chinese" href="README.md">🇨🇳 中文简体</a>  |  🇬🇧 English</p>

<p align="center">
  <span>Docs: </span>
  <a href="https://hexo.fluid-dev.com/docs/en/guide/">Theme guide</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://hexo.io/docs/front-matter">Post guide</a>
</p>

<p align="center">
  <span>Preview: </span>
  <a href="https://hexo.fluid-dev.com/">Fluid's blog</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://zkqiang.cn">zkqiang's blog</a>
</p>

## Quick Start

#### 1. Install Hexo

If you don't have a hexo blog, please follow [Hexo Docs](https://hexo.io/docs/) to install and initialize your blog。

#### 2. Install Fluid

**Way A:**

If your Hexo version >= 5.0.0, you can install Fluid via Npm:

```sh
npm install --save hexo-theme-fluid
```

Then create `_config.fluid.yml` in the blog directory and copy the content of [_config.yml](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml).

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
layout: about
---

About content
```

## How to Upgrade

[Please follow here](https://hexo.fluid-dev.com/docs/en/start/#theme-upgrade)

## Features

- [x] Detailed [documents](https://hexo.fluid-dev.com/docs/en/)
- [x] Widget lazyload
- [x] Multiple code highlighting schemes
- [x] Multiple comment plugins
- [x] Multiple language configurations
- [x] Multiple website analysis
- [x] Support for local search
- [x] Support for footnote
- [x] Support for LaTeX
- [x] Support for Mermaid
- [x] Dark mode

## Contributors

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

English docs translator: [@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top)

Contributors outside PR: [@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

## Thanks

<a title="Thanks to JetBrains for providing the license" href="https://www.jetbrains.com/?from=hexo-theme-fluid" target="_blank">
  <img src="https://raw.githubusercontent.com/fluid-dev/static/690616966f34a58d66aa15ac7b550dd7bbc03967/hexo-theme-fluid/jetbrains.svg" width="150" alt="JetBrains">
</a>

## Star Trending

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
