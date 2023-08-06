hexo.extend.tag.register('fold', (args, content) => 
    `<div class='fold collapsed'>
        <div class='fold-title'>
            ${args.join(" ")}
        </div>
        <div class='fold-content'>
            ${
                hexo.render.renderSync({
                    text: content,
                    engine: "markdown"
                }) || "No content to show"
            }
        </div>
    </div>`, {
        ends: true
});

const folderScript = `(function (document) {
    [].forEach.call(document.getElementsByClassName('fold'), function(panel) {
        panel.getElementsByClassName('fold-title')[0].onclick = function() {
            panel.classList.toggle("collapsed");
            panel.classList.toggle("expanded");
        }
    });
})(document);`;


hexo.extend.filter.register('after_post_render', (data) => {
    let link_js = `<script type="text/javascript">${folderScript}</script>`;
    data.content += link_js;
    return data;
});
