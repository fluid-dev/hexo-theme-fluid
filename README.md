<h1 align="center">Material-T</h1>

<p align="center">一个Material Design风格的主题，灵感来源于 @creative-tim的<a href="https://github.com/creativetimofficial/material-kit">Material-Kit</a></p>

![screenshot-index](https://github.com/invom/Material-T/raw/master/screenshot-index.png)


## 在线预览 Live Preview

[我的版本](https://invom.github.io/Material-T/)

## 安装 Installation
1. 从GitHub下载最新版本

2. 关闭归档页的分页：在博客配置文件中配置
```
archive_generator:
  per_page: 0  
  yearly: true
  monthly: true
  daily: false
  order_by: -date
```
如果没安装`hexo-generator-archive`,使用`npm install hexo-generator-archive --save`安装。

3. 创建About Page
```
hexo new page about
```

4. 在博客配置文件中启用`Material-T`




## 配置 Configuration

[wiki](https://github.com/invom/Material-T/wiki)



## TODO

- [ ] Projects页
- [ ] Friends页
- [x] Archives页优化
- [x] 每个页面配置不同head-img 
- [ ] 顶部导航icons提示框自定义
- [x] 底部信息自定义
- [ ] TOC
- [x] 支持Disqus
- [ ] 支持Gitment,valine
- [x] 文章页底部tag图标优化
- [ ] 分享
- [ ] css去冗

## 贡献 Contributing

项目会持续更新，期待您的Pull Request


## License

MIT
