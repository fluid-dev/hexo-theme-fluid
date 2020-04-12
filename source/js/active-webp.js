$(document).ready(function () {
    const WebP = new Image();
    WebP.onload = WebP.onerror = function () {
        if (WebP.height !== 2) {
            const sc = document.createElement('script');
            sc.type = 'text/javascript';
            sc.async = true;
            const s = document.getElementsByTagName('script')[0];
            sc.src = '/js/webpjs-0.0.2.min.js';
            s.parentNode.insertBefore(sc, s);
        }
    };
    WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
});