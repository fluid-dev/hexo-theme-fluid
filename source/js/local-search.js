// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2017
// Liam Huang <https://github.com/Liam0205>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
//
// Updated by Rook1e <https://github.com/0x2E>

var searchFunc = function (path, search_id, content_id) {
  // 0x00. environment initialization
  'use strict';
  var $input = document.getElementById(search_id);
  var $resultContent = document.getElementById(content_id);
  $resultContent.innerHTML = "<div class='m-auto text-center'><div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div><br/>Loading...</div>";
  $.ajax({
    // 0x01. load xml file
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {
      // 0x02. parse xml file
      var dataList = $("entry", xmlResponse).map(function () {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();
      $resultContent.innerHTML = "";

      $input.addEventListener('input', function () {
        // 0x03. parse query to keywords list
        var str = '';
        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        // 0x04. perform local searching
        dataList.forEach(function (data) {
          var isMatch = true;
          var content_index = [];
          if (!data.title || data.title.trim() === '') {
            data.title = "Untitled";
          }
          var orig_data_title = data.title.trim();
          var data_title = orig_data_title.toLowerCase();
          var orig_data_content = data.content.trim().replace(/<[^>]+>/g, "");
          var data_content = orig_data_content.toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          // only match articles with not empty contents
          if (data_content !== '') {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i === 0) {
                  first_occur = index_content;
                }
                //content_index.push({index_content:index_content, keyword_len:keyword_len});
              }
            });
          } else {
            isMatch = false;
          }
          // 0x05. show search results
          if (isMatch) {
            str += "<a href='" + data_url + "' class='list-group-item list-group-item-action font-weight-bolder search-list-title'>" + orig_data_title + "</a>";
            var content = orig_data_content;
            if (first_occur >= 0) {
              // cut out 100 characters
              var start = first_occur - 20;
              var end = first_occur + 80;

              if (start < 0) {
                start = 0;
              }

              if (start === 0) {
                end = 100;
              }

              if (end > content.length) {
                end = content.length;
              }

              var match_content = content.substring(start, end);

              // highlight all keywords
              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, "<span class='pink-text'>" + keyword + "</span>");
              });

              str += "<p class='search-list-content'>" + match_content + "...</p>"
            }
          }
        });
        if (str.indexOf('list-group-item') === -1) {
          return $('#local-search-input').addClass("invalid").removeClass("valid");
        }
        $('#local-search-input').addClass("valid").removeClass("invalid");
        $resultContent.innerHTML = str;
      });
    }
  });
  $(document).on('click', '#local-search-close', function () {
    $('#local-search-input').val('').removeClass("invalid").removeClass("valid");
    $('#local-search-result').html('');
  });
};

var getSearchFile = function (path) {
  searchFunc(path, 'local-search-input', 'local-search-result');
};
