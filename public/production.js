/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
/*!
 *  Shari - Client Scripts
 *
 * @author   Mohamed Gamil [Gemy.me]
 */



/* - - - - - - - - - -
 * Fixed Navigation
 */

var FixedNav = (function()
{
  var $container   = '#landingNav',
      $scEl        = document,
      persistClass = 'nav-persist',
      toggleClass  = 'nav-compact';

  return {
    init: function ()
    {
      $container = $($container);
      $scEl      = $($scEl);

      $scEl.on('scroll', this.scrollHandler);
      this.scrollHandler();
    },
    scrollHandler: function(e)
    {
      var scrollTop = $scEl.scrollTop();

      if ( $container.hasClass(persistClass) )
        return;

      if ( scrollTop > 120 )
      {
        $container.addClass(toggleClass);
      }
      else
      {
        $container.removeClass(toggleClass);
      }
    }
  };
}());



/* - - - - - - - - - -
 * Parallax Landing Clouds
 */

var ParallaxHeroElements = (function()
{
  var $container = '#pageRoot';
  var $scEl      = document;
  var $elements  = '.effect-cloud, .effect-moon, .effect-sun, .effect-starfield';
  var $textFx    = '.effect-text';

  return {
    init: function ()
    {
      var t      = this;
      $container = $($container);
      $scEl      = $($scEl);
      $elements  = $($elements);
      $textFx    = $($textFx);

      $elements.each(function(idx)
      {
          var   $el    = $(this)
              , opaque = (!$el.is('.effect-cloud') || $el.is('.cloud-sun'))
              , opaCof = (8 - (idx+1)) * 0.1;
              ;

          $el.delay(idx * 500).fadeTo('slow', (opaque ? 1 : opaCof));
      });

      $container.on('mousemove', $.throttle(50, function(e)
      {
        $elements.each(function(idx)
        {
          t.apply(e, this, $elements.length - (idx));
        });
      }));

      /*$scEl.on('scroll', $.throttle(50, function()
      {
        var st = $(document).scrollTop();
        var tp = $textFx.offset().top;
        var wr = Math.floor($(window).height() * .1);
        var r  = Math.max(0, st - tp) + wr;
        var a  = Math.max(0, 1 - (r / (wr * 2)));

        if ( st > (tp - wr) )
        {
          $textFx.css({opacity: a, transform: 'translateY(-'+ ( Math.floor(r / 10) ) +'px)'});
          // $textFx.css({opacity: a, transform: 'translateY('+ ( -1* Math.floor(r / 1) ) +'px) scale('+ (a + .25) +')'});
        }
        else
        {
          $textFx.css({opacity: 1, transform: 'translateY(0) scale(1)'});
        }

        console.info( st, tp, r, ( st > (tp - wr) ) );
      }));*/
    },
    apply: function(event, el, layer)
    {
      var   layer_coeff = 100 / layer
          , $el         = $(el)
          , ww          = $(window).width()
          , wh          = $(window).height()
          , x           = (event.pageX - (ww / 2)) / layer_coeff * -1
          , y           = (event.pageY - (wh / 2)) / layer_coeff * -1;

      $el.css({ 'transform': 'translate('+ x +'px,'+ y +'px)' });
    }
  };
}());



/* - - - - - - - - - -
 * Startrail Position Randomizer
 */

var StartrailRandomPosition = (function()
{
  var stars         = {
    lg:
    {
      $el: '.effect-startrail.startrail-lg',
      period: 2700,
      delay: 4000
    },
    md:
    {
      $el: '.effect-startrail.startrail-md',
      period: 2200,
      delay: 7000
    }
  };

  return {
    init: function ()
    {
      var that = this;

      $.each(stars, function(idx, size)
      {
        var $el = $(size.$el);
        var t   = size.period;
        var d   = size.delay;

        setTimeout(function()
        {
          $el.data('randomizerOrigin', $el.offset());

          setInterval(function()
          {
            that.randomizer($el);
          }, ~~t);
        }, d);
      });
    },
    randomizer: function(el)
    {
      var $el     = $(el);
      var origin  = $el.data('randomizerOrigin');
      var onLeft  = $el.data('randomizerOnLeft') || 1;
      var newX    = Math.floor(Math.random() * 200);
          newX    = ( onLeft === 1 ? (origin.left + newX) : (origin.left - newX) );

      // $el.css('left', (onLeft === 1? '+' : '-') + '=' + newX + 'px');
      // console.info( $el, origin, $el.offset(), newX, onLeft === 1 );

      $el.css('left', newX + 'px' );
      $el.data('randomizerOnLeft', ( onLeft === 1 ? 2 : 1) );
    }
  };
}());



/* - - - - - - - - - -
 * Sliders
 */

var Sliders = (function()
{
  var $mainSlider     = '#mainSlider';
  var $resvSlider     = '#reservations-slider';
  var $userCards      = '#userCards';
  var $featuredTab   = '#featured-tab';
  var $goldenOffers   = '#goldenOffers';
  var $featuredOffers = '#featuredOffers';
  var $usersMostLiked = '#usersMostLiked';
  var $usersTopSales  = '#usersTopSales, .carousel-loop-left';
  var $offersRotator  = '#offersRotator';

  var _fixOwl         = function(e)
  {
    var $stage = $('.owl-stage', e.target),
        stageW = $stage.width(),
        $el    = $('.owl-item', e.target),
        elW    = 0;

    $el.each(function() {
      // elW += $(this).width()+ +($(this).css("margin-right").slice(0, -2))
      elW += $(this)[0].getBoundingClientRect().width;
      // console.info('elw = ', elW, this)
    });

    if ( elW > stageW ) {
      elW = Math.ceil(elW);
      $stage.width( elW );
    }
  }

  var _responsive4th  = {
    0: {
      items: 1.3,
    },
    480: {
      items: 2,
    },
    768: {
      items: 2,
    },
    960: {
      items: 3,
    },
    1170: {
      items: 4,
    }
  };

  var _responsive5th  = {
    0: {
      items: 1.3,
    },
    480: {
      items: 2,
    },
    768: {
      items: 3,
    },
    960: {
      items: 4,
    },
    1170: {
      items: 5,
    }
  };

  var _responsiveAlt  = {
    0: {
      items: 1.5,
    },
    480: {
      items: 2,
    },
    768: {
      items: 2,
    },
    960: {
      items: 3,
    },
    1170: {
      items: 4,
    }
  };

  return {
    init: function()
    {
      $mainSlider     = $($mainSlider);
      $userCards      = $($userCards);
      $featuredTab    = $($featuredTab);
      $goldenOffers   = $($goldenOffers);
      $featuredOffers = $($featuredOffers);
      $usersMostLiked = $($usersMostLiked);
      $usersTopSales  = $($usersTopSales);
      $offersRotator  = $($offersRotator);

      this.initMainSlider();
      // this.initResvSlider();
      this.initUserCards();
      this.initFeaturedTab();
      this.initGoldenOffers();
      this.initFeaturedOffers();
      this.initUsersMostLiked();
      this.initUsersTopSales();
      this.initOffersRotator();
    },
    getEl: function(el, type)
    {
      var $ret = $();

      switch(type)
      {
        case 'slides':
          $ret = $(el).find('.carousel-slides:first');
          break;

        case 'arrows':
          $ret = $(el).find('.carousel-arrows:first');
          break;
      }

      return $ret;
    },
    initMainSlider: function()
    {
      var that = this;

      that.getEl($mainSlider, 'slides').owlCarousel(
      {
        margin: 20,
        items: 1,
        dots: true,
        loop: true,
        autoplay:false,
        navContainer: that.getEl($mainSlider, 'arrows'),
        navText: [
          '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',
          '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left xxs-ml-10 md-ml-20 icon-arrow-left"></span></div>',
        ],
        rtl: Toolkit.isRTL(),
        // responsive: _responsive4th,
      });
    },
    initUserCards: function()
    {
      var that = this;

      that.getEl($userCards, 'slides').owlCarousel(
      {
        margin: 6,
        dots: false,
        loop: true,
        autoplay:false,
        // autoplayTimeout:4000,
        // autoplayHoverPause:true,
        navContainer: that.getEl($userCards, 'arrows'),
        navText: [
          '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',
          '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left xxs-ml-10 md-ml-20 icon-arrow-left"></span></div>',
        ],
        rtl: Toolkit.isRTL(),
        responsive: _responsive4th,
      });
    },
    initResvSlider: function()
    {
      var that = this;

      that.getEl($resvSlider, 'slides').owlCarousel(
      {
        margin: 6,
        dots: false,
        loop: true,
        autoplay:false,
        navContainer: that.getEl($resvSlider, 'arrows'),
        navText: [
          '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',
          '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left xxs-ml-10 md-ml-20 icon-arrow-left"></span></div>',
        ],
        rtl: Toolkit.isRTL(),
        responsive: _responsive4th,
      });
    },
    initFeaturedTab: function(){
      var that = this,
          $FCarousel = $featuredTab.find('.carousel');

      $FCarousel.each(function () {
        
          var wrapper = $(this).find('.carousel-container'),
          item = $(this).find('.carousel-slide'),
          next = $(this).find('.owl-next'),
          prev = $(this).find('.owl-prev'),
          itemWidth = item.innerWidth(),
          fullWidth = (itemWidth + 30) * item.length + 5,

          translateValue = 0;
          translate = 'translateX('+ translateValue +')';

          // set full size to
          wrapper.css({'width': fullWidth, 'transform': translate});


          prev.click(function(){
            if(translateValue <= 0 ){
              return false;
            }
            translateValue -= (itemWidth + 30);
            translate = 'translateX('+ translateValue +'px)';
            wrapper.css({'transform': translate});
          });

          next.click(function(){
            if( translateValue > (fullWidth/2)-itemWidth )
            {
              return false;
            }
            translateValue += (itemWidth + 30);
            translate = 'translateX('+ translateValue +'px)';
            // console.log('translate', translate);
            wrapper.css({'transform': translate});
          });  
      });



    },
    initGoldenOffers: function()
    {
      var that = this;
      var $el  = that.getEl($goldenOffers, 'slides');

      $el.masonry(
      {
        itemSelector: '.masonry-item',
        percentPosition: true,
        gutter: 0
      });

      $(window).on('load', function()
      {
        $el.masonry();
      });
    },
    initFeaturedOffers: function()
    {
      var that = this;

      that.getEl($featuredOffers, 'slides').owlCarousel(
      {
        items: 5,
        dots: false,
        loop: true,
        navContainer: that.getEl($featuredOffers, 'arrows'),
        autoWidth: true,
        navText: [
          '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',
          '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left xxs-ml-10 md-ml-20 icon-arrow-left"></span></div>',
        ],
        rtl: Toolkit.isRTL()
      });
    },
    initUsersMostLiked: function()
    {
      var that = this;

      that.getEl($usersMostLiked, 'slides').owlCarousel(
      {
        margin: 5,
        responsive: _responsiveAlt,
        dots: false,
        loop: true,
        responsiveClass:true,
        navContainer: that.getEl($usersMostLiked, 'arrows'),
        // autoWidth: true,
        navText: [
          '',
          '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left xxs-ml-10 md-ml-20 icon-arrow-left"></span></div>',
          // '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',
        ],
        rtl: Toolkit.isRTL()
      });
    },
    initUsersTopSales: function()
    {
      var that = this;

      $usersTopSales.each(function()
      {
        var $el      = $(this),
            altArrow = $el.hasClass('carousel-alt-arrow'),
            autoWid  = $el.hasClass('carousel-auto-width'),
            navText  = [],
            navArrow = '<div class="carousel-arrow col-xs-1 x-left text-left"><span class="x-left icon-arrow-left"></span></div>';
            // '<div class="carousel-arrow col-xs-1 x-right text-right"><span class="x-right xxs-mr-10 md-mr-20 icon-arrow-right"></span></div>',

        if ( altArrow )
        {
          navArrow = navArrow.replace(/left/g, 'right');
          navText.push(navArrow);
          navText.push('');
        }
        else
        {
          navText.push('');
          navText.push(navArrow);
        }

        that.getEl($el, 'slides').owlCarousel(
        {
          margin: 5,
          responsive: _responsiveAlt,
          dots: false,
          loop: true,
          responsiveClass: true,
          navContainer: that.getEl($el, 'arrows'),
          autoWidth: autoWid,
          rtl: Toolkit.isRTL(),
          navText: navText,
          // onInitialize: _fixOwl,
          // onInitialized: _fixOwl,
          // onRefreshed: _fixOwl
        });
      });
    },
    initOffersRotator: function()
    {
      var that = this;

      var $lis  = $offersRotator.find('> ul > li');
      var tick  = function()
      {
        var $current = $lis.filter('.active');
        var $next    = $current.next();

        if ( $next.length === 0 )
        {
          $next = $lis.filter(':first');
        }

        $current.removeClass('active');
        $next.addClass('active');
      }

      var setTimer = function()
      {
        return setInterval(tick, 5000);
      }

      // var timer = setTimer();

      $offersRotator.on('mouseover mouseout', $.debounce(150, function(event)
      {
        clearInterval(timer);

        if ( event.type === 'mouseout' )
        {
          // timer = setTimer();
        }
      }));

      Toolkit.action('offersRotatorNext', 'click', function(event)
      {
        event.preventDefault();

        clearInterval(timer);
        // timer = setTimer();
        tick();
      });
    }
  };
}());

/**
 * Toggle Categories List
 */

var ToggleCat = (function()
{
  return {
    init: function()
    {
      $('.z_side-cat-item').each(function(){
        var that  = this,
            elm   = $( that ).find('.z_side-cat-item-title');
            child = $( that ).find( '.z_side-cat-childs' );
        elm.click(function(){
          $(that).toggleClass('z_child-hide');
        });
      });
    }
  };
}());


/* - - - - - - - - - -
 * Page HTML Tools
 */

var Toolkit = (function()
{
  var bgAttr        = 'data-background';
  var $coreEl       = 'body';
  var $scEl         = 'html';
  var $stdNav       = '#stdNav';
  var $loadEl       = '#pageLoader';
  var $osNav        = '#offscreenNav';
  var $cart         = '#cartItems';
  var $notif        = '#notifications';
  var $prodImgs     = '#productImages .pimg';
  var $prodThumb    = '#productThumbs';
  var HASINITED     = false;
  var actionAttr    = 'data-action';
  var $mdFile       = '[data-init="mdfile"]';

  var BrowserDetect =
  {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "OTHER";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "UNKNOWN";

        $('html').addClass(this.browser +' '+ this.browser+'-'+this.version);
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },
    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "MS-EDGE"},
        {string: navigator.userAgent, subString: "MSIE", identity: "EXPLORER"},
        {string: navigator.userAgent, subString: "Trident", identity: "EXPLORER"},
        {string: navigator.userAgent, subString: "Firefox", identity: "FIREFOX"},
        {string: navigator.userAgent, subString: "Opera", identity: "OPERA"},
        {string: navigator.userAgent, subString: "OPR", identity: "OPERA"},
        {string: navigator.userAgent, subString: "Chrome", identity: "CHROME"},
        {string: navigator.userAgent, subString: "Safari", identity: "SAFARI"}
    ]
  };

  var toDataURL     = function (d, callback)
  {
    var fr = new FileReader();

    fr.onload = function(){
      callback(this.result);
    };

    fr.readAsDataURL(d); // async call
  };

  return {
    init: function()
    {
      if ( HASINITED )
        return;

      BrowserDetect.init();

      HASINITED  = true;
      $coreEl    = $($coreEl);
      $scEl      = $($scEl);
      $stdNav    = $($stdNav);
      $loadEl    = $($loadEl);
      $osNav     = $($osNav);
      $cart      = $($cart);
      $notif     = $($notif);
      $prodImgs  = $($prodImgs);
      $prodThumb = $($prodThumb);

      // $scEl.niceScroll(
      // {
      //   bouncescroll: true,
      //   rtlmode:'auto',
      //   cursordragontouch: true,
      //   enableobserver: true,
      //   horizrailenabled: false,
      //   autohidemode: false,
      // });

      $('[data-nicescroll="vr"]').niceScroll(
      {
        bouncescroll: true,
        horizrailenabled: false,
        railpadding: {right: -15}
      });

      $('[data-nicescroll="vr-dd"]').niceScroll(
      {
        bouncescroll: true,
        horizrailenabled: false,
      });

      // $('[data-nicescroll="hr"]').niceScroll(
      // {
      //   autohidemode: false,
      //   // rtlmode: true,
      //   emulatetouch: true,
      //   cursordragontouch: true,
      //   enableobserver: true,
      //   bouncescroll: true,
      //   // horizrailenabled: true,
      // });

      this.bgImages();
      this.defaultActions();
      this.initStdNav();

      this.BrowserDetect = BrowserDetect;
      return this;
    },
    isRTL: function()
    {
      this.init();
      return $coreEl.hasClass('lang-rtl');
    },
    isLanding: function()
    {
      this.init();
      return $coreEl.hasClass('page-landing');
    },
    initStdNav: function()
    {
      var that      = this;
      var $catNav   = $stdNav.find('#catNav');
      var avgwidth  = 50;

      var calcWidth = function()
      {
        var tw   = 0;
        var ww   = $catNav.parent().width();
        var $lis = $catNav.find('> li');

        $lis.each(function()
        {
          tw += $(this).width();
        });

        avgwidth = Math.floor(tw / $lis.length);
        return Math.floor(tw - ww);
      }

      var getMargin = function()
      {
        var mdir = 'margin-' + (that.isRTL() ? 'right' : 'left'),
            mval = ~~$catNav.css(mdir).replace(/px/g,'');

        return { mdir: mdir, mval: mval };
      }

      that.action('navBarLeft', 'click', $.throttle(50, function(event)
      {
        event.preventDefault();

        var $arrow  = $(this);
        var $oarrow = that.action('navBarRight', true);

        $arrow.removeClass('inactive');

        if ( getMargin().mval >= (calcWidth() * -1) )
        {
          $catNav.css( getMargin().mdir, '-='+ avgwidth );
          $oarrow.removeClass('inactive');
        }
        else
        {
          $arrow.addClass('inactive');
        }
      }), true);

      that.action('navBarRight', 'click', $.throttle(50, function(event)
      {
        event.preventDefault();

        var omargin = getMargin().mval;
        var $arrow  = $(this);
        var $oarrow = that.action('navBarLeft', true);

        $arrow.removeClass('inactive');

        if ( omargin < 0 )
        {
          $catNav.css( getMargin().mdir, '+='+ avgwidth );
          $oarrow.removeClass('inactive');
        }

        if ( getMargin().mval > 0 || (omargin + avgwidth) > 0 )
        {
          $catNav.css( getMargin().mdir, 0 );
          $arrow.addClass('inactive');
        }
      }), true);
    },
    bgImages: function()
    {
      $('['+bgAttr+']').each(function(index, el)
      {
        var $el  = $(this),
            $img = $el.find('img:first'),
            img  = $el.attr(bgAttr),
            dims;

        if ( $el.data('bgImageInit') /* || !img*/ )
        {
          return;
        }

        $el.data('bgImageInit', true);

        if ( typeof img === 'string' && img.length > 0 )
        {
          $el.css( 'background-image', 'url('+ img +')' );
        }

        if ( $img.length !== 1 )
        {
          return;
        }

        dims = {
          width: $img.get(0).clientWidth,
          height: $img.get(0).clientHeight
        };

        $(window).on('resize pseudo-resize', $.debounce(150, function()
        {
          if ( $el.parent().width() < dims.width )
          {
            $img.css('width', $el.parent().width());
          }
          // else if ( $el.height() < dims.height )
          // {
          //   $img.css('height', $el.height());
          // }
          else
          {
            $img.css(dims);
          }
        }));
      });

      $(window).trigger('pseudo-resize');
    },
    finishLoading: function()
    {
      // this.init();
      // $coreEl.removeClass('page-loading');
      // $loadEl.fadeOut('slow');
      // return this;
    },
    loadingNotice: function()
    {
      this.init();
      $loadEl.find('#pageLoaderNotice').hide().removeClass('transparent').fadeIn('fast');
      return this;
    },
    defaultActions: function()
    {
      var that = this;

      that.action('pageLoadingForceHide', 'click', function (event)
      {
        event.preventDefault();
        that.finishLoading();
      });

      that.action('offscreenNavClose', 'click', function (event)
      {
        event.preventDefault();
        $coreEl.removeClass('offscreen-nav-visible');
        if($('.offscreen-nav-visible').length > 0){
          $('#offscreenNav').css('display', 'block');
          setTimeout(function(){
            $('#offscreenNav').animate({right: '0px'}, '300');
          }, 100);
        }else{
          $('#offscreenNav').animate({right: '-280px'}, '400');
          setTimeout(function(){
            $('#offscreenNav').css('display', 'none');
          }, 200);          
        }
        $osNav.trigger('class-watch');
        
      });

      that.action('offscreenNavToggle', 'click', function (event)
      {
        event.preventDefault();
        $coreEl.toggleClass('offscreen-nav-visible');
        if($('.offscreen-nav-visible').length > 0){
          $('#offscreenNav').css('display', 'block');
          setTimeout(function(){
            $('#offscreenNav').animate({right: '0px'}, '300');
          }, 100);
        }else{
          $('#offscreenNav').animate({right: '-280px'}, '400');
          setTimeout(function(){
            $('#offscreenNav').css('display', 'none');
          }, 200);          
        }

        $osNav.trigger('class-watch');
      });

      that.action('offscreenMapToggle', 'click', function (event)
      {
        event.preventDefault();
        $coreEl.toggleClass('offscreen-map-visible');
        if($('.offscreen-map-visible').length > 0){
          $('#offscreenMap').css('display', 'block');
          setTimeout(function(){
            $('#offscreenMap').animate({right: '0px'}, '300');
          }, 100);
        }else{
          $('#offscreenMap').animate({right: '-310px'}, '100');
          setTimeout(function(){
            $('#offscreenMap').css('display', 'none');
          }, 200);          
        }

        // $osNav.trigger('class-watch');
      });

      that.action('toggleUsersList', 'click', function (event)
      {
        event.preventDefault();
        $coreEl.toggleClass('users-list-visible');
        if($('.users-list-visible').length > 0){
          // $('.z-users-list').css('display', 'block');
          // setTimeout(function(){
            $('.z-users-list').animate({right: '0px'}, '300');
            $('.z-message-body').animate({right: '212px'}, '320');
          // }, 100);
        }else{
          $('.z-users-list').animate({right: '-100%'}, '90');
          $('.z-message-body').animate({right: '0px'}, '100');         
        }

        // $osNav.trigger('class-watch');
      });
      
      that.action('toggle_store_info', 'click', function (event)
      {
        event.preventDefault();
        $('.z_store_info').toggleClass('hidden-xs hidden-sm');
        // $osNav.trigger('class-watch');
      });
      
      $osNav.on('click', '.submenu > a', function(event)
      {
        event.preventDefault();

        var   $a  = $(this)
            , $li = $a.parents('.submenu:first')
            ;

        $li.toggleClass('folded');
      });

      that.action('toggleCart', 'click', function (event)
      {
        event.preventDefault();
        $notif.hide('fast');
        $cart.toggle('fast');
        // console.info(this);
      });

      that.action('toggleNotifications', 'click', function (event)
      {
        event.preventDefault();
        $cart.hide('fast');
        $notif.toggle('fast');
        // console.info(this);
      });

      that.action('commentReply', 'click', function (event)
      {
        event.preventDefault();

        var   $that       = $(this)
            , $comment    = $that.parents('.comment:last')
            , $ccontainer = $that.parents('.comments:first')
            , $form       = $ccontainer.find('.comments-form:last')
            , $fc         = $form.clone()
            ;

        if ( $comment.find('.comments-form').length === 1 )
        {
          $fc = $comment.find('.comments-form');
        }
        else
        {
          $fc
          .find('input[type="hidden"]')
          .val( $comment.data('id') );

          if ( $comment.data('username') )
          {
            $fc
            .find('label')
            .html( $fc.find('label').text() + ' &nbsp; — &nbsp; ' + $comment.data('username') );
          }

          $fc.hide().appendTo($comment);
          $fc.fadeIn('slow');
        }

        $fc.find('textarea').focus();
        $('body, html').animate({scrollTop: $fc.offset().top - 50}, 'slow');
        // console.info( $comment, $ccontainer, $fc, $form );
      });

      that.action('toggleComments', 'click', function (event)
      {
        event.preventDefault();

        var   $that = $(this)
            , $ccon = $that.parents('.comments')
            , $cbod = $ccon.find('.comments-body, .replies')
            ;

        if ( $cbod.find('> *').length === 0 )
          return;

        $that.toggleClass('btn-gray btn-ghost btn-primary');
        if ( $cbod.is(':visible') )
          $cbod.slideUp('fast');
        else
          $cbod.slideDown('fast');
      });

      that.action('scrollDown', 'click', function (event)
      {
        event.preventDefault();
        var $cEl = $('main.main-content:first');

        if ( $cEl.length === 0 )
        {
          $cEl = $('section:first');
        }

        $('body,html').animate({scrollTop: $cEl.offset().top}, 'slow');
      });

      $coreEl.on('mousedown', function(event)
      {
        var $tEl = $(event.target);

        if ( ! $tEl.is($cart)
          && ! $tEl.is($notif)
          && ! $tEl.is('['+ actionAttr +']')
          && ! $tEl.parents().is('['+ actionAttr +']')
          && ! $tEl.parents().is($cart)
          && ! $tEl.parents().is($notif)
          )
        {
          $cart.add($notif).hide('fast');
        }

        // console.info($tEl);
      });

      $('.datepicker').datepicker(
      {
        todayBtn: true,
        format: 'yyyy/mm/dd'
      });

      var attachZoom = function($el)
      {
        $el.find('[data-zoom]').each(function()
        {
          var $e    = $(this),
              eInit = $e.data('zoomInit'),
              img   = $e.data('zoom');

          if ( eInit )
          {
            return
          }

          $e.zoom({url: img});
          $e.data('zoomInit', true);
        });
      }

      attachZoom($prodImgs);

      $prodThumb.on('click', 'a', function(event)
      {
        event.preventDefault();

        var $a = $(this),
            $o = $a.siblings().not($a),
            z  = $a.data('zoom'),
            $t = $prodImgs.find('a:first').clone();

        $o.addClass('opacity-3');
        $a.removeClass('opacity-3');
        $ImageDataToDisplay = $prodImgs.find('a:not([id="'+$a.attr('id')+'"])');
        $prodImgs.empty();

        $t.trigger('zoom.destroy');
        $t.find('img').attr('src', $a.attr('href'));
        $t.attr('href',$a.attr('href'))

        $t
        .data({'zoomInit': false, 'zoom': z})
        .attr('href', z)
        .hide()
        .appendTo($prodImgs);

        $t.fadeIn('fast');
        $ImageDataToDisplay.each(function () {
            jQuery(this).addClass('invisible');
            jQuery(this).appendTo($prodImgs);
        });
          attachZoom($prodImgs);

          var $hrAW = $a.parents('.hr-auto-width:first');

        if ( $hrAW.length > 0 )
        {
          $hrAW.width( Math.ceil(($a.siblings().length + 1) * ($a.width() + (~~$a.css('margin-right').replace('px', '') * 2.5))) );
        }
      });

      var $hrAW = $prodThumb.find('.hr-auto-width');

      if ( $hrAW.length > 0 )
      {
        // $hrAW.width( Math.ceil(($prodThumb.find('.thumbs-hr a').length + 1) * ((16 * 6) + (20 * 2.5))) );
        $hrAW.width( ($prodThumb.find('.thumbs-hr a').length)* ($prodThumb.find('.thumbs-hr a').innerWidth()+44)) ;
      }

      /*$prodImgs.parent().find('[data-fullimage]:first').on('click', function(event)
      {
        event.preventDefault();

        var $anch  = $(this),
            $img   = $anch.parent().find('a:first .oimg'),
            hdLink = $img.parent().data('zoom');

        if ( hdLink )
        {

        }
        // console.info( $anch, $img );
      });*/

      $(document).on('change', $mdFile + ' input[type=file]', function()
      {
        var $input   = $(this),
            $parent  = $input.parents($mdFile).filter(':first'),
            $pvImage = $parent.find('[ data-mdfileimg]'),
            $pvCount = $parent.find('[ data-mdfilecount]'),
            items    = $input.get(0).files,
            fcount   = items.length,
            emsg;

        // console.info( fcount, $input, $pvImage, $pvCount, items);

        if ( fcount > 0 )
        {
          $pvCount.text(fcount);
          $pvImage.removeAttr('src');
          var item = items[(items.length - 1)];

          if ( item.type.substr(0,5) === 'image' )
          {
            toDataURL(item, function(data)
            {
              $pvImage.attr('src', data);
            });
            return;
          }
          else
          {
            emsg = 'مسموح بالصور فقط';
          }
        }
        else
        {
          emsg = 'لم يتم تحديد اى ملفات للرفع';
        }

        swal(
        {
          title: 'يرجى الانتباه!',
          text: emsg,
          type: 'warning',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          closeOnConfirm: false,
          closeOnCancel: false
        });

        $pvCount.text(0);
        $pvImage.attr('src', '/frontend/images/sample/unknown.png');
        $input.val('');
      });


      $('[data-toggle=tooltip]').each(function()
      {
        var $el = $(this),
            $pos = $el.data('tooltippos') || 'top';

        $el.tooltip();
      });

      // console.info($prodImgs);

      // $prodImgs.

      // $osNav.on('class-watch', function()
      // {
      //   var isOSNavVisible = $coreEl.hasClass('offscreen-nav-visible');

      //   console.info('-- is visible: ', isOSNavVisible);

      //   if ( isOSNavVisible )
      //   {
      //     clearTimeout($osNav.data('classwatchtimeout'));
      //     $osNav.hide().show();
      //     $coreEl.removeClass('offscreen-nav-visible').addClass('offscreen-nav-visible');
      //   }
      //   else
      //   {
      //     $osNav.data('classwatchtimeout', setTimeout(function()
      //     {
      //       $osNav.hide();
      //     }, 500));
      //   }
      // });
    },
    action: function(action, eventName, callback, fullCB)
    {
      var fullCB = (fullCB === true);
      var retEl  = (eventName === true);
      var $ael   = '['+ actionAttr +'='+ action +']';

      if ( retEl === true )
      {
        return $($ael);
      }

      if ( fullCB && typeof(callback) === 'function' )
      {
        $($ael).on(eventName, callback);
      }
      else
      {
        $(document).on(eventName, $ael, function(event, extra)
        {
          if ( typeof(callback) === 'function' )
          {
            callback.call(this, event, extra);
          }

          if ( typeof(extra) === 'function' )
          {
            extra.call(this, event);
          }
        });
      }

      return this;
    }
  };
}());



/* - - - - - - - - - -
 * SMOOTHWHEEL */

/* jquery.nicescroll
-- version 3.6.8
-- copyright 2016-02-29 InuYaksa*2016
-- licensed under the MIT
--
-- http://nicescroll.areaaperta.com/
-- https://github.com/inuyaksa/jquery.nicescroll
-- update to v3.7.5 by bdwey
*/
/* jquery.nicescroll v3.7.5 InuYaksa - MIT - https://nicescroll.areaaperta.com */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";var o=!1,t=!1,r=0,i=2e3,s=0,n=e,l=document,a=window,c=n(a),d=[],u=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||!1,h=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.mozCancelAnimationFrame||!1;if(u)a.cancelAnimationFrame||(h=function(e){});else{var p=0;u=function(e,o){var t=(new Date).getTime(),r=Math.max(0,16-(t-p)),i=a.setTimeout(function(){e(t+r)},r);return p=t+r,i},h=function(e){a.clearTimeout(e)}}var m=a.MutationObserver||a.WebKitMutationObserver||!1,f=Date.now||function(){return(new Date).getTime()},g={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"6px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:40,mousescrollstep:27,touchbehavior:!1,emulatetouch:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,railhoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:.3,rtlmode:"auto",cursordragontouch:!1,oneaxismousemode:"auto",scriptpath:function(){var e=l.currentScript||function(){var e=l.getElementsByTagName("script");return!!e.length&&e[e.length-1]}(),o=e?e.src.split("?")[0]:"";return o.split("/").length>0?o.split("/").slice(0,-1).join("/")+"/":""}(),preventmultitouchscrolling:!0,disablemutationobserver:!1,enableobserver:!0,scrollbarid:!1},v=!1,w=function(){if(v)return v;var e=l.createElement("DIV"),o=e.style,t=navigator.userAgent,r=navigator.platform,i={};return i.haspointerlock="pointerLockElement"in l||"webkitPointerLockElement"in l||"mozPointerLockElement"in l,i.isopera="opera"in a,i.isopera12=i.isopera&&"getUserMedia"in navigator,i.isoperamini="[object OperaMini]"===Object.prototype.toString.call(a.operamini),i.isie="all"in l&&"attachEvent"in e&&!i.isopera,i.isieold=i.isie&&!("msInterpolationMode"in o),i.isie7=i.isie&&!i.isieold&&(!("documentMode"in l)||7===l.documentMode),i.isie8=i.isie&&"documentMode"in l&&8===l.documentMode,i.isie9=i.isie&&"performance"in a&&9===l.documentMode,i.isie10=i.isie&&"performance"in a&&10===l.documentMode,i.isie11="msRequestFullscreen"in e&&l.documentMode>=11,i.ismsedge="msCredentials"in a,i.ismozilla="MozAppearance"in o,i.iswebkit=!i.ismsedge&&"WebkitAppearance"in o,i.ischrome=i.iswebkit&&"chrome"in a,i.ischrome38=i.ischrome&&"touchAction"in o,i.ischrome22=!i.ischrome38&&i.ischrome&&i.haspointerlock,i.ischrome26=!i.ischrome38&&i.ischrome&&"transition"in o,i.cantouch="ontouchstart"in l.documentElement||"ontouchstart"in a,i.hasw3ctouch=(a.PointerEvent||!1)&&(navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),i.hasmstouch=!i.hasw3ctouch&&(a.MSPointerEvent||!1),i.ismac=/^mac$/i.test(r),i.isios=i.cantouch&&/iphone|ipad|ipod/i.test(r),i.isios4=i.isios&&!("seal"in Object),i.isios7=i.isios&&"webkitHidden"in l,i.isios8=i.isios&&"hidden"in l,i.isios10=i.isios&&a.Proxy,i.isandroid=/android/i.test(t),i.haseventlistener="addEventListener"in e,i.trstyle=!1,i.hastransform=!1,i.hastranslate3d=!1,i.transitionstyle=!1,i.hastransition=!1,i.transitionend=!1,i.trstyle="transform",i.hastransform="transform"in o||function(){for(var e=["msTransform","webkitTransform","MozTransform","OTransform"],t=0,r=e.length;t<r;t++)if(void 0!==o[e[t]]){i.trstyle=e[t];break}i.hastransform=!!i.trstyle}(),i.hastransform&&(o[i.trstyle]="translate3d(1px,2px,3px)",i.hastranslate3d=/translate3d/.test(o[i.trstyle])),i.transitionstyle="transition",i.prefixstyle="",i.transitionend="transitionend",i.hastransition="transition"in o||function(){i.transitionend=!1;for(var e=["webkitTransition","msTransition","MozTransition","OTransition","OTransition","KhtmlTransition"],t=["-webkit-","-ms-","-moz-","-o-","-o","-khtml-"],r=["webkitTransitionEnd","msTransitionEnd","transitionend","otransitionend","oTransitionEnd","KhtmlTransitionEnd"],s=0,n=e.length;s<n;s++)if(e[s]in o){i.transitionstyle=e[s],i.prefixstyle=t[s],i.transitionend=r[s];break}i.ischrome26&&(i.prefixstyle=t[1]),i.hastransition=i.transitionstyle}(),i.cursorgrabvalue=function(){var e=["grab","-webkit-grab","-moz-grab"];(i.ischrome&&!i.ischrome38||i.isie)&&(e=[]);for(var t=0,r=e.length;t<r;t++){var s=e[t];if(o.cursor=s,o.cursor==s)return s}return"url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"}(),i.hasmousecapture="setCapture"in e,i.hasMutationObserver=!1!==m,e=null,v=i,i},b=function(e,p){function v(){var e=T.doc.css(P.trstyle);return!(!e||"matrix"!=e.substr(0,6))&&e.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/)}function b(){var e=T.win;if("zIndex"in e)return e.zIndex();for(;e.length>0;){if(9==e[0].nodeType)return!1;var o=e.css("zIndex");if(!isNaN(o)&&0!==o)return parseInt(o);e=e.parent()}return!1}function x(e,o,t){var r=e.css(o),i=parseFloat(r);if(isNaN(i)){var s=3==(i=I[r]||0)?t?T.win.outerHeight()-T.win.innerHeight():T.win.outerWidth()-T.win.innerWidth():1;return T.isie8&&i&&(i+=1),s?i:0}return i}function S(e,o,t,r){T._bind(e,o,function(r){var i={original:r=r||a.event,target:r.target||r.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==r.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){return r.preventDefault?r.preventDefault():r.returnValue=!1,!1},stopImmediatePropagation:function(){r.stopImmediatePropagation?r.stopImmediatePropagation():r.cancelBubble=!0}};return"mousewheel"==o?(r.wheelDeltaX&&(i.deltaX=-.025*r.wheelDeltaX),r.wheelDeltaY&&(i.deltaY=-.025*r.wheelDeltaY),!i.deltaY&&!i.deltaX&&(i.deltaY=-.025*r.wheelDelta)):i.deltaY=r.detail,t.call(e,i)},r)}function z(e,o,t,r){T.scrollrunning||(T.newscrolly=T.getScrollTop(),T.newscrollx=T.getScrollLeft(),D=f());var i=f()-D;if(D=f(),i>350?A=1:A+=(2-A)/10,e=e*A|0,o=o*A|0,e){if(r)if(e<0){if(T.getScrollLeft()>=T.page.maxw)return!0}else if(T.getScrollLeft()<=0)return!0;var s=e>0?1:-1;X!==s&&(T.scrollmom&&T.scrollmom.stop(),T.newscrollx=T.getScrollLeft(),X=s),T.lastdeltax-=e}if(o){if(function(){var e=T.getScrollTop();if(o<0){if(e>=T.page.maxh)return!0}else if(e<=0)return!0}()){if(M.nativeparentscrolling&&t&&!T.ispage&&!T.zoomactive)return!0;var n=T.view.h>>1;T.newscrolly<-n?(T.newscrolly=-n,o=-1):T.newscrolly>T.page.maxh+n?(T.newscrolly=T.page.maxh+n,o=1):o=0}var l=o>0?1:-1;B!==l&&(T.scrollmom&&T.scrollmom.stop(),T.newscrolly=T.getScrollTop(),B=l),T.lastdeltay-=o}(o||e)&&T.synched("relativexy",function(){var e=T.lastdeltay+T.newscrolly;T.lastdeltay=0;var o=T.lastdeltax+T.newscrollx;T.lastdeltax=0,T.rail.drag||T.doScrollPos(o,e)})}function k(e,o,t){var r,i;return!(t||!q)||(0===e.deltaMode?(r=-e.deltaX*(M.mousescrollstep/54)|0,i=-e.deltaY*(M.mousescrollstep/54)|0):1===e.deltaMode&&(r=-e.deltaX*M.mousescrollstep*50/80|0,i=-e.deltaY*M.mousescrollstep*50/80|0),o&&M.oneaxismousemode&&0===r&&i&&(r=i,i=0,t&&(r<0?T.getScrollLeft()>=T.page.maxw:T.getScrollLeft()<=0)&&(i=r,r=0)),T.isrtlmode&&(r=-r),z(r,i,t,!0)?void(t&&(q=!0)):(q=!1,e.stopImmediatePropagation(),e.preventDefault()))}var T=this;this.version="3.7.5",this.name="nicescroll",this.me=p;var E=n("body"),M=this.opt={doc:E,win:!1};if(n.extend(M,g),M.snapbackspeed=80,e)for(var L in M)void 0!==e[L]&&(M[L]=e[L]);if(M.disablemutationobserver&&(m=!1),this.doc=M.doc,this.iddoc=this.doc&&this.doc[0]?this.doc[0].id||"":"",this.ispage=/^BODY|HTML/.test(M.win?M.win[0].nodeName:this.doc[0].nodeName),this.haswrapper=!1!==M.win,this.win=M.win||(this.ispage?c:this.doc),this.docscroll=this.ispage&&!this.haswrapper?c:this.win,this.body=E,this.viewport=!1,this.isfixed=!1,this.iframe=!1,this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName,this.istextarea="TEXTAREA"==this.win[0].nodeName,this.forcescreen=!1,this.canshowonmouseevent="scroll"!=M.autohidemode,this.onmousedown=!1,this.onmouseup=!1,this.onmousemove=!1,this.onmousewheel=!1,this.onkeypress=!1,this.ongesturezoom=!1,this.onclick=!1,this.onscrollstart=!1,this.onscrollend=!1,this.onscrollcancel=!1,this.onzoomin=!1,this.onzoomout=!1,this.view=!1,this.page=!1,this.scroll={x:0,y:0},this.scrollratio={x:0,y:0},this.cursorheight=20,this.scrollvaluemax=0,"auto"==M.rtlmode){var C=this.win[0]==a?this.body:this.win,N=C.css("writing-mode")||C.css("-webkit-writing-mode")||C.css("-ms-writing-mode")||C.css("-moz-writing-mode");"horizontal-tb"==N||"lr-tb"==N||""===N?(this.isrtlmode="rtl"==C.css("direction"),this.isvertical=!1):(this.isrtlmode="vertical-rl"==N||"tb"==N||"tb-rl"==N||"rl-tb"==N,this.isvertical="vertical-rl"==N||"tb"==N||"tb-rl"==N)}else this.isrtlmode=!0===M.rtlmode,this.isvertical=!1;if(this.scrollrunning=!1,this.scrollmom=!1,this.observer=!1,this.observerremover=!1,this.observerbody=!1,!1!==M.scrollbarid)this.id=M.scrollbarid;else do{this.id="ascrail"+i++}while(l.getElementById(this.id));this.rail=!1,this.cursor=!1,this.cursorfreezed=!1,this.selectiondrag=!1,this.zoom=!1,this.zoomactive=!1,this.hasfocus=!1,this.hasmousefocus=!1,this.railslocked=!1,this.locked=!1,this.hidden=!1,this.cursoractive=!0,this.wheelprevented=!1,this.overflowx=M.overflowx,this.overflowy=M.overflowy,this.nativescrollingarea=!1,this.checkarea=0,this.events=[],this.saved={},this.delaylist={},this.synclist={},this.lastdeltax=0,this.lastdeltay=0,this.detected=w();var P=n.extend({},this.detected);this.canhwscroll=P.hastransform&&M.hwacceleration,this.ishwscroll=this.canhwscroll&&T.haswrapper,this.isrtlmode?this.isvertical?this.hasreversehr=!(P.iswebkit||P.isie||P.isie11):this.hasreversehr=!(P.iswebkit||P.isie&&!P.isie10&&!P.isie11):this.hasreversehr=!1,this.istouchcapable=!1,P.cantouch||!P.hasw3ctouch&&!P.hasmstouch?!P.cantouch||P.isios||P.isandroid||!P.iswebkit&&!P.ismozilla||(this.istouchcapable=!0):this.istouchcapable=!0,M.enablemouselockapi||(P.hasmousecapture=!1,P.haspointerlock=!1),this.debounced=function(e,o,t){T&&(T.delaylist[e]||!1||(T.delaylist[e]={h:u(function(){T.delaylist[e].fn.call(T),T.delaylist[e]=!1},t)},o.call(T)),T.delaylist[e].fn=o)},this.synched=function(e,o){T.synclist[e]?T.synclist[e]=o:(T.synclist[e]=o,u(function(){T&&(T.synclist[e]&&T.synclist[e].call(T),T.synclist[e]=null)}))},this.unsynched=function(e){T.synclist[e]&&(T.synclist[e]=!1)},this.css=function(e,o){for(var t in o)T.saved.css.push([e,t,e.css(t)]),e.css(t,o[t])},this.scrollTop=function(e){return void 0===e?T.getScrollTop():T.setScrollTop(e)},this.scrollLeft=function(e){return void 0===e?T.getScrollLeft():T.setScrollLeft(e)};var R=function(e,o,t,r,i,s,n){this.st=e,this.ed=o,this.spd=t,this.p1=r||0,this.p2=i||1,this.p3=s||0,this.p4=n||1,this.ts=f(),this.df=o-e};if(R.prototype={B2:function(e){return 3*(1-e)*(1-e)*e},B3:function(e){return 3*(1-e)*e*e},B4:function(e){return e*e*e},getPos:function(){return(f()-this.ts)/this.spd},getNow:function(){var e=(f()-this.ts)/this.spd,o=this.B2(e)+this.B3(e)+this.B4(e);return e>=1?this.ed:this.st+this.df*o|0},update:function(e,o){return this.st=this.getNow(),this.ed=e,this.spd=o,this.ts=f(),this.df=this.ed-this.st,this}},this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"},P.hastranslate3d&&P.isios&&this.doc.css("-webkit-backface-visibility","hidden"),this.getScrollTop=function(e){if(!e){var o=v();if(o)return 16==o.length?-o[13]:-o[5];if(T.timerscroll&&T.timerscroll.bz)return T.timerscroll.bz.getNow()}return T.doc.translate.y},this.getScrollLeft=function(e){if(!e){var o=v();if(o)return 16==o.length?-o[12]:-o[4];if(T.timerscroll&&T.timerscroll.bh)return T.timerscroll.bh.getNow()}return T.doc.translate.x},this.notifyScrollEvent=function(e){var o=l.createEvent("UIEvents");o.initUIEvent("scroll",!1,!1,a,1),o.niceevent=!0,e.dispatchEvent(o)};var _=this.isrtlmode?1:-1;P.hastranslate3d&&M.enabletranslate3d?(this.setScrollTop=function(e,o){T.doc.translate.y=e,T.doc.translate.ty=-1*e+"px",T.doc.css(P.trstyle,"translate3d("+T.doc.translate.tx+","+T.doc.translate.ty+",0)"),o||T.notifyScrollEvent(T.win[0])},this.setScrollLeft=function(e,o){T.doc.translate.x=e,T.doc.translate.tx=e*_+"px",T.doc.css(P.trstyle,"translate3d("+T.doc.translate.tx+","+T.doc.translate.ty+",0)"),o||T.notifyScrollEvent(T.win[0])}):(this.setScrollTop=function(e,o){T.doc.translate.y=e,T.doc.translate.ty=-1*e+"px",T.doc.css(P.trstyle,"translate("+T.doc.translate.tx+","+T.doc.translate.ty+")"),o||T.notifyScrollEvent(T.win[0])},this.setScrollLeft=function(e,o){T.doc.translate.x=e,T.doc.translate.tx=e*_+"px",T.doc.css(P.trstyle,"translate("+T.doc.translate.tx+","+T.doc.translate.ty+")"),o||T.notifyScrollEvent(T.win[0])})}else this.getScrollTop=function(){return T.docscroll.scrollTop()},this.setScrollTop=function(e){T.docscroll.scrollTop(e)},this.getScrollLeft=function(){return T.hasreversehr?T.detected.ismozilla?T.page.maxw-Math.abs(T.docscroll.scrollLeft()):T.page.maxw-T.docscroll.scrollLeft():T.docscroll.scrollLeft()},this.setScrollLeft=function(e){return setTimeout(function(){if(T)return T.hasreversehr&&(e=T.detected.ismozilla?-(T.page.maxw-e):T.page.maxw-e),T.docscroll.scrollLeft(e)},1)};this.getTarget=function(e){return!!e&&(e.target?e.target:!!e.srcElement&&e.srcElement)},this.hasParent=function(e,o){if(!e)return!1;for(var t=e.target||e.srcElement||e||!1;t&&t.id!=o;)t=t.parentNode||!1;return!1!==t};var I={thin:1,medium:3,thick:5};this.getDocumentScrollOffset=function(){return{top:a.pageYOffset||l.documentElement.scrollTop,left:a.pageXOffset||l.documentElement.scrollLeft}},this.getOffset=function(){if(T.isfixed){var e=T.win.offset(),o=T.getDocumentScrollOffset();return e.top-=o.top,e.left-=o.left,e}var t=T.win.offset();if(!T.viewport)return t;var r=T.viewport.offset();return{top:t.top-r.top,left:t.left-r.left}},this.updateScrollBar=function(e){var o,t;if(T.ishwscroll)T.rail.css({height:T.win.innerHeight()-(M.railpadding.top+M.railpadding.bottom)}),T.railh&&T.railh.css({width:T.win.innerWidth()-(M.railpadding.left+M.railpadding.right)});else{var r=T.getOffset();if(o={top:r.top,left:r.left-(M.railpadding.left+M.railpadding.right)},o.top+=x(T.win,"border-top-width",!0),o.left+=T.rail.align?T.win.outerWidth()-x(T.win,"border-right-width")-T.rail.width:x(T.win,"border-left-width"),(t=M.railoffset)&&(t.top&&(o.top+=t.top),t.left&&(o.left+=t.left)),T.railslocked||T.rail.css({top:o.top,left:o.left,height:(e?e.h:T.win.innerHeight())-(M.railpadding.top+M.railpadding.bottom)}),T.zoom&&T.zoom.css({top:o.top+1,left:1==T.rail.align?o.left-20:o.left+T.rail.width+4}),T.railh&&!T.railslocked){o={top:r.top,left:r.left},(t=M.railhoffset)&&(t.top&&(o.top+=t.top),t.left&&(o.left+=t.left));var i=T.railh.align?o.top+x(T.win,"border-top-width",!0)+T.win.innerHeight()-T.railh.height:o.top+x(T.win,"border-top-width",!0),s=o.left+x(T.win,"border-left-width");T.railh.css({top:i-(M.railpadding.top+M.railpadding.bottom),left:s,width:T.railh.width})}}},this.doRailClick=function(e,o,t){var r,i,s,n;T.railslocked||(T.cancelEvent(e),"pageY"in e||(e.pageX=e.clientX+l.documentElement.scrollLeft,e.pageY=e.clientY+l.documentElement.scrollTop),o?(r=t?T.doScrollLeft:T.doScrollTop,s=t?(e.pageX-T.railh.offset().left-T.cursorwidth/2)*T.scrollratio.x:(e.pageY-T.rail.offset().top-T.cursorheight/2)*T.scrollratio.y,T.unsynched("relativexy"),r(0|s)):(r=t?T.doScrollLeftBy:T.doScrollBy,s=t?T.scroll.x:T.scroll.y,n=t?e.pageX-T.railh.offset().left:e.pageY-T.rail.offset().top,i=t?T.view.w:T.view.h,r(s>=n?i:-i)))},T.newscrolly=T.newscrollx=0,T.hasanimationframe="requestAnimationFrame"in a,T.hascancelanimationframe="cancelAnimationFrame"in a,T.hasborderbox=!1,this.init=function(){if(T.saved.css=[],P.isoperamini)return!0;if(P.isandroid&&!("hidden"in l))return!0;M.emulatetouch=M.emulatetouch||M.touchbehavior,T.hasborderbox=a.getComputedStyle&&"border-box"===a.getComputedStyle(l.body)["box-sizing"];var e={"overflow-y":"hidden"};if((P.isie11||P.isie10)&&(e["-ms-overflow-style"]="none"),T.ishwscroll&&(this.doc.css(P.transitionstyle,P.prefixstyle+"transform 0ms ease-out"),P.transitionend&&T.bind(T.doc,P.transitionend,T.onScrollTransitionEnd,!1)),T.zindex="auto",T.ispage||"auto"!=M.zindex?T.zindex=M.zindex:T.zindex=b()||"auto",!T.ispage&&"auto"!=T.zindex&&T.zindex>s&&(s=T.zindex),T.isie&&0===T.zindex&&"auto"==M.zindex&&(T.zindex="auto"),!T.ispage||!P.isieold){var i=T.docscroll;T.ispage&&(i=T.haswrapper?T.win:T.doc),T.css(i,e),T.ispage&&(P.isie11||P.isie)&&T.css(n("html"),e),!P.isios||T.ispage||T.haswrapper||T.css(E,{"-webkit-overflow-scrolling":"touch"});var d=n(l.createElement("div"));d.css({position:"relative",top:0,float:"right",width:M.cursorwidth,height:0,"background-color":M.cursorcolor,border:M.cursorborder,"background-clip":"padding-box","-webkit-border-radius":M.cursorborderradius,"-moz-border-radius":M.cursorborderradius,"border-radius":M.cursorborderradius}),d.addClass("nicescroll-cursors"),T.cursor=d;var u=n(l.createElement("div"));u.attr("id",T.id),u.addClass("nicescroll-rails nicescroll-rails-vr");var h,p,f=["left","right","top","bottom"];for(var g in f)p=f[g],(h=M.railpadding[p]||0)&&u.css("padding-"+p,h+"px");u.append(d),u.width=Math.max(parseFloat(M.cursorwidth),d.outerWidth()),u.css({width:u.width+"px",zIndex:T.zindex,background:M.background,cursor:"default"}),u.visibility=!0,u.scrollable=!0,u.align="left"==M.railalign?0:1,T.rail=u,T.rail.drag=!1;var v=!1;!M.boxzoom||T.ispage||P.isieold||(v=l.createElement("div"),T.bind(v,"click",T.doZoom),T.bind(v,"mouseenter",function(){T.zoom.css("opacity",M.cursoropacitymax)}),T.bind(v,"mouseleave",function(){T.zoom.css("opacity",M.cursoropacitymin)}),T.zoom=n(v),T.zoom.css({cursor:"pointer",zIndex:T.zindex,backgroundImage:"url("+M.scriptpath+"zoomico.png)",height:18,width:18,backgroundPosition:"0 0"}),M.dblclickzoom&&T.bind(T.win,"dblclick",T.doZoom),P.cantouch&&M.gesturezoom&&(T.ongesturezoom=function(e){return e.scale>1.5&&T.doZoomIn(e),e.scale<.8&&T.doZoomOut(e),T.cancelEvent(e)},T.bind(T.win,"gestureend",T.ongesturezoom))),T.railh=!1;var w;if(M.horizrailenabled&&(T.css(i,{overflowX:"hidden"}),(d=n(l.createElement("div"))).css({position:"absolute",top:0,height:M.cursorwidth,width:0,backgroundColor:M.cursorcolor,border:M.cursorborder,backgroundClip:"padding-box","-webkit-border-radius":M.cursorborderradius,"-moz-border-radius":M.cursorborderradius,"border-radius":M.cursorborderradius}),P.isieold&&d.css("overflow","hidden"),d.addClass("nicescroll-cursors"),T.cursorh=d,(w=n(l.createElement("div"))).attr("id",T.id+"-hr"),w.addClass("nicescroll-rails nicescroll-rails-hr"),w.height=Math.max(parseFloat(M.cursorwidth),d.outerHeight()),w.css({height:w.height+"px",zIndex:T.zindex,background:M.background}),w.append(d),w.visibility=!0,w.scrollable=!0,w.align="top"==M.railvalign?0:1,T.railh=w,T.railh.drag=!1),T.ispage)u.css({position:"fixed",top:0,height:"100%"}),u.css(u.align?{right:0}:{left:0}),T.body.append(u),T.railh&&(w.css({position:"fixed",left:0,width:"100%"}),w.css(w.align?{bottom:0}:{top:0}),T.body.append(w));else{if(T.ishwscroll){"static"==T.win.css("position")&&T.css(T.win,{position:"relative"});var x="HTML"==T.win[0].nodeName?T.body:T.win;n(x).scrollTop(0).scrollLeft(0),T.zoom&&(T.zoom.css({position:"absolute",top:1,right:0,"margin-right":u.width+4}),x.append(T.zoom)),u.css({position:"absolute",top:0}),u.css(u.align?{right:0}:{left:0}),x.append(u),w&&(w.css({position:"absolute",left:0,bottom:0}),w.css(w.align?{bottom:0}:{top:0}),x.append(w))}else{T.isfixed="fixed"==T.win.css("position");var S=T.isfixed?"fixed":"absolute";T.isfixed||(T.viewport=T.getViewport(T.win[0])),T.viewport&&(T.body=T.viewport,/fixed|absolute/.test(T.viewport.css("position"))||T.css(T.viewport,{position:"relative"})),u.css({position:S}),T.zoom&&T.zoom.css({position:S}),T.updateScrollBar(),T.body.append(u),T.zoom&&T.body.append(T.zoom),T.railh&&(w.css({position:S}),T.body.append(w))}P.isios&&T.css(T.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),M.disableoutline&&(P.isie&&T.win.attr("hideFocus","true"),P.iswebkit&&T.win.css("outline","none"))}if(!1===M.autohidemode?(T.autohidedom=!1,T.rail.css({opacity:M.cursoropacitymax}),T.railh&&T.railh.css({opacity:M.cursoropacitymax})):!0===M.autohidemode||"leave"===M.autohidemode?(T.autohidedom=n().add(T.rail),P.isie8&&(T.autohidedom=T.autohidedom.add(T.cursor)),T.railh&&(T.autohidedom=T.autohidedom.add(T.railh)),T.railh&&P.isie8&&(T.autohidedom=T.autohidedom.add(T.cursorh))):"scroll"==M.autohidemode?(T.autohidedom=n().add(T.rail),T.railh&&(T.autohidedom=T.autohidedom.add(T.railh))):"cursor"==M.autohidemode?(T.autohidedom=n().add(T.cursor),T.railh&&(T.autohidedom=T.autohidedom.add(T.cursorh))):"hidden"==M.autohidemode&&(T.autohidedom=!1,T.hide(),T.railslocked=!1),P.cantouch||T.istouchcapable||M.emulatetouch||P.hasmstouch){T.scrollmom=new y(T);T.ontouchstart=function(e){if(T.locked)return!1;if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!1;if(T.hasmoving=!1,T.scrollmom.timer&&(T.triggerScrollEnd(),T.scrollmom.stop()),!T.railslocked){var o=T.getTarget(e);if(o&&/INPUT/i.test(o.nodeName)&&/range/i.test(o.type))return T.stopPropagation(e);var t="mousedown"===e.type;if(!("clientX"in e)&&"changedTouches"in e&&(e.clientX=e.changedTouches[0].clientX,e.clientY=e.changedTouches[0].clientY),T.forcescreen){var r=e;(e={original:e.original?e.original:e}).clientX=r.screenX,e.clientY=r.screenY}if(T.rail.drag={x:e.clientX,y:e.clientY,sx:T.scroll.x,sy:T.scroll.y,st:T.getScrollTop(),sl:T.getScrollLeft(),pt:2,dl:!1,tg:o},T.ispage||!M.directionlockdeadzone)T.rail.drag.dl="f";else{var i={w:c.width(),h:c.height()},s=T.getContentSize(),l=s.h-i.h,a=s.w-i.w;T.rail.scrollable&&!T.railh.scrollable?T.rail.drag.ck=l>0&&"v":!T.rail.scrollable&&T.railh.scrollable?T.rail.drag.ck=a>0&&"h":T.rail.drag.ck=!1}if(M.emulatetouch&&T.isiframe&&P.isie){var d=T.win.position();T.rail.drag.x+=d.left,T.rail.drag.y+=d.top}if(T.hasmoving=!1,T.lastmouseup=!1,T.scrollmom.reset(e.clientX,e.clientY),o&&t){if(!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))return P.hasmousecapture&&o.setCapture(),M.emulatetouch?(o.onclick&&!o._onclick&&(o._onclick=o.onclick,o.onclick=function(e){if(T.hasmoving)return!1;o._onclick.call(this,e)}),T.cancelEvent(e)):T.stopPropagation(e);/SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type"))&&(T.preventclick={tg:o,click:!1})}}},T.ontouchend=function(e){if(!T.rail.drag)return!0;if(2==T.rail.drag.pt){if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!1;T.rail.drag=!1;var o="mouseup"===e.type;if(T.hasmoving&&(T.scrollmom.doMomentum(),T.lastmouseup=!0,T.hideCursor(),P.hasmousecapture&&l.releaseCapture(),o))return T.cancelEvent(e)}else if(1==T.rail.drag.pt)return T.onmouseup(e)};var z=M.emulatetouch&&T.isiframe&&!P.hasmousecapture,k=.3*M.directionlockdeadzone|0;T.ontouchmove=function(e,o){if(!T.rail.drag)return!0;if(e.targetTouches&&M.preventmultitouchscrolling&&e.targetTouches.length>1)return!0;if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!0;if(2==T.rail.drag.pt){"changedTouches"in e&&(e.clientX=e.changedTouches[0].clientX,e.clientY=e.changedTouches[0].clientY);var t,r;if(r=t=0,z&&!o){var i=T.win.position();r=-i.left,t=-i.top}var s=e.clientY+t,n=s-T.rail.drag.y,a=e.clientX+r,c=a-T.rail.drag.x,d=T.rail.drag.st-n;if(T.ishwscroll&&M.bouncescroll)d<0?d=Math.round(d/2):d>T.page.maxh&&(d=T.page.maxh+Math.round((d-T.page.maxh)/2));else if(d<0?(d=0,s=0):d>T.page.maxh&&(d=T.page.maxh,s=0),0===s&&!T.hasmoving)return T.ispage||(T.rail.drag=!1),!0;var u=T.getScrollLeft();if(T.railh&&T.railh.scrollable&&(u=T.isrtlmode?c-T.rail.drag.sl:T.rail.drag.sl-c,T.ishwscroll&&M.bouncescroll?u<0?u=Math.round(u/2):u>T.page.maxw&&(u=T.page.maxw+Math.round((u-T.page.maxw)/2)):(u<0&&(u=0,a=0),u>T.page.maxw&&(u=T.page.maxw,a=0))),!T.hasmoving){if(T.rail.drag.y===e.clientY&&T.rail.drag.x===e.clientX)return T.cancelEvent(e);var h=Math.abs(n),p=Math.abs(c),m=M.directionlockdeadzone;if(T.rail.drag.ck?"v"==T.rail.drag.ck?p>m&&h<=k?T.rail.drag=!1:h>m&&(T.rail.drag.dl="v"):"h"==T.rail.drag.ck&&(h>m&&p<=k?T.rail.drag=!1:p>m&&(T.rail.drag.dl="h")):h>m&&p>m?T.rail.drag.dl="f":h>m?T.rail.drag.dl=p>k?"f":"v":p>m&&(T.rail.drag.dl=h>k?"f":"h"),!T.rail.drag.dl)return T.cancelEvent(e);T.triggerScrollStart(e.clientX,e.clientY,0,0,0),T.hasmoving=!0}return T.preventclick&&!T.preventclick.click&&(T.preventclick.click=T.preventclick.tg.onclick||!1,T.preventclick.tg.onclick=T.onpreventclick),T.rail.drag.dl&&("v"==T.rail.drag.dl?u=T.rail.drag.sl:"h"==T.rail.drag.dl&&(d=T.rail.drag.st)),T.synched("touchmove",function(){T.rail.drag&&2==T.rail.drag.pt&&(T.prepareTransition&&T.resetTransition(),T.rail.scrollable&&T.setScrollTop(d),T.scrollmom.update(a,s),T.railh&&T.railh.scrollable?(T.setScrollLeft(u),T.showCursor(d,u)):T.showCursor(d),P.isie10&&l.selection.clear())}),T.cancelEvent(e)}return 1==T.rail.drag.pt?T.onmousemove(e):void 0},T.ontouchstartCursor=function(e,o){if(!T.rail.drag||3==T.rail.drag.pt){if(T.locked)return T.cancelEvent(e);T.cancelScroll(),T.rail.drag={x:e.touches[0].clientX,y:e.touches[0].clientY,sx:T.scroll.x,sy:T.scroll.y,pt:3,hr:!!o};var t=T.getTarget(e);return!T.ispage&&P.hasmousecapture&&t.setCapture(),T.isiframe&&!P.hasmousecapture&&(T.saved.csspointerevents=T.doc.css("pointer-events"),T.css(T.doc,{"pointer-events":"none"})),T.cancelEvent(e)}},T.ontouchendCursor=function(e){if(T.rail.drag){if(P.hasmousecapture&&l.releaseCapture(),T.isiframe&&!P.hasmousecapture&&T.doc.css("pointer-events",T.saved.csspointerevents),3!=T.rail.drag.pt)return;return T.rail.drag=!1,T.cancelEvent(e)}},T.ontouchmoveCursor=function(e){if(T.rail.drag){if(3!=T.rail.drag.pt)return;if(T.cursorfreezed=!0,T.rail.drag.hr){T.scroll.x=T.rail.drag.sx+(e.touches[0].clientX-T.rail.drag.x),T.scroll.x<0&&(T.scroll.x=0);var o=T.scrollvaluemaxw;T.scroll.x>o&&(T.scroll.x=o)}else{T.scroll.y=T.rail.drag.sy+(e.touches[0].clientY-T.rail.drag.y),T.scroll.y<0&&(T.scroll.y=0);var t=T.scrollvaluemax;T.scroll.y>t&&(T.scroll.y=t)}return T.synched("touchmove",function(){T.rail.drag&&3==T.rail.drag.pt&&(T.showCursor(),T.rail.drag.hr?T.doScrollLeft(Math.round(T.scroll.x*T.scrollratio.x),M.cursordragspeed):T.doScrollTop(Math.round(T.scroll.y*T.scrollratio.y),M.cursordragspeed))}),T.cancelEvent(e)}}}if(T.onmousedown=function(e,o){if(!T.rail.drag||1==T.rail.drag.pt){if(T.railslocked)return T.cancelEvent(e);T.cancelScroll(),T.rail.drag={x:e.clientX,y:e.clientY,sx:T.scroll.x,sy:T.scroll.y,pt:1,hr:o||!1};var t=T.getTarget(e);return P.hasmousecapture&&t.setCapture(),T.isiframe&&!P.hasmousecapture&&(T.saved.csspointerevents=T.doc.css("pointer-events"),T.css(T.doc,{"pointer-events":"none"})),T.hasmoving=!1,T.cancelEvent(e)}},T.onmouseup=function(e){if(T.rail.drag)return 1!=T.rail.drag.pt||(P.hasmousecapture&&l.releaseCapture(),T.isiframe&&!P.hasmousecapture&&T.doc.css("pointer-events",T.saved.csspointerevents),T.rail.drag=!1,T.cursorfreezed=!1,T.hasmoving&&T.triggerScrollEnd(),T.cancelEvent(e))},T.onmousemove=function(e){if(T.rail.drag){if(1!==T.rail.drag.pt)return;if(P.ischrome&&0===e.which)return T.onmouseup(e);if(T.cursorfreezed=!0,T.hasmoving||T.triggerScrollStart(e.clientX,e.clientY,0,0,0),T.hasmoving=!0,T.rail.drag.hr){T.scroll.x=T.rail.drag.sx+(e.clientX-T.rail.drag.x),T.scroll.x<0&&(T.scroll.x=0);var o=T.scrollvaluemaxw;T.scroll.x>o&&(T.scroll.x=o)}else{T.scroll.y=T.rail.drag.sy+(e.clientY-T.rail.drag.y),T.scroll.y<0&&(T.scroll.y=0);var t=T.scrollvaluemax;T.scroll.y>t&&(T.scroll.y=t)}return T.synched("mousemove",function(){T.cursorfreezed&&(T.showCursor(),T.rail.drag.hr?T.scrollLeft(Math.round(T.scroll.x*T.scrollratio.x)):T.scrollTop(Math.round(T.scroll.y*T.scrollratio.y)))}),T.cancelEvent(e)}T.checkarea=0},P.cantouch||M.emulatetouch)T.onpreventclick=function(e){if(T.preventclick)return T.preventclick.tg.onclick=T.preventclick.click,T.preventclick=!1,T.cancelEvent(e)},T.onclick=!P.isios&&function(e){return!T.lastmouseup||(T.lastmouseup=!1,T.cancelEvent(e))},M.grabcursorenabled&&P.cursorgrabvalue&&(T.css(T.ispage?T.doc:T.win,{cursor:P.cursorgrabvalue}),T.css(T.rail,{cursor:P.cursorgrabvalue}));else{var L=function(e){if(T.selectiondrag){if(e){var o=T.win.outerHeight(),t=e.pageY-T.selectiondrag.top;t>0&&t<o&&(t=0),t>=o&&(t-=o),T.selectiondrag.df=t}if(0!==T.selectiondrag.df){var r=-2*T.selectiondrag.df/6|0;T.doScrollBy(r),T.debounced("doselectionscroll",function(){L()},50)}}};T.hasTextSelected="getSelection"in l?function(){return l.getSelection().rangeCount>0}:"selection"in l?function(){return"None"!=l.selection.type}:function(){return!1},T.onselectionstart=function(e){T.ispage||(T.selectiondrag=T.win.offset())},T.onselectionend=function(e){T.selectiondrag=!1},T.onselectiondrag=function(e){T.selectiondrag&&T.hasTextSelected()&&T.debounced("selectionscroll",function(){L(e)},250)}}if(P.hasw3ctouch?(T.css(T.ispage?n("html"):T.win,{"touch-action":"none"}),T.css(T.rail,{"touch-action":"none"}),T.css(T.cursor,{"touch-action":"none"}),T.bind(T.win,"pointerdown",T.ontouchstart),T.bind(l,"pointerup",T.ontouchend),T.delegate(l,"pointermove",T.ontouchmove)):P.hasmstouch?(T.css(T.ispage?n("html"):T.win,{"-ms-touch-action":"none"}),T.css(T.rail,{"-ms-touch-action":"none"}),T.css(T.cursor,{"-ms-touch-action":"none"}),T.bind(T.win,"MSPointerDown",T.ontouchstart),T.bind(l,"MSPointerUp",T.ontouchend),T.delegate(l,"MSPointerMove",T.ontouchmove),T.bind(T.cursor,"MSGestureHold",function(e){e.preventDefault()}),T.bind(T.cursor,"contextmenu",function(e){e.preventDefault()})):P.cantouch&&(T.bind(T.win,"touchstart",T.ontouchstart,!1,!0),T.bind(l,"touchend",T.ontouchend,!1,!0),T.bind(l,"touchcancel",T.ontouchend,!1,!0),T.delegate(l,"touchmove",T.ontouchmove,!1,!0)),M.emulatetouch&&(T.bind(T.win,"mousedown",T.ontouchstart,!1,!0),T.bind(l,"mouseup",T.ontouchend,!1,!0),T.bind(l,"mousemove",T.ontouchmove,!1,!0)),(M.cursordragontouch||!P.cantouch&&!M.emulatetouch)&&(T.rail.css({cursor:"default"}),T.railh&&T.railh.css({cursor:"default"}),T.jqbind(T.rail,"mouseenter",function(){if(!T.ispage&&!T.win.is(":visible"))return!1;T.canshowonmouseevent&&T.showCursor(),T.rail.active=!0}),T.jqbind(T.rail,"mouseleave",function(){T.rail.active=!1,T.rail.drag||T.hideCursor()}),M.sensitiverail&&(T.bind(T.rail,"click",function(e){T.doRailClick(e,!1,!1)}),T.bind(T.rail,"dblclick",function(e){T.doRailClick(e,!0,!1)}),T.bind(T.cursor,"click",function(e){T.cancelEvent(e)}),T.bind(T.cursor,"dblclick",function(e){T.cancelEvent(e)})),T.railh&&(T.jqbind(T.railh,"mouseenter",function(){if(!T.ispage&&!T.win.is(":visible"))return!1;T.canshowonmouseevent&&T.showCursor(),T.rail.active=!0}),T.jqbind(T.railh,"mouseleave",function(){T.rail.active=!1,T.rail.drag||T.hideCursor()}),M.sensitiverail&&(T.bind(T.railh,"click",function(e){T.doRailClick(e,!1,!0)}),T.bind(T.railh,"dblclick",function(e){T.doRailClick(e,!0,!0)}),T.bind(T.cursorh,"click",function(e){T.cancelEvent(e)}),T.bind(T.cursorh,"dblclick",function(e){T.cancelEvent(e)})))),M.cursordragontouch&&(this.istouchcapable||P.cantouch)&&(T.bind(T.cursor,"touchstart",T.ontouchstartCursor),T.bind(T.cursor,"touchmove",T.ontouchmoveCursor),T.bind(T.cursor,"touchend",T.ontouchendCursor),T.cursorh&&T.bind(T.cursorh,"touchstart",function(e){T.ontouchstartCursor(e,!0)}),T.cursorh&&T.bind(T.cursorh,"touchmove",T.ontouchmoveCursor),T.cursorh&&T.bind(T.cursorh,"touchend",T.ontouchendCursor)),M.emulatetouch||P.isandroid||P.isios?(T.bind(P.hasmousecapture?T.win:l,"mouseup",T.ontouchend),T.onclick&&T.bind(l,"click",T.onclick),M.cursordragontouch?(T.bind(T.cursor,"mousedown",T.onmousedown),T.bind(T.cursor,"mouseup",T.onmouseup),T.cursorh&&T.bind(T.cursorh,"mousedown",function(e){T.onmousedown(e,!0)}),T.cursorh&&T.bind(T.cursorh,"mouseup",T.onmouseup)):(T.bind(T.rail,"mousedown",function(e){e.preventDefault()}),T.railh&&T.bind(T.railh,"mousedown",function(e){e.preventDefault()}))):(T.bind(P.hasmousecapture?T.win:l,"mouseup",T.onmouseup),T.bind(l,"mousemove",T.onmousemove),T.onclick&&T.bind(l,"click",T.onclick),T.bind(T.cursor,"mousedown",T.onmousedown),T.bind(T.cursor,"mouseup",T.onmouseup),T.railh&&(T.bind(T.cursorh,"mousedown",function(e){T.onmousedown(e,!0)}),T.bind(T.cursorh,"mouseup",T.onmouseup)),!T.ispage&&M.enablescrollonselection&&(T.bind(T.win[0],"mousedown",T.onselectionstart),T.bind(l,"mouseup",T.onselectionend),T.bind(T.cursor,"mouseup",T.onselectionend),T.cursorh&&T.bind(T.cursorh,"mouseup",T.onselectionend),T.bind(l,"mousemove",T.onselectiondrag)),T.zoom&&(T.jqbind(T.zoom,"mouseenter",function(){T.canshowonmouseevent&&T.showCursor(),T.rail.active=!0}),T.jqbind(T.zoom,"mouseleave",function(){T.rail.active=!1,T.rail.drag||T.hideCursor()}))),M.enablemousewheel&&(T.isiframe||T.mousewheel(P.isie&&T.ispage?l:T.win,T.onmousewheel),T.mousewheel(T.rail,T.onmousewheel),T.railh&&T.mousewheel(T.railh,T.onmousewheelhr)),T.ispage||P.cantouch||/HTML|^BODY/.test(T.win[0].nodeName)||(T.win.attr("tabindex")||T.win.attr({tabindex:++r}),T.bind(T.win,"focus",function(e){o=T.getTarget(e).id||T.getTarget(e)||!1,T.hasfocus=!0,T.canshowonmouseevent&&T.noticeCursor()}),T.bind(T.win,"blur",function(e){o=!1,T.hasfocus=!1}),T.bind(T.win,"mouseenter",function(e){t=T.getTarget(e).id||T.getTarget(e)||!1,T.hasmousefocus=!0,T.canshowonmouseevent&&T.noticeCursor()}),T.bind(T.win,"mouseleave",function(e){t=!1,T.hasmousefocus=!1,T.rail.drag||T.hideCursor()})),T.onkeypress=function(e){if(T.railslocked&&0===T.page.maxh)return!0;e=e||a.event;var r=T.getTarget(e);if(r&&/INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName)&&(!(r.getAttribute("type")||r.type||!1)||!/submit|button|cancel/i.tp))return!0;if(n(r).attr("contenteditable"))return!0;if(T.hasfocus||T.hasmousefocus&&!o||T.ispage&&!o&&!t){var i=e.keyCode;if(T.railslocked&&27!=i)return T.cancelEvent(e);var s=e.ctrlKey||!1,l=e.shiftKey||!1,c=!1;switch(i){case 38:case 63233:T.doScrollBy(72),c=!0;break;case 40:case 63235:T.doScrollBy(-72),c=!0;break;case 37:case 63232:T.railh&&(s?T.doScrollLeft(0):T.doScrollLeftBy(72),c=!0);break;case 39:case 63234:T.railh&&(s?T.doScrollLeft(T.page.maxw):T.doScrollLeftBy(-72),c=!0);break;case 33:case 63276:T.doScrollBy(T.view.h),c=!0;break;case 34:case 63277:T.doScrollBy(-T.view.h),c=!0;break;case 36:case 63273:T.railh&&s?T.doScrollPos(0,0):T.doScrollTo(0),c=!0;break;case 35:case 63275:T.railh&&s?T.doScrollPos(T.page.maxw,T.page.maxh):T.doScrollTo(T.page.maxh),c=!0;break;case 32:M.spacebarenabled&&(l?T.doScrollBy(T.view.h):T.doScrollBy(-T.view.h),c=!0);break;case 27:T.zoomactive&&(T.doZoom(),c=!0)}if(c)return T.cancelEvent(e)}},M.enablekeyboard&&T.bind(l,P.isopera&&!P.isopera12?"keypress":"keydown",T.onkeypress),T.bind(l,"keydown",function(e){(e.ctrlKey||!1)&&(T.wheelprevented=!0)}),T.bind(l,"keyup",function(e){e.ctrlKey||!1||(T.wheelprevented=!1)}),T.bind(a,"blur",function(e){T.wheelprevented=!1}),T.bind(a,"resize",T.onscreenresize),T.bind(a,"orientationchange",T.onscreenresize),T.bind(a,"load",T.lazyResize),P.ischrome&&!T.ispage&&!T.haswrapper){var C=T.win.attr("style"),N=parseFloat(T.win.css("width"))+1;T.win.css("width",N),T.synched("chromefix",function(){T.win.attr("style",C)})}if(T.onAttributeChange=function(e){T.lazyResize(T.isieold?250:30)},M.enableobserver&&(T.isie11||!1===m||(T.observerbody=new m(function(e){if(e.forEach(function(e){if("attributes"==e.type)return E.hasClass("modal-open")&&E.hasClass("modal-dialog")&&!n.contains(n(".modal-dialog")[0],T.doc[0])?T.hide():T.show()}),T.me.clientWidth!=T.page.width||T.me.clientHeight!=T.page.height)return T.lazyResize(30)}),T.observerbody.observe(l.body,{childList:!0,subtree:!0,characterData:!1,attributes:!0,attributeFilter:["class"]})),!T.ispage&&!T.haswrapper)){var R=T.win[0];!1!==m?(T.observer=new m(function(e){e.forEach(T.onAttributeChange)}),T.observer.observe(R,{childList:!0,characterData:!1,attributes:!0,subtree:!1}),T.observerremover=new m(function(e){e.forEach(function(e){if(e.removedNodes.length>0)for(var o in e.removedNodes)if(T&&e.removedNodes[o]===R)return T.remove()})}),T.observerremover.observe(R.parentNode,{childList:!0,characterData:!1,attributes:!1,subtree:!1})):(T.bind(R,P.isie&&!P.isie9?"propertychange":"DOMAttrModified",T.onAttributeChange),P.isie9&&R.attachEvent("onpropertychange",T.onAttributeChange),T.bind(R,"DOMNodeRemoved",function(e){e.target===R&&T.remove()}))}!T.ispage&&M.boxzoom&&T.bind(a,"resize",T.resizeZoom),T.istextarea&&(T.bind(T.win,"keydown",T.lazyResize),T.bind(T.win,"mouseup",T.lazyResize)),T.lazyResize(30)}if("IFRAME"==this.doc[0].nodeName){var _=function(){T.iframexd=!1;var o;try{(o="contentDocument"in this?this.contentDocument:this.contentWindow._doc).domain}catch(e){T.iframexd=!0,o=!1}if(T.iframexd)return"console"in a&&console.log("NiceScroll error: policy restriced iframe"),!0;if(T.forcescreen=!0,T.isiframe&&(T.iframe={doc:n(o),html:T.doc.contents().find("html")[0],body:T.doc.contents().find("body")[0]},T.getContentSize=function(){return{w:Math.max(T.iframe.html.scrollWidth,T.iframe.body.scrollWidth),h:Math.max(T.iframe.html.scrollHeight,T.iframe.body.scrollHeight)}},T.docscroll=n(T.iframe.body)),!P.isios&&M.iframeautoresize&&!T.isiframe){T.win.scrollTop(0),T.doc.height("");var t=Math.max(o.getElementsByTagName("html")[0].scrollHeight,o.body.scrollHeight);T.doc.height(t)}T.lazyResize(30),T.css(n(T.iframe.body),e),P.isios&&T.haswrapper&&T.css(n(o.body),{"-webkit-transform":"translate3d(0,0,0)"}),"contentWindow"in this?T.bind(this.contentWindow,"scroll",T.onscroll):T.bind(o,"scroll",T.onscroll),M.enablemousewheel&&T.mousewheel(o,T.onmousewheel),M.enablekeyboard&&T.bind(o,P.isopera?"keypress":"keydown",T.onkeypress),P.cantouch?(T.bind(o,"touchstart",T.ontouchstart),T.bind(o,"touchmove",T.ontouchmove)):M.emulatetouch&&(T.bind(o,"mousedown",T.ontouchstart),T.bind(o,"mousemove",function(e){return T.ontouchmove(e,!0)}),M.grabcursorenabled&&P.cursorgrabvalue&&T.css(n(o.body),{cursor:P.cursorgrabvalue})),T.bind(o,"mouseup",T.ontouchend),T.zoom&&(M.dblclickzoom&&T.bind(o,"dblclick",T.doZoom),T.ongesturezoom&&T.bind(o,"gestureend",T.ongesturezoom))};this.doc[0].readyState&&"complete"===this.doc[0].readyState&&setTimeout(function(){_.call(T.doc[0],!1)},500),T.bind(this.doc,"load",_)}},this.showCursor=function(e,o){if(T.cursortimeout&&(clearTimeout(T.cursortimeout),T.cursortimeout=0),T.rail){if(T.autohidedom&&(T.autohidedom.stop().css({opacity:M.cursoropacitymax}),T.cursoractive=!0),T.rail.drag&&1==T.rail.drag.pt||(void 0!==e&&!1!==e&&(T.scroll.y=e/T.scrollratio.y|0),void 0!==o&&(T.scroll.x=o/T.scrollratio.x|0)),T.cursor.css({height:T.cursorheight,top:T.scroll.y}),T.cursorh){var t=T.hasreversehr?T.scrollvaluemaxw-T.scroll.x:T.scroll.x;T.cursorh.css({width:T.cursorwidth,left:!T.rail.align&&T.rail.visibility?t+T.rail.width:t}),T.cursoractive=!0}T.zoom&&T.zoom.stop().css({opacity:M.cursoropacitymax})}},this.hideCursor=function(e){T.cursortimeout||T.rail&&T.autohidedom&&(T.hasmousefocus&&"leave"===M.autohidemode||(T.cursortimeout=setTimeout(function(){T.rail.active&&T.showonmouseevent||(T.autohidedom.stop().animate({opacity:M.cursoropacitymin}),T.zoom&&T.zoom.stop().animate({opacity:M.cursoropacitymin}),T.cursoractive=!1),T.cursortimeout=0},e||M.hidecursordelay)))},this.noticeCursor=function(e,o,t){T.showCursor(o,t),T.rail.active||T.hideCursor(e)},this.getContentSize=T.ispage?function(){return{w:Math.max(l.body.scrollWidth,l.documentElement.scrollWidth),h:Math.max(l.body.scrollHeight,l.documentElement.scrollHeight)}}:T.haswrapper?function(){return{w:T.doc[0].offsetWidth,h:T.doc[0].offsetHeight}}:function(){return{w:T.docscroll[0].scrollWidth,h:T.docscroll[0].scrollHeight}},this.onResize=function(e,o){if(!T||!T.win)return!1;var t=T.page.maxh,r=T.page.maxw,i=T.view.h,s=T.view.w;if(T.view={w:T.ispage?T.win.width():T.win[0].clientWidth,h:T.ispage?T.win.height():T.win[0].clientHeight},T.page=o||T.getContentSize(),T.page.maxh=Math.max(0,T.page.h-T.view.h),T.page.maxw=Math.max(0,T.page.w-T.view.w),T.page.maxh==t&&T.page.maxw==r&&T.view.w==s&&T.view.h==i){if(T.ispage)return T;var n=T.win.offset();if(T.lastposition){var l=T.lastposition;if(l.top==n.top&&l.left==n.left)return T}T.lastposition=n}return 0===T.page.maxh?(T.hideRail(),T.scrollvaluemax=0,T.scroll.y=0,T.scrollratio.y=0,T.cursorheight=0,T.setScrollTop(0),T.rail&&(T.rail.scrollable=!1)):(T.page.maxh-=M.railpadding.top+M.railpadding.bottom,T.rail.scrollable=!0),0===T.page.maxw?(T.hideRailHr(),T.scrollvaluemaxw=0,T.scroll.x=0,T.scrollratio.x=0,T.cursorwidth=0,T.setScrollLeft(0),T.railh&&(T.railh.scrollable=!1)):(T.page.maxw-=M.railpadding.left+M.railpadding.right,T.railh&&(T.railh.scrollable=M.horizrailenabled)),T.railslocked=T.locked||0===T.page.maxh&&0===T.page.maxw,T.railslocked?(T.ispage||T.updateScrollBar(T.view),!1):(T.hidden||(T.rail.visibility||T.showRail(),T.railh&&!T.railh.visibility&&T.showRailHr()),T.istextarea&&T.win.css("resize")&&"none"!=T.win.css("resize")&&(T.view.h-=20),T.cursorheight=Math.min(T.view.h,Math.round(T.view.h*(T.view.h/T.page.h))),T.cursorheight=M.cursorfixedheight?M.cursorfixedheight:Math.max(M.cursorminheight,T.cursorheight),T.cursorwidth=Math.min(T.view.w,Math.round(T.view.w*(T.view.w/T.page.w))),T.cursorwidth=M.cursorfixedheight?M.cursorfixedheight:Math.max(M.cursorminheight,T.cursorwidth),T.scrollvaluemax=T.view.h-T.cursorheight-(M.railpadding.top+M.railpadding.bottom),T.hasborderbox||(T.scrollvaluemax-=T.cursor[0].offsetHeight-T.cursor[0].clientHeight),T.railh&&(T.railh.width=T.page.maxh>0?T.view.w-T.rail.width:T.view.w,T.scrollvaluemaxw=T.railh.width-T.cursorwidth-(M.railpadding.left+M.railpadding.right)),T.ispage||T.updateScrollBar(T.view),T.scrollratio={x:T.page.maxw/T.scrollvaluemaxw,y:T.page.maxh/T.scrollvaluemax},T.getScrollTop()>T.page.maxh?T.doScrollTop(T.page.maxh):(T.scroll.y=T.getScrollTop()/T.scrollratio.y|0,T.scroll.x=T.getScrollLeft()/T.scrollratio.x|0,T.cursoractive&&T.noticeCursor()),T.scroll.y&&0===T.getScrollTop()&&T.doScrollTo(T.scroll.y*T.scrollratio.y|0),T)},this.resize=T.onResize;var O=0;this.onscreenresize=function(e){clearTimeout(O);var o=!T.ispage&&!T.haswrapper;o&&T.hideRails(),O=setTimeout(function(){T&&(o&&T.showRails(),T.resize()),O=0},120)},this.lazyResize=function(e){return clearTimeout(O),e=isNaN(e)?240:e,O=setTimeout(function(){T&&T.resize(),O=0},e),T},this.jqbind=function(e,o,t){T.events.push({e:e,n:o,f:t,q:!0}),n(e).on(o,t)},this.mousewheel=function(e,o,t){var r="jquery"in e?e[0]:e;if("onwheel"in l.createElement("div"))T._bind(r,"wheel",o,t||!1);else{var i=void 0!==l.onmousewheel?"mousewheel":"DOMMouseScroll";S(r,i,o,t||!1),"DOMMouseScroll"==i&&S(r,"MozMousePixelScroll",o,t||!1)}};var Y=!1;if(P.haseventlistener){try{var H=Object.defineProperty({},"passive",{get:function(){Y=!0}});a.addEventListener("test",null,H)}catch(e){}this.stopPropagation=function(e){return!!e&&((e=e.original?e.original:e).stopPropagation(),!1)},this.cancelEvent=function(e){return e.cancelable&&e.preventDefault(),e.stopImmediatePropagation(),e.preventManipulation&&e.preventManipulation(),!1}}else Event.prototype.preventDefault=function(){this.returnValue=!1},Event.prototype.stopPropagation=function(){this.cancelBubble=!0},a.constructor.prototype.addEventListener=l.constructor.prototype.addEventListener=Element.prototype.addEventListener=function(e,o,t){this.attachEvent("on"+e,o)},a.constructor.prototype.removeEventListener=l.constructor.prototype.removeEventListener=Element.prototype.removeEventListener=function(e,o,t){this.detachEvent("on"+e,o)},this.cancelEvent=function(e){return(e=e||a.event)&&(e.cancelBubble=!0,e.cancel=!0,e.returnValue=!1),!1},this.stopPropagation=function(e){return(e=e||a.event)&&(e.cancelBubble=!0),!1};this.delegate=function(e,o,t,r,i){var s=d[o]||!1;s||(s={a:[],l:[],f:function(e){for(var o=s.l,t=!1,r=o.length-1;r>=0;r--)if(!1===(t=o[r].call(e.target,e)))return!1;return t}},T.bind(e,o,s.f,r,i),d[o]=s),T.ispage?(s.a=[T.id].concat(s.a),s.l=[t].concat(s.l)):(s.a.push(T.id),s.l.push(t))},this.undelegate=function(e,o,t,r,i){var s=d[o]||!1;if(s)for(var n=0,l=s.l.length;n<l;n++)s.a[n]===T.id&&(s.a.splice(n),s.l.splice(n),0===s.a.length&&(T._unbind(e,o,s.l.f),d[o]=null))},this.bind=function(e,o,t,r,i){var s="jquery"in e?e[0]:e;T._bind(s,o,t,r||!1,i||!1)},this._bind=function(e,o,t,r,i){T.events.push({e:e,n:o,f:t,b:r,q:!1}),Y&&i?e.addEventListener(o,t,{passive:!1,capture:r}):e.addEventListener(o,t,r||!1)},this._unbind=function(e,o,t,r){d[o]?T.undelegate(e,o,t,r):e.removeEventListener(o,t,r)},this.unbindAll=function(){for(var e=0;e<T.events.length;e++){var o=T.events[e];o.q?o.e.unbind(o.n,o.f):T._unbind(o.e,o.n,o.f,o.b)}},this.showRails=function(){return T.showRail().showRailHr()},this.showRail=function(){return 0===T.page.maxh||!T.ispage&&"none"==T.win.css("display")||(T.rail.visibility=!0,T.rail.css("display","block")),T},this.showRailHr=function(){return T.railh&&(0===T.page.maxw||!T.ispage&&"none"==T.win.css("display")||(T.railh.visibility=!0,T.railh.css("display","block"))),T},this.hideRails=function(){return T.hideRail().hideRailHr()},this.hideRail=function(){return T.rail.visibility=!1,T.rail.css("display","none"),T},this.hideRailHr=function(){return T.railh&&(T.railh.visibility=!1,T.railh.css("display","none")),T},this.show=function(){return T.hidden=!1,T.railslocked=!1,T.showRails()},this.hide=function(){return T.hidden=!0,T.railslocked=!0,T.hideRails()},this.toggle=function(){return T.hidden?T.show():T.hide()},this.remove=function(){T.stop(),T.cursortimeout&&clearTimeout(T.cursortimeout);for(var e in T.delaylist)T.delaylist[e]&&h(T.delaylist[e].h);T.doZoomOut(),T.unbindAll(),P.isie9&&T.win[0].detachEvent("onpropertychange",T.onAttributeChange),!1!==T.observer&&T.observer.disconnect(),!1!==T.observerremover&&T.observerremover.disconnect(),!1!==T.observerbody&&T.observerbody.disconnect(),T.events=null,T.cursor&&T.cursor.remove(),T.cursorh&&T.cursorh.remove(),T.rail&&T.rail.remove(),T.railh&&T.railh.remove(),T.zoom&&T.zoom.remove();for(var o=0;o<T.saved.css.length;o++){var t=T.saved.css[o];t[0].css(t[1],void 0===t[2]?"":t[2])}T.saved=!1,T.me.data("__nicescroll","");var r=n.nicescroll;r.each(function(e){if(this&&this.id===T.id){delete r[e];for(var o=++e;o<r.length;o++,e++)r[e]=r[o];--r.length&&delete r[r.length]}});for(var i in T)T[i]=null,delete T[i];T=null},this.scrollstart=function(e){return this.onscrollstart=e,T},this.scrollend=function(e){return this.onscrollend=e,T},this.scrollcancel=function(e){return this.onscrollcancel=e,T},this.zoomin=function(e){return this.onzoomin=e,T},this.zoomout=function(e){return this.onzoomout=e,T},this.isScrollable=function(e){var o=e.target?e.target:e;if("OPTION"==o.nodeName)return!0;for(;o&&1==o.nodeType&&o!==this.me[0]&&!/^BODY|HTML/.test(o.nodeName);){var t=n(o),r=t.css("overflowY")||t.css("overflowX")||t.css("overflow")||"";if(/scroll|auto/.test(r))return o.clientHeight!=o.scrollHeight;o=!!o.parentNode&&o.parentNode}return!1},this.getViewport=function(e){for(var o=!(!e||!e.parentNode)&&e.parentNode;o&&1==o.nodeType&&!/^BODY|HTML/.test(o.nodeName);){var t=n(o);if(/fixed|absolute/.test(t.css("position")))return t;var r=t.css("overflowY")||t.css("overflowX")||t.css("overflow")||"";if(/scroll|auto/.test(r)&&o.clientHeight!=o.scrollHeight)return t;if(t.getNiceScroll().length>0)return t;o=!!o.parentNode&&o.parentNode}return!1},this.triggerScrollStart=function(e,o,t,r,i){if(T.onscrollstart){var s={type:"scrollstart",current:{x:e,y:o},request:{x:t,y:r},end:{x:T.newscrollx,y:T.newscrolly},speed:i};T.onscrollstart.call(T,s)}},this.triggerScrollEnd=function(){if(T.onscrollend){var e=T.getScrollLeft(),o=T.getScrollTop(),t={type:"scrollend",current:{x:e,y:o},end:{x:e,y:o}};T.onscrollend.call(T,t)}};var B=0,X=0,D=0,A=1,q=!1;if(this.onmousewheel=function(e){if(T.wheelprevented||T.locked)return!1;if(T.railslocked)return T.debounced("checkunlock",T.resize,250),!1;if(T.rail.drag)return T.cancelEvent(e);if("auto"===M.oneaxismousemode&&0!==e.deltaX&&(M.oneaxismousemode=!1),M.oneaxismousemode&&0===e.deltaX&&!T.rail.scrollable)return!T.railh||!T.railh.scrollable||T.onmousewheelhr(e);var o=f(),t=!1;if(M.preservenativescrolling&&T.checkarea+600<o&&(T.nativescrollingarea=T.isScrollable(e),t=!0),T.checkarea=o,T.nativescrollingarea)return!0;var r=k(e,!1,t);return r&&(T.checkarea=0),r},this.onmousewheelhr=function(e){if(!T.wheelprevented){if(T.railslocked||!T.railh.scrollable)return!0;if(T.rail.drag)return T.cancelEvent(e);var o=f(),t=!1;return M.preservenativescrolling&&T.checkarea+600<o&&(T.nativescrollingarea=T.isScrollable(e),t=!0),T.checkarea=o,!!T.nativescrollingarea||(T.railslocked?T.cancelEvent(e):k(e,!0,t))}},this.stop=function(){return T.cancelScroll(),T.scrollmon&&T.scrollmon.stop(),T.cursorfreezed=!1,T.scroll.y=Math.round(T.getScrollTop()*(1/T.scrollratio.y)),T.noticeCursor(),T},this.getTransitionSpeed=function(e){return 80+e/72*M.scrollspeed|0},M.smoothscroll)if(T.ishwscroll&&P.hastransition&&M.usetransition&&M.smoothscroll){var j="";this.resetTransition=function(){j="",T.doc.css(P.prefixstyle+"transition-duration","0ms")},this.prepareTransition=function(e,o){var t=o?e:T.getTransitionSpeed(e),r=t+"ms";return j!==r&&(j=r,T.doc.css(P.prefixstyle+"transition-duration",r)),t},this.doScrollLeft=function(e,o){var t=T.scrollrunning?T.newscrolly:T.getScrollTop();T.doScrollPos(e,t,o)},this.doScrollTop=function(e,o){var t=T.scrollrunning?T.newscrollx:T.getScrollLeft();T.doScrollPos(t,e,o)},this.cursorupdate={running:!1,start:function(){var e=this;if(!e.running){e.running=!0;var o=function(){e.running&&u(o),T.showCursor(T.getScrollTop(),T.getScrollLeft()),T.notifyScrollEvent(T.win[0])};u(o)}},stop:function(){this.running=!1}},this.doScrollPos=function(e,o,t){var r=T.getScrollTop(),i=T.getScrollLeft();if(((T.newscrolly-r)*(o-r)<0||(T.newscrollx-i)*(e-i)<0)&&T.cancelScroll(),M.bouncescroll?(o<0?o=o/2|0:o>T.page.maxh&&(o=T.page.maxh+(o-T.page.maxh)/2|0),e<0?e=e/2|0:e>T.page.maxw&&(e=T.page.maxw+(e-T.page.maxw)/2|0)):(o<0?o=0:o>T.page.maxh&&(o=T.page.maxh),e<0?e=0:e>T.page.maxw&&(e=T.page.maxw)),T.scrollrunning&&e==T.newscrollx&&o==T.newscrolly)return!1;T.newscrolly=o,T.newscrollx=e;var s=T.getScrollTop(),n=T.getScrollLeft(),l={};l.x=e-n,l.y=o-s;var a=0|Math.sqrt(l.x*l.x+l.y*l.y),c=T.prepareTransition(a);T.scrollrunning||(T.scrollrunning=!0,T.triggerScrollStart(n,s,e,o,c),T.cursorupdate.start()),T.scrollendtrapped=!0,P.transitionend||(T.scrollendtrapped&&clearTimeout(T.scrollendtrapped),T.scrollendtrapped=setTimeout(T.onScrollTransitionEnd,c)),T.setScrollTop(T.newscrolly),T.setScrollLeft(T.newscrollx)},this.cancelScroll=function(){if(!T.scrollendtrapped)return!0;var e=T.getScrollTop(),o=T.getScrollLeft();return T.scrollrunning=!1,P.transitionend||clearTimeout(P.transitionend),T.scrollendtrapped=!1,T.resetTransition(),T.setScrollTop(e),T.railh&&T.setScrollLeft(o),T.timerscroll&&T.timerscroll.tm&&clearInterval(T.timerscroll.tm),T.timerscroll=!1,T.cursorfreezed=!1,T.cursorupdate.stop(),T.showCursor(e,o),T},this.onScrollTransitionEnd=function(){if(T.scrollendtrapped){var e=T.getScrollTop(),o=T.getScrollLeft();if(e<0?e=0:e>T.page.maxh&&(e=T.page.maxh),o<0?o=0:o>T.page.maxw&&(o=T.page.maxw),e!=T.newscrolly||o!=T.newscrollx)return T.doScrollPos(o,e,M.snapbackspeed);T.scrollrunning&&T.triggerScrollEnd(),T.scrollrunning=!1,T.scrollendtrapped=!1,T.resetTransition(),T.timerscroll=!1,T.setScrollTop(e),T.railh&&T.setScrollLeft(o),T.cursorupdate.stop(),T.noticeCursor(!1,e,o),T.cursorfreezed=!1}}}else this.doScrollLeft=function(e,o){var t=T.scrollrunning?T.newscrolly:T.getScrollTop();T.doScrollPos(e,t,o)},this.doScrollTop=function(e,o){var t=T.scrollrunning?T.newscrollx:T.getScrollLeft();T.doScrollPos(t,e,o)},this.doScrollPos=function(e,o,t){var r=T.getScrollTop(),i=T.getScrollLeft();((T.newscrolly-r)*(o-r)<0||(T.newscrollx-i)*(e-i)<0)&&T.cancelScroll();var s=!1;if(T.bouncescroll&&T.rail.visibility||(o<0?(o=0,s=!0):o>T.page.maxh&&(o=T.page.maxh,s=!0)),T.bouncescroll&&T.railh.visibility||(e<0?(e=0,s=!0):e>T.page.maxw&&(e=T.page.maxw,s=!0)),T.scrollrunning&&T.newscrolly===o&&T.newscrollx===e)return!0;T.newscrolly=o,T.newscrollx=e,T.dst={},T.dst.x=e-i,T.dst.y=o-r,T.dst.px=i,T.dst.py=r;var n=0|Math.sqrt(T.dst.x*T.dst.x+T.dst.y*T.dst.y),l=T.getTransitionSpeed(n);T.bzscroll={};var a=s?1:.58;T.bzscroll.x=new R(i,T.newscrollx,l,0,0,a,1),T.bzscroll.y=new R(r,T.newscrolly,l,0,0,a,1);f();var c=function(){if(T.scrollrunning){var e=T.bzscroll.y.getPos();T.setScrollLeft(T.bzscroll.x.getNow()),T.setScrollTop(T.bzscroll.y.getNow()),e<=1?T.timer=u(c):(T.scrollrunning=!1,T.timer=0,T.triggerScrollEnd())}};T.scrollrunning||(T.triggerScrollStart(i,r,e,o,l),T.scrollrunning=!0,T.timer=u(c))},this.cancelScroll=function(){return T.timer&&h(T.timer),T.timer=0,T.bzscroll=!1,T.scrollrunning=!1,T};else this.doScrollLeft=function(e,o){var t=T.getScrollTop();T.doScrollPos(e,t,o)},this.doScrollTop=function(e,o){var t=T.getScrollLeft();T.doScrollPos(t,e,o)},this.doScrollPos=function(e,o,t){var r=e>T.page.maxw?T.page.maxw:e;r<0&&(r=0);var i=o>T.page.maxh?T.page.maxh:o;i<0&&(i=0),T.synched("scroll",function(){T.setScrollTop(i),T.setScrollLeft(r)})},this.cancelScroll=function(){};this.doScrollBy=function(e,o){z(0,e)},this.doScrollLeftBy=function(e,o){z(e,0)},this.doScrollTo=function(e,o){var t=o?Math.round(e*T.scrollratio.y):e;t<0?t=0:t>T.page.maxh&&(t=T.page.maxh),T.cursorfreezed=!1,T.doScrollTop(e)},this.checkContentSize=function(){var e=T.getContentSize();e.h==T.page.h&&e.w==T.page.w||T.resize(!1,e)},T.onscroll=function(e){T.rail.drag||T.cursorfreezed||T.synched("scroll",function(){T.scroll.y=Math.round(T.getScrollTop()/T.scrollratio.y),T.railh&&(T.scroll.x=Math.round(T.getScrollLeft()/T.scrollratio.x)),T.noticeCursor()})},T.bind(T.docscroll,"scroll",T.onscroll),this.doZoomIn=function(e){if(!T.zoomactive){T.zoomactive=!0,T.zoomrestore={style:{}};var o=["position","top","left","zIndex","backgroundColor","marginTop","marginBottom","marginLeft","marginRight"],t=T.win[0].style;for(var r in o){var i=o[r];T.zoomrestore.style[i]=void 0!==t[i]?t[i]:""}T.zoomrestore.style.width=T.win.css("width"),T.zoomrestore.style.height=T.win.css("height"),T.zoomrestore.padding={w:T.win.outerWidth()-T.win.width(),h:T.win.outerHeight()-T.win.height()},P.isios4&&(T.zoomrestore.scrollTop=c.scrollTop(),c.scrollTop(0)),T.win.css({position:P.isios4?"absolute":"fixed",top:0,left:0,zIndex:s+100,margin:0});var n=T.win.css("backgroundColor");return(""===n||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n))&&T.win.css("backgroundColor","#fff"),T.rail.css({zIndex:s+101}),T.zoom.css({zIndex:s+102}),T.zoom.css("backgroundPosition","0 -18px"),T.resizeZoom(),T.onzoomin&&T.onzoomin.call(T),T.cancelEvent(e)}},this.doZoomOut=function(e){if(T.zoomactive)return T.zoomactive=!1,T.win.css("margin",""),T.win.css(T.zoomrestore.style),P.isios4&&c.scrollTop(T.zoomrestore.scrollTop),T.rail.css({"z-index":T.zindex}),T.zoom.css({"z-index":T.zindex}),T.zoomrestore=!1,T.zoom.css("backgroundPosition","0 0"),T.onResize(),T.onzoomout&&T.onzoomout.call(T),T.cancelEvent(e)},this.doZoom=function(e){return T.zoomactive?T.doZoomOut(e):T.doZoomIn(e)},this.resizeZoom=function(){if(T.zoomactive){var e=T.getScrollTop();T.win.css({width:c.width()-T.zoomrestore.padding.w+"px",height:c.height()-T.zoomrestore.padding.h+"px"}),T.onResize(),T.setScrollTop(Math.min(T.page.maxh,e))}},this.init(),n.nicescroll.push(this)},y=function(e){var o=this;this.nc=e,this.lastx=0,this.lasty=0,this.speedx=0,this.speedy=0,this.lasttime=0,this.steptime=0,this.snapx=!1,this.snapy=!1,this.demulx=0,this.demuly=0,this.lastscrollx=-1,this.lastscrolly=-1,this.chkx=0,this.chky=0,this.timer=0,this.reset=function(e,t){o.stop(),o.steptime=0,o.lasttime=f(),o.speedx=0,o.speedy=0,o.lastx=e,o.lasty=t,o.lastscrollx=-1,o.lastscrolly=-1},this.update=function(e,t){var r=f();o.steptime=r-o.lasttime,o.lasttime=r;var i=t-o.lasty,s=e-o.lastx,n=o.nc.getScrollTop()+i,l=o.nc.getScrollLeft()+s;o.snapx=l<0||l>o.nc.page.maxw,o.snapy=n<0||n>o.nc.page.maxh,o.speedx=s,o.speedy=i,o.lastx=e,o.lasty=t},this.stop=function(){o.nc.unsynched("domomentum2d"),o.timer&&clearTimeout(o.timer),o.timer=0,o.lastscrollx=-1,o.lastscrolly=-1},this.doSnapy=function(e,t){var r=!1;t<0?(t=0,r=!0):t>o.nc.page.maxh&&(t=o.nc.page.maxh,r=!0),e<0?(e=0,r=!0):e>o.nc.page.maxw&&(e=o.nc.page.maxw,r=!0),r?o.nc.doScrollPos(e,t,o.nc.opt.snapbackspeed):o.nc.triggerScrollEnd()},this.doMomentum=function(e){var t=f(),r=e?t+e:o.lasttime,i=o.nc.getScrollLeft(),s=o.nc.getScrollTop(),n=o.nc.page.maxh,l=o.nc.page.maxw;o.speedx=l>0?Math.min(60,o.speedx):0,o.speedy=n>0?Math.min(60,o.speedy):0;var a=r&&t-r<=60;(s<0||s>n||i<0||i>l)&&(a=!1);var c=!(!o.speedy||!a)&&o.speedy,d=!(!o.speedx||!a)&&o.speedx;if(c||d){var u=Math.max(16,o.steptime);if(u>50){var h=u/50;o.speedx*=h,o.speedy*=h,u=50}o.demulxy=0,o.lastscrollx=o.nc.getScrollLeft(),o.chkx=o.lastscrollx,o.lastscrolly=o.nc.getScrollTop(),o.chky=o.lastscrolly;var p=o.lastscrollx,m=o.lastscrolly,g=function(){var e=f()-t>600?.04:.02;o.speedx&&(p=Math.floor(o.lastscrollx-o.speedx*(1-o.demulxy)),o.lastscrollx=p,(p<0||p>l)&&(e=.1)),o.speedy&&(m=Math.floor(o.lastscrolly-o.speedy*(1-o.demulxy)),o.lastscrolly=m,(m<0||m>n)&&(e=.1)),o.demulxy=Math.min(1,o.demulxy+e),o.nc.synched("domomentum2d",function(){if(o.speedx){o.nc.getScrollLeft();o.chkx=p,o.nc.setScrollLeft(p)}if(o.speedy){o.nc.getScrollTop();o.chky=m,o.nc.setScrollTop(m)}o.timer||(o.nc.hideCursor(),o.doSnapy(p,m))}),o.demulxy<1?o.timer=setTimeout(g,u):(o.stop(),o.nc.hideCursor(),o.doSnapy(p,m))};g()}else o.doSnapy(o.nc.getScrollLeft(),o.nc.getScrollTop())}},x=e.fn.scrollTop;e.cssHooks.pageYOffset={get:function(e,o,t){var r=n.data(e,"__nicescroll")||!1;return r&&r.ishwscroll?r.getScrollTop():x.call(e)},set:function(e,o){var t=n.data(e,"__nicescroll")||!1;return t&&t.ishwscroll?t.setScrollTop(parseInt(o)):x.call(e,o),this}},e.fn.scrollTop=function(e){if(void 0===e){var o=!!this[0]&&(n.data(this[0],"__nicescroll")||!1);return o&&o.ishwscroll?o.getScrollTop():x.call(this)}return this.each(function(){var o=n.data(this,"__nicescroll")||!1;o&&o.ishwscroll?o.setScrollTop(parseInt(e)):x.call(n(this),e)})};var S=e.fn.scrollLeft;n.cssHooks.pageXOffset={get:function(e,o,t){var r=n.data(e,"__nicescroll")||!1;return r&&r.ishwscroll?r.getScrollLeft():S.call(e)},set:function(e,o){var t=n.data(e,"__nicescroll")||!1;return t&&t.ishwscroll?t.setScrollLeft(parseInt(o)):S.call(e,o),this}},e.fn.scrollLeft=function(e){if(void 0===e){var o=!!this[0]&&(n.data(this[0],"__nicescroll")||!1);return o&&o.ishwscroll?o.getScrollLeft():S.call(this)}return this.each(function(){var o=n.data(this,"__nicescroll")||!1;o&&o.ishwscroll?o.setScrollLeft(parseInt(e)):S.call(n(this),e)})};var z=function(e){var o=this;if(this.length=0,this.name="nicescrollarray",this.each=function(e){return n.each(o,e),o},this.push=function(e){o[o.length]=e,o.length++},this.eq=function(e){return o[e]},e)for(var t=0;t<e.length;t++){var r=n.data(e[t],"__nicescroll")||!1;r&&(this[this.length]=r,this.length++)}return this};!function(e,o,t){for(var r=0,i=o.length;r<i;r++)t(e,o[r])}(z.prototype,["show","hide","toggle","onResize","resize","remove","stop","doScrollPos"],function(e,o){e[o]=function(){var e=arguments;return this.each(function(){this[o].apply(this,e)})}}),e.fn.getNiceScroll=function(e){return void 0===e?new z(this):this[e]&&n.data(this[e],"__nicescroll")||!1},(e.expr.pseudos||e.expr[":"]).nicescroll=function(e){return void 0!==n.data(e,"__nicescroll")},n.fn.niceScroll=function(e,o){void 0!==o||"object"!=typeof e||"jquery"in e||(o=e,e=!1);var t=new z;return this.each(function(){var r=n(this),i=n.extend({},o);if(e){var s=n(e);i.doc=s.length>1?n(e,r):s,i.win=r}!("doc"in i)||"win"in i||(i.win=r);var l=r.data("__nicescroll")||!1;l||(i.doc=i.doc||r,l=new b(i,r),r.data("__nicescroll",l)),t.push(l)}),1===t.length?t[0]:t},a.NiceScroll={getjQuery:function(){return e}},n.nicescroll||(n.nicescroll=new z,n.nicescroll.options=g)});


/* - - - - - - - - - -
 * DOCUMENT READY EVENT */

jQuery(document).ready(function($)
{
  Toolkit.init();

  // console.log('Screen Width: ', $(window).innerWidth());
  // if($(window).innerWidth() < 640){
  //   // console.info('Loading more time: ');
  //   // setTimeout(function(){
  //   Toolkit.finishLoading();
  //   // }, 1000);
  // }else{
  //   Toolkit.finishLoading();
  // }

  if ( Toolkit.isLanding() )
  {
    ParallaxHeroElements.init();
    StartrailRandomPosition.init();
  }

  FixedNav.init();
  Sliders.init();
  ToggleCat.init();
  $('.js__single-select').select2({
    dir: 'rtl'
  });
  
  // Reset offscreen nav menu
  if($('.offscreen-nav-visible').length > 0){
    $('#offscreenNav').css('display', 'block');
    setTimeout(function(){
      $('#offscreenNav').animate({right: '0px'}, '300');
    }, 100);
  }else{
    $('#offscreenNav').css('display', 'none');
    $('#offscreenNav').animate({right: '-280px'}, '300');
    setTimeout(function(){
    }, 400);          
  }        

  // Reset offscreen map menu
  if($('.offscreen-map-visible').length > 0){
    $('#offscreenMap').css('display', 'block');
    setTimeout(function(){
      $('#offscreenMap').animate({right: '0px'}, '300');
    }, 100);
  }else{
    $('#offscreenMap').css('display', 'none');
    $('#offscreenMap').animate({right: '-310px'}, '300');
    setTimeout(function(){
    }, 400);          
  }        

  // $('document').on('load', resetUserList);
  $(window).on('resize', resetUserList);
  var resizeTimer;
    
  function resetUserList(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
  
      // Run code here, resizing has "stopped"
      // console.log('__:: Window resized');      
      var winWidth = $(window).outerWidth();    
      if(winWidth <= 767){
        // $('body').toggleClass('users-list-visible');
        if($('.users-list-visible').length > 0){
          // $('.z-users-list').css('display', 'block');
            $('.z-users-list').css({right: '0px'});
            $('.z-message-body').css({right: '212px'});
        }else{
          $('.z-users-list').css({right: '-100%'});
          $('.z-message-body').css({right: '0px'});         
        }
      }else{
        if($('.users-list-visible').length > 0){
          $('body').removeClass('users-list-visible');
          // $('.z-users-list').css('display', 'block');
          $('.z-users-list').css({right: '0px'});
          $('.z-message-body').css({right: '0px'});
        }else{
          $('.z-users-list').css({right: '0px'});
          $('.z-message-body').css({right: '0px'});         
        }
      } 
    }, 250);    
  }

  // Toolkit.finishLoading();

  // if ( Toolkit.BrowserDetect.browser === 'CHROME' || Toolkit.BrowserDetect.browser === 'SAFARI' )
  // {
  //   (function(url) {
  //     // console.clear();
  //     var image = new Image();
  //     image.onload = function()
  //     {
  //       var xyz =
  //       [
  //         'font-size: 1px;',
  //         'line-height: ' + this.height + 'px;',
  //         'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',
  //         'background-size: ' + this.width + 'px ' + this.height + 'px;',
  //         'background: url('+ url +');'
  //       ].join(' ');
  //       console.log('%c', xyz);
  //     };
  //     image.src = url;
  //   })(location.href.replace(location.pathname,'') + '/frontend/images/cc.png');
  // }
  // else
  // {
  //   // console.clear();
  //   console.log( "---- DESIGN & CODE ----[NEWLINE][NEWLINE]888b     d888  .d8888b. [NEWLINE]8888b   d8888 d88P  Y88b[NEWLINE]88888b.d88888 888    888[NEWLINE]888Y88888P888 888       [NEWLINE]888 Y888P 888 888  88888[NEWLINE]888  Y8P  888 888    888[NEWLINE]888   \"   888 Y88b  d88P[NEWLINE]888       888  \"Y8888P88[NEWLINE]                        [NEWLINE]Name   : Mohamed Gamil                                            [NEWLINE]Website: www.gemy.me                                            [NEWLINE][NEWLINE][NEWLINE]---- DEVELOPMENT ----[NEWLINE][NEWLINE][NEWLINE]888888b.        888                                [NEWLINE]888  \"88b       888                                [NEWLINE]888  .88P       888                                [NEWLINE]8888888K.   .d88888 888  888  888  .d88b.  888  888[NEWLINE]888  \"Y88b d88\" 888 888  888  888 d8P  Y8b 888  888[NEWLINE]888    888 888  888 888  888  888 88888888 888  888[NEWLINE]888   d88P Y88b 888 Y88b 888 d88P Y8b.     Y88b 888[NEWLINE]8888888P\"   \"Y88888  \"Y8888888P\"   \"Y8888   \"Y88888[NEWLINE]                                                888[NEWLINE]                                           Y8b d88P[NEWLINE]                                            \"Y88P\" [NEWLINE]Name   : Mohamed Abo Bdwey[NEWLINE]Website: www.bdwey.com[NEWLINE][NEWLINE][NEWLINE]                                     .d88888b.                                          [NEWLINE]                                    d88P\" \"Y88b                                         [NEWLINE]                                    888     888                                         [NEWLINE]888  888  .d88b.   .d88b.  88888b.  888     888 .d8888b   8888b.  88888b.d88b.   8888b. [NEWLINE]`Y8bd8P' d88P\"88b d8P  Y8b 888 \"88b 888     888 88K          \"88b 888 \"888 \"88b     \"88b[NEWLINE]  X88K   888  888 88888888 888  888 888     888 \"Y8888b. .d888888 888  888  888 .d888888[NEWLINE].d8\"\"8b. Y88b 888 Y8b.     888  888 Y88b. .d88P      X88 888  888 888  888  888 888  888[NEWLINE]888  888  \"Y88888  \"Y8888  888  888  \"Y88888P\"   88888P' \"Y888888 888  888  888 \"Y888888[NEWLINE]              888                                                                       [NEWLINE]         Y8b d88P                                                                       [NEWLINE]          \"Y88P\"                                                                        [NEWLINE][NEWLINE]Name  : Osama Mohamed[NEWLINE]GITHUB: @xgenOsama[NEWLINE][NEWLINE][NEWLINE]       d8888 888                                  888     8888888888                             888[NEWLINE]      d88888 888                                  888     888                                    888[NEWLINE]     d88P888 888                                  888     888                                    888[NEWLINE]    d88P 888 88888b.  88888b.d88b.   .d88b.   .d88888     8888888    88888b.d88b.   8888b.   .d88888[NEWLINE]   d88P  888 888 \"88b 888 \"888 \"88b d8P  Y8b d88\" 888     888        888 \"888 \"88b     \"88b d88\" 888[NEWLINE]  d88P   888 888  888 888  888  888 88888888 888  888     888        888  888  888 .d888888 888  888[NEWLINE] d8888888888 888  888 888  888  888 Y8b.     Y88b 888     888        888  888  888 888  888 Y88b 888[NEWLINE]d88P     888 888  888 888  888  888  \"Y8888   \"Y88888     8888888888 888  888  888 \"Y888888  \"Y88888[NEWLINE]                                                                                                                                                              [NEWLINE]Name    : Ahmed Emad[NEWLINE]Facebook: fb.com/profile.php?id=100002613616301[NEWLINE][NEWLINE][NEWLINE]".split('[NEWLINE]').join("\n"));
  // }
});


// Global map variables
var main_color = '#f7f8fa',
    saturation_value= -30,
    brightness_value= 20;
var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
var marker_url = ( is_internetExplorer11 ) ? '/frontend/images/marker.png' : '/frontend/images/marker.png';

//we define here the style of the map
var style= [ 
    {
    //set saturation for the labels on the map
    elementType: 'labels',
    stylers: [
        {saturation: saturation_value}
    ]
    },  
    { //poi stands for point of interest - don't show these lables on the map 
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
        {visibility: 'off'}
    ]
    },
    {
    //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
            {visibility: 'off'}
        ]
    }, 
    {   
    //don't show local road lables on the map
    featureType: 'road.local', 
    elementType: 'labels.icon', 
    stylers: [
        {visibility: 'off'} 
    ] 
    },
    { 
    //don't show arterial road lables on the map
    featureType: 'road.arterial', 
    elementType: 'labels.icon', 
    stylers: [
        {visibility: 'off'}
    ] 
    },
    {
    //don't show road lables on the map
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
        {visibility: 'off'}
    ]
    }, 
    //style different elements on the map
    { 
    featureType: 'transit', 
    elementType: 'geometry.fill', 
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    }, 
    {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'poi.sport_complex',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'transit.station',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'landscape',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    
    },
    {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    },
    {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    }, 
    {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
        { hue: main_color },
        { visibility: 'on' }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
    ]
    }
];


$(document).ready(function (e) {
    $(document).on('click', '#add_to_cart, [data-action=add_to_cart]', function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: 'get',
            success: function (data) {
                if (data && data!='faild' && data != 'empty_product' && data != 'auction_product') {
                    var cart_container = $('#cart_container');
                    var cart_header = $('#cart_header');
                    var cart_count = $('#cart_count');
                    cart_header.html('');
                    if (data[0] != 0) {
                        cart_header.append('<a href="/orders/create" class="btn btn-xs btn-primary pull-left xxs-mt-5 xxs-mr-5 skip-margin">انشاء الطلب </a>');
                        cart_header.append('<a href="/cart/view" class="btn btn-xs btn-dark pull-left xxs-mt-5 xxs-mr-5 skip-margin">سلة الشراء</a>');
                        cart_header.append('<a href="/cart/destroy" class="btn btn-xs btn-danger pull-left xxs-mt-5 skip-margin">إفراغ السله</a>')

                    }

                    cart_count.removeClass('opacity-0').html(data[0]);
                    cart_header.append('<h6 class="pull-right"><strong data-bind="cartItems"> ' + data[0] + '</strong> منتج فى سلة الشراء </h6>');
                    cart_container.html('');
                    for (var key in data[1]) {
                        cart_container.append('<h6 class="xxs-pr-20 xxs-pl-20 xxs-mr-5 xxs-mt-15 xxs-mb-0">' + key + '</h6>');
                        for (var item in data[1][key]) {
                            cart_container.append('<div class="xxs-p-10 border-bottom-solid-midgray-1 z-cart-item clearfix"> <a href="/products/'+data[1][key][item].id+'"class="btn btn-primary btn-link no-underline text-bold font-jfflat prod-item">' + data[1][key][item].name + '</a> <a href="/cart/removeItem/' + data[1][key][item].rowId + '" data-action="deleteCartItem"class="pull-left xxs-mt-5 xxs-p-5 icon icon-xs icon-trash"></a> </div>');
                        }
                    }
                    swal({
                        title: 'تم إضافة المنتج الي سلة الشراء',
                        text: 'يمكنك مواصلة التسوق او اتمام الطلب',
                        type: 'success',
                        timer: 2500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });


                }
                else if(data =='faild'){
                    swal({
                        title: 'خطأ',
                        text: 'عفوا تم انتهاء الكمية',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else  if (data == "empty_product"){
                    swal({
                        title: 'خطأ',
                        text: 'هذا المنتج غير موجود',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }else  if (data == "auction_product"){
                    swal({
                        title: 'خطأ',
                        text: 'لا يمكنك إضافة المزاد الى سلة الشراء',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }
            },
            error: function (data) {
                data = JSON.parse(data.responseText);
                if (data.error == 'Unauthenticated.') {
                    swal({
                        title: 'خطأ',
                        html: 'رجاء تسجيل الدخول من <a href="/login"> هنا  </a>',
                        type: 'error',
                        timer: 5000,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                    return;
                } else {
                    swal({
                        title: 'خطأ',
                        text: 'حدث خطأ غير متوقع, رجاء المحاولة مرة اخري',
                        type: 'error',
                        timer: 3500,
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    });
                }
            }
        });
    });
});

$(document).on('click', '.action-like , .action-dislike', function (e) {
    e.preventDefault();
    if (checkAuth()) {
        var is_liked = $(this).attr('like');
        var $pcontainer = $(this).parents('.product-actions');
        var product_id = $pcontainer.find('.get-product-id').val();
        var likes_url = $pcontainer.find('.likes-url').val();
        $.ajax({
            url: likes_url,
            type: 'post',
            data: {product_id: product_id, is_liked: is_liked, _token: $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                if (data != 'not') {
                    $('.like' + product_id).children('span').html(data.likes);
                    $('.dislike' + product_id).children('span').html(data.dislikes);
                    if (data.is_liked == 1) {

                        $('.change-like' + product_id).toggleClass('is-like');
                        $('.change-dislike' + product_id).removeClass('is-dislike');
                    }
                    if (data.is_liked == 0) {
                        $('.change-like' + product_id).removeClass('is-like');
                        $('.change-dislike' + product_id).toggleClass('is-dislike');
                    }
                }
            }
        });
    }

});

$(document).on('click', '.action-favorite', function (e) {
    e.preventDefault();
    if (checkAuth()) {
        var $pcontainer = $(this).parents('.product-actions');
        var product_id = $pcontainer.find('.get-product-id').val();
        var favorites_url = $pcontainer.find('.favorites-url').val();
        $.ajax({
            url: favorites_url,
            type: 'post',
            data: {product_id: product_id, _token: $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                if (data != 'not') {
                    if (data == '1') {
                        $('.action-favorite').removeClass('favorite');
                        $('.action-favorite').addClass('is-favorite');
                    } else {
                        $('.action-favorite').addClass('favorite');
                        $('.action-favorite').removeClass('is-favorite');
                    }
                }

            }
        });
    }
});

function checkAuth() {
    var isGuest = $('meta[name="isGuest"]').attr('content');
    if (isGuest) {
        swal({
                title: "رجاء تسجيل الدخول اولا",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                cancelButtonText: "اغلاق",
                confirmButtonText: "تسجيل الدخول",
                closeOnConfirm: false
            },
            function () {
                window.location='/login';
            });
    }
    else{
        return true;
    }
}

/*! pace 1.0.0 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].slice,Y={}.hasOwnProperty,Z=function(a,b){function c(){this.constructor=a}for(var d in b)Y.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},$=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(u={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},C=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?a:+new Date},E=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==E&&(E=function(a){return setTimeout(a,50)},t=function(a){return clearTimeout(a)}),G=function(a){var b,c;return b=C(),(c=function(){var d;return d=C()-b,d>=33?(b=C(),a(d,function(){return E(c)})):setTimeout(c,33-d)})()},F=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?X.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},v=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?X.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)Y.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?v(b[a],e):b[a]=e);return b},q=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},x=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)e.push(this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),i.push(f?this.bindings[c].splice(e,1):e++);return i}},a}(),j=window.Pace||{},window.Pace=j,v(j,g.prototype),D=j.options=v({},u,window.paceOptions,x()),U=["ajax","document","eventLag","elements"],Q=0,S=U.length;S>Q;Q++)K=U[Q],D[K]===!0&&(D[K]=u[K]);i=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Z(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(D.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b,c,d,e,f,g;if(null==document.querySelector(D.target))return!1;for(a=this.getElement(),d="translate3d("+this.progress+"%, 0, 0)",g=["webkitTransform","msTransform","transform"],e=0,f=g.length;f>e;e++)b=g[e],a.children[0].style[b]=d;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?c="99":(c=this.progress<10?"0":"",c+=0|this.progress),a.children[0].setAttribute("data-progress",""+c)),this.lastRenderedProgress=this.progress},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),P=window.XMLHttpRequest,O=window.XDomainRequest,N=window.WebSocket,w=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],f.push(null==a[d]&&"function"!=typeof e?a[d]=e:void 0)}catch(g){c=g}return f},A=[],j.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("ignore"),c=b.apply(null,a),A.shift(),c},j.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("track"),c=b.apply(null,a),A.shift(),c},J=function(a){var b;if(null==a&&(a="GET"),"track"===A[0])return"force";if(!A.length&&D.ajax){if("socket"===a&&D.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),$.call(D.ajax.trackMethods,b)>=0)return!0}return!1},k=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return J(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new P(b),a(c),c};try{w(window.XMLHttpRequest,P)}catch(d){}if(null!=O){window.XDomainRequest=function(){var b;return b=new O,a(b),b};try{w(window.XDomainRequest,O)}catch(d){}}if(null!=N&&D.ajax.trackWebSockets){window.WebSocket=function(a,b){var d;return d=null!=b?new N(a,b):new N(a),J("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d};try{w(window.WebSocket,N)}catch(d){}}}return Z(b,a),b}(h),R=null,y=function(){return null==R&&(R=new k),R},I=function(a){var b,c,d,e;for(e=D.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},y().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,I(g)?void 0:j.running||D.restartOnRequestAfter===!1&&"force"!==J(f)?void 0:(d=arguments,c=D.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,k;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(j.restart(),i=j.sources,k=[],c=0,g=i.length;g>c;c++){if(K=i[c],K instanceof a){K.watch.apply(K,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],y().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,I(e)?void 0:(c="socket"===d?new n(b):new o(b),this.elements.push(c))},a}(),o=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2},!1),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100},!1);else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),n=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100},!1)}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},D.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=C(),b=setInterval(function(){var g;return g=C()-c-50,c=C(),e.push(g),e.length>D.eventLag.sampleCount&&e.shift(),a=q(e),++d>=D.eventLag.minSamples&&a<D.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),m=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=D.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=F(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=F(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/D.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,D.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+D.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),L=null,H=null,r=null,M=null,p=null,s=null,j.running=!1,z=function(){return D.restartOnPushState?j.restart():void 0},null!=window.history.pushState&&(T=window.history.pushState,window.history.pushState=function(){return z(),T.apply(window.history,arguments)}),null!=window.history.replaceState&&(W=window.history.replaceState,window.history.replaceState=function(){return z(),W.apply(window.history,arguments)}),l={ajax:a,elements:d,document:c,eventLag:f},(B=function(){var a,c,d,e,f,g,h,i;for(j.sources=L=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],D[a]!==!1&&L.push(new l[a](D[a]));for(i=null!=(h=D.extraSources)?h:[],d=0,f=i.length;f>d;d++)K=i[d],L.push(new K(D));return j.bar=r=new b,H=[],M=new m})(),j.stop=function(){return j.trigger("stop"),j.running=!1,r.destroy(),s=!0,null!=p&&("function"==typeof t&&t(p),p=null),B()},j.restart=function(){return j.trigger("restart"),j.stop(),j.start()},j.go=function(){var a;return j.running=!0,r.render(),a=C(),s=!1,p=G(function(b,c){var d,e,f,g,h,i,k,l,n,o,p,q,t,u,v,w;for(l=100-r.progress,e=p=0,f=!0,i=q=0,u=L.length;u>q;i=++q)for(K=L[i],o=null!=H[i]?H[i]:H[i]=[],h=null!=(w=K.elements)?w:[K],k=t=0,v=h.length;v>t;k=++t)g=h[k],n=null!=o[k]?o[k]:o[k]=new m(g),f&=n.done,n.done||(e++,p+=n.tick(b));return d=p/e,r.update(M.tick(b,d)),r.done()||f||s?(r.update(100),j.trigger("done"),setTimeout(function(){return r.finish(),j.running=!1,j.trigger("hide")},Math.max(D.ghostTime,Math.max(D.minTime-(C()-a),0)))):c()})},j.start=function(a){v(D,a),j.running=!0;try{r.render()}catch(b){i=b}return document.querySelector(".pace")?(j.trigger("start"),j.go()):setTimeout(j.start,50)},"function"==typeof define&&define.amd?define(function(){return j}):"object"==typeof exports?module.exports=j:D.startOnPageLoad&&j.start()}).call(this);
/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 *
 * See usage examples at http://jscolor.com/examples/
 */"use strict";window.jscolor||(window.jscolor=function(){var e={register:function(){e.attachDOMReadyEvent(e.init),e.attachEvent(document,"mousedown",e.onDocumentMouseDown),e.attachEvent(document,"touchstart",e.onDocumentTouchStart),e.attachEvent(window,"resize",e.onWindowResize)},init:function(){e.jscolor.lookupClass&&e.jscolor.installByClassName(e.jscolor.lookupClass)},tryInstallOnElements:function(t,n){var r=new RegExp("(^|\\s)("+n+")(\\s*(\\{[^}]*\\})|\\s|$)","i");for(var i=0;i<t.length;i+=1){if(t[i].type!==undefined&&t[i].type.toLowerCase()=="color"&&e.isColorAttrSupported)continue;var s;if(!t[i].jscolor&&t[i].className&&(s=t[i].className.match(r))){var o=t[i],u=null,a=e.getDataAttr(o,"jscolor");a!==null?u=a:s[4]&&(u=s[4]);var f={};if(u)try{f=(new Function("return ("+u+")"))()}catch(l){e.warn("Error parsing jscolor options: "+l+":\n"+u)}o.jscolor=new e.jscolor(o,f)}}},isColorAttrSupported:function(){var e=document.createElement("input");if(e.setAttribute){e.setAttribute("type","color");if(e.type.toLowerCase()=="color")return!0}return!1}(),isCanvasSupported:function(){var e=document.createElement("canvas");return!!e.getContext&&!!e.getContext("2d")}(),fetchElement:function(e){return typeof e=="string"?document.getElementById(e):e},isElementType:function(e,t){return e.nodeName.toLowerCase()===t.toLowerCase()},getDataAttr:function(e,t){var n="data-"+t,r=e.getAttribute(n);return r!==null?r:null},attachEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},detachEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},_attachedGroupEvents:{},attachGroupEvent:function(t,n,r,i){e._attachedGroupEvents.hasOwnProperty(t)||(e._attachedGroupEvents[t]=[]),e._attachedGroupEvents[t].push([n,r,i]),e.attachEvent(n,r,i)},detachGroupEvents:function(t){if(e._attachedGroupEvents.hasOwnProperty(t)){for(var n=0;n<e._attachedGroupEvents[t].length;n+=1){var r=e._attachedGroupEvents[t][n];e.detachEvent(r[0],r[1],r[2])}delete e._attachedGroupEvents[t]}},attachDOMReadyEvent:function(e){var t=!1,n=function(){t||(t=!0,e())};if(document.readyState==="complete"){setTimeout(n,1);return}if(document.addEventListener)document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&(document.detachEvent("onreadystatechange",arguments.callee),n())}),window.attachEvent("onload",n);if(document.documentElement.doScroll&&window==window.top){var r=function(){if(!document.body)return;try{document.documentElement.doScroll("left"),n()}catch(e){setTimeout(r,1)}};r()}}},warn:function(e){window.console&&window.console.warn&&window.console.warn(e)},preventDefault:function(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1},captureTarget:function(t){t.setCapture&&(e._capturedTarget=t,e._capturedTarget.setCapture())},releaseTarget:function(){e._capturedTarget&&(e._capturedTarget.releaseCapture(),e._capturedTarget=null)},fireEvent:function(e,t){if(!e)return;if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}else if(document.createEventObject){var n=document.createEventObject();e.fireEvent("on"+t,n)}else e["on"+t]&&e["on"+t]()},classNameToList:function(e){return e.replace(/^\s+|\s+$/g,"").split(/\s+/)},hasClass:function(e,t){return t?-1!=(" "+e.className.replace(/\s+/g," ")+" ").indexOf(" "+t+" "):!1},setClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1)e.hasClass(t,r[i])||(t.className+=(t.className?" ":"")+r[i])},unsetClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1){var s=new RegExp("^\\s*"+r[i]+"\\s*|"+"\\s*"+r[i]+"\\s*$|"+"\\s+"+r[i]+"(\\s+)","g");t.className=t.className.replace(s,"$1")}},getStyle:function(e){return window.getComputedStyle?window.getComputedStyle(e):e.currentStyle},setStyle:function(){var e=document.createElement("div"),t=function(t){for(var n=0;n<t.length;n+=1)if(t[n]in e.style)return t[n]},n={borderRadius:t(["borderRadius","MozBorderRadius","webkitBorderRadius"]),boxShadow:t(["boxShadow","MozBoxShadow","webkitBoxShadow"])};return function(e,t,r){switch(t.toLowerCase()){case"opacity":var i=Math.round(parseFloat(r)*100);e.style.opacity=r,e.style.filter="alpha(opacity="+i+")";break;default:e.style[n[t]]=r}}}(),setBorderRadius:function(t,n){e.setStyle(t,"borderRadius",n||"0")},setBoxShadow:function(t,n){e.setStyle(t,"boxShadow",n||"none")},getElementPos:function(t,n){var r=0,i=0,s=t.getBoundingClientRect();r=s.left,i=s.top;if(!n){var o=e.getViewPos();r+=o[0],i+=o[1]}return[r,i]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getAbsPointerPos:function(e){e||(e=window.event);var t=0,n=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(t=e.clientX,n=e.clientY),{x:t,y:n}},getRelPointerPos:function(e){e||(e=window.event);var t=e.target||e.srcElement,n=t.getBoundingClientRect(),r=0,i=0,s=0,o=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(s=e.changedTouches[0].clientX,o=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(s=e.clientX,o=e.clientY),r=s-n.left,i=o-n.top,{x:r,y:i}},getViewPos:function(){var e=document.documentElement;return[(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0),(window.pageYOffset||e.scrollTop)-(e.clientTop||0)]},getViewSize:function(){var e=document.documentElement;return[window.innerWidth||e.clientWidth,window.innerHeight||e.clientHeight]},redrawPosition:function(){if(e.picker&&e.picker.owner){var t=e.picker.owner,n,r;t.fixed?(n=e.getElementPos(t.targetElement,!0),r=[0,0]):(n=e.getElementPos(t.targetElement),r=e.getViewPos());var i=e.getElementSize(t.targetElement),s=e.getViewSize(),o=e.getPickerOuterDims(t),u,a,f;switch(t.position.toLowerCase()){case"left":u=1,a=0,f=-1;break;case"right":u=1,a=0,f=1;break;case"top":u=0,a=1,f=-1;break;default:u=0,a=1,f=1}var l=(i[a]+o[a])/2;if(!t.smartPosition)var c=[n[u],n[a]+i[a]-l+l*f];else var c=[-r[u]+n[u]+o[u]>s[u]?-r[u]+n[u]+i[u]/2>s[u]/2&&n[u]+i[u]-o[u]>=0?n[u]+i[u]-o[u]:n[u]:n[u],-r[a]+n[a]+i[a]+o[a]-l+l*f>s[a]?-r[a]+n[a]+i[a]/2>s[a]/2&&n[a]+i[a]-l-l*f>=0?n[a]+i[a]-l-l*f:n[a]+i[a]-l+l*f:n[a]+i[a]-l+l*f>=0?n[a]+i[a]-l+l*f:n[a]+i[a]-l-l*f];var h=c[u],p=c[a],d=t.fixed?"fixed":"absolute",v=(c[0]+o[0]>n[0]||c[0]<n[0]+i[0])&&c[1]+o[1]<n[1]+i[1];e._drawPosition(t,h,p,d,v)}},_drawPosition:function(t,n,r,i,s){var o=s?0:t.shadowBlur;e.picker.wrap.style.position=i,e.picker.wrap.style.left=n+"px",e.picker.wrap.style.top=r+"px",e.setBoxShadow(e.picker.boxS,t.shadow?new e.BoxShadow(0,o,t.shadowBlur,0,t.shadowColor):null)},getPickerDims:function(t){var n=!!e.getSliderComponent(t),r=[2*t.insetWidth+2*t.padding+t.width+(n?2*t.insetWidth+e.getPadToSliderPadding(t)+t.sliderSize:0),2*t.insetWidth+2*t.padding+t.height+(t.closable?2*t.insetWidth+t.padding+t.buttonHeight:0)];return r},getPickerOuterDims:function(t){var n=e.getPickerDims(t);return[n[0]+2*t.borderWidth,n[1]+2*t.borderWidth]},getPadToSliderPadding:function(e){return Math.max(e.padding,1.5*(2*e.pointerBorderWidth+e.pointerThickness))},getPadYComponent:function(e){switch(e.mode.charAt(1).toLowerCase()){case"v":return"v"}return"s"},getSliderComponent:function(e){if(e.mode.length>2)switch(e.mode.charAt(2).toLowerCase()){case"s":return"s";case"v":return"v"}return null},onDocumentMouseDown:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"mouse"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onDocumentTouchStart:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"touch"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onWindowResize:function(t){e.redrawPosition()},onParentScroll:function(t){e.picker&&e.picker.owner&&e.picker.owner.hide()},_pointerMoveEvent:{mouse:"mousemove",touch:"touchmove"},_pointerEndEvent:{mouse:"mouseup",touch:"touchend"},_pointerOrigin:null,_capturedTarget:null,onControlPointerStart:function(t,n,r,i){var s=n._jscInstance;e.preventDefault(t),e.captureTarget(n);var o=function(s,o){e.attachGroupEvent("drag",s,e._pointerMoveEvent[i],e.onDocumentPointerMove(t,n,r,i,o)),e.attachGroupEvent("drag",s,e._pointerEndEvent[i],e.onDocumentPointerEnd(t,n,r,i))};o(document,[0,0]);if(window.parent&&window.frameElement){var u=window.frameElement.getBoundingClientRect(),a=[-u.left,-u.top];o(window.parent.window.document,a)}var f=e.getAbsPointerPos(t),l=e.getRelPointerPos(t);e._pointerOrigin={x:f.x-l.x,y:f.y-l.y};switch(r){case"pad":switch(e.getSliderComponent(s)){case"s":s.hsv[1]===0&&s.fromHSV(null,100,null);break;case"v":s.hsv[2]===0&&s.fromHSV(null,null,100)}e.setPad(s,t,0,0);break;case"sld":e.setSld(s,t,0)}e.dispatchFineChange(s)},onDocumentPointerMove:function(t,n,r,i,s){return function(t){var i=n._jscInstance;switch(r){case"pad":t||(t=window.event),e.setPad(i,t,s[0],s[1]),e.dispatchFineChange(i);break;case"sld":t||(t=window.event),e.setSld(i,t,s[1]),e.dispatchFineChange(i)}}},onDocumentPointerEnd:function(t,n,r,i){return function(t){var r=n._jscInstance;e.detachGroupEvents("drag"),e.releaseTarget(),e.dispatchChange(r)}},dispatchChange:function(t){t.valueElement&&e.isElementType(t.valueElement,"input")&&e.fireEvent(t.valueElement,"change")},dispatchFineChange:function(e){if(e.onFineChange){var t;typeof e.onFineChange=="string"?t=new Function(e.onFineChange):t=e.onFineChange,t.call(e)}},setPad:function(t,n,r,i){var s=e.getAbsPointerPos(n),o=r+s.x-e._pointerOrigin.x-t.padding-t.insetWidth,u=i+s.y-e._pointerOrigin.y-t.padding-t.insetWidth,a=o*(360/(t.width-1)),f=100-u*(100/(t.height-1));switch(e.getPadYComponent(t)){case"s":t.fromHSV(a,f,null,e.leaveSld);break;case"v":t.fromHSV(a,null,f,e.leaveSld)}},setSld:function(t,n,r){var i=e.getAbsPointerPos(n),s=r+i.y-e._pointerOrigin.y-t.padding-t.insetWidth,o=100-s*(100/(t.height-1));switch(e.getSliderComponent(t)){case"s":t.fromHSV(null,o,null,e.leavePad);break;case"v":t.fromHSV(null,null,o,e.leavePad)}},_vmlNS:"jsc_vml_",_vmlCSS:"jsc_vml_css_",_vmlReady:!1,initVML:function(){if(!e._vmlReady){var t=document;t.namespaces[e._vmlNS]||t.namespaces.add(e._vmlNS,"urn:schemas-microsoft-com:vml");if(!t.styleSheets[e._vmlCSS]){var n=["shape","shapetype","group","background","path","formulas","handles","fill","stroke","shadow","textbox","textpath","imagedata","line","polyline","curve","rect","roundrect","oval","arc","image"],r=t.createStyleSheet();r.owningElement.id=e._vmlCSS;for(var i=0;i<n.length;i+=1)r.addRule(e._vmlNS+"\\:"+n[i],"behavior:url(#default#VML);")}e._vmlReady=!0}},createPalette:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var s=r.createLinearGradient(0,0,n.width,0);s.addColorStop(0,"#F00"),s.addColorStop(1/6,"#FF0"),s.addColorStop(2/6,"#0F0"),s.addColorStop(.5,"#0FF"),s.addColorStop(4/6,"#00F"),s.addColorStop(5/6,"#F0F"),s.addColorStop(1,"#F00"),r.fillStyle=s,r.fillRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);switch(i.toLowerCase()){case"s":o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(1,"rgba(255,255,255,1)");break;case"v":o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)")}r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="90",o.colors="16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var a=document.createElement(e._vmlNS+":fill");a.type="gradient",a.method="linear",a.angle="180",a.opacity="0";var f=document.createElement(e._vmlNS+":rect");f.style.position="absolute",f.style.left="-1px",f.style.top="-1px",f.stroked=!1,f.appendChild(a),s.appendChild(f);var i=function(e,t,n){s.style.width=e+"px",s.style.height=t+"px",u.style.width=f.style.width=e+1+"px",u.style.height=f.style.height=t+1+"px",o.color="#F00",o.color2="#F00";switch(n.toLowerCase()){case"s":a.color=a.color2="#FFF";break;case"v":a.color=a.color2="#000"}};t.elm=s,t.draw=i}return t},createSliderGradient:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i,s){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);o.addColorStop(0,i),o.addColorStop(1,s),r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="180";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var i=function(e,t,n,r){s.style.width=e+"px",s.style.height=t+"px",u.style.width=e+1+"px",u.style.height=t+1+"px",o.color=n,o.color2=r};t.elm=s,t.draw=i}return t},leaveValue:1,leaveStyle:2,leavePad:4,leaveSld:8,BoxShadow:function(){var e=function(e,t,n,r,i,s){this.hShadow=e,this.vShadow=t,this.blur=n,this.spread=r,this.color=i,this.inset=!!s};return e.prototype.toString=function(){var e=[Math.round(this.hShadow)+"px",Math.round(this.vShadow)+"px",Math.round(this.blur)+"px",Math.round(this.spread)+"px",this.color];return this.inset&&e.push("inset"),e.join(" ")},e}(),jscolor:function(t,n){function i(e,t,n){e/=255,t/=255,n/=255;var r=Math.min(Math.min(e,t),n),i=Math.max(Math.max(e,t),n),s=i-r;if(s===0)return[null,0,100*i];var o=e===r?3+(n-t)/s:t===r?5+(e-n)/s:1+(t-e)/s;return[60*(o===6?0:o),100*(s/i),100*i]}function s(e,t,n){var r=255*(n/100);if(e===null)return[r,r,r];e/=60,t/=100;var i=Math.floor(e),s=i%2?e-i:1-(e-i),o=r*(1-t),u=r*(1-t*s);switch(i){case 6:case 0:return[r,u,o];case 1:return[u,r,o];case 2:return[o,r,u];case 3:return[o,u,r];case 4:return[u,o,r];case 5:return[r,o,u]}}function o(){e.unsetClass(d.targetElement,d.activeClass),e.picker.wrap.parentNode.removeChild(e.picker.wrap),delete e.picker.owner}function u(){function l(){var e=d.insetColor.split(/\s+/),n=e.length<2?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];t.btn.style.borderColor=n}d._processParentElementsInDOM(),e.picker||(e.picker={owner:null,wrap:document.createElement("div"),box:document.createElement("div"),boxS:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),padPal:e.createPalette(),cross:document.createElement("div"),crossBY:document.createElement("div"),crossBX:document.createElement("div"),crossLY:document.createElement("div"),crossLX:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),sldGrad:e.createSliderGradient(),sldPtrS:document.createElement("div"),sldPtrIB:document.createElement("div"),sldPtrMB:document.createElement("div"),sldPtrOB:document.createElement("div"),btn:document.createElement("div"),btnT:document.createElement("span")},e.picker.pad.appendChild(e.picker.padPal.elm),e.picker.padB.appendChild(e.picker.pad),e.picker.cross.appendChild(e.picker.crossBY),e.picker.cross.appendChild(e.picker.crossBX),e.picker.cross.appendChild(e.picker.crossLY),e.picker.cross.appendChild(e.picker.crossLX),e.picker.padB.appendChild(e.picker.cross),e.picker.box.appendChild(e.picker.padB),e.picker.box.appendChild(e.picker.padM),e.picker.sld.appendChild(e.picker.sldGrad.elm),e.picker.sldB.appendChild(e.picker.sld),e.picker.sldB.appendChild(e.picker.sldPtrOB),e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB),e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB),e.picker.sldPtrIB.appendChild(e.picker.sldPtrS),e.picker.box.appendChild(e.picker.sldB),e.picker.box.appendChild(e.picker.sldM),e.picker.btn.appendChild(e.picker.btnT),e.picker.box.appendChild(e.picker.btn),e.picker.boxB.appendChild(e.picker.box),e.picker.wrap.appendChild(e.picker.boxS),e.picker.wrap.appendChild(e.picker.boxB));var t=e.picker,n=!!e.getSliderComponent(d),r=e.getPickerDims(d),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,s=e.getPadToSliderPadding(d),o=Math.min(d.borderRadius,Math.round(d.padding*Math.PI)),u="crosshair";t.wrap.style.clear="both",t.wrap.style.width=r[0]+2*d.borderWidth+"px",t.wrap.style.height=r[1]+2*d.borderWidth+"px",t.wrap.style.zIndex=d.zIndex,t.box.style.width=r[0]+"px",t.box.style.height=r[1]+"px",t.boxS.style.position="absolute",t.boxS.style.left="0",t.boxS.style.top="0",t.boxS.style.width="100%",t.boxS.style.height="100%",e.setBorderRadius(t.boxS,o+"px"),t.boxB.style.position="relative",t.boxB.style.border=d.borderWidth+"px solid",t.boxB.style.borderColor=d.borderColor,t.boxB.style.background=d.backgroundColor,e.setBorderRadius(t.boxB,o+"px"),t.padM.style.background=t.sldM.style.background="#FFF",e.setStyle(t.padM,"opacity","0"),e.setStyle(t.sldM,"opacity","0"),t.pad.style.position="relative",t.pad.style.width=d.width+"px",t.pad.style.height=d.height+"px",t.padPal.draw(d.width,d.height,e.getPadYComponent(d)),t.padB.style.position="absolute",t.padB.style.left=d.padding+"px",t.padB.style.top=d.padding+"px",t.padB.style.border=d.insetWidth+"px solid",t.padB.style.borderColor=d.insetColor,t.padM._jscInstance=d,t.padM._jscControlName="pad",t.padM.style.position="absolute",t.padM.style.left="0",t.padM.style.top="0",t.padM.style.width=d.padding+2*d.insetWidth+d.width+s/2+"px",t.padM.style.height=r[1]+"px",t.padM.style.cursor=u,t.cross.style.position="absolute",t.cross.style.left=t.cross.style.top="0",t.cross.style.width=t.cross.style.height=i+"px",t.crossBY.style.position=t.crossBX.style.position="absolute",t.crossBY.style.background=t.crossBX.style.background=d.pointerBorderColor,t.crossBY.style.width=t.crossBX.style.height=2*d.pointerBorderWidth+d.pointerThickness+"px",t.crossBY.style.height=t.crossBX.style.width=i+"px",t.crossBY.style.left=t.crossBX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)-d.pointerBorderWidth+"px",t.crossBY.style.top=t.crossBX.style.left="0",t.crossLY.style.position=t.crossLX.style.position="absolute",t.crossLY.style.background=t.crossLX.style.background=d.pointerColor,t.crossLY.style.height=t.crossLX.style.width=i-2*d.pointerBorderWidth+"px",t.crossLY.style.width=t.crossLX.style.height=d.pointerThickness+"px",t.crossLY.style.left=t.crossLX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)+"px",t.crossLY.style.top=t.crossLX.style.left=d.pointerBorderWidth+"px",t.sld.style.overflow="hidden",t.sld.style.width=d.sliderSize+"px",t.sld.style.height=d.height+"px",t.sldGrad.draw(d.sliderSize,d.height,"#000","#000"),t.sldB.style.display=n?"block":"none",t.sldB.style.position="absolute",t.sldB.style.right=d.padding+"px",t.sldB.style.top=d.padding+"px",t.sldB.style.border=d.insetWidth+"px solid",t.sldB.style.borderColor=d.insetColor,t.sldM._jscInstance=d,t.sldM._jscControlName="sld",t.sldM.style.display=n?"block":"none",t.sldM.style.position="absolute",t.sldM.style.right="0",t.sldM.style.top="0",t.sldM.style.width=d.sliderSize+s/2+d.padding+2*d.insetWidth+"px",t.sldM.style.height=r[1]+"px",t.sldM.style.cursor="default",t.sldPtrIB.style.border=t.sldPtrOB.style.border=d.pointerBorderWidth+"px solid "+d.pointerBorderColor,t.sldPtrOB.style.position="absolute",t.sldPtrOB.style.left=-(2*d.pointerBorderWidth+d.pointerThickness)+"px",t.sldPtrOB.style.top="0",t.sldPtrMB.style.border=d.pointerThickness+"px solid "+d.pointerColor,t.sldPtrS.style.width=d.sliderSize+"px",t.sldPtrS.style.height=m+"px",t.btn.style.display=d.closable?"block":"none",t.btn.style.position="absolute",t.btn.style.left=d.padding+"px",t.btn.style.bottom=d.padding+"px",t.btn.style.padding="0 15px",t.btn.style.height=d.buttonHeight+"px",t.btn.style.border=d.insetWidth+"px solid",l(),t.btn.style.color=d.buttonColor,t.btn.style.font="12px sans-serif",t.btn.style.textAlign="center";try{t.btn.style.cursor="pointer"}catch(c){t.btn.style.cursor="hand"}t.btn.onmousedown=function(){d.hide()},t.btnT.style.lineHeight=d.buttonHeight+"px",t.btnT.innerHTML="",t.btnT.appendChild(document.createTextNode(d.closeText)),a(),f(),e.picker.owner&&e.picker.owner!==d&&e.unsetClass(e.picker.owner.targetElement,d.activeClass),e.picker.owner=d,e.isElementType(v,"body")?e.redrawPosition():e._drawPosition(d,0,0,"relative",!1),t.wrap.parentNode!=v&&v.appendChild(t.wrap),e.setClass(d.targetElement,d.activeClass)}function a(){switch(e.getPadYComponent(d)){case"s":var t=1;break;case"v":var t=2}var n=Math.round(d.hsv[0]/360*(d.width-1)),r=Math.round((1-d.hsv[t]/100)*(d.height-1)),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,o=-Math.floor(i/2);e.picker.cross.style.left=n+o+"px",e.picker.cross.style.top=r+o+"px";switch(e.getSliderComponent(d)){case"s":var u=s(d.hsv[0],100,d.hsv[2]),a=s(d.hsv[0],0,d.hsv[2]),f="rgb("+Math.round(u[0])+","+Math.round(u[1])+","+Math.round(u[2])+")",l="rgb("+Math.round(a[0])+","+Math.round(a[1])+","+Math.round(a[2])+")";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l);break;case"v":var c=s(d.hsv[0],d.hsv[1],100),f="rgb("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+")",l="#000";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l)}}function f(){var t=e.getSliderComponent(d);if(t){switch(t){case"s":var n=1;break;case"v":var n=2}var r=Math.round((1-d.hsv[n]/100)*(d.height-1));e.picker.sldPtrOB.style.top=r-(2*d.pointerBorderWidth+d.pointerThickness)-Math.floor(m/2)+"px"}}function l(){return e.picker&&e.picker.owner===d}function c(){d.importColor()}this.value=null,this.valueElement=t,this.styleElement=t,this.required=!0,this.refine=!0,this.hash=!1,this.uppercase=!0,this.onFineChange=null,this.activeClass="jscolor-active",this.minS=0,this.maxS=100,this.minV=0,this.maxV=100,this.hsv=[0,0,100],this.rgb=[255,255,255],this.width=181,this.height=101,this.showOnClick=!0,this.mode="HSV",this.position="bottom",this.smartPosition=!0,this.sliderSize=16,this.crossSize=8,this.closable=!1,this.closeText="Close",this.buttonColor="#000000",this.buttonHeight=18,this.padding=12,this.backgroundColor="#FFFFFF",this.borderWidth=1,this.borderColor="#BBBBBB",this.borderRadius=8,this.insetWidth=1,this.insetColor="#BBBBBB",this.shadow=!0,this.shadowBlur=15,this.shadowColor="rgba(0,0,0,0.2)",this.pointerColor="#4C4C4C",this.pointerBorderColor="#FFFFFF",this.pointerBorderWidth=1,this.pointerThickness=2,this.zIndex=1e3,this.container=null;for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r]);this.hide=function(){l()&&o()},this.show=function(){u()},this.redraw=function(){l()&&u()},this.importColor=function(){this.valueElement?e.isElementType(this.valueElement,"input")?this.refine?!this.required&&/^\s*$/.test(this.valueElement.value)?(this.valueElement.value="",this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.fromString(this.valueElement.value)||this.exportColor():this.fromString(this.valueElement.value,e.leaveValue)||(this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.exportColor():this.exportColor()},this.exportColor=function(t){if(!(t&e.leaveValue)&&this.valueElement){var n=this.toString();this.uppercase&&(n=n.toUpperCase()),this.hash&&(n="#"+n),e.isElementType(this.valueElement,"input")?this.valueElement.value=n:this.valueElement.innerHTML=n}t&e.leaveStyle||this.styleElement&&(this.styleElement.style.backgroundImage="none",this.styleElement.style.backgroundColor="#"+this.toString(),this.styleElement.style.color=this.isLight()?"#000":"#FFF"),!(t&e.leavePad)&&l()&&a(),!(t&e.leaveSld)&&l()&&f()},this.fromHSV=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(360,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(100,this.maxS,t),this.minS)}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(100,this.maxV,n),this.minV)}this.rgb=s(e===null?this.hsv[0]:this.hsv[0]=e,t===null?this.hsv[1]:this.hsv[1]=t,n===null?this.hsv[2]:this.hsv[2]=n),this.exportColor(r)},this.fromRGB=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(255,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(255,t))}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(255,n))}var o=i(e===null?this.rgb[0]:e,t===null?this.rgb[1]:t,n===null?this.rgb[2]:n);o[0]!==null&&(this.hsv[0]=Math.max(0,Math.min(360,o[0]))),o[2]!==0&&(this.hsv[1]=o[1]===null?null:Math.max(0,this.minS,Math.min(100,this.maxS,o[1]))),this.hsv[2]=o[2]===null?null:Math.max(0,this.minV,Math.min(100,this.maxV,o[2]));var u=s(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=u[0],this.rgb[1]=u[1],this.rgb[2]=u[2],this.exportColor(r)},this.fromString=function(e,t){var n;if(n=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i))return n[1].length===6?this.fromRGB(parseInt(n[1].substr(0,2),16),parseInt(n[1].substr(2,2),16),parseInt(n[1].substr(4,2),16),t):this.fromRGB(parseInt(n[1].charAt(0)+n[1].charAt(0),16),parseInt(n[1].charAt(1)+n[1].charAt(1),16),parseInt(n[1].charAt(2)+n[1].charAt(2),16),t),!0;if(n=e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)){var r=n[1].split(","),i=/^\s*(\d*)(\.\d+)?\s*$/,s,o,u;if(r.length>=3&&(s=r[0].match(i))&&(o=r[1].match(i))&&(u=r[2].match(i))){var a=parseFloat((s[1]||"0")+(s[2]||"")),f=parseFloat((o[1]||"0")+(o[2]||"")),l=parseFloat((u[1]||"0")+(u[2]||""));return this.fromRGB(a,f,l,t),!0}}return!1},this.toString=function(){return(256|Math.round(this.rgb[0])).toString(16).substr(1)+(256|Math.round(this.rgb[1])).toString(16).substr(1)+(256|Math.round(this.rgb[2])).toString(16).substr(1)},this.toHEXString=function(){return"#"+this.toString().toUpperCase()},this.toRGBString=function(){return"rgb("+Math.round(this.rgb[0])+","+Math.round(this.rgb[1])+","+Math.round(this.rgb[2])+")"},this.isLight=function(){return.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]>127.5},this._processParentElementsInDOM=function(){if(this._linkedElementsProcessed)return;this._linkedElementsProcessed=!0;var t=this.targetElement;do{var n=e.getStyle(t);n&&n.position.toLowerCase()==="fixed"&&(this.fixed=!0),t!==this.targetElement&&(t._jscEventsAttached||(e.attachEvent(t,"scroll",e.onParentScroll),t._jscEventsAttached=!0))}while((t=t.parentNode)&&!e.isElementType(t,"body"))};if(typeof t=="string"){var h=t,p=document.getElementById(h);p?this.targetElement=p:e.warn("Could not find target element with ID '"+h+"'")}else t?this.targetElement=t:e.warn("Invalid target element: '"+t+"'");if(this.targetElement._jscLinkedInstance){e.warn("Cannot link jscolor twice to the same element. Skipping.");return}this.targetElement._jscLinkedInstance=this,this.valueElement=e.fetchElement(this.valueElement),this.styleElement=e.fetchElement(this.styleElement);var d=this,v=this.container?e.fetchElement(this.container):document.getElementsByTagName("body")[0],m=3;if(e.isElementType(this.targetElement,"button"))if(this.targetElement.onclick){var g=this.targetElement.onclick;this.targetElement.onclick=function(e){return g.call(this,e),!1}}else this.targetElement.onclick=function(){return!1};if(this.valueElement&&e.isElementType(this.valueElement,"input")){var y=function(){d.fromString(d.valueElement.value,e.leaveValue),e.dispatchFineChange(d)};e.attachEvent(this.valueElement,"keyup",y),e.attachEvent(this.valueElement,"input",y),e.attachEvent(this.valueElement,"blur",c),this.valueElement.setAttribute("autocomplete","off")}this.styleElement&&(this.styleElement._jscOrigStyle={backgroundImage:this.styleElement.style.backgroundImage,backgroundColor:this.styleElement.style.backgroundColor,color:this.styleElement.style.color}),this.value?this.fromString(this.value)||this.exportColor():this.importColor()}};return e.jscolor.lookupClass="jscolor",e.jscolor.installByClassName=function(t){var n=document.getElementsByTagName("input"),r=document.getElementsByTagName("button");e.tryInstallOnElements(n,t),e.tryInstallOnElements(r,t)},e.register(),e.jscolor}());
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Sweetalert2=t()}(this,function(){"use strict";var e={title:"",titleText:"",text:"",html:"",type:null,customClass:"",target:"body",animation:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:"#3085d6",confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:"#aaa",cancelButtonClass:null,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusCancel:!1,showCloseButton:!1,closeButtonAriaLabel:"Close this dialog",showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageAlt:"",imageClass:null,timer:null,width:500,padding:20,background:"#fff",input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:null,inputAttributes:{},inputValidator:null,grow:!1,position:"center",progressSteps:[],currentProgressStep:null,progressStepsDistance:"40px",onBeforeOpen:null,onOpen:null,onClose:null,useRejections:!0},t=function(e){var t={};for(var n in e)t[e[n]]="swal2-"+e[n];return t},n=t(["container","shown","iosfix","modal","overlay","fade","show","hide","noanimation","close","title","content","buttonswrapper","confirm","cancel","icon","image","input","file","range","select","radio","checkbox","textarea","inputerror","validationerror","progresssteps","activeprogressstep","progresscircle","progressline","loading","styled","top","top-left","top-right","center","center-left","center-right","bottom","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen"]),o=t(["success","warning","info","question","error"]),r=function(e,t){(e=String(e).replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n="#",o=0;o<3;o++){var r=parseInt(e.substr(2*o,2),16);n+=("00"+(r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16))).substr(r.length)}return n},i=function(e){var t=[];for(var n in e)-1===t.indexOf(e[n])&&t.push(e[n]);return t},a=function(e){console.warn("SweetAlert2: "+e)},l=function(e){console.error("SweetAlert2: "+e)},s={previousWindowKeyDown:null,previousActiveElement:null,previousBodyPadding:null},u=function(e){var t=d();t&&t.parentNode.removeChild(t);{if("undefined"!=typeof document){var o=document.createElement("div");o.className=n.container,o.innerHTML=c,("string"==typeof e.target?document.querySelector(e.target):e.target).appendChild(o);var r=p(),i=L(r,n.input),a=L(r,n.file),s=r.querySelector("."+n.range+" input"),u=r.querySelector("."+n.range+" output"),f=L(r,n.select),m=r.querySelector("."+n.checkbox+" input"),v=L(r,n.textarea);return i.oninput=function(){Y.resetValidationError()},a.onchange=function(){Y.resetValidationError()},s.oninput=function(){Y.resetValidationError(),u.value=s.value},s.onchange=function(){Y.resetValidationError(),s.previousSibling.value=s.value},f.onchange=function(){Y.resetValidationError()},m.onchange=function(){Y.resetValidationError()},v.oninput=function(){Y.resetValidationError()},r}l("SweetAlert2 requires document to initialize")}},c=('\n <div role="dialog" aria-modal="true" aria-labelledby="'+n.title+'" aria-describedby="'+n.content+'" class="'+n.modal+'" tabindex="-1">\n   <ul class="'+n.progresssteps+'"></ul>\n   <div class="'+n.icon+" "+o.error+'">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="'+n.icon+" "+o.question+'">?</div>\n   <div class="'+n.icon+" "+o.warning+'">!</div>\n   <div class="'+n.icon+" "+o.info+'">i</div>\n   <div class="'+n.icon+" "+o.success+'">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="'+n.image+'" />\n   <h2 class="'+n.title+'" id="'+n.title+'"></h2>\n   <div id="'+n.content+'" class="'+n.content+'"></div>\n   <input class="'+n.input+'" />\n   <input type="file" class="'+n.file+'" />\n   <div class="'+n.range+'">\n     <output></output>\n     <input type="range" />\n   </div>\n   <select class="'+n.select+'"></select>\n   <div class="'+n.radio+'"></div>\n   <label for="'+n.checkbox+'" class="'+n.checkbox+'">\n     <input type="checkbox" />\n   </label>\n   <textarea class="'+n.textarea+'"></textarea>\n   <div class="'+n.validationerror+'" id="'+n.validationerror+'"></div>\n   <div class="'+n.buttonswrapper+'">\n     <button type="button" class="'+n.confirm+'">OK</button>\n     <button type="button" class="'+n.cancel+'">Cancel</button>\n   </div>\n   <button type="button" class="'+n.close+'">×</button>\n </div>\n').replace(/(^|\n)\s*/g,""),d=function(){return document.body.querySelector("."+n.container)},p=function(){return d()?d().querySelector("."+n.modal):null},f=function(){return p().querySelectorAll("."+n.icon)},m=function(e){return d()?d().querySelector("."+e):null},v=function(){return m(n.title)},g=function(){return m(n.content)},b=function(){return m(n.image)},h=function(){return m(n.progresssteps)},y=function(){return m(n.validationerror)},w=function(){return m(n.confirm)},C=function(){return m(n.cancel)},k=function(){return m(n.buttonswrapper)},x=function(){return m(n.close)},S=function(){var e=Array.from(p().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e,t){return e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex")),e>t?1:e<t?-1:0}),t=Array.prototype.slice.call(p().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));return i(e.concat(t))},A=function(e,t){return!!e.classList&&e.classList.contains(t)},B=function(e){if(e.focus(),"file"!==e.type){var t=e.value;e.value="",e.value=t}},E=function(e,t){e&&t&&t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.add(t)})},P=function(e,t){e&&t&&t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.remove(t)})},L=function(e,t){for(var n=0;n<e.childNodes.length;n++)if(A(e.childNodes[n],t))return e.childNodes[n]},T=function(e,t){t||(t="block"),e.style.opacity="",e.style.display=t},q=function(e){e.style.opacity="",e.style.display="none"},V=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},O=function(e){return e.offsetWidth||e.offsetHeight||e.getClientRects().length},M=function(e,t){e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(t)},N=function(){var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(var n in t)if(t.hasOwnProperty(n)&&void 0!==e.style[n])return t[n];return!1}(),j=function(){if(window.onkeydown=s.previousWindowKeyDown,s.previousActiveElement&&s.previousActiveElement.focus){var e=window.scrollX,t=window.scrollY;s.previousActiveElement.focus(),e&&t&&window.scrollTo(e,t)}},H=function(){if("ontouchstart"in window||navigator.msMaxTouchPoints)return 0;var e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t},I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R=(function(){function e(e){this.value=e}function t(t){function n(r,i){try{var a=t[r](i),l=a.value;l instanceof e?Promise.resolve(l.value).then(function(e){n("next",e)},function(e){n("throw",e)}):o(a.done?"return":"normal",a.value)}catch(e){o("throw",e)}}function o(e,t){switch(e){case"return":r.resolve({value:t,done:!0});break;case"throw":r.reject(t);break;default:r.resolve({value:t,done:!1})}(r=r.next)?n(r.key,r.arg):i=null}var r,i;this._invoke=function(e,t){return new Promise(function(o,a){var l={key:e,arg:t,resolve:o,reject:a,next:null};i?i=i.next=l:(r=i=l,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}),U=R({},e),W=[];"undefined"==typeof Promise&&l("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/limonte/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");var D=function(e){("string"==typeof e.target&&!document.querySelector(e.target)||"string"!=typeof e.target&&!e.target.appendChild)&&(a('Target parameter is not valid, defaulting to "body"'),e.target="body");var t=void 0,r=p(),i="string"==typeof e.target?document.querySelector(e.target):e.target;t=r&&i&&r.parentNode!==i.parentNode?u(e):r||u(e);for(var s in e)Y.isValidParameter(s)||a('Unknown parameter "'+s+'"');t.style.width="number"==typeof e.width?e.width+"px":e.width,t.style.padding=e.padding+"px",t.style.background=e.background;for(var c=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),m=0;m<c.length;m++)c[m].style.background=e.background;var y=d(),S=v(),A=g(),B=k(),L=w(),O=C(),N=x();if(e.titleText?S.innerText=e.titleText:S.innerHTML=e.title.split("\n").join("<br />"),e.text||e.html){if("object"===I(e.html))if(A.innerHTML="",0 in e.html)for(var j=0;j in e.html;j++)A.appendChild(e.html[j].cloneNode(!0));else A.appendChild(e.html.cloneNode(!0));else e.html?A.innerHTML=e.html:e.text&&(A.textContent=e.text);T(A)}else q(A);if(e.position in n&&E(y,n[e.position]),e.grow&&"string"==typeof e.grow){var H="grow-"+e.grow;H in n&&E(y,n[H])}e.showCloseButton?(N.setAttribute("aria-label",e.closeButtonAriaLabel),T(N)):q(N),t.className=n.modal,e.customClass&&E(t,e.customClass);var R=h(),U=parseInt(null===e.currentProgressStep?Y.getQueueStep():e.currentProgressStep,10);e.progressSteps.length?(T(R),V(R),U>=e.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),e.progressSteps.forEach(function(t,o){var r=document.createElement("li");if(E(r,n.progresscircle),r.innerHTML=t,o===U&&E(r,n.activeprogressstep),R.appendChild(r),o!==e.progressSteps.length-1){var i=document.createElement("li");E(i,n.progressline),i.style.width=e.progressStepsDistance,R.appendChild(i)}})):q(R);for(var W=f(),D=0;D<W.length;D++)q(W[D]);if(e.type){var K=!1;for(var z in o)if(e.type===z){K=!0;break}if(!K)return l("Unknown alert type: "+e.type),!1;var _=t.querySelector("."+n.icon+"."+o[e.type]);if(T(_),e.animation)switch(e.type){case"success":E(_,"swal2-animate-success-icon"),E(_.querySelector(".swal2-success-line-tip"),"swal2-animate-success-line-tip"),E(_.querySelector(".swal2-success-line-long"),"swal2-animate-success-line-long");break;case"error":E(_,"swal2-animate-error-icon"),E(_.querySelector(".swal2-x-mark"),"swal2-animate-x-mark")}}var Z=b();e.imageUrl?(Z.setAttribute("src",e.imageUrl),Z.setAttribute("alt",e.imageAlt),T(Z),e.imageWidth?Z.setAttribute("width",e.imageWidth):Z.removeAttribute("width"),e.imageHeight?Z.setAttribute("height",e.imageHeight):Z.removeAttribute("height"),Z.className=n.image,e.imageClass&&E(Z,e.imageClass)):q(Z),e.showCancelButton?O.style.display="inline-block":q(O),e.showConfirmButton?M(L,"display"):q(L),e.showConfirmButton||e.showCancelButton?T(B):q(B),L.innerHTML=e.confirmButtonText,O.innerHTML=e.cancelButtonText,L.setAttribute("aria-label",e.confirmButtonAriaLabel),O.setAttribute("aria-label",e.cancelButtonAriaLabel),e.buttonsStyling&&(L.style.backgroundColor=e.confirmButtonColor,O.style.backgroundColor=e.cancelButtonColor),L.className=n.confirm,E(L,e.confirmButtonClass),O.className=n.cancel,E(O,e.cancelButtonClass),e.buttonsStyling?(E(L,n.styled),E(O,n.styled)):(P(L,n.styled),P(O,n.styled),L.style.backgroundColor=L.style.borderLeftColor=L.style.borderRightColor="",O.style.backgroundColor=O.style.borderLeftColor=O.style.borderRightColor=""),!0===e.animation?P(t,n.noanimation):E(t,n.noanimation),e.showLoaderOnConfirm&&!e.preConfirm&&a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://limonte.github.io/sweetalert2/#ajax-request")},K=function(e,t,o){var r=d(),i=p();null!==t&&"function"==typeof t&&t(i),e?(E(i,n.show),E(r,n.fade),P(i,n.hide)):P(i,n.fade),T(i),r.style.overflowY="hidden",N&&!A(i,n.noanimation)?i.addEventListener(N,function e(){i.removeEventListener(N,e),r.style.overflowY="auto"}):r.style.overflowY="auto",E(document.documentElement,n.shown),E(document.body,n.shown),E(r,n.shown),z(),Z(),s.previousActiveElement=document.activeElement,null!==o&&"function"==typeof o&&setTimeout(function(){o(i)})},z=function(){null===s.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(s.previousBodyPadding=document.body.style.paddingRight,document.body.style.paddingRight=H()+"px")},_=function(){null!==s.previousBodyPadding&&(document.body.style.paddingRight=s.previousBodyPadding,s.previousBodyPadding=null)},Z=function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&!A(document.body,n.iosfix)){var e=document.body.scrollTop;document.body.style.top=-1*e+"px",E(document.body,n.iosfix)}},Q=function(){if(A(document.body,n.iosfix)){var e=parseInt(document.body.style.top,10);P(document.body,n.iosfix),document.body.style.top="",document.body.scrollTop=-1*e}},Y=function e(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];if(void 0===o[0])return l("SweetAlert2 expects at least 1 attribute!"),!1;var a=R({},U);switch(I(o[0])){case"string":a.title=o[0],a.html=o[1],a.type=o[2];break;case"object":R(a,o[0]),a.extraParams=o[0].extraParams,"email"===a.input&&null===a.inputValidator&&(a.inputValidator=function(e){return new Promise(function(t,n){/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e)?t():n("Invalid email address")})}),"url"===a.input&&null===a.inputValidator&&(a.inputValidator=function(e){return new Promise(function(t,n){/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e)?t():n("Invalid URL")})});break;default:return l('Unexpected type of argument! Expected "string" or "object", got '+I(o[0])),!1}D(a);var u=d(),c=p();return new Promise(function(t,o){a.timer&&(c.timeout=setTimeout(function(){e.closeModal(a.onClose),a.useRejections?o("timer"):t({dismiss:"timer"})},a.timer));var i=function(e){if(!(e=e||a.input))return null;switch(e){case"select":case"textarea":case"file":return L(c,n[e]);case"checkbox":return c.querySelector("."+n.checkbox+" input");case"radio":return c.querySelector("."+n.radio+" input:checked")||c.querySelector("."+n.radio+" input:first-child");case"range":return c.querySelector("."+n.range+" input");default:return L(c,n.input)}},p=function(){var e=i();if(!e)return null;switch(a.input){case"checkbox":return e.checked?1:0;case"radio":return e.checked?e.value:null;case"file":return e.files.length?e.files[0]:null;default:return a.inputAutoTrim?e.value.trim():e.value}};a.input&&setTimeout(function(){var e=i();e&&B(e)},0);for(var f=function(n){a.showLoaderOnConfirm&&e.showLoading(),a.preConfirm?a.preConfirm(n,a.extraParams).then(function(o){e.closeModal(a.onClose),t(o||n)},function(t){e.hideLoading(),t&&e.showValidationError(t)}):(e.closeModal(a.onClose),t(a.useRejections?n:{value:n}))},m=function(n){var i=n||window.event,l=i.target||i.srcElement,s=w(),u=C(),c=s&&(s===l||s.contains(l)),d=u&&(u===l||u.contains(l));switch(i.type){case"mouseover":case"mouseup":a.buttonsStyling&&(c?s.style.backgroundColor=r(a.confirmButtonColor,-.1):d&&(u.style.backgroundColor=r(a.cancelButtonColor,-.1)));break;case"mouseout":a.buttonsStyling&&(c?s.style.backgroundColor=a.confirmButtonColor:d&&(u.style.backgroundColor=a.cancelButtonColor));break;case"mousedown":a.buttonsStyling&&(c?s.style.backgroundColor=r(a.confirmButtonColor,-.2):d&&(u.style.backgroundColor=r(a.cancelButtonColor,-.2)));break;case"click":if(c&&e.isVisible())if(e.disableButtons(),a.input){var m=p();a.inputValidator?(e.disableInput(),a.inputValidator(m,a.extraParams).then(function(){e.enableButtons(),e.enableInput(),f(m)},function(t){e.enableButtons(),e.enableInput(),t&&e.showValidationError(t)})):f(m)}else f(!0);else d&&e.isVisible()&&(e.disableButtons(),e.closeModal(a.onClose),a.useRejections?o("cancel"):t({dismiss:"cancel"}))}},A=c.querySelectorAll("button"),V=0;V<A.length;V++)A[V].onclick=m,A[V].onmouseover=m,A[V].onmouseout=m,A[V].onmousedown=m;x().onclick=function(){e.closeModal(a.onClose),a.useRejections?o("close"):t({dismiss:"close"})},u.onclick=function(n){n.target===u&&a.allowOutsideClick&&(e.closeModal(a.onClose),a.useRejections?o("overlay"):t({dismiss:"overlay"}))};var M=k(),N=w(),j=C();a.reverseButtons?N.parentNode.insertBefore(j,N):N.parentNode.insertBefore(N,j);var H=function(e,t){for(var n=S(a.focusCancel),o=0;o<n.length;o++){(e+=t)===n.length?e=0:-1===e&&(e=n.length-1);var r=n[e];if(O(r))return r.focus()}},R=function(n){var r=n||window.event;if("Enter"===r.key)r.target===i()&&(e.clickConfirm(),r.preventDefault());else if("Tab"===r.key){for(var l=r.target||r.srcElement,s=S(a.focusCancel),u=-1,c=0;c<s.length;c++)if(l===s[c]){u=c;break}r.shiftKey?H(u,-1):H(u,1),r.stopPropagation(),r.preventDefault()}else-1!==["ArrowLeft","ArrowRight","ArrowUp","Arrowdown"].indexOf(r.key)?document.activeElement===N&&O(j)?j.focus():document.activeElement===j&&O(N)&&N.focus():"Escape"===r.key&&!0===a.allowEscapeKey&&(e.closeModal(a.onClose),a.useRejections?o("esc"):t({dismiss:"esc"}))};window.onkeydown&&window.onkeydown.toString()===R.toString()||(s.previousWindowKeyDown=window.onkeydown,window.onkeydown=R),a.buttonsStyling&&(N.style.borderLeftColor=a.confirmButtonColor,N.style.borderRightColor=a.confirmButtonColor),e.hideLoading=e.disableLoading=function(){a.showConfirmButton||(q(N),a.showCancelButton||q(k())),P(M,n.loading),P(c,n.loading),c.removeAttribute("aria-busy"),N.disabled=!1,j.disabled=!1},e.getTitle=function(){return v()},e.getContent=function(){return g()},e.getInput=function(){return i()},e.getImage=function(){return b()},e.getButtonsWrapper=function(){return k()},e.getConfirmButton=function(){return w()},e.getCancelButton=function(){return C()},e.enableButtons=function(){N.disabled=!1,j.disabled=!1},e.disableButtons=function(){N.disabled=!0,j.disabled=!0},e.enableConfirmButton=function(){N.disabled=!1},e.disableConfirmButton=function(){N.disabled=!0},e.enableInput=function(){var e=i();if(!e)return!1;if("radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!1;else e.disabled=!1},e.disableInput=function(){var e=i();if(!e)return!1;if(e&&"radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!0;else e.disabled=!0},e.showValidationError=function(e){var t=y();t.innerHTML=e,T(t);var o=i();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedBy",n.validationerror),B(o),E(o,n.inputerror))},e.resetValidationError=function(){var e=y();q(e);var t=i();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedBy"),P(t,n.inputerror))},e.getProgressSteps=function(){return a.progressSteps},e.setProgressSteps=function(e){a.progressSteps=e,D(a)},e.showProgressSteps=function(){T(h())},e.hideProgressSteps=function(){q(h())},e.enableButtons(),e.hideLoading(),e.resetValidationError();for(var U=["input","file","range","select","radio","checkbox","textarea"],W=void 0,z=0;z<U.length;z++){var _=n[U[z]],Z=L(c,_);if(W=i(U[z])){for(var Q in W.attributes)if(W.attributes.hasOwnProperty(Q)){var Y=W.attributes[Q].name;"type"!==Y&&"value"!==Y&&W.removeAttribute(Y)}for(var $ in a.inputAttributes)W.setAttribute($,a.inputAttributes[$])}Z.className=_,a.inputClass&&E(Z,a.inputClass),q(Z)}var J=void 0;switch(a.input){case"text":case"email":case"password":case"number":case"tel":case"url":(W=L(c,n.input)).value=a.inputValue,W.placeholder=a.inputPlaceholder,W.type=a.input,T(W);break;case"file":(W=L(c,n.file)).placeholder=a.inputPlaceholder,W.type=a.input,T(W);break;case"range":var X=L(c,n.range),F=X.querySelector("input"),G=X.querySelector("output");F.value=a.inputValue,F.type=a.input,G.value=a.inputValue,T(X);break;case"select":var ee=L(c,n.select);if(ee.innerHTML="",a.inputPlaceholder){var te=document.createElement("option");te.innerHTML=a.inputPlaceholder,te.value="",te.disabled=!0,te.selected=!0,ee.appendChild(te)}J=function(e){for(var t in e){var n=document.createElement("option");n.value=t,n.innerHTML=e[t],a.inputValue.toString()===t&&(n.selected=!0),ee.appendChild(n)}T(ee),ee.focus()};break;case"radio":var ne=L(c,n.radio);ne.innerHTML="",J=function(e){for(var t in e){var o=document.createElement("input"),r=document.createElement("label"),i=document.createElement("span");o.type="radio",o.name=n.radio,o.value=t,a.inputValue.toString()===t&&(o.checked=!0),i.innerHTML=e[t],r.appendChild(o),r.appendChild(i),r.for=o.id,ne.appendChild(r)}T(ne);var l=ne.querySelectorAll("input");l.length&&l[0].focus()};break;case"checkbox":var oe=L(c,n.checkbox),re=i("checkbox");re.type="checkbox",re.value=1,re.id=n.checkbox,re.checked=Boolean(a.inputValue);var ie=oe.getElementsByTagName("span");ie.length&&oe.removeChild(ie[0]),(ie=document.createElement("span")).innerHTML=a.inputPlaceholder,oe.appendChild(ie),T(oe);break;case"textarea":var ae=L(c,n.textarea);ae.value=a.inputValue,ae.placeholder=a.inputPlaceholder,T(ae);break;case null:break;default:l('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'+a.input+'"')}"select"!==a.input&&"radio"!==a.input||(a.inputOptions instanceof Promise?(e.showLoading(),a.inputOptions.then(function(t){e.hideLoading(),J(t)})):"object"===I(a.inputOptions)?J(a.inputOptions):l("Unexpected type of inputOptions! Expected object or Promise, got "+I(a.inputOptions))),K(a.animation,a.onBeforeOpen,a.onOpen),a.allowEnterKey?a.focusCancel&&O(j)?j.focus():a.focusConfirm&&O(N)?N.focus():H(-1,1):document.activeElement&&document.activeElement.blur(),d().scrollTop=0})};return Y.isVisible=function(){return!!p()},Y.queue=function(e){W=e;var t=function(){W=[],document.body.removeAttribute("data-swal2-queue-step")},n=[];return new Promise(function(e,o){!function r(i,a){i<W.length?(document.body.setAttribute("data-swal2-queue-step",i),Y(W[i]).then(function(e){n.push(e),r(i+1,a)},function(e){t(),o(e)})):(t(),e(n))}(0)})},Y.getQueueStep=function(){return document.body.getAttribute("data-swal2-queue-step")},Y.insertQueueStep=function(e,t){return t&&t<W.length?W.splice(t,0,e):W.push(e)},Y.deleteQueueStep=function(e){void 0!==W[e]&&W.splice(e,1)},Y.close=Y.closeModal=function(e){var t=d(),o=p();if(o){P(o,n.show),E(o,n.hide),clearTimeout(o.timeout),j();var r=function(){t.parentNode&&t.parentNode.removeChild(t),P(document.documentElement,n.shown),P(document.body,n.shown),_(),Q()};N&&!A(o,n.noanimation)?o.addEventListener(N,function e(){o.removeEventListener(N,e),A(o,n.hide)&&r()}):r(),null!==e&&"function"==typeof e&&setTimeout(function(){e(o)})}},Y.clickConfirm=function(){return w().click()},Y.clickCancel=function(){return C().click()},Y.showLoading=Y.enableLoading=function(){var e=p();e||Y(""),e=p();var t=k(),o=w(),r=C();T(t),T(o,"inline-block"),E(t,n.loading),E(e,n.loading),o.disabled=!0,r.disabled=!0,e.setAttribute("aria-busy",!0),e.focus()},Y.isValidParameter=function(t){return e.hasOwnProperty(t)||"extraParams"===t},Y.setDefaults=function(e){if(!e||"object"!==(void 0===e?"undefined":I(e)))return l("the argument for setDefaults() is required and has to be a object");for(var t in e)Y.isValidParameter(t)||(a('Unknown parameter "'+t+'"'),delete e[t]);R(U,e)},Y.resetDefaults=function(){U=R({},e)},Y.noop=function(){},Y.version="6.11.4",Y.default=Y,Y}),window.Sweetalert2&&(window.sweetAlert=window.swal=window.Sweetalert2);
/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".select2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("unselect",function(){b.isOpen()&&(d.setClasses(),d.highlightFirstItem())}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");
if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){d.status&&"0"===d.status||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b),d=g.$element.find("option").filter(function(){return a(this).val()===c.id});if(!d.length){var e=g.option(c);e.attr("data-select2-tag",!0),g._removeOldTags(),g.addOptions([e])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("focus",function(){c.isOpen()&&e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},a.prototype._handleSelectOnClose=function(a,b){if(b&&null!=b.originalSelect2Event){var c=b.originalSelect2Event;if("select"===c._type||"unselect"===c._type)return}var d=this.getHighlightedResults();if(!(d.length<1)){var e=d.data("data");null!=e.element&&e.element.selected||null==e.element&&e.selected||this.trigger("select",{data:e})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{originalEvent:c,originalSelect2Event:b})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.select2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null;
},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,f=Array.prototype.slice.call(arguments,1);return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2."),d=c[b].apply(c,f)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){var b=this;a(document).ready(function(){b.enable(),b.build()})},b.prototype.enable=function(){var b=this;a("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){var b=this;a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")),this.$lightbox=a("#lightbox"),this.$overlay=a("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return b.end(),!1}),this.$lightbox.hide().on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$outerContainer.on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(a){3===a.which&&(b.$nav.css("pointer-events","none"),b.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(b),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return b.end(),!1})},b.prototype.start=function(b){function c(a){d.album.push({link:a.attr("href"),title:a.attr("data-title")||a.attr("title")})}var d=this,e=a(window);e.on("resize",a.proxy(this.sizeOverlay,this)),a("select, object, embed").css({visibility:"hidden"}),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr("data-lightbox");if(h){f=a(b.prop("tagName")+'[data-lightbox="'+h+'"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if("lightbox"===b.attr("rel"))c(b);else{f=a(b.prop("tagName")+'[rel="'+b.attr("rel")+'"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+"px",left:l+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a("body").addClass("lb-disable-scrolling"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this;this.disableKeyboardNav();var d=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration),a(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var e=new Image;e.onload=function(){var f,g,h,i,j,k,l;d.attr("src",c.album[b].link),f=a(e),d.width(e.width),d.height(e.height),c.options.fitImagesInViewport&&(l=a(window).width(),k=a(window).height(),j=l-c.containerPadding.left-c.containerPadding.right-c.imageBorderWidth.left-c.imageBorderWidth.right-20,i=k-c.containerPadding.top-c.containerPadding.bottom-c.imageBorderWidth.top-c.imageBorderWidth.bottom-120,c.options.maxWidth&&c.options.maxWidth<j&&(j=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<j&&(i=c.options.maxHeight),(e.width>j||e.height>i)&&(e.width/j>e.height/i?(h=j,g=parseInt(e.height/(e.width/h),10),d.width(h),d.height(g)):(g=i,h=parseInt(e.width/(e.height/g),10),d.width(h),d.height(g)))),c.sizeContainer(d.width(),d.height())},e.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){this.$overlay.width(a(document).width()).height(a(document).height())},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(".lb-dataContainer").width(g),d.$lightbox.find(".lb-prevLink").height(h),d.$lightbox.find(".lb-nextLink").height(h),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,h=b+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,"swing",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent("TouchEvent"),a=this.options.alwaysShowNavOnTouchDevices?!0:!1}catch(b){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),a&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),a&&this.$lightbox.find(".lb-next").css("opacity","1"))))},b.prototype.updateDetails=function(){var b=this;if("undefined"!=typeof this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var c=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?c.text(this.album[this.currentImageIndex].title):c.html(this.album[this.currentImageIndex].title),c.fadeIn("fast").find("a").on("click",function(b){void 0!==a(this).attr("target")?window.open(a(this).attr("href"),a(this).attr("target")):location.href=a(this).attr("href")})}if(this.album.length>1&&this.options.showImageNumberLabel){var d=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(d).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return b.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){var a=new Image;a.src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){var b=new Image;b.src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){a(document).on("keyup.keyboard",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){a(document).off(".keyboard")},b.prototype.keyboardAction=function(a){var b=27,c=37,d=39,e=a.keyCode,f=String.fromCharCode(e).toLowerCase();e===b||f.match(/x|o|c/)?this.end():"p"===f||e===c?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):("n"===f||e===d)&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),a("select, object, embed").css({visibility:"visible"}),this.options.disableScrolling&&a("body").removeClass("lb-disable-scrolling")},new b});
//# sourceMappingURL=lightbox.min.map
/*!
 * jScroll - jQuery Plugin for Infinite Scrolling / Auto-Paging
 * @see @link{http://jscroll.com}
 *
 * @copyright 2011-2017, Philip Klauzinski
 * @license Dual licensed under the MIT and GPL Version 2 licenses.
 * @author Philip Klauzinski (http://webtopian.com)
 * @version 2.3.9
 * @requires jQuery v1.4.3+
 * @preserve
 */
(function($) {

    'use strict';

    // Define the jscroll namespace and default settings
    $.jscroll = {
        defaults: {
            debug: false,
            autoTrigger: true,
            autoTriggerUntil: false,
            loadingHtml: '<small>Loading...</small>',
            loadingFunction: false,
            padding: 0,
            nextSelector: 'a:last',
            contentSelector: '',
            pagingSelector: '',
            callback: false
        }
    };

    // Constructor
    var jScroll = function($e, options) {

        // Private vars and methods
        var _data = $e.data('jscroll'),
            _userOptions = (typeof options === 'function') ? { callback: options } : options,
            _options = $.extend({}, $.jscroll.defaults, _userOptions, _data || {}),
            _isWindow = ($e.css('overflow-y') === 'visible'),
            _$next = $e.find(_options.nextSelector).first(),
            _$window = $(window),
            _$body = $('body'),
            _$scroll = _isWindow ? _$window : $e,
            _nextHref = $.trim(_$next.attr('href') + ' ' + _options.contentSelector),

            // Check if a loading image is defined and preload
            _preloadImage = function() {
                var src = $(_options.loadingHtml).filter('img').attr('src');
                if (src) {
                    var image = new Image();
                    image.src = src;
                }
            },

            // Wrap inner content, if it isn't already
            _wrapInnerContent = function() {
                if (!$e.find('.jscroll-inner').length) {
                    $e.contents().wrapAll('<div class="jscroll-inner" />');
                }
            },

            // Find the next link's parent, or add one, and hide it
            _nextWrap = function($next) {
                var $parent;
                if (_options.pagingSelector) {
                    $next.closest(_options.pagingSelector).hide();
                } else {
                    $parent = $next.parent().not('.jscroll-inner,.jscroll-added').addClass('jscroll-next-parent').hide();
                    if (!$parent.length) {
                        $next.wrap('<div class="jscroll-next-parent" />').parent().hide();
                    }
                }
            },

            // Remove the jscroll behavior and data from an element
            _destroy = function() {
                return _$scroll.unbind('.jscroll')
                    .removeData('jscroll')
                    .find('.jscroll-inner').children().unwrap()
                    .filter('.jscroll-added').children().unwrap();
            },

            // Observe the scroll event for when to trigger the next load
            _observe = function() {
                if ($e.is(':visible')) {
                    _wrapInnerContent();
                    var $inner = $e.find('div.jscroll-inner').first(),
                        data = $e.data('jscroll'),
                        borderTopWidth = parseInt($e.css('borderTopWidth'), 10),
                        borderTopWidthInt = isNaN(borderTopWidth) ? 0 : borderTopWidth,
                        iContainerTop = parseInt($e.css('paddingTop'), 10) + borderTopWidthInt,
                        iTopHeight = _isWindow ? _$scroll.scrollTop() : $e.offset().top,
                        innerTop = $inner.length ? $inner.offset().top : 0,
                        iTotalHeight = Math.ceil(iTopHeight - innerTop + _$scroll.height() + iContainerTop);

                    if (!data.waiting && iTotalHeight + _options.padding >= $inner.outerHeight()) {
                        //data.nextHref = $.trim(data.nextHref + ' ' + _options.contentSelector);
                        _debug('info', 'jScroll:', $inner.outerHeight() - iTotalHeight, 'from bottom. Loading next request...');
                        return _load();
                    }
                }
            },

            // Check if the href for the next set of content has been set
            _checkNextHref = function(data) {
                data = data || $e.data('jscroll');
                if (!data || !data.nextHref) {
                    _debug('warn', 'jScroll: nextSelector not found - destroying');
                    _destroy();
                    return false;
                } else {
                    _setBindings();
                    return true;
                }
            },

            _setBindings = function() {
                var $next = $e.find(_options.nextSelector).first();
                if (!$next.length) {
                    return;
                }
                if (_options.autoTrigger && (_options.autoTriggerUntil === false || _options.autoTriggerUntil > 0)) {
                    _nextWrap($next);
                    var scrollingBodyHeight = _$body.height() - $e.offset().top,
                        scrollingHeight = ($e.height() < scrollingBodyHeight) ? $e.height() : scrollingBodyHeight,
                        windowHeight = ($e.offset().top - _$window.scrollTop() > 0) ? _$window.height() - ($e.offset().top - $(window).scrollTop()) : _$window.height();
                    if (scrollingHeight <= windowHeight) {
                        _observe();
                    }
                    _$scroll.unbind('.jscroll').bind('scroll.jscroll', function() {
                        return _observe();
                    });
                    if (_options.autoTriggerUntil > 0) {
                        _options.autoTriggerUntil--;
                    }
                } else {
                    _$scroll.unbind('.jscroll');
                    $next.bind('click.jscroll', function() {
                        _nextWrap($next);
                        _load();
                        return false;
                    });
                }
            },

            // Load the next set of content, if available
            _load = function() {
                var $inner = $e.find('div.jscroll-inner').first(),
                    data = $e.data('jscroll');

                data.waiting = true;
                $inner.append('<div class="jscroll-added" />')
                    .children('.jscroll-added').last()
                    .html('<div class="jscroll-loading" id="jscroll-loading">' + _options.loadingHtml + '</div>')
                    .promise()
                    .done(function() {
                        if (_options.loadingFunction) {
                            _options.loadingFunction();
                        }
                    });

                return $e.animate({scrollTop: $inner.outerHeight()}, 0, function() {
                    var nextHref = data.nextHref;
                    $inner.find('div.jscroll-added').last().load(nextHref, function(r, status) {
                        if (status === 'error') {
                            return _destroy();
                        }
                        var $next = $(this).find(_options.nextSelector).first();
                        data.waiting = false;
                        data.nextHref = $next.attr('href') ? $.trim($next.attr('href') + ' ' + _options.contentSelector) : false;
                        $('.jscroll-next-parent', $e).remove(); // Remove the previous next link now that we have a new one
                        _checkNextHref();
                        if (_options.callback) {
                            _options.callback.call(this, nextHref);
                        }
                        _debug('dir', data);
                    });
                });
            },

            // Safe console debug - http://klauzinski.com/javascript/safe-firebug-console-in-javascript
            _debug = function(m) {
                if (_options.debug && typeof console === 'object' && (typeof m === 'object' || typeof console[m] === 'function')) {
                    if (typeof m === 'object') {
                        var args = [];
                        for (var sMethod in m) {
                            if (typeof console[sMethod] === 'function') {
                                args = (m[sMethod].length) ? m[sMethod] : [m[sMethod]];
                                console[sMethod].apply(console, args);
                            } else {
                                console.log.apply(console, args);
                            }
                        }
                    } else {
                        console[m].apply(console, Array.prototype.slice.call(arguments, 1));
                    }
                }
            };

        // Initialization
        $e.data('jscroll', $.extend({}, _data, {initialized: true, waiting: false, nextHref: _nextHref}));
        _wrapInnerContent();
        _preloadImage();
        _setBindings();

        // Expose API methods via the jQuery.jscroll namespace, e.g. $('sel').jscroll.method()
        $.extend($e.jscroll, {
            destroy: _destroy
        });
        return $e;
    };

    // Define the jscroll plugin method and loop
    $.fn.jscroll = function(m) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('jscroll');

            // Instantiate jScroll on this element if it hasn't been already
            if (data && data.initialized) {
                return;
            }
            jScroll($this, m);
        });
    };

})(jQuery);
var DateFormatter;!function(){"use strict";var e,t,a,r,n,o;n=864e5,o=3600,e=function(e,t){return"string"==typeof e&&"string"==typeof t&&e.toLowerCase()===t.toLowerCase()},t=function(e,a,r){var n=r||"0",o=e.toString();return o.length<a?t(n+o,a):o},a=function(e){var t,r;for(e=e||{},t=1;t<arguments.length;t++)if(r=arguments[t])for(var n in r)r.hasOwnProperty(n)&&("object"==typeof r[n]?a(e[n],r[n]):e[n]=r[n]);return e},r={dateSettings:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["AM","PM"],ordinal:function(e){var t=e%10,a={1:"st",2:"nd",3:"rd"};return 1!==Math.floor(e%100/10)&&a[t]?a[t]:"th"}},separators:/[ \-+\/\.T:@]/g,validParts:/[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,intParts:/[djwNzmnyYhHgGis]/g,tzParts:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,tzClip:/[^-+\dA-Z]/g},DateFormatter=function(e){var t=this,n=a(r,e);t.dateSettings=n.dateSettings,t.separators=n.separators,t.validParts=n.validParts,t.intParts=n.intParts,t.tzParts=n.tzParts,t.tzClip=n.tzClip},DateFormatter.prototype={constructor:DateFormatter,parseDate:function(t,a){var r,n,o,i,s,d,u,l,f,c,m=this,h=!1,g=!1,p=m.dateSettings,y={date:null,year:null,month:null,day:null,hour:0,min:0,sec:0};if(!t)return void 0;if(t instanceof Date)return t;if("number"==typeof t)return new Date(t);if("U"===a)return o=parseInt(t),o?new Date(1e3*o):t;if("string"!=typeof t)return"";if(r=a.match(m.validParts),!r||0===r.length)throw new Error("Invalid date format definition.");for(n=t.replace(m.separators,"\x00").split("\x00"),o=0;o<n.length;o++)switch(i=n[o],s=parseInt(i),r[o]){case"y":case"Y":f=i.length,2===f?y.year=parseInt((70>s?"20":"19")+i):4===f&&(y.year=s),h=!0;break;case"m":case"n":case"M":case"F":isNaN(i)?(d=p.monthsShort.indexOf(i),d>-1&&(y.month=d+1),d=p.months.indexOf(i),d>-1&&(y.month=d+1)):s>=1&&12>=s&&(y.month=s),h=!0;break;case"d":case"j":s>=1&&31>=s&&(y.day=s),h=!0;break;case"g":case"h":u=r.indexOf("a")>-1?r.indexOf("a"):r.indexOf("A")>-1?r.indexOf("A"):-1,c=n[u],u>-1?(l=e(c,p.meridiem[0])?0:e(c,p.meridiem[1])?12:-1,s>=1&&12>=s&&l>-1?y.hour=s+l-1:s>=0&&23>=s&&(y.hour=s)):s>=0&&23>=s&&(y.hour=s),g=!0;break;case"G":case"H":s>=0&&23>=s&&(y.hour=s),g=!0;break;case"i":s>=0&&59>=s&&(y.min=s),g=!0;break;case"s":s>=0&&59>=s&&(y.sec=s),g=!0}if(h===!0&&y.year&&y.month&&y.day)y.date=new Date(y.year,y.month-1,y.day,y.hour,y.min,y.sec,0);else{if(g!==!0)return!1;y.date=new Date(0,0,0,y.hour,y.min,y.sec,0)}return y.date},guessDate:function(e,t){if("string"!=typeof e)return e;var a,r,n,o,i=this,s=e.replace(i.separators,"\x00").split("\x00"),d=/^[djmn]/g,u=t.match(i.validParts),l=new Date,f=0;if(!d.test(u[0]))return e;for(r=0;r<s.length;r++){switch(f=2,n=s[r],o=parseInt(n.substr(0,2)),r){case 0:"m"===u[0]||"n"===u[0]?l.setMonth(o-1):l.setDate(o);break;case 1:"m"===u[0]||"n"===u[0]?l.setDate(o):l.setMonth(o-1);break;case 2:a=l.getFullYear(),n.length<4?(l.setFullYear(parseInt(a.toString().substr(0,4-n.length)+n)),f=n.length):(l.setFullYear=parseInt(n.substr(0,4)),f=4);break;case 3:l.setHours(o);break;case 4:l.setMinutes(o);break;case 5:l.setSeconds(o)}n.substr(f).length>0&&s.splice(r+1,0,n.substr(f))}return l},parseFormat:function(e,a){var r,i=this,s=i.dateSettings,d=/\\?(.?)/gi,u=function(e,t){return r[e]?r[e]():t};return r={d:function(){return t(r.j(),2)},D:function(){return s.daysShort[r.w()]},j:function(){return a.getDate()},l:function(){return s.days[r.w()]},N:function(){return r.w()||7},w:function(){return a.getDay()},z:function(){var e=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((e-t)/n)},W:function(){var e=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),a=new Date(e.getFullYear(),0,4);return t(1+Math.round((e-a)/n/7),2)},F:function(){return s.months[a.getMonth()]},m:function(){return t(r.n(),2)},M:function(){return s.monthsShort[a.getMonth()]},n:function(){return a.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var e=r.Y();return e%4===0&&e%100!==0||e%400===0?1:0},o:function(){var e=r.n(),t=r.W(),a=r.Y();return a+(12===e&&9>t?1:1===e&&t>9?-1:0)},Y:function(){return a.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return r.A().toLowerCase()},A:function(){var e=r.G()<12?0:1;return s.meridiem[e]},B:function(){var e=a.getUTCHours()*o,r=60*a.getUTCMinutes(),n=a.getUTCSeconds();return t(Math.floor((e+r+n+o)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return a.getHours()},h:function(){return t(r.g(),2)},H:function(){return t(r.G(),2)},i:function(){return t(a.getMinutes(),2)},s:function(){return t(a.getSeconds(),2)},u:function(){return t(1e3*a.getMilliseconds(),6)},e:function(){var e=/\((.*)\)/.exec(String(a))[1];return e||"Coordinated Universal Time"},T:function(){var e=(String(a).match(i.tzParts)||[""]).pop().replace(i.tzClip,"");return e||"UTC"},I:function(){var e=new Date(r.Y(),0),t=Date.UTC(r.Y(),0),a=new Date(r.Y(),6),n=Date.UTC(r.Y(),6);return e-t!==a-n?1:0},O:function(){var e=a.getTimezoneOffset(),r=Math.abs(e);return(e>0?"-":"+")+t(100*Math.floor(r/60)+r%60,4)},P:function(){var e=r.O();return e.substr(0,3)+":"+e.substr(3,2)},Z:function(){return 60*-a.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(d,u)},r:function(){return"D, d M Y H:i:s O".replace(d,u)},U:function(){return a.getTime()/1e3||0}},u(e,e)},formatDate:function(e,t){var a,r,n,o,i,s=this,d="";if("string"==typeof e&&(e=s.parseDate(e,t),e===!1))return!1;if(e instanceof Date){for(n=t.length,a=0;n>a;a++)i=t.charAt(a),"S"!==i&&(o=s.parseFormat(i,e),a!==n-1&&s.intParts.test(i)&&"S"===t.charAt(a+1)&&(r=parseInt(o),o+=s.dateSettings.ordinal(r)),d+=o);return d}return""}}}(),function(e){"function"==typeof define&&define.amd?define(["jquery","jquery-mousewheel"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){"use strict";function t(e,t,a){this.date=e,this.desc=t,this.style=a}var a={i18n:{ar:{months:["كانون الثاني","شباط","آذار","نيسان","مايو","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],dayOfWeekShort:["ن","ث","ع","خ","ج","س","ح"],dayOfWeek:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"]},ro:{months:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],dayOfWeekShort:["Du","Lu","Ma","Mi","Jo","Vi","Sâ"],dayOfWeek:["Duminică","Luni","Marţi","Miercuri","Joi","Vineri","Sâmbătă"]},id:{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],dayOfWeekShort:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],dayOfWeek:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]},is:{months:["Janúar","Febrúar","Mars","Apríl","Maí","Júní","Júlí","Ágúst","September","Október","Nóvember","Desember"],dayOfWeekShort:["Sun","Mán","Þrið","Mið","Fim","Fös","Lau"],dayOfWeek:["Sunnudagur","Mánudagur","Þriðjudagur","Miðvikudagur","Fimmtudagur","Föstudagur","Laugardagur"]},bg:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],dayOfWeekShort:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"]},fa:{months:["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],dayOfWeekShort:["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],dayOfWeek:["یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه","شنبه","یک‌شنبه"]},ru:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],dayOfWeekShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]},uk:{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],dayOfWeekShort:["Ндл","Пнд","Втр","Срд","Чтв","Птн","Сбт"],dayOfWeek:["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"]},en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},el:{months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],dayOfWeekShort:["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],dayOfWeek:["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"]},de:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],dayOfWeekShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayOfWeek:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]},nl:{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],dayOfWeekShort:["zo","ma","di","wo","do","vr","za"],dayOfWeek:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},tr:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],dayOfWeekShort:["Paz","Pts","Sal","Çar","Per","Cum","Cts"],dayOfWeek:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]},fr:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],dayOfWeekShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],dayOfWeek:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],dayOfWeekShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],dayOfWeek:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]},th:{months:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],dayOfWeekShort:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],dayOfWeek:["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์","อาทิตย์"]},pl:{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],dayOfWeekShort:["nd","pn","wt","śr","cz","pt","sb"],dayOfWeek:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"]},pt:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},ch:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"]},se:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},kr:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},it:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],dayOfWeek:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"]},da:{months:["January","Februar","Marts","April","Maj","Juni","July","August","September","Oktober","November","December"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"]},no:{months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"]},ja:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeekShort:["日","月","火","水","木","金","土"],dayOfWeek:["日曜","月曜","火曜","水曜","木曜","金曜","土曜"]},vi:{months:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],dayOfWeekShort:["CN","T2","T3","T4","T5","T6","T7"],dayOfWeek:["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"]},sl:{months:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],dayOfWeekShort:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"],dayOfWeek:["Nedelja","Ponedeljek","Torek","Sreda","Četrtek","Petek","Sobota"]},cs:{months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],dayOfWeekShort:["Ne","Po","Út","St","Čt","Pá","So"]},hu:{months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],dayOfWeekShort:["Va","Hé","Ke","Sze","Cs","Pé","Szo"],dayOfWeek:["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]},az:{months:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],dayOfWeekShort:["B","Be","Ça","Ç","Ca","C","Ş"],dayOfWeek:["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"]},bs:{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"]},ca:{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],dayOfWeekShort:["Dg","Dl","Dt","Dc","Dj","Dv","Ds"],dayOfWeek:["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"]},"en-GB":{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},et:{months:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],dayOfWeekShort:["P","E","T","K","N","R","L"],dayOfWeek:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"]},eu:{months:["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"],dayOfWeekShort:["Ig.","Al.","Ar.","Az.","Og.","Or.","La."],dayOfWeek:["Igandea","Astelehena","Asteartea","Asteazkena","Osteguna","Ostirala","Larunbata"]},fi:{months:["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"],dayOfWeekShort:["Su","Ma","Ti","Ke","To","Pe","La"],dayOfWeek:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"]},gl:{months:["Xan","Feb","Maz","Abr","Mai","Xun","Xul","Ago","Set","Out","Nov","Dec"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Xov","Ven","Sab"],dayOfWeek:["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"]},hr:{months:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"]},ko:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},lt:{months:["Sausio","Vasario","Kovo","Balandžio","Gegužės","Birželio","Liepos","Rugpjūčio","Rugsėjo","Spalio","Lapkričio","Gruodžio"],dayOfWeekShort:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"],dayOfWeek:["Sekmadienis","Pirmadienis","Antradienis","Trečiadienis","Ketvirtadienis","Penktadienis","Šeštadienis"]},lv:{months:["Janvāris","Februāris","Marts","Aprīlis ","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],dayOfWeekShort:["Sv","Pr","Ot","Tr","Ct","Pk","St"],dayOfWeek:["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena"]},mk:{months:["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],dayOfWeekShort:["нед","пон","вто","сре","чет","пет","саб"],dayOfWeek:["Недела","Понеделник","Вторник","Среда","Четврток","Петок","Сабота"]},mn:{months:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],dayOfWeekShort:["Дав","Мяг","Лха","Пүр","Бсн","Бям","Ням"],dayOfWeek:["Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба","Ням"]},"pt-BR":{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},sk:{months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],dayOfWeekShort:["Ne","Po","Ut","St","Št","Pi","So"],dayOfWeek:["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"]},sq:{months:["Janar","Shkurt","Mars","Prill","Maj","Qershor","Korrik","Gusht","Shtator","Tetor","Nëntor","Dhjetor"],dayOfWeekShort:["Die","Hën","Mar","Mër","Enj","Pre","Shtu"],dayOfWeek:["E Diel","E Hënë","E Martē","E Mërkurë","E Enjte","E Premte","E Shtunë"]},"sr-YU":{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sre","čet","Pet","Sub"],dayOfWeek:["Nedelja","Ponedeljak","Utorak","Sreda","Četvrtak","Petak","Subota"]},sr:{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],dayOfWeekShort:["нед","пон","уто","сре","чет","пет","суб"],dayOfWeek:["Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"]},sv:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],dayOfWeek:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"]},"zh-TW":{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},zh:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},he:{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],dayOfWeekShort:["א'","ב'","ג'","ד'","ה'","ו'","שבת"],dayOfWeek:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת","ראשון"]},hy:{months:["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],dayOfWeekShort:["Կի","Երկ","Երք","Չոր","Հնգ","Ուրբ","Շբթ"],dayOfWeek:["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"]},kg:{months:["Үчтүн айы","Бирдин айы","Жалган Куран","Чын Куран","Бугу","Кулжа","Теке","Баш Оона","Аяк Оона","Тогуздун айы","Жетинин айы","Бештин айы"],dayOfWeekShort:["Жек","Дүй","Шей","Шар","Бей","Жум","Ише"],dayOfWeek:["Жекшемб","Дүйшөмб","Шейшемб","Шаршемб","Бейшемби","Жума","Ишенб"]},rm:{months:["Schaner","Favrer","Mars","Avrigl","Matg","Zercladur","Fanadur","Avust","Settember","October","November","December"],dayOfWeekShort:["Du","Gli","Ma","Me","Gie","Ve","So"],dayOfWeek:["Dumengia","Glindesdi","Mardi","Mesemna","Gievgia","Venderdi","Sonda"]},ka:{months:["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],dayOfWeekShort:["კვ","ორშ","სამშ","ოთხ","ხუთ","პარ","შაბ"],dayOfWeek:["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"]}},value:"",rtl:!1,format:"Y/m/d H:i",formatTime:"H:i",formatDate:"Y/m/d",startDate:!1,step:60,monthChangeSpinner:!0,closeOnDateSelect:!1,closeOnTimeSelect:!0,closeOnWithoutClick:!0,closeOnInputClick:!0,timepicker:!0,datepicker:!0,weeks:!1,defaultTime:!1,defaultDate:!1,minDate:!1,maxDate:!1,minTime:!1,maxTime:!1,disabledMinTime:!1,disabledMaxTime:!1,allowTimes:[],opened:!1,initTime:!0,inline:!1,theme:"",onSelectDate:function(){},onSelectTime:function(){},onChangeMonth:function(){},onGetWeekOfYear:function(){},onChangeYear:function(){},onChangeDateTime:function(){},onShow:function(){},onClose:function(){},onGenerate:function(){},withoutCopyright:!0,inverseButton:!1,hours12:!1,next:"xdsoft_next",prev:"xdsoft_prev",dayOfWeekStart:0,parentID:"body",timeHeightInTimePicker:25,timepickerScrollbar:!0,todayButton:!0,prevButton:!0,nextButton:!0,defaultSelect:!0,scrollMonth:!0,scrollTime:!0,scrollInput:!0,lazyInit:!1,mask:!1,validateOnBlur:!0,allowBlank:!0,yearStart:1950,yearEnd:2050,monthStart:0,monthEnd:11,style:"",id:"",fixed:!1,roundTime:"round",className:"",weekends:[],highlightedDates:[],highlightedPeriods:[],allowDates:[],allowDateRe:null,disabledDates:[],disabledWeekDays:[],yearOffset:0,beforeShowDay:null,enterLikeTab:!0,showApplyButton:!1},r=null,n="en",o="en",i={meridiem:["AM","PM"]},s=function(){var t=a.i18n[o],n={days:t.dayOfWeek,daysShort:t.dayOfWeekShort,months:t.months,monthsShort:e.map(t.months,function(e){return e.substring(0,3)})};r=new DateFormatter({dateSettings:e.extend({},i,n)})};e.datetimepicker={setLocale:function(e){var t=a.i18n[e]?e:n;o!=t&&(o=t,s())},setDateFormatter:function(e){r=e},RFC_2822:"D, d M Y H:i:s O",ATOM:"Y-m-dTH:i:sP",ISO_8601:"Y-m-dTH:i:sO",RFC_822:"D, d M y H:i:s O",RFC_850:"l, d-M-y H:i:s T",RFC_1036:"D, d M y H:i:s O",RFC_1123:"D, d M Y H:i:s O",RSS:"D, d M Y H:i:s O",W3C:"Y-m-dTH:i:sP"},s(),window.getComputedStyle||(window.getComputedStyle=function(e){return this.el=e,this.getPropertyValue=function(t){var a=/(\-([a-z]){1})/g;return"float"===t&&(t="styleFloat"),a.test(t)&&(t=t.replace(a,function(e,t,a){return a.toUpperCase()})),e.currentStyle[t]||null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var a,r;for(a=t||0,r=this.length;r>a;a+=1)if(this[a]===e)return a;return-1}),Date.prototype.countDaysInMonth=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate()},e.fn.xdsoftScroller=function(t){return this.each(function(){var a,r,n,o,i,s=e(this),d=function(e){var t,a={x:0,y:0};return"touchstart"===e.type||"touchmove"===e.type||"touchend"===e.type||"touchcancel"===e.type?(t=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a.x=t.clientX,a.y=t.clientY):("mousedown"===e.type||"mouseup"===e.type||"mousemove"===e.type||"mouseover"===e.type||"mouseout"===e.type||"mouseenter"===e.type||"mouseleave"===e.type)&&(a.x=e.clientX,a.y=e.clientY),a},u=100,l=!1,f=0,c=0,m=0,h=!1,g=0,p=function(){};return"hide"===t?void s.find(".xdsoft_scrollbar").hide():(e(this).hasClass("xdsoft_scroller_box")||(a=s.children().eq(0),r=s[0].clientHeight,n=a[0].offsetHeight,o=e('<div class="xdsoft_scrollbar"></div>'),i=e('<div class="xdsoft_scroller"></div>'),o.append(i),s.addClass("xdsoft_scroller_box").append(o),p=function(e){var t=d(e).y-f+g;0>t&&(t=0),t+i[0].offsetHeight>m&&(t=m-i[0].offsetHeight),s.trigger("scroll_element.xdsoft_scroller",[u?t/u:0])},i.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller",function(a){r||s.trigger("resize_scroll.xdsoft_scroller",[t]),f=d(a).y,g=parseInt(i.css("margin-top"),10),m=o[0].offsetHeight,"mousedown"===a.type||"touchstart"===a.type?(document&&e(document.body).addClass("xdsoft_noselect"),e([document.body,window]).on("touchend mouseup.xdsoft_scroller",function n(){e([document.body,window]).off("touchend mouseup.xdsoft_scroller",n).off("mousemove.xdsoft_scroller",p).removeClass("xdsoft_noselect")}),e(document.body).on("mousemove.xdsoft_scroller",p)):(h=!0,a.stopPropagation(),a.preventDefault())}).on("touchmove",function(e){h&&(e.preventDefault(),p(e))}).on("touchend touchcancel",function(){h=!1,g=0}),s.on("scroll_element.xdsoft_scroller",function(e,t){r||s.trigger("resize_scroll.xdsoft_scroller",[t,!0]),t=t>1?1:0>t||isNaN(t)?0:t,i.css("margin-top",u*t),setTimeout(function(){a.css("marginTop",-parseInt((a[0].offsetHeight-r)*t,10))},10)}).on("resize_scroll.xdsoft_scroller",function(e,t,d){var l,f;r=s[0].clientHeight,n=a[0].offsetHeight,l=r/n,f=l*o[0].offsetHeight,l>1?i.hide():(i.show(),i.css("height",parseInt(f>10?f:10,10)),u=o[0].offsetHeight-i[0].offsetHeight,d!==!0&&s.trigger("scroll_element.xdsoft_scroller",[t||Math.abs(parseInt(a.css("marginTop"),10))/(n-r)]))}),s.on("mousewheel",function(e){var t=Math.abs(parseInt(a.css("marginTop"),10));return t-=20*e.deltaY,0>t&&(t=0),s.trigger("scroll_element.xdsoft_scroller",[t/(n-r)]),e.stopPropagation(),!1}),s.on("touchstart",function(e){l=d(e),c=Math.abs(parseInt(a.css("marginTop"),10))}),s.on("touchmove",function(e){if(l){e.preventDefault();var t=d(e);s.trigger("scroll_element.xdsoft_scroller",[(c-(t.y-l.y))/(n-r)])}}),s.on("touchend touchcancel",function(){l=!1,c=0})),void s.trigger("resize_scroll.xdsoft_scroller",[t]))})},e.fn.datetimepicker=function(n,i){var s,d,u=this,l=48,f=57,c=96,m=105,h=17,g=46,p=13,y=27,v=8,b=37,D=38,k=39,x=40,T=9,S=116,w=65,O=67,M=86,_=90,W=89,F=!1,C=e.isPlainObject(n)||!n?e.extend(!0,{},a,n):e.extend(!0,{},a),P=0,A=function(e){e.on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",function t(){e.is(":disabled")||e.data("xdsoft_datetimepicker")||(clearTimeout(P),P=setTimeout(function(){e.data("xdsoft_datetimepicker")||s(e),e.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",t).trigger("open.xdsoft")},100))})};return s=function(a){function i(){var e,t=!1;return C.startDate?t=j.strToDate(C.startDate):(t=C.value||(a&&a.val&&a.val()?a.val():""),t?t=j.strToDateTime(t):C.defaultDate&&(t=j.strToDateTime(C.defaultDate),C.defaultTime&&(e=j.strtotime(C.defaultTime),t.setHours(e.getHours()),t.setMinutes(e.getMinutes())))),t&&j.isValidDate(t)?J.data("changed",!0):t="",t||0}function s(t){var r=function(e,t){var a=e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g,"\\$1").replace(/_/g,"{digit+}").replace(/([0-9]{1})/g,"{digit$1}").replace(/\{digit([0-9]{1})\}/g,"[0-$1_]{1}").replace(/\{digit[\+]\}/g,"[0-9_]{1}");return new RegExp(a).test(t)},n=function(e){try{if(document.selection&&document.selection.createRange){var t=document.selection.createRange();return t.getBookmark().charCodeAt(2)-2}if(e.setSelectionRange)return e.selectionStart}catch(a){return 0}},o=function(e,t){if(e="string"==typeof e||e instanceof String?document.getElementById(e):e,!e)return!1;if(e.createTextRange){var a=e.createTextRange();return a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select(),!0}return e.setSelectionRange?(e.setSelectionRange(t,t),!0):!1};t.mask&&a.off("keydown.xdsoft"),t.mask===!0&&(t.mask="undefined"!=typeof moment?t.format.replace(/Y{4}/g,"9999").replace(/Y{2}/g,"99").replace(/M{2}/g,"19").replace(/D{2}/g,"39").replace(/H{2}/g,"29").replace(/m{2}/g,"59").replace(/s{2}/g,"59"):t.format.replace(/Y/g,"9999").replace(/F/g,"9999").replace(/m/g,"19").replace(/d/g,"39").replace(/H/g,"29").replace(/i/g,"59").replace(/s/g,"59")),"string"===e.type(t.mask)&&(r(t.mask,a.val())||(a.val(t.mask.replace(/[0-9]/g,"_")),o(a[0],0)),a.on("keydown.xdsoft",function(i){var s,d,u=this.value,C=i.which;if(C>=l&&f>=C||C>=c&&m>=C||C===v||C===g){for(s=n(this),d=C!==v&&C!==g?String.fromCharCode(C>=c&&m>=C?C-l:C):"_",C!==v&&C!==g||!s||(s-=1,d="_");/[^0-9_]/.test(t.mask.substr(s,1))&&s<t.mask.length&&s>0;)s+=C===v||C===g?-1:1;if(u=u.substr(0,s)+d+u.substr(s+1),""===e.trim(u))u=t.mask.replace(/[0-9]/g,"_");else if(s===t.mask.length)return i.preventDefault(),!1;for(s+=C===v||C===g?0:1;/[^0-9_]/.test(t.mask.substr(s,1))&&s<t.mask.length&&s>0;)s+=C===v||C===g?-1:1;r(t.mask,u)?(this.value=u,o(this,s)):""===e.trim(u)?this.value=t.mask.replace(/[0-9]/g,"_"):a.trigger("error_input.xdsoft")}else if(-1!==[w,O,M,_,W].indexOf(C)&&F||-1!==[y,D,x,b,k,S,h,T,p].indexOf(C))return!0;return i.preventDefault(),!1}))}var d,u,P,A,Y,j,H,J=e('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),z=e('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),I=e('<div class="xdsoft_datepicker active"></div>'),N=e('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),L=e('<div class="xdsoft_calendar"></div>'),E=e('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),R=E.find(".xdsoft_time_box").eq(0),B=e('<div class="xdsoft_time_variant"></div>'),V=e('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),G=e('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),U=e('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),q=!1,X=0;C.id&&J.attr("id",C.id),C.style&&J.attr("style",C.style),C.weeks&&J.addClass("xdsoft_showweeks"),C.rtl&&J.addClass("xdsoft_rtl"),J.addClass("xdsoft_"+C.theme),J.addClass(C.className),N.find(".xdsoft_month span").after(G),N.find(".xdsoft_year span").after(U),N.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft",function(t){var a,r,n=e(this).find(".xdsoft_select").eq(0),o=0,i=0,s=n.is(":visible");for(N.find(".xdsoft_select").hide(),j.currentTime&&(o=j.currentTime[e(this).hasClass("xdsoft_month")?"getMonth":"getFullYear"]()),n[s?"hide":"show"](),a=n.find("div.xdsoft_option"),r=0;r<a.length&&a.eq(r).data("value")!==o;r+=1)i+=a[0].offsetHeight;return n.xdsoftScroller(i/(n.children()[0].offsetHeight-n[0].clientHeight)),t.stopPropagation(),!1}),N.find(".xdsoft_select").xdsoftScroller().on("touchstart mousedown.xdsoft",function(e){e.stopPropagation(),e.preventDefault()}).on("touchstart mousedown.xdsoft",".xdsoft_option",function(){(void 0===j.currentTime||null===j.currentTime)&&(j.currentTime=j.now());var t=j.currentTime.getFullYear();j&&j.currentTime&&j.currentTime[e(this).parent().parent().hasClass("xdsoft_monthselect")?"setMonth":"setFullYear"](e(this).data("value")),e(this).parent().parent().hide(),J.trigger("xchange.xdsoft"),C.onChangeMonth&&e.isFunction(C.onChangeMonth)&&C.onChangeMonth.call(J,j.currentTime,J.data("input")),t!==j.currentTime.getFullYear()&&e.isFunction(C.onChangeYear)&&C.onChangeYear.call(J,j.currentTime,J.data("input"))}),J.getValue=function(){return j.getCurrentTime()},J.setOptions=function(n){var o={};C=e.extend(!0,{},C,n),n.allowTimes&&e.isArray(n.allowTimes)&&n.allowTimes.length&&(C.allowTimes=e.extend(!0,[],n.allowTimes)),n.weekends&&e.isArray(n.weekends)&&n.weekends.length&&(C.weekends=e.extend(!0,[],n.weekends)),n.allowDates&&e.isArray(n.allowDates)&&n.allowDates.length&&(C.allowDates=e.extend(!0,[],n.allowDates)),n.allowDateRe&&"[object String]"===Object.prototype.toString.call(n.allowDateRe)&&(C.allowDateRe=new RegExp(n.allowDateRe)),n.highlightedDates&&e.isArray(n.highlightedDates)&&n.highlightedDates.length&&(e.each(n.highlightedDates,function(a,n){var i,s=e.map(n.split(","),e.trim),d=new t(r.parseDate(s[0],C.formatDate),s[1],s[2]),u=r.formatDate(d.date,C.formatDate);void 0!==o[u]?(i=o[u].desc,i&&i.length&&d.desc&&d.desc.length&&(o[u].desc=i+"\n"+d.desc)):o[u]=d}),C.highlightedDates=e.extend(!0,[],o)),n.highlightedPeriods&&e.isArray(n.highlightedPeriods)&&n.highlightedPeriods.length&&(o=e.extend(!0,[],C.highlightedDates),
e.each(n.highlightedPeriods,function(a,n){var i,s,d,u,l,f,c;if(e.isArray(n))i=n[0],s=n[1],d=n[2],c=n[3];else{var m=e.map(n.split(","),e.trim);i=r.parseDate(m[0],C.formatDate),s=r.parseDate(m[1],C.formatDate),d=m[2],c=m[3]}for(;s>=i;)u=new t(i,d,c),l=r.formatDate(i,C.formatDate),i.setDate(i.getDate()+1),void 0!==o[l]?(f=o[l].desc,f&&f.length&&u.desc&&u.desc.length&&(o[l].desc=f+"\n"+u.desc)):o[l]=u}),C.highlightedDates=e.extend(!0,[],o)),n.disabledDates&&e.isArray(n.disabledDates)&&n.disabledDates.length&&(C.disabledDates=e.extend(!0,[],n.disabledDates)),n.disabledWeekDays&&e.isArray(n.disabledWeekDays)&&n.disabledWeekDays.length&&(C.disabledWeekDays=e.extend(!0,[],n.disabledWeekDays)),!C.open&&!C.opened||C.inline||a.trigger("open.xdsoft"),C.inline&&(q=!0,J.addClass("xdsoft_inline"),a.after(J).hide()),C.inverseButton&&(C.next="xdsoft_prev",C.prev="xdsoft_next"),C.datepicker?I.addClass("active"):I.removeClass("active"),C.timepicker?E.addClass("active"):E.removeClass("active"),C.value&&(j.setCurrentTime(C.value),a&&a.val&&a.val(j.str)),C.dayOfWeekStart=isNaN(C.dayOfWeekStart)?0:parseInt(C.dayOfWeekStart,10)%7,C.timepickerScrollbar||R.xdsoftScroller("hide"),C.minDate&&/^[\+\-](.*)$/.test(C.minDate)&&(C.minDate=r.formatDate(j.strToDateTime(C.minDate),C.formatDate)),C.maxDate&&/^[\+\-](.*)$/.test(C.maxDate)&&(C.maxDate=r.formatDate(j.strToDateTime(C.maxDate),C.formatDate)),V.toggle(C.showApplyButton),N.find(".xdsoft_today_button").css("visibility",C.todayButton?"visible":"hidden"),N.find("."+C.prev).css("visibility",C.prevButton?"visible":"hidden"),N.find("."+C.next).css("visibility",C.nextButton?"visible":"hidden"),s(C),C.validateOnBlur&&a.off("blur.xdsoft").on("blur.xdsoft",function(){if(C.allowBlank&&(!e.trim(e(this).val()).length||"string"==typeof C.mask&&e.trim(e(this).val())===C.mask.replace(/[0-9]/g,"_")))e(this).val(null),J.data("xdsoft_datetime").empty();else{var t=r.parseDate(e(this).val(),C.format);if(t)e(this).val(r.formatDate(t,C.format));else{var a=+[e(this).val()[0],e(this).val()[1]].join(""),n=+[e(this).val()[2],e(this).val()[3]].join("");e(this).val(!C.datepicker&&C.timepicker&&a>=0&&24>a&&n>=0&&60>n?[a,n].map(function(e){return e>9?e:"0"+e}).join(":"):r.formatDate(j.now(),C.format))}J.data("xdsoft_datetime").setCurrentTime(e(this).val())}J.trigger("changedatetime.xdsoft"),J.trigger("close.xdsoft")}),C.dayOfWeekStartPrev=0===C.dayOfWeekStart?6:C.dayOfWeekStart-1,J.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")},J.data("options",C).on("touchstart mousedown.xdsoft",function(e){return e.stopPropagation(),e.preventDefault(),U.hide(),G.hide(),!1}),R.append(B),R.xdsoftScroller(),J.on("afterOpen.xdsoft",function(){R.xdsoftScroller()}),J.append(I).append(E),C.withoutCopyright!==!0&&J.append(z),I.append(N).append(L).append(V),e(C.parentID).append(J),d=function(){var t=this;t.now=function(e){var a,r,n=new Date;return!e&&C.defaultDate&&(a=t.strToDateTime(C.defaultDate),n.setFullYear(a.getFullYear()),n.setMonth(a.getMonth()),n.setDate(a.getDate())),C.yearOffset&&n.setFullYear(n.getFullYear()+C.yearOffset),!e&&C.defaultTime&&(r=t.strtotime(C.defaultTime),n.setHours(r.getHours()),n.setMinutes(r.getMinutes())),n},t.isValidDate=function(e){return"[object Date]"!==Object.prototype.toString.call(e)?!1:!isNaN(e.getTime())},t.setCurrentTime=function(e,a){t.currentTime="string"==typeof e?t.strToDateTime(e):t.isValidDate(e)?e:e||a||!C.allowBlank?t.now():null,J.trigger("xchange.xdsoft")},t.empty=function(){t.currentTime=null},t.getCurrentTime=function(){return t.currentTime},t.nextMonth=function(){(void 0===t.currentTime||null===t.currentTime)&&(t.currentTime=t.now());var a,r=t.currentTime.getMonth()+1;return 12===r&&(t.currentTime.setFullYear(t.currentTime.getFullYear()+1),r=0),a=t.currentTime.getFullYear(),t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(),r+1,0).getDate(),t.currentTime.getDate())),t.currentTime.setMonth(r),C.onChangeMonth&&e.isFunction(C.onChangeMonth)&&C.onChangeMonth.call(J,j.currentTime,J.data("input")),a!==t.currentTime.getFullYear()&&e.isFunction(C.onChangeYear)&&C.onChangeYear.call(J,j.currentTime,J.data("input")),J.trigger("xchange.xdsoft"),r},t.prevMonth=function(){(void 0===t.currentTime||null===t.currentTime)&&(t.currentTime=t.now());var a=t.currentTime.getMonth()-1;return-1===a&&(t.currentTime.setFullYear(t.currentTime.getFullYear()-1),a=11),t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(),a+1,0).getDate(),t.currentTime.getDate())),t.currentTime.setMonth(a),C.onChangeMonth&&e.isFunction(C.onChangeMonth)&&C.onChangeMonth.call(J,j.currentTime,J.data("input")),J.trigger("xchange.xdsoft"),a},t.getWeekOfYear=function(t){if(C.onGetWeekOfYear&&e.isFunction(C.onGetWeekOfYear)){var a=C.onGetWeekOfYear.call(J,t);if("undefined"!=typeof a)return a}var r=new Date(t.getFullYear(),0,1);return 4!=r.getDay()&&r.setMonth(0,1+(4-r.getDay()+7)%7),Math.ceil(((t-r)/864e5+r.getDay()+1)/7)},t.strToDateTime=function(e){var a,n,o=[];return e&&e instanceof Date&&t.isValidDate(e)?e:(o=/^(\+|\-)(.*)$/.exec(e),o&&(o[2]=r.parseDate(o[2],C.formatDate)),o&&o[2]?(a=o[2].getTime()-6e4*o[2].getTimezoneOffset(),n=new Date(t.now(!0).getTime()+parseInt(o[1]+"1",10)*a)):n=e?r.parseDate(e,C.format):t.now(),t.isValidDate(n)||(n=t.now()),n)},t.strToDate=function(e){if(e&&e instanceof Date&&t.isValidDate(e))return e;var a=e?r.parseDate(e,C.formatDate):t.now(!0);return t.isValidDate(a)||(a=t.now(!0)),a},t.strtotime=function(e){if(e&&e instanceof Date&&t.isValidDate(e))return e;var a=e?r.parseDate(e,C.formatTime):t.now(!0);return t.isValidDate(a)||(a=t.now(!0)),a},t.str=function(){return r.formatDate(t.currentTime,C.format)},t.currentTime=this.now()},j=new d,V.on("touchend click",function(e){e.preventDefault(),J.data("changed",!0),j.setCurrentTime(i()),a.val(j.str()),J.trigger("close.xdsoft")}),N.find(".xdsoft_today_button").on("touchend mousedown.xdsoft",function(){J.data("changed",!0),j.setCurrentTime(0,!0),J.trigger("afterOpen.xdsoft")}).on("dblclick.xdsoft",function(){var e,t,r=j.getCurrentTime();r=new Date(r.getFullYear(),r.getMonth(),r.getDate()),e=j.strToDate(C.minDate),e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e>r||(t=j.strToDate(C.maxDate),t=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r>t||(a.val(j.str()),a.trigger("change"),J.trigger("close.xdsoft")))}),N.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft",function(){var t=e(this),a=0,r=!1;!function n(e){t.hasClass(C.next)?j.nextMonth():t.hasClass(C.prev)&&j.prevMonth(),C.monthChangeSpinner&&(r||(a=setTimeout(n,e||100)))}(500),e([document.body,window]).on("touchend mouseup.xdsoft",function o(){clearTimeout(a),r=!0,e([document.body,window]).off("touchend mouseup.xdsoft",o)})}),E.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft",function(){var t=e(this),a=0,r=!1,n=110;!function o(e){var i=R[0].clientHeight,s=B[0].offsetHeight,d=Math.abs(parseInt(B.css("marginTop"),10));t.hasClass(C.next)&&s-i-C.timeHeightInTimePicker>=d?B.css("marginTop","-"+(d+C.timeHeightInTimePicker)+"px"):t.hasClass(C.prev)&&d-C.timeHeightInTimePicker>=0&&B.css("marginTop","-"+(d-C.timeHeightInTimePicker)+"px"),R.trigger("scroll_element.xdsoft_scroller",[Math.abs(parseInt(B[0].style.marginTop,10)/(s-i))]),n=n>10?10:n-10,r||(a=setTimeout(o,e||n))}(500),e([document.body,window]).on("touchend mouseup.xdsoft",function i(){clearTimeout(a),r=!0,e([document.body,window]).off("touchend mouseup.xdsoft",i)})}),u=0,J.on("xchange.xdsoft",function(t){clearTimeout(u),u=setTimeout(function(){if(void 0===j.currentTime||null===j.currentTime){if(C.allowBlank)return;j.currentTime=j.now()}for(var t,i,s,d,u,l,f,c,m,h,g="",p=new Date(j.currentTime.getFullYear(),j.currentTime.getMonth(),1,12,0,0),y=0,v=j.now(),b=!1,D=!1,k=[],x=!0,T="",S="";p.getDay()!==C.dayOfWeekStart;)p.setDate(p.getDate()-1);for(g+="<table><thead><tr>",C.weeks&&(g+="<th></th>"),t=0;7>t;t+=1)g+="<th>"+C.i18n[o].dayOfWeekShort[(t+C.dayOfWeekStart)%7]+"</th>";for(g+="</tr></thead>",g+="<tbody>",C.maxDate!==!1&&(b=j.strToDate(C.maxDate),b=new Date(b.getFullYear(),b.getMonth(),b.getDate(),23,59,59,999)),C.minDate!==!1&&(D=j.strToDate(C.minDate),D=new Date(D.getFullYear(),D.getMonth(),D.getDate()));y<j.currentTime.countDaysInMonth()||p.getDay()!==C.dayOfWeekStart||j.currentTime.getMonth()===p.getMonth();)k=[],y+=1,s=p.getDay(),d=p.getDate(),u=p.getFullYear(),l=p.getMonth(),f=j.getWeekOfYear(p),h="",k.push("xdsoft_date"),c=C.beforeShowDay&&e.isFunction(C.beforeShowDay.call)?C.beforeShowDay.call(J,p):null,C.allowDateRe&&"[object RegExp]"===Object.prototype.toString.call(C.allowDateRe)?C.allowDateRe.test(r.formatDate(p,C.formatDate))||k.push("xdsoft_disabled"):C.allowDates&&C.allowDates.length>0?-1===C.allowDates.indexOf(r.formatDate(p,C.formatDate))&&k.push("xdsoft_disabled"):b!==!1&&p>b||D!==!1&&D>p||c&&c[0]===!1?k.push("xdsoft_disabled"):-1!==C.disabledDates.indexOf(r.formatDate(p,C.formatDate))?k.push("xdsoft_disabled"):-1!==C.disabledWeekDays.indexOf(s)?k.push("xdsoft_disabled"):a.is("[readonly]")&&k.push("xdsoft_disabled"),c&&""!==c[1]&&k.push(c[1]),j.currentTime.getMonth()!==l&&k.push("xdsoft_other_month"),(C.defaultSelect||J.data("changed"))&&r.formatDate(j.currentTime,C.formatDate)===r.formatDate(p,C.formatDate)&&k.push("xdsoft_current"),r.formatDate(v,C.formatDate)===r.formatDate(p,C.formatDate)&&k.push("xdsoft_today"),(0===p.getDay()||6===p.getDay()||-1!==C.weekends.indexOf(r.formatDate(p,C.formatDate)))&&k.push("xdsoft_weekend"),void 0!==C.highlightedDates[r.formatDate(p,C.formatDate)]&&(i=C.highlightedDates[r.formatDate(p,C.formatDate)],k.push(void 0===i.style?"xdsoft_highlighted_default":i.style),h=void 0===i.desc?"":i.desc),C.beforeShowDay&&e.isFunction(C.beforeShowDay)&&k.push(C.beforeShowDay(p)),x&&(g+="<tr>",x=!1,C.weeks&&(g+="<th>"+f+"</th>")),g+='<td data-date="'+d+'" data-month="'+l+'" data-year="'+u+'" class="xdsoft_date xdsoft_day_of_week'+p.getDay()+" "+k.join(" ")+'" title="'+h+'"><div>'+d+"</div></td>",p.getDay()===C.dayOfWeekStartPrev&&(g+="</tr>",x=!0),p.setDate(d+1);if(g+="</tbody></table>",L.html(g),N.find(".xdsoft_label span").eq(0).text(C.i18n[o].months[j.currentTime.getMonth()]),N.find(".xdsoft_label span").eq(1).text(j.currentTime.getFullYear()),T="",S="",l="",m=function(t,n){var o,i,s=j.now(),d=C.allowTimes&&e.isArray(C.allowTimes)&&C.allowTimes.length;s.setHours(t),t=parseInt(s.getHours(),10),s.setMinutes(n),n=parseInt(s.getMinutes(),10),o=new Date(j.currentTime),o.setHours(t),o.setMinutes(n),k=[],C.minDateTime!==!1&&C.minDateTime>o||C.maxTime!==!1&&j.strtotime(C.maxTime).getTime()<s.getTime()||C.minTime!==!1&&j.strtotime(C.minTime).getTime()>s.getTime()?k.push("xdsoft_disabled"):C.minDateTime!==!1&&C.minDateTime>o||C.disabledMinTime!==!1&&s.getTime()>j.strtotime(C.disabledMinTime).getTime()&&C.disabledMaxTime!==!1&&s.getTime()<j.strtotime(C.disabledMaxTime).getTime()?k.push("xdsoft_disabled"):a.is("[readonly]")&&k.push("xdsoft_disabled"),i=new Date(j.currentTime),i.setHours(parseInt(j.currentTime.getHours(),10)),d||i.setMinutes(Math[C.roundTime](j.currentTime.getMinutes()/C.step)*C.step),(C.initTime||C.defaultSelect||J.data("changed"))&&i.getHours()===parseInt(t,10)&&(!d&&C.step>59||i.getMinutes()===parseInt(n,10))&&(C.defaultSelect||J.data("changed")?k.push("xdsoft_current"):C.initTime&&k.push("xdsoft_init_time")),parseInt(v.getHours(),10)===parseInt(t,10)&&parseInt(v.getMinutes(),10)===parseInt(n,10)&&k.push("xdsoft_today"),T+='<div class="xdsoft_time '+k.join(" ")+'" data-hour="'+t+'" data-minute="'+n+'">'+r.formatDate(s,C.formatTime)+"</div>"},C.allowTimes&&e.isArray(C.allowTimes)&&C.allowTimes.length)for(y=0;y<C.allowTimes.length;y+=1)S=j.strtotime(C.allowTimes[y]).getHours(),l=j.strtotime(C.allowTimes[y]).getMinutes(),m(S,l);else for(y=0,t=0;y<(C.hours12?12:24);y+=1)for(t=0;60>t;t+=C.step)S=(10>y?"0":"")+y,l=(10>t?"0":"")+t,m(S,l);for(B.html(T),n="",y=0,y=parseInt(C.yearStart,10)+C.yearOffset;y<=parseInt(C.yearEnd,10)+C.yearOffset;y+=1)n+='<div class="xdsoft_option '+(j.currentTime.getFullYear()===y?"xdsoft_current":"")+'" data-value="'+y+'">'+y+"</div>";for(U.children().eq(0).html(n),y=parseInt(C.monthStart,10),n="";y<=parseInt(C.monthEnd,10);y+=1)n+='<div class="xdsoft_option '+(j.currentTime.getMonth()===y?"xdsoft_current":"")+'" data-value="'+y+'">'+C.i18n[o].months[y]+"</div>";G.children().eq(0).html(n),e(J).trigger("generate.xdsoft")},10),t.stopPropagation()}).on("afterOpen.xdsoft",function(){if(C.timepicker){var e,t,a,r;B.find(".xdsoft_current").length?e=".xdsoft_current":B.find(".xdsoft_init_time").length&&(e=".xdsoft_init_time"),e?(t=R[0].clientHeight,a=B[0].offsetHeight,r=B.find(e).index()*C.timeHeightInTimePicker+1,r>a-t&&(r=a-t),R.trigger("scroll_element.xdsoft_scroller",[parseInt(r,10)/(a-t)])):R.trigger("scroll_element.xdsoft_scroller",[0])}}),P=0,L.on("touchend click.xdsoft","td",function(t){t.stopPropagation(),P+=1;var r=e(this),n=j.currentTime;return(void 0===n||null===n)&&(j.currentTime=j.now(),n=j.currentTime),r.hasClass("xdsoft_disabled")?!1:(n.setDate(1),n.setFullYear(r.data("year")),n.setMonth(r.data("month")),n.setDate(r.data("date")),J.trigger("select.xdsoft",[n]),a.val(j.str()),C.onSelectDate&&e.isFunction(C.onSelectDate)&&C.onSelectDate.call(J,j.currentTime,J.data("input"),t),J.data("changed",!0),J.trigger("xchange.xdsoft"),J.trigger("changedatetime.xdsoft"),(P>1||C.closeOnDateSelect===!0||C.closeOnDateSelect===!1&&!C.timepicker)&&!C.inline&&J.trigger("close.xdsoft"),void setTimeout(function(){P=0},200))}),B.on("touchend click.xdsoft","div",function(t){t.stopPropagation();var a=e(this),r=j.currentTime;return(void 0===r||null===r)&&(j.currentTime=j.now(),r=j.currentTime),a.hasClass("xdsoft_disabled")?!1:(r.setHours(a.data("hour")),r.setMinutes(a.data("minute")),J.trigger("select.xdsoft",[r]),J.data("input").val(j.str()),C.onSelectTime&&e.isFunction(C.onSelectTime)&&C.onSelectTime.call(J,j.currentTime,J.data("input"),t),J.data("changed",!0),J.trigger("xchange.xdsoft"),J.trigger("changedatetime.xdsoft"),void(C.inline!==!0&&C.closeOnTimeSelect===!0&&J.trigger("close.xdsoft")))}),I.on("mousewheel.xdsoft",function(e){return C.scrollMonth?(e.deltaY<0?j.nextMonth():j.prevMonth(),!1):!0}),a.on("mousewheel.xdsoft",function(e){return C.scrollInput?!C.datepicker&&C.timepicker?(A=B.find(".xdsoft_current").length?B.find(".xdsoft_current").eq(0).index():0,A+e.deltaY>=0&&A+e.deltaY<B.children().length&&(A+=e.deltaY),B.children().eq(A).length&&B.children().eq(A).trigger("mousedown"),!1):C.datepicker&&!C.timepicker?(I.trigger(e,[e.deltaY,e.deltaX,e.deltaY]),a.val&&a.val(j.str()),J.trigger("changedatetime.xdsoft"),!1):void 0:!0}),J.on("changedatetime.xdsoft",function(t){if(C.onChangeDateTime&&e.isFunction(C.onChangeDateTime)){var a=J.data("input");C.onChangeDateTime.call(J,j.currentTime,a,t),delete C.value,a.trigger("change")}}).on("generate.xdsoft",function(){C.onGenerate&&e.isFunction(C.onGenerate)&&C.onGenerate.call(J,j.currentTime,J.data("input")),q&&(J.trigger("afterOpen.xdsoft"),q=!1)}).on("click.xdsoft",function(e){e.stopPropagation()}),A=0,H=function(e,t){do if(e=e.parentNode,t(e)===!1)break;while("HTML"!==e.nodeName)},Y=function(){var t,a,r,n,o,i,s,d,u,l,f,c,m;if(d=J.data("input"),t=d.offset(),a=d[0],l="top",r=t.top+a.offsetHeight-1,n=t.left,o="absolute",u=e(window).width(),c=e(window).height(),m=e(window).scrollTop(),document.documentElement.clientWidth-t.left<I.parent().outerWidth(!0)){var h=I.parent().outerWidth(!0)-a.offsetWidth;n-=h}"rtl"===d.parent().css("direction")&&(n-=J.outerWidth()-d.outerWidth()),C.fixed?(r-=m,n-=e(window).scrollLeft(),o="fixed"):(s=!1,H(a,function(e){return"fixed"===window.getComputedStyle(e).getPropertyValue("position")?(s=!0,!1):void 0}),s?(o="fixed",r+J.outerHeight()>c+m?(l="bottom",r=c+m-t.top):r-=m):r+a.offsetHeight>c+m&&(r=t.top-a.offsetHeight+1),0>r&&(r=0),n+a.offsetWidth>u&&(n=u-a.offsetWidth)),i=J[0],H(i,function(e){var t;return t=window.getComputedStyle(e).getPropertyValue("position"),"relative"===t&&u>=e.offsetWidth?(n-=(u-e.offsetWidth)/2,!1):void 0}),f={position:o,left:n,top:"",bottom:""},f[l]=r,J.css(f)},J.on("open.xdsoft",function(t){var a=!0;C.onShow&&e.isFunction(C.onShow)&&(a=C.onShow.call(J,j.currentTime,J.data("input"),t)),a!==!1&&(J.show(),Y(),e(window).off("resize.xdsoft",Y).on("resize.xdsoft",Y),C.closeOnWithoutClick&&e([document.body,window]).on("touchstart mousedown.xdsoft",function r(){J.trigger("close.xdsoft"),e([document.body,window]).off("touchstart mousedown.xdsoft",r)}))}).on("close.xdsoft",function(t){var a=!0;N.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(),C.onClose&&e.isFunction(C.onClose)&&(a=C.onClose.call(J,j.currentTime,J.data("input"),t)),a===!1||C.opened||C.inline||J.hide(),t.stopPropagation()}).on("toggle.xdsoft",function(){J.trigger(J.is(":visible")?"close.xdsoft":"open.xdsoft")}).data("input",a),X=0,J.data("xdsoft_datetime",j),J.setOptions(C),j.setCurrentTime(i()),a.data("xdsoft_datetimepicker",J).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",function(){a.is(":disabled")||a.data("xdsoft_datetimepicker").is(":visible")&&C.closeOnInputClick||(clearTimeout(X),X=setTimeout(function(){a.is(":disabled")||(q=!0,j.setCurrentTime(i(),!0),C.mask&&s(C),J.trigger("open.xdsoft"))},100))}).on("keydown.xdsoft",function(t){var a,r=t.which;return-1!==[p].indexOf(r)&&C.enterLikeTab?(a=e("input:visible,textarea:visible,button:visible,a:visible"),J.trigger("close.xdsoft"),a.eq(a.index(this)+1).focus(),!1):-1!==[T].indexOf(r)?(J.trigger("close.xdsoft"),!0):void 0}).on("blur.xdsoft",function(){J.trigger("close.xdsoft")})},d=function(t){var a=t.data("xdsoft_datetimepicker");a&&(a.data("xdsoft_datetime",null),a.remove(),t.data("xdsoft_datetimepicker",null).off(".xdsoft"),e(window).off("resize.xdsoft"),e([window,document.body]).off("mousedown.xdsoft touchstart"),t.unmousewheel&&t.unmousewheel())},e(document).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl",function(e){e.keyCode===h&&(F=!0)}).on("keyup.xdsoftctrl",function(e){e.keyCode===h&&(F=!1)}),this.each(function(){var t,a=e(this).data("xdsoft_datetimepicker");if(a){if("string"===e.type(n))switch(n){case"show":e(this).select().focus(),a.trigger("open.xdsoft");break;case"hide":a.trigger("close.xdsoft");break;case"toggle":a.trigger("toggle.xdsoft");break;case"destroy":d(e(this));break;case"reset":this.value=this.defaultValue,this.value&&a.data("xdsoft_datetime").isValidDate(r.parseDate(this.value,C.format))||a.data("changed",!1),a.data("xdsoft_datetime").setCurrentTime(this.value);break;case"validate":t=a.data("input"),t.trigger("blur.xdsoft");break;default:a[n]&&e.isFunction(a[n])&&(u=a[n](i))}else a.setOptions(n);return 0}"string"!==e.type(n)&&(!C.lazyInit||C.open||C.inline?s(e(this)):A(e(this)))}),u},e.fn.datetimepicker.defaults=a}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var i=t||window.event,s=d.call(arguments,1),u=0,f=0,c=0,m=0,h=0,g=0;if(t=e.event.fix(i),t.type="mousewheel","detail"in i&&(c=-1*i.detail),"wheelDelta"in i&&(c=i.wheelDelta),"wheelDeltaY"in i&&(c=i.wheelDeltaY),"wheelDeltaX"in i&&(f=-1*i.wheelDeltaX),"axis"in i&&i.axis===i.HORIZONTAL_AXIS&&(f=-1*c,c=0),u=0===c?f:c,"deltaY"in i&&(c=-1*i.deltaY,u=c),"deltaX"in i&&(f=i.deltaX,0===c&&(u=-1*f)),0!==c||0!==f){if(1===i.deltaMode){var p=e.data(this,"mousewheel-line-height");u*=p,c*=p,f*=p}else if(2===i.deltaMode){var y=e.data(this,"mousewheel-page-height");u*=y,c*=y,f*=y}if(m=Math.max(Math.abs(c),Math.abs(f)),(!o||o>m)&&(o=m,r(i,m)&&(o/=40)),r(i,m)&&(u/=40,f/=40,c/=40),u=Math[u>=1?"floor":"ceil"](u/o),f=Math[f>=1?"floor":"ceil"](f/o),c=Math[c>=1?"floor":"ceil"](c/o),l.settings.normalizeOffset&&this.getBoundingClientRect){var v=this.getBoundingClientRect();h=t.clientX-v.left,g=t.clientY-v.top}return t.deltaX=f,t.deltaY=c,t.deltaFactor=o,t.offsetX=h,t.offsetY=g,t.deltaMode=0,s.unshift(t,u,f,c),n&&clearTimeout(n),n=setTimeout(a,200),(e.event.dispatch||e.event.handle).apply(this,s)}}function a(){o=null}function r(e,t){return l.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var n,o,i=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],s="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],d=Array.prototype.slice;if(e.event.fixHooks)for(var u=i.length;u;)e.event.fixHooks[i[--u]]=e.event.mouseHooks;var l=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var a=s.length;a;)this.addEventListener(s[--a],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",l.getLineHeight(this)),e.data(this,"mousewheel-page-height",l.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var a=s.length;a;)this.removeEventListener(s[--a],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var a=e(t),r=a["offsetParent"in e.fn?"offsetParent":"parent"]();return r.length||(r=e("body")),parseInt(r.css("fontSize"),10)||parseInt(a.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});
//# sourceMappingURL=production.js.map
