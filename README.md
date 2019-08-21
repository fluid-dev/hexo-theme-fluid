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

请优先下载 [最新 release 版本](https://github.com/0x2E/Material-T/releases)，master 分支无法保证稳定

下载后解压到 themes 目录下

#### 2. 必要的配置

按如下内容修改 Hexo 根目录中的 `_config.yml`

```yml
// 关闭默认的代码高亮
highlight:
  enable: false
  line_number: false
  auto_detect: false
  tab_replace:
```

#### 3. 启动主题

依然是根目录中的 `_config.yml`，如下修改：
```yml
# Extensions
theme: Material-T
```

## 更新 Update

建议每次更新前备份 `_config.xml`，以免覆盖自定义的配置项

## 常见问题 FAQ

#### 代码高亮效果异常

- 请确认已完成上述『关闭默认的代码高亮』步骤
- 尝试清除命令 `hexo clean && hexo g`

#### 配置无效

- 请检查配置文件是否符合 yml 语法，如冒号后需要有空格，缩进需要 2 个空格等

## 文档 Docs

[详细配置](https://0x2e.github.io/Material-T-docs/common/)

[更新日志](https://github.com/0x2E/Material-T/blob/master/Changelog.md)

## 贡献者 Contributors

[![contributors](https://opencollective.com/Material-T/contributors.svg?width=890&button=false)](https://github.com/0x2E/Material-T/graphs/contributors)

非代码贡献：@zhugaoqi

## 开源协议 License

[MIT](https://github.com/0x2E/Material-T/blob/master/LICENSE)
