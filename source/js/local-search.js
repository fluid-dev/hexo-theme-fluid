/* global CONFIG */

(function() {
  // Modified from [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
  'use strict';

  var modal = document.getElementById('modalSearch');
  if (!modal) { return; }

  var searchInput = document.querySelector('#local-search-input');
  var resultEl = document.querySelector('#local-search-result');
  var dataList = null;

  // 0x01. Load and cache search data
  function loadData(path) {
    if (dataList !== null) { return; }
    dataList = [];
    resultEl.innerHTML = '<div class="m-auto text-center">'
      + '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
      + '<br/>Loading...</div>';

    fetch(path)
      .then(function(res) { return res.text(); })
      .then(function(str) {
        // 0x02. parse xml file
        var xmlDoc = new DOMParser().parseFromString(str, 'text/xml');
        dataList = Array.from(xmlDoc.querySelectorAll('entry')).map(function(entry) {
          return {
            title  : (entry.querySelector('title') || {}).textContent || '',
            content: (entry.querySelector('content') || {}).textContent || '',
            url    : (entry.querySelector('url') || {}).textContent || ''
          };
        });
        resultEl.innerHTML = '';
      })
      .catch(function() {
        resultEl.innerHTML = '';
      });
  }

  // 0x03. Search on input
  searchInput.addEventListener('input', function() {
    if (!dataList || dataList.length === 0) { return; }

    var content = searchInput.value;
    resultEl.innerHTML = '';
    if (content.trim().length <= 0) {
      searchInput.classList.remove('invalid', 'valid');
      return;
    }
    // 0x04. parse query to keywords list
    var keywords = content.trim().toLowerCase().split(/[\s-]+/);
    var resultHTML = '';

    dataList.forEach(function(data) {
      var isMatch = true;
      if (!data.title || data.title.trim() === '') {
        data.title = 'Untitled';
      }
      var orig_data_title = data.title.trim();
      var data_title = orig_data_title.toLowerCase();
      var orig_data_content = data.content.trim().replace(/<[^>]+>/g, '');
      var data_content = orig_data_content.toLowerCase();
      var data_url = data.url;
      var index_title = -1;
      var index_content = -1;
      var first_occur = -1;
      // Skip matching when content is included in search and content is empty
      if (CONFIG.include_content_in_search && data_content === '') {
        isMatch = false;
      } else {
        keywords.forEach(function(keyword, i) {
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
          }
        });
      }
      // 0x05. show search results
      if (isMatch) {
        resultHTML += '<a href=\'' + data_url
          + '\' class=\'list-group-item list-group-item-action font-weight-bolder search-list-title\'>'
          + orig_data_title + '</a>';
        var matchContent = orig_data_content;
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
          if (end > matchContent.length) {
            end = matchContent.length;
          }

          var snippet = matchContent.substring(start, end);
          // highlight all keywords
          keywords.forEach(function(keyword) {
            var regS = new RegExp(keyword, 'gi');
            snippet = snippet.replace(regS, '<span class="search-word">' + keyword + '</span>');
          });

          resultHTML += '<p class=\'search-list-content\'>' + snippet + '...</p>';
        }
      }
    });

    if (resultHTML.indexOf('list-group-item') === -1) {
      searchInput.classList.add('invalid');
      searchInput.classList.remove('valid');
      return;
    }
    searchInput.classList.add('valid');
    searchInput.classList.remove('invalid');
    resultEl.innerHTML = resultHTML;
  });

  // 0x06. Modal open/close (native replacement for Bootstrap modal JS)
  function openModal() {
    var path = CONFIG.search_path || '/local-search.xml';
    loadData(path);
    modal.style.display = 'block';
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    var backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'search-modal-backdrop';
    document.body.appendChild(backdrop);
    setTimeout(function() { searchInput.focus(); }, 150);
  }

  function closeModal() {
    searchInput.value = '';
    searchInput.classList.remove('invalid', 'valid');
    resultEl.innerHTML = '';
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    var backdrop = document.getElementById('search-modal-backdrop');
    if (backdrop) { backdrop.remove(); }
    setTimeout(function() { modal.style.display = ''; }, 150);
  }

  // Trigger: search button click
  var searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.querySelector('a').addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }

  // Close: [data-dismiss="modal"] buttons
  modal.querySelectorAll('[data-dismiss="modal"]').forEach(function(btn) {
    btn.addEventListener('click', closeModal);
  });

  // Close: click on modal backdrop area
  modal.addEventListener('click', function(e) {
    if (e.target === modal) { closeModal(); }
  });

  // Close: Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) { closeModal(); }
  });
})();
