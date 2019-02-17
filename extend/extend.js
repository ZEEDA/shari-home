"use strict";
var _INIT_SWIPPER_ONESLIDE = function(){
    $('.js_oneSlide .swiper-container').each(function(){
        var selector = $(this);
        var swiper = new Swiper(selector, {
            slidesPerView: 1,
            spaceBetween: 0,
            // init: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },            
        });
        selector.find('.swiper-wrapper').css('display', 'flex');
    })    
} 

var _INIT_SWIPPER_DEALS = function(){
    $('.js_deals .swiper-container').each(function(){
        var selector = $(this);
        var swiper = new Swiper(selector, {
            slidesPerView: 5,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },        
            breakpoints: {           
                1200: {
                slidesPerView: 5,
                spaceBetween: 10,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                768: {
                slidesPerView: 3,
                spaceBetween: 10,
                },
                560: {
                slidesPerView: 2,
                spaceBetween:10,
                },
                320: {
                slidesPerView: 1,
                spaceBetween: 10,
                }
            }
        });
        selector.find('.swiper-wrapper').css('display', 'flex');
    })
}

var _INIT_CAT_ICONS = function(){
    $('.js_categories_icons .swiper-container').each(function(){
        var selector = $(this);
        var swiper = new Swiper(selector, {
            slidesPerView: 6,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },        
            breakpoints: {           
                1200: {
                slidesPerView: 5,
                spaceBetween: 10,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                768: {
                slidesPerView: 4,
                spaceBetween: 10,
                },
                560: {
                slidesPerView: 4,
                spaceBetween:4,
                },
                320: {
                slidesPerView: 3,
                spaceBetween: 4,
                }
            }
        });
        selector.find('.swiper-wrapper').css('display', 'flex');
    })
}

var _INIT_SWIPPER_Category = function(){
    $('.js_category .swiper-container').each(function(){
        var selector = $(this);
        var swiper = new Swiper(selector, {
            slidesPerView: 3,
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },        
            breakpoints: {
                4000: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },            
                1200: {
                slidesPerView: 3,
                spaceBetween: 10,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                slidesPerView: 2,
                spaceBetween: 10,
                },
                560: {
                slidesPerView: 2,
                spaceBetween:10,
                },
                320: {
                slidesPerView: 1,
                spaceBetween: 10,
                }
            }
        });
        selector.find('.swiper-wrapper').css('display', 'flex');
    })
}
var _TOGGLE_MAIN_SEARCH = function(){
    var content = $('header .search-wrapper');
    $('.js_mainSearchToggle').on('click', function(ev){
        ev.preventDefault();
        content.slideToggle(300);
    });
}

jQuery(document).ready(function($){
    _INIT_SWIPPER_DEALS();
    _INIT_CAT_ICONS();
    _INIT_SWIPPER_ONESLIDE();
    _INIT_SWIPPER_Category();
    _TOGGLE_MAIN_SEARCH();
});