<p align="center">
  <img alt="Fluid Logo" src="https://avatars2.githubusercontent.com/t/3419353?s=280&v=4" width="128">
</p>

<p align="center">一款 Material Design 风格的主题</p>
<p align="center">An elegant Material-Design theme for Hexo</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/screenshots/index.png)

<p align="center">
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/fluid-dev/hexo-theme-fluid"></a>
  <a href="https://hexo.io/zh-cn/"><img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/fluid-dev/hexo-theme-fluid.svg?style=flat"></a>
</p>

<p align="center">中文简体  |  <a title="English" href="README_en.md">English</a></p>

<p align="center">
  <span>文档：</span>
  <a href="https://hexo.fluid-dev.com/docs/">用户手册</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://github.com/fluid-dev/hexo-theme-fluid/blob/master/Changelog.md">更新日志</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://hexo.io/zh-cn/docs/front-matter">文章配置</a>
</p>

<p align="center">
  <span>预览：</span>
  <a href="https://rook1e.com">Rook1e's blog</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://zkqiang.cn">zkqiang's blog</a>&nbsp&nbsp&nbsp&nbsp
  <a href="https://eatrice.top">吃白饭的休伯利安号</a>
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

自 v1.7.0 开始，「关于页」需要手动创建：

```bash
$ hexo new page about
```

创建成功后，编辑博客目录下 `/source/about/index.md`，添加 `layout` 属性。

修改后的文件示例如下：

```yml
title: about
date: 2020-02-23 19:20:33
layout: about
---

这里写正文，支持 Markdown, HTML
```

## 功能特性

- [x] 图片懒加载
- [x] 自定义代码高亮方案
- [x] 内置多语言
- [x] 支持多款评论插件
- [x] 支持使用[数据文件](https://hexo.io/zh-cn/docs/data-files)存放配置
- [x] 自定义静态资源 CDN
- [x] 内置文章搜索
- [x] 页脚备案信息
- [x] 网页访问统计
- [x] 支持 LaTeX 数学公式
- [x] 音乐播放器

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

英文文档翻译：[@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top)

其他贡献：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

如你也想贡献代码，可参照[贡献指南](https://hexo.fluid-dev.com/docs/contribute/)

## 反馈

- 微信群：扫描后添加好友，**回复「fluid」**（在聊天回复，不是加好友验证）自动拉群<details> <summary>二维码</summary><img width="250" src="https://cdn.jsdelivr.net/gh/fluid-dev/static@master/hexo-theme-fluid/wechat.jpeg"></details>

## Star 趋势

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
