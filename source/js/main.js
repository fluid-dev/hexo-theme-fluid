$(window).on('load', function(){  
    // for Toc
    var navHeight = $(".navbar").height();
    var toc = $("#toc");
    var tocL = toc.offset().left;
    var tocT = navHeight + $(".material-icons").height();
    var HHH = $(".main").offset().top;
    $(window).scroll(function(){  
        var scroH = toc.scrollTop(); 
        //var scroH;  
        // if(document.body.scrollTop){  
        //     scroH = document.body.scrollTop;  
        // }  
        // else{  
        //     scroH = document.documentElement.scrollTop;  
        // }  
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


    // copy from https://github.com/fi3ework/hexo-theme-archer
    var logStyle = 'color: #fff; background: #f75357; padding: 1px; border-radius: 5px;'
    console.log('%c 🎯 Material-T', logStyle)
    console.log('%c 🏷 Version: 0.9.1 ', logStyle)
    console.log('%c 📦 https://github.com/invom/Material-T ', logStyle) 
}) 