const mdPath = 'themes/Material-T/about.md'

hexo.extend.generator.register('_about',function(locals){
    return {
        path: 'about/index.html',
        data: locals.theme,
        layout: 'about'
    };
});

hexo.extend.helper.register('insertAbout', function(){
    return hexo.render.renderSync({path: mdPath});
});