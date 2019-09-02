<h1 align="center">Material-T</h1>

<p align="center">一款 Material Design 风格的主题</p>

<p align="center">
  <img alt="Hexo version" src="https://img.shields.io/badge/Hexo-3%2B-orange">
  <img alt="contributors" src="https://img.shields.io/github/contributors/0x2e/Material-T.svg?style=flat">
  <img alt="license" src="https://img.shields.io/github/license/0x2e/Material-T.svg?style=flat">
</p>

![ScreenShot](https://cdn.jsdelivr.net/gh/0x2E/CDN@master/Material-T/screenshots/index.png)


## 演示 Demo

[Rook1e's blog](https://0x2e.github.io)

[zkqiang's blog](http://zkqiang.cn)

## 快速开始 Quick Start

#### 1. 获取最新版本

请优先下载 [最新 release 版本](https://github.com/0x2E/Material-T/releases)，master 分支无法保证稳定。

下载后解压到 themes 目录下。

#### 2. 必要的配置

按如下内容修改 Hexo 根目录中的 `_config.yml`

```yaml
# 设置语言，需要对应下面目录内的文件名，可以自定义文件内容
# https://github.com/0x2E/Material-T/tree/master/languages
language: zh-CN

# 关闭默认的代码高亮
highlight:
  enable: false
```

#### 3. 启用主题

依然是根目录中的 `_config.yml`，如下修改：
```yaml
# Extensions
theme: Material-T
```

## 更新 Update

建议每次更新前备份 `_config.xml`，以免覆盖自定义的配置项。

## 常见问题 FAQ

#### 代码高亮效果异常

- 请确认已完成上述『关闭默认的代码高亮』步骤
- 尝试清除命令 `hexo clean && hexo g`

#### 配置无效

- 请检查配置文件是否符合 yml 语法，如冒号后需要有空格，缩进需要 2 个空格等

## 文档 Docs

[详细配置](https://0x2e.github.io/Material-T-docs/common/)

[更新日志](https://github.com/0x2E/Material-T/blob/master/Changelog.md)

## 参与开发 Contributing

如果您是初次贡献，可以先从 [help wanted](https://github.com/0x2E/Material-T/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) 列表中认领一个比较小的任务来快速参与社区贡献。您可以直接在相应 issue 中回复参与意愿，然后参照下面的 GitHub 工作流指引解决 issue 并按照规范提交 PR，通过 review 后就会被 merge 到 master 分支。

推荐使用以下工作流参与贡献：

1. 将仓库 fork 到自己的 GitHub，并 clone 到本地进行开发
2. 创建新的分支，在新的分支上开发
3. 保持分支与远程 develop 分支一致（通过 fetch 和 rebase 操作）
4. 在本地提交变更（注意 commit log 保持简练、规范）
5. 将提交 push 到 fork 的仓库下
6. 创建一个 pull request 到 Material-T 的 develop 分支

## 贡献者 Contributors

[![contributors](https://opencollective.com/Material-T/contributors.svg?width=890&button=false)](https://github.com/0x2E/Material-T/graphs/contributors)

非代码贡献：@zhugaoqi

## 开源协议 License

[MIT](https://github.com/0x2E/Material-T/blob/master/LICENSE)
