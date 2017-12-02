require.config({
    paths: {
        "jquery": "jquery.min",
        "carousel": "carousel",
        "goTop": "goTop",
        "loadMore": "loadMore"
    }
});
requirejs(['jquery', 'carousel','goTop','loadMore'], function ($, carousel,goTop,loadMore) {
    new carousel.Create($('.carousel'));
    $('#navbar').on('click', 'a', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    })
    new goTop.Create($('body'))
    new loadMore.Creat($('.portfolio-content-wrap'))
})
