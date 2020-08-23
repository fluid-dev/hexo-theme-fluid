<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">一款 Material Design 风格的主题</p>
<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%203.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org/zh-cn/"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%208.1.0-yellowgreen?style=flat"></a>
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

<p align="center">🇨🇳 中文简体  |  <a title="English" href="README_en.md">🇬🇧 English</a></p>

<p align="center">
  <span>文档：</span>
  <a href="https://hexo.fluid-dev.com/docs/">用户手册</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://hexo.io/zh-cn/docs/front-matter">文章配置</a>
</p>

<p align="center">
  <span>预览：</span>
  <a href="https://hexo.fluid-dev.com/">demo</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://zkqiang.cn">zkqiang's blog</a>
</p>

## 快速开始

#### 1. 搭建 Hexo 博客

如果你还没有 Hexo 博客，请按照 [Hexo 官方文档](https://hexo.io/zh-cn/docs/) 进行安装、建站。

#### 2. 获取主题最新版本

请优先下载 [最新 release 版本](https://github.com/fluid-dev/hexo-theme-fluid/releases)，master 分支无法保证稳定。

下载后解压到 themes 目录下并重命名为 `fluid`。

#### 3. 指定主题

如下修改 Hexo 博客目录中的 `_config.yml`：

```yaml
theme: fluid  # 指定主题

language: zh-CN  # 指定语言，可不改
```

#### 4. 创建「关于页」

首次使用主题的「关于页」需要手动创建：

```bash
$ hexo new page about
```

创建成功后，编辑博客目录下 `/source/about/index.md`，添加 `layout` 属性。

修改后的文件示例如下：

```yml
---
title: about
date: 2020-02-23 19:20:33
layout: about
---

这里写关于页的正文，支持 Markdown, HTML
```

## 升级主题

首先强烈建议学习使用[覆盖配置](https://hexo.fluid-dev.com/docs/guide/#%E8%A6%86%E7%9B%96%E9%85%8D%E7%BD%AE)

然后升级步骤[参照这里](https://hexo.fluid-dev.com/docs/example/#%E6%9B%B4%E6%96%B0%E4%B8%BB%E9%A2%98)

## 功能特性

- [x] 图片懒加载
- [x] 自定义代码高亮方案
- [x] 内置多语言
- [x] 支持多款评论插件
- [x] 支持使用[数据文件](https://hexo.io/zh-cn/docs/data-files)存放配置
- [x] 自定义静态资源 CDN
- [x] 无比详实的[用户文档](https://hexo.fluid-dev.com/docs/)
- [x] 内置文章搜索
- [x] 页脚备案信息
- [x] 网页访问统计
- [x] 支持脚注语法
- [x] 支持 LaTeX 数学公式
- [x] 支持 mermaid 流程图
- [x] 音乐播放器
- [x] 暗色模式

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

英文文档翻译：[@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top)

其他贡献：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

如你也想贡献代码，可参照[贡献指南](https://hexo.fluid-dev.com/docs/contribute/)

## 社区

微信群：扫描二维码添加好友进交流群

<details>
    <summary>二维码</summary>
    <p><b>好友申请备注：fluid</b></p>
    <p><b>提问之前请先仔细查阅用户文档</b></p>
    <img width="200" src="https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/wechat.png" alt="wechat">
</details>

## 支持

你可以通过[爱发电](https://afdian.net/@zkqiang)支持我们的开源创作，资金将用于服务器开销以及今后的公共接口服务

<a href="https://afdian.net/@zkqiang">
  <img width="300" src="https://static.zkqiang.cn/images/20200715113201.png-slim" alt="support me">
</a>

其他商业赞助可发送邮件至 zkqiang#126.com (#替换为@)

## Star 趋势

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
