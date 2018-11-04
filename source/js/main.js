// init post_toc powered by tocbot
$(function(){  
    var tocH = $(".toc").offset().top;
    var right = window.innerWidth - $(".toc").offset().left;
    $(window).scroll(function(){  
        var scroH = $(this).scrollTop(); 
        if(scroH >= tocH){  
            $(".toc").addClass("toc_fixed");
        }else if( scroH < tocH ) {  
            $(".toc").removeClass("toc_fixed");
        }  
    })  
}) 