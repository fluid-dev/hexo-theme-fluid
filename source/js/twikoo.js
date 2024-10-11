function loadTwikooScript(callback) {
    const script = document.createElement('script');
    script.src = CONFIG.static_prefix.twikoo + 'twikoo.all.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

function getCommentsCount() {
    try {
        const currentPath = window.location.pathname;

        // https://twikoo.js.org/api.html#get-comments-count
        twikoo.getCommentsCount({
            envId: CONFIG.twikoo.envId,
            urls: [currentPath],
            includeReply: CONFIG.include_reply,
        }).then(res => {
            const commentCount = res[0].count;
            const commentContainer = document.getElementById('twikoo-comment-number-container');
            if (commentContainer) {
                commentContainer.style.display = 'inline';
                commentContainer.querySelector('#twikoo-comment-number').textContent = commentCount;
            }
        }).catch(err => {
            console.error(err);
        });
    } catch (err) {
        console.error(err);
    }
}

loadTwikooScript(getCommentsCount);