$(document).ready(function () {
  var navHeight = $("#navbar").height();
  var toc = $("#toc");
  var main = $("main");
  var tocT = navHeight + (toc.offset().top - main.offset().top);
  var tocLimMin = main.offset().top - navHeight;
  var tocLimMax = $("#comments").offset().top - navHeight;
  $(window).scroll(function () {
    var scroH = document.body.scrollTop + document.documentElement.scrollTop;
    if (tocLimMin <= scroH && scroH <= tocLimMax) {
      toc.css({
        "display": "block",
        "position": "fixed",
        "top": tocT
      })
    } else if (scroH <= tocLimMin) {
      toc.css({
        "position": "",
        "top": ''
      })
    } else if (scroH > tocLimMax) {
      toc.css("display", "none")
    }
  });
});
