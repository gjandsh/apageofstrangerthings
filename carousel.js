define(['jquery'], function ($) {
    function Carousel($ct) {
        this.$ct = $ct;
        this.init();
        this.bind();
        this.autoPlay();
    }
    Carousel.prototype = {
        init: function () {
            var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
                $bullet = this.$bullet = this.$ct.find('.bullet');
            var $first = this.$imgCt.find('li').first(),
                $last = this.$imgCt.find('li').last();
            var $width = this.$width = $first.width()
            this.pageIndex = 0;
            this.imgCount = $imgCt.children().length
            $imgCt.prepend($last.clone())
            $imgCt.append($first.clone())
            $imgCt.width($width * (this.imgCount + 2))
            // $imgCt.css('left', -$width)
        },
        bind: function () {
            var _this = this;
            this.$bullet.on('click', 'li', function () {
                var length = $(this).index() - _this.pageIndex
                console.log($(this).index())
                console.log(length)
                _this.play(length)
            })
        },
        play: function (length) {
            var _this = this;
            var $width = this.$ct.width()
            this.$imgCt.width($width * (this.imgCount + 2))
            this.$imgCt.animate({
                left : -(_this.pageIndex+length+1) * $width
            }, function () {
                _this.pageIndex += length;
                if (_this.pageIndex === _this.imgCount) {
                    _this.pageIndex = 0;
                    _this.$imgCt.css({
                        left: -$width
                    })
                } else if (_this.pageIndex < 0) {
                    _this.pageIndex = _this.imgCount - 1;
                    _this.$imgCt.css({
                        left: -_this.imgCount * $width
                    })
                }
                _this.setBullet()
            })
        },
        setBullet: function () {
            this.$bullet.children().removeClass('active').eq(this.pageIndex).addClass('active')
        },
        autoPlay: function () {
            var _this = this
            var clock = setInterval(function () { _this.play(1) }, 2000);
        }
    }
    return { Create: Carousel }
}
)
