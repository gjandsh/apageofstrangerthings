require.config({
    paths: {
        "jquery": "jquery.min",
        "carousel": "carousel",
        "goTop": "goTop"
    }
});
requirejs(['jquery', 'carousel','goTop'], function ($, carousel,goTop) {
    new carousel.Create($('.carousel'));
    $('#navbar').on('click', 'a', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    })
    new goTop.Create($('body'))
})