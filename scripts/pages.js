// generator 404 page
hexo.extend.generator.register('_404',function(locals){
    return {
        path: '404.html',
        data: locals.theme,
        layout: '404'
    };
});

// generator tags Page
hexo.extend.generator.register('_tags',function(locals){
    return {
        path: 'tags/index.html',
        data: locals.theme,
        layout: 'tags'
    };
});

// generator categories Page
hexo.extend.generator.register('_categories',function(locals){
    return {
        path: 'categories/index.html',
        data: locals.theme,
        layout: 'categories'
    };
});

// generator about page
const mdPath = 'themes/Material-T/pages/about.md';
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