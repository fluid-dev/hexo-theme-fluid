<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">一款 Material Design 风格的主题</p>
<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%205.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org/zh-cn/"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%2010.13.0-yellowgreen?style=flat"></a>
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

<p align="center">🇨🇳 中文简体  |  <a title="English" href="README_en.md">🇬🇧 English</a></p>

<p align="center">
  <span>文档：</span>
  <a href="https://hexo.fluid-dev.com/docs/guide/">主题配置</a> | 
  <a href="https://hexo.io/zh-cn/docs/front-matter">文章配置</a>
</p>
<p align="center">
  <span>预览：</span>
  <a href="https://www.mofan.life/">Mofan's blog</a>
</p>

## 重要说明

首先感谢【fluid-dev/hexo-theme-fluid】推出这样一款优秀的 Hexo 主题！

此仓库代码 Fork 自 [fluid-dev/hexo-theme-fluid 的 master 分支 fffe6fd，即最新版本 1.9.0](https://github.com/fluid-dev/hexo-theme-fluid)，并基于此开辟新分支 `self` 对样式做了一些微调，预览[移步](https://mofan.life/)。

### 微调的项目

* 文章中代码区域的样式
* 首页文章列表中文章间隔



如果你喜欢此主题，可 clone 到本地，然后 `git checkout self` 切换到 `self` 分支使用。

## 快速开始

#### 1. 搭建 Hexo 博客

如果你还没有 Hexo 博客，请按照 [Hexo 官方文档](https://hexo.io/zh-cn/docs/) 进行安装、建站。

#### 2. 获取主题最新版本

**方式一：**

Hexo 5.0.0 版本以上，推荐通过 npm 直接安装，进入博客目录执行命令：

```sh
npm install --save hexo-theme-fluid
```

然后在博客目录下创建 `_config.fluid.yml`，将主题的 [_config.yml](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml) 内容复制进去。

**方式二：**

下载 [最新 release 版本](https://github.com/fluid-dev/hexo-theme-fluid/releases) 解压到 themes 目录，并将解压出的文件夹重命名为 `fluid`。

#### 3. 指定主题

如下修改 Hexo 博客目录中的 `_config.yml`：

```yaml
theme: fluid  # 指定主题

language: zh-CN  # 指定语言，会影响主题显示的语言，按需修改
```

#### 4. 创建「关于页」

首次使用主题的「关于页」需要手动创建：

```bash
hexo new page about
```

创建成功后，编辑博客目录下 `/source/about/index.md`，添加 `layout` 属性。

修改后的文件示例如下：

```yaml
---
title: about
layout: about
---

这里写关于页的正文，支持 Markdown, HTML
```
