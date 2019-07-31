hexo.extend.generator.register('_about',function(locals){
    return {
        path: 'about/index.html',
        data: locals.theme,
        layout: 'about'
    };
});