$(document).ready(function(){
    var navHeight = $(".navbar").height();
    var toc = $("#toc");
    var tocL = toc.offset().left;
    var tocT = navHeight + $(".material-icons").height();
    var tocLimMin = $(".main").offset().top;
    var tocLimMax = $("#comments").offset().top - navHeight;
    $(window).scroll(function(){
        var scroH = document.body.scrollTop + document.documentElement.scrollTop;
        if(tocLimMin <= scroH && scroH <= tocLimMax){  
            toc.css({
                "display": "block",
                "position": "fixed",
                "left": tocL,
                "top": tocT
            })
        }else if(scroH <= tocLimMin){  
            toc.css({
                "position": "",
                "left": '',
                "top": ''
            })
        } else if(scroH > tocLimMax){
            toc.css("display","none")
        }
    }) 
    tocbot.init({
        tocSelector: '#tocbot',
        contentSelector: '.post_content',
        headingSelector: 'h1, h2, h3, h4, h5, h6',
        linkClass: 'tocbot-link',
        activeLinkClass: 'tocbot-active-link',
        listClass: 'tocbot-list',
        isCollapsedClass: 'tocbot-is-collapsed',
        collapsibleClass: 'tocbot-is-collapsible',
        scrollSmooth: true,
    });

    // add Materia-T's class to hexo
    $("blockquote").addClass("blockquote");
}) 