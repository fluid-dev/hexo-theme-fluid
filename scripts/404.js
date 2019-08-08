hexo.extend.generator.register('_404',function(locals){
    return {
        path: '404.html',
        data: locals.theme,
        layout: '404'
    };
});