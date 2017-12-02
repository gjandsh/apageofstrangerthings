import $ from 'jquery';
import './style.css'
import {Carousel} from './carousel.js';
import {GoTop} from './goTop.js';
import {LoadMore} from './loadmore.js';
new Carousel($('.carousel'));
$('#navbar').on('click', 'a', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
})
new GoTop($('body'))
new LoadMore($('.portfolio-content-wrap'))
