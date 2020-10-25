(function() {
  $(`#post-body :not(a) > img:not([nozoom]), #post-body > img:not([nozoom]),
      #page-body :not(a) > img:not([nozoom]), #page-body > img:not([nozoom])`).each(function() {
    var $image = $(this);
    var imageLink = $image.attr('data-src') || $image.attr('src');
    var $imageWrapLink = $image.wrap(`
        <a class="fancybox fancybox.image" href="${imageLink}"
          itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`
    ).parent('a');
    if ($image.is('.group-image-container img')) {
      $imageWrapLink.attr('data-fancybox', 'group').attr('rel', 'group');
    } else {
      $imageWrapLink.attr('data-fancybox', 'default').attr('rel', 'default');
    }

    var imageTitle = $image.attr('title') || $image.attr('alt');
    if (imageTitle) {
      $imageWrapLink.append(`<p class="image-caption">${imageTitle}</p>`);
      $imageWrapLink.attr('title', imageTitle).attr('data-caption', imageTitle);
    }
  });

  $.fancybox.defaults.hash = false;
  $('.fancybox').fancybox({
    loop   : true,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
})();
