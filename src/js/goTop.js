define(['jquery'],function($){function GoTop($container) {
    this.target = $('<button class="go-top">^</button>');
    var btn = this.target
    this.ct = $container || $('body');
    var ct = this.ct
    GoTop.prototype.bindEvent = function () {
        btn.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500)
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                btn.show()
            } else {
                btn.hide()
            }
        })
    }
    GoTop.prototype.creatNode = function () {
        ct.append(btn)
        btn.hide()
    }
    this.creatNode()
    this.bindEvent()
}
return {Create:GoTop}})