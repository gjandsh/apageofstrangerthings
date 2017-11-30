define(['jquery'], function ($) {
    function LoadMore($ct) {
        this.$ct = $ct
        this.init();
        this.bind();
    }
    LoadMore.prototype = {
        init: function () {
            var _this = this;
            this.imgarr = [];
            this.titlearr = [];
            this.contentarr = [];
            this.page = 1;
            this.isLoad = false;
            this.columnHeight = [$('#column1').height(), $('#column2').height(), $('#column2').height()]
            $('.get-back').hide()
        },
        bind: function () {
            var _this = this;
            $('.load-more').one('click', function () {
                _this.isLoad = true;
                $('.load-more').text('Loading...')
                $.get('/loadMore.json').done(function (res) {
                    for (i = 0; i < res.url.length; i++) {
                        _this.imgarr.push(res.url[i])
                        _this.titlearr.push(res.title[i])
                        _this.contentarr.push(res.content[i]);
                    }
                    _this.isLoad = false;
                    _this.getpages(_this.page)
                    $('.get-back').fadeIn(500);
                    $('.load-more').on('click', function () {
                        $('.get-back').fadeIn(500);
                        $('.load-more').text('Loading...')
                        _this.getpages(_this.page)
                    })
                    $('.get-back').on('click', function () {
                        if (_this.isLoad) { return }
                        $('.loaded').slideUp(1000, function () { $('.loaded').remove() })
                        _this.page = 1;
                        $('.get-back').hide()
                        $('.load-more').text('loadmore')
                    })
                })
            })
        },
        getImages: function (page, fun) {
            var _this = this
            fun(_this.imgarr.slice((page - 1) * 3, page * 3),
                _this.titlearr.slice((page - 1) * 3, page * 3),
                _this.contentarr.slice((page - 1) * 3, page * 3))
        },
        getpages: function (page) {
            if (this.isLoad) { return }
            var _this = this
            this.getImages(this.page, function (images, titles, contents) {
                _this.images = images;
                _this.titles = titles;
                _this.contents = contents;
                _this.count = 0;
                _this.loadNext(_this.count);
            })
        },
        creatImg: function (n, index) {
            var htmls = '';
            htmls += '<div class="portfolio-content">';
            htmls += '<div class="portfolio-link">';
            // htmls += '<img class = "loaded" src='+this.imags[n]+'>';
            htmls += '<div class="portfolio-hover">';
            htmls += '<div class="portfolio-hover-content">';
            htmls += '<i class="iconfont icon-icon1"></i>';
            htmls += '</div></div></div>';
            htmls += '<div class="portfolio-context">';
            htmls += '<h4>' + this.titles[n] + '</h4>';
            htmls += '<p>' + this.contents[n] + '</p>'
            htmls += '</div></div>'
            this.$ct.eq(index).append(htmls)

            var $image = $('<img class="loaded">')
            var _this = this
            $image.attr('src', this.images[n])
            this.ct.eq(index).find('portfolio-link').prepend($image)
            $image.load(function () {
                _this.columnHeight[index] += $image.parents('.portfolio-content').height()
                _this.count += 1
                _this.loadNext(_this.count)
            })
        },
        loadNext: function (n) {
            if (this.images[n]) {
                var short = this.getShortest()//找到最短的列
                this.creatImg(n, short)
                this.isLoad = true
            } else {
                this.isLoad = false;
                $('.load-more').text('Load More');
                this.page += 1;
                if (!this.imgarr[(this.page - 1) * 3]) {
                    $('.load-more').text('no more')
                }
            } //当该页没有下一张时，isLoad=false
        },
        getShortest: function () {
            var min = 0
            for (i = 0; i < this.columnHeight.length; i++) {
                if (this.columnHeight[min] > this.columnHeight[i])
                    min = i
            }
            return min
        }
    }
    return {Creat: LoadMore}
})

