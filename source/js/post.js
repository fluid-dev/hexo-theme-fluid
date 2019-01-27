$(document).ready(function(){  
    // // for Toc
    // var navHeight = $(".navbar").height();
    // var toc = $("#toc");
    // var tocL = toc.offset().left;
    // var tocT = navHeight + $(".material-icons").height();
    // var HHH = $(".main").offset().top;
    // $(window).scroll(function(){  
    //     var scroH = toc.scrollTop(); 
    //     //var scroH;  
    //     // if(document.body.scrollTop){  
    //     //     scroH = document.body.scrollTop;  
    //     // }  
    //     // else{  
    //     //     scroH = document.documentElement.scrollTop;  
    //     // }  
    //     var scroH = document.body.scrollTop + document.documentElement.scrollTop;
    //     if(scroH >= HHH){  
    //         toc.css({
    //             "position": "fixed",
    //             "left": tocL,
    //             "top": tocT
    //         });
    //     }else if( scroH < HHH ) {  
    //         toc.css({
    //             "position": "",
    //             "left": '',
    //             "top": ''
    //         });
    //     }  
    // }) 

    var navHeight = $(".navbar").height();
    var toc = $("#toc");
    var tocL = toc.offset().left;
    var tocT = navHeight + $(".material-icons").height();
    var HHH = $(".main").offset().top;
    $(window).scroll(function(){  
        var scroH = toc.scrollTop(); 
        var scroH = document.body.scrollTop + document.documentElement.scrollTop;
        if(scroH >= HHH){  
            toc.css({
                "position": "fixed",
                "left": tocL,
                "top": tocT
            });
        }else if( scroH < HHH ) {  
            toc.css({
                "position": "",
                "left": '',
                "top": ''
            });
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
}) 