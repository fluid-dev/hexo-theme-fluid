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
  <a href="https://hexo.fluid-dev.com/">Fluid's blog</a> | 
  <a href="https://zkqiang.cn">zkqiang's blog</a>
</p>

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

## 更新主题

更新主题的方式[参照这里](https://hexo.fluid-dev.com/docs/start/#更新主题)。

## 功能特性

- [x] 无比详实的[用户文档](https://hexo.fluid-dev.com/docs/)
- [x] 页面组件懒加载
- [x] 多种代码高亮方案
- [x] 多语言配置
- [x] 内置多款评论插件
- [x] 内置网页访问统计
- [x] 内置文章本地搜索
- [x] 支持暗色模式
- [x] 支持脚注语法
- [x] 支持 LaTeX 数学公式
- [x] 支持 mermaid 流程图

## 鸣谢

<table>
  <thead>
    <tr>
      <th align="center" style="width: 240px;">
        <a href="https://flowus.cn/share/eebf2144-8db7-4d68-b31e-bc2c116871de">
          <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/32983588/243899272-092eeb46-9172-4c10-9e72-53561ff37a00.png" height="200px"><br>
          <sub>首席赞助商 ORENCEAI</sub><br>
          <sub>全新的 ChatGPT 人工智能对话平台</sub>
        </a>
      </th>
      <th align="center" style="width: 240px;">
        <a href="https://www.jetbrains.com/?from=hexo-theme-fluid">
          <img src="https://raw.githubusercontent.com/fluid-dev/static/690616966f34a58d66aa15ac7b550dd7bbc03967/hexo-theme-fluid/jetbrains.svg" height="200px"><br>
          <sub>免费开发工具提供方 JetBrains</sub><br>
          <sub>专注于创建智能开发工具</sub>
        </a>
      </th>
    </tr>
  </thead>
</table>

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-fluid/contributors.svg?width=890&button=false)](https://github.com/fluid-dev/hexo-theme-fluid/graphs/contributors)

英文文档翻译：[@EatRice](https://eatrice.top/) [@橙子杀手](https://ruru.eatrice.top) [@Sinetian](https://sinetian.github.io/)

其他贡献：[@zhugaoqi](https://github.com/zhugaoqi) [@julydate](https://github.com/julydate)

如你也想贡献代码，可参照[贡献指南](https://hexo.fluid-dev.com/docs/contribute/)

## 支持我们

如果你觉得这个项目有帮助，并愿意支持它的发展，可以通过以下方式支持我们的开源创作：

<table>
  <thead>
    <tr>
      <th align="center" style="width: 240px;">
        <div>
          <img src="https://github.com/fluid-dev/static/blob/master/hexo-theme-fluid/sponsor.png?s=200&v=4" height="200px" alt="微信赞赏码"><br>
          <sub>微信赞赏码</sub>
        </div>
      </th>
      <th align="center" style="width: 240px;">
        <div>
          <a href="https://etherscan.io/address/0x0021395954710be29c0BFDCB3f98f4D2fa5A1448">
            <img src="https://avatars.githubusercontent.com/u/6250754?s=200&v=4" height="200px" alt="ERC20 Token">
          </a>
          <br>
          <sub>ERC20 Token: 0x0021395954710<br>be29c0BFDCB3f98f4D2fa5A1448</sub>
        </div>
      </th>
    </tr>
  </thead>
</table>

同时我们正在**寻求商业赞助**，如果贵司想在本页显著位置展示广告位（每月 6K+ Views 定向流量曝光），或者有其他赞助形式，可将联系方式发送邮件至 zkqiang#126.com (#替换为@)。

## Star 趋势

[![Stargazers over time](https://starchart.cc/fluid-dev/hexo-theme-fluid.svg)](https://starchart.cc/fluid-dev/hexo-theme-fluid)
