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
        })
    })    
} 

var _INIT_SWIPPER_DEALS = function(){
    $('.js_deals .swiper-container').each(function(){
        var selector = $(this);
        var swiper = new Swiper(selector, {
            slidesPerView: 5,
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },        
            breakpoints: {
                4000: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },            
                1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                },
                768: {
                slidesPerView: 3,
                spaceBetween: 10,
                },
                640: {
                slidesPerView: 2,
                spaceBetween:10,
                },
                320: {
                slidesPerView: 1,
                spaceBetween: 10,
                }
            }
        });
    })
}

jQuery(document).ready(function($){
    _INIT_SWIPPER_DEALS();
    _INIT_SWIPPER_ONESLIDE();
});