$(document).ready(function() {
	$('.portfolio__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,  		
		adaptiveHeight: true
	});

	$('.master__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,  		
		adaptiveHeight: true
	});

	$('.reviews__slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		centerMode: true,
		adaptiveHeight: true,
		variableWidth: true,
		responsive: [ 	
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				variableWidth: false
			}
		}
		]
	});

	$('.sale__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		centerMode: true,
		adaptiveHeight: false,
		variableWidth: true,
		responsive: [ 
		{
			breakpoint: 992,
			settings: {
				dots: true,
			}
		},

		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				variableWidth: false,
				adaptiveHeight: true,
				dots: true,
			}
		}
		]
	});

	$('.documents__slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: true,  
		arrows: true,
		responsive: [ 	
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
			}
		},

		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		},
		
		{
			breakpoint: 481,
			settings: {
				slidesToShow: 1,	
			}
		}
		
		]
	});

//galery

$('.portfolio__slide--popup').magnificPopup({
	delegate: 'a',
	type: 'image',
	tLoading: 'Loading image #%curr%...',
	mainClass: 'mfp-img-mobile',
	gallery: {
		enabled: true,
		navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	});

// Menu footer
if ($(window).width() < '992') {
	$(".page-footer__caption").on("click", function() {
		$(this).toggleClass("active");
		$(this).next().slideToggle();
	});
} else {
	$(".page-footer__caption").removeClass("active");
}

//Popup
$('.popup').magnificPopup({		
	type: "inline",
	preloader: !1,
	midClick: !0,
	removalDelay: 300,
	fixedContentPos: true,		
});


//Dropdoun
$('.calculator__link').click(function(event) {
	$('.calculator__wrapper--grey').toggleClass('active');
});

//Anchors (корректная работа с bLazy)
$('.site-list__link').on('click', function(e) {
	e.preventDefault();  
	var targetSelector = this.hash;
	var $target = $(targetSelector);

	$('html, body').animate(
	{
		scrollTop: $target.offset().top - 80 // Scroll to this location.
	}, {            
		duration: 2000,

		// At each animation step, check whether the target has moved.
		step: function( now, fx ) {
			var newOffset = $target.offset().top - 80;                
			if(fx.end !== newOffset)
				fx.end = newOffset;
		}
	}
	);
});

//  Down
$('.down').on('click', function(e) {
	e.preventDefault();
	var id  = $(this).attr('href');
	var top = $(id).offset().top;
	$('body,html').animate({scrollTop: top}, 1000); 
});

// Основная навигация

// Для iOs

var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
var event = "click";

if(iOS != null) {
	event = "touchstart";
}

// Menu
var navToggle = $('.main-nav__toggle');
var navWrapper = $('.navigation');
var navInnerWrap = $('.navigation__wrapper');
var navOverlay = $('.nav-overlay');
var navLink = $('.nav-main__link');
var navSubLink = $('.nav-sub__link');
var navLinkArrow = $('.nav-main__link--arrow');
var navSubLinkArrow = $('.nav-sub__link--arrow');
var navSubBack = $('.nav-sub__back');
var navSecondSubBack = $('.second-sub__back');

$('.main-nav__toggle-name').on(event, function(){			
	if (navToggle.hasClass('main-nav__toggle--closed')) {
		navToggle.removeClass('main-nav__toggle--closed').addClass('main-nav__toggle--opened');
		navWrapper.removeClass('navigation--closed').slideToggle('slow').addClass('navigation--opened');
		navOverlay.addClass('active');
		var bLazy = new Blazy(); bLazy.revalidate();			
	} else {
		navToggle.removeClass('main-nav__toggle--opened').addClass('main-nav__toggle--closed');
		navWrapper.removeClass('navigation--opened').slideToggle('slow').addClass('navigation--closed');
		navOverlay.removeClass('active');			
	}
	$('.social__link').on('click', function(e) {
		e.stopPropagation();
	});
});

navOverlay.on('click', function(){
	navToggle.removeClass('main-nav__toggle--opened').addClass('main-nav__toggle--closed');
	navWrapper.removeClass('navigation--opened').slideToggle('slow').addClass('navigation--closed');
	navToggle.removeClass('active');
	navOverlay.removeClass('active');		
});

// Desktop menu
function hoverMenu() {
	navLink.unbind('click');
	navSubLink.unbind('click');    

	$('.nav-main').css('left', '0%').stop();
	$('.nav-sub').css('left', '100%').stop();
	$('.second-sub').css('left', '100%').stop();

	navLink.hover(function(){
		$('.nav-main__item').removeClass('active');
		$('.nav-main__link').removeClass('active');
		$('.nav-sub').removeClass('active');
		$('.nav-sub__item').removeClass('active');
		$('.nav-sub__link').removeClass('active');
		$('.second-sub').removeClass('active');

		var hovered = $(this);
		hovered.addClass('active');

		if (hovered.hasClass('nav-main__link--arrow')) {
			var hoveredSub = hovered.next('.nav-sub');
			hoveredSub.addClass('active');
			hoveredSubItem = hoveredSub.find('.nav-sub__item').eq(1);
			hoveredSubItem.addClass('active').find('.nav-sub__link').addClass('active');
			hoveredSubItem.find('.nav-sub__link').next('.second-sub').addClass('active');
		}		    

		if (navLink.hasClass('active')) {
			$(this).parent().addClass('active');
		}
	});

	navSubLink.hover(function(){
		$('.nav-sub__link').removeClass('active');
		$('.second-sub').removeClass('active');

		$(this).addClass('active');
		$(this).next().addClass('active');

		navSubLink.parent().removeClass('active');

		if (navSubLink.hasClass('active')) {
			$(this).parent().addClass('active');
		}
	});
} 

// Mobile menu
function clickMenu() {
	navLink.unbind('mouseenter mouseleave');
	navSubLink.unbind('mouseenter mouseleave');
	navSubBack.unbind('hover');
	navSecondSubBack.unbind('hover');
	navInnerWrap.unbind('click');

	$('.nav-main__item').removeClass('active');
	$('.nav-sub__item').removeClass('active');
	$('.nav-main__link').removeClass('active');
	$('.nav-sub__link').removeClass('active');

	navLink.on(event, function(e){
		e.preventDefault();
	});	    

	navLinkArrow.on(event, function(e){
		e.preventDefault();
		$('.nav-main').animate({left: '-100%' },700);
		$('.nav-main__link').removeClass('active');
		$('.nav-sub').removeClass('active');
		$('.second-sub').removeClass('active');
		$(this).next().addClass('active').animate({left: '100%' },700);
	});

	navSubLinkArrow.on(event, function(e){
		e.preventDefault();
		$('.nav-sub__link').removeClass('active');
		$('.second-sub').removeClass('active');
		$(this).parent().parent().animate({left: '0%' },700);
		$(this).next().addClass('active').animate({left: '100%' },700);
	});

	navSubBack.on(event, function(){
		$(this).parent().animate({left: '100%' },700);
		$(this).parent().parent().parent().animate({left: '0%' },700);
	}); 

	navSecondSubBack.on(event, function(){
		$(this).parent().animate({left: '100%' },700);
		$(this).parent().parent().parent().animate({left: '100%' },700);
	}); 
}  

if ($(window).width() < 750) {
	clickMenu();
}

if ($(window).width() >= 750) {		
	hoverMenu();
	if($('.nav-main a').not().hasClass('nav-main__link--arrow')) {
		$('.nav-main li').on(event, function(){
			var linkHref = $(this).find('a').attr('href');
			window.location.replace(linkHref);
		});
	}
}	

//YouTube

$(function() {

	$(".video-reviews__youtube").each(function() {

		// Зная идентификатор видео на YouTube, легко можно найти его миниатюру
		$(this).css('background-image', 'url(https://i.ytimg.com/vi/' + this.id + '/hqdefault.jpg)');

		// Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер

		$(this).append($('<div/>', {'class': 'play'}));

		$(document).delegate('#'+this.id, 'click', function() {

			// создаем iframe со включенной опцией autoplay
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";

			if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

			// Высота и ширина iframe должны быть такими же, как и у родительского блока
			var iframe = $('<iframe/>', {'frameborder': '0', 'allowfullscreen': '1', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

			// Заменяем миниатюру HTML5 плеером с YouTube
			$(this).replaceWith(iframe);

		});
	});
});		


const btns = $('.scroll');
btns.each(function() {
	$(this).on('click', function(e) {
		e.preventDefault();  
		let targetSelector = this.hash;
		let $target = $(targetSelector);
		let topVal = 100;      

		$('html, body').animate(
		{
            scrollTop: $target.offset().top - topVal // Scroll to this location.
          }, {            
          	duration: 2000,

            // At each animation step, check whether the target has moved.
            step: function( now, fx ) {
            	let newOffset = $target.offset().top - topVal;                
            	if(fx.end !== newOffset)
            		fx.end = newOffset;
            }
          }
          );		
	});
});

$(function(e) {
	e.mask.definitions.Z = "[1,2,3,4,5,6,9]";
	$('input[type="tel"]').mask('+7(Z99) 999-99-99');
});


function validateForm(params) {
      // Объявляем переменные (форма и кнопка отправки)
      let form = $(params),
      btn = form.find('button[type="submit"]');     

      // Добавляем каждому проверяемому полю, указание что поле пустое
      form.find('.form__control').addClass('empty-field');

      // Функция проверки полей формы
      function checkInput(){
      	form.find('.form__control:not(.form__control--select)').each(function(){
      		if($(this).val() != '' && $(this).val().indexOf('_') == -1) {
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty-field');
              } else {
                // Если поле пустое добавляем класс-указание
                $(this).addClass('empty-field');
              }
            });
      }

      // Функция подсветки незаполненных полей
      function lightEmpty(){
      	form.find('.empty-field').addClass('error');
      }

      form.find('.empty-field').on('change', function(){
      	if ($(this).val() != '' && $(this).val().indexOf('_') == -1) {
      		$(this).removeClass('empty-field').removeClass('error');
      	}
      });


      // Проверка в режиме реального времени
      setInterval(function(){
          // Запускаем функцию проверки полей на заполненность
          checkInput();
          // Считаем к-во незаполненных полей
          let sizeEmpty = form.find('.empty-field').length;
          // Вешаем условие-тригер на кнопку отправки формы
          if(sizeEmpty > 0) {
          	if(btn.hasClass('disabled')){
          		return false
          	} else {
          		btn.addClass('disabled')
          	}
          } else {
          	btn.removeClass('disabled')
          }

        }, 1500);

      // Событие клика по кнопке отправить
      btn.click(function(){
      	if($(this).hasClass('disabled')) {
            // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
            lightEmpty();
            return false
          } else {
            // Все хорошо, все заполнено, отправляем форму           
            form.submit();
          }
        });
    };

    validateForm('#popupCalc form');
    validateForm('#popupDiscount form');
    validateForm('#popupFroze form');
    validateForm('#popupCalc-1 form');
    validateForm('#popupCallback form');
    validateForm('#calcForm');
	validateForm('#zvonok');

    function locationHashChanged() {
    	if (location.hash) {
    		var hash = location.hash.replace(/#/, '');
    		history.replaceState({}, '', hash)
    	}
    }
    window.onhashchange = locationHashChanged;

    const changeTypeRemont = function () {
    	let typeRemont = $('#type-remont-room').val();
    	$('.calculator__remont-description').removeClass('active');
    	$('#type-remont-room-' + typeRemont).addClass('active');
    }
    $('#type-remont-room').on('change', changeTypeRemont);
  });


  //Tabs-footer


  $('.contacts__item').on('click', function(e){
  	e.preventDefault();
  	$('.contacts__item').removeClass('active');
  	$(this).addClass('active');

  	var navTab = $(this).data('tab');

  	$('.contacts__tab').removeClass('active');

  	$('#tab-' + navTab).addClass('active');

  });

  var pageVacancy = $('.page-vacancy');
  var tabVacancy = $('[data-tab=3]');
  var vacancyTab = $('[id=tab-3]');

  if (pageVacancy.length > 0) {
  	$('.contacts__tab').removeClass('active');
  	$('.contacts__item').removeClass('active');
  	tabVacancy.addClass('active');
  	vacancyTab.addClass('active');
  }

  $('.reviews__link-blue').on('click', function() {
  	const reviewsBlock = $(this).parent().find('.reviews__block');
  	const slickList = $('.reviews__slider .slick-list');
  	const marginBlock = parseInt(reviewsBlock.css('margin-bottom'));		
  	const heightFirst = reviewsBlock.height();
  	const heightSlickList = slickList.height();
  	$(this).hide();
  	reviewsBlock.addClass('active');		
  	let heightSecond = reviewsBlock.height();
  	let diff = heightSecond - (heightFirst + $(this).height() + marginBlock);
  	let newHeightSlickList = heightSlickList + diff;		
  	slickList.css('height', newHeightSlickList);
  });

//form input type=range
const setValueNumberRoom = function () {
	const roomRangeIn = ['#import-two', '#import-two-bottom'];
	const roomRangeOut = ['#fader-two', '#fader-two-bottom'];
	for (let i=0; i < roomRangeIn.length; i++) {
		$(roomRangeIn[i]).val($(roomRangeOut[i]).val() + ' ' + 'комнаты');
		$(roomRangeOut[i]).on('input', function() {
			let text;
			if ($(this).val() == '0') {
				$(roomRangeIn[i]).val('Студия');
			}  else {
				if ($(this).val() == '1') {
					text = 'комната';  		
				} else if ($(this).val() == '2' || $(this).val() == '3' || $(this).val() == '4') {
					text = 'комнаты';	
				} else if ($(this).val() == '5') {
					text = 'комнат';	
				}
				$(roomRangeIn[i]).val($(this).val() + ' ' + text);
			}  	
		});
	}
}
setValueNumberRoom();

const setSquareRoom = function () {
	const squareRangeIn = ['#import', '#import-bottom'];
	const squareRangeOut = ['#fader', '#fader-bottom'];
	for (let i=0; i < squareRangeIn.length; i++) {
		$(squareRangeIn[i]).val($(squareRangeOut[i]).val() + ' ' + 'м2');
		$(squareRangeOut[i]).on('input', function() {
			$(squareRangeIn[i]).val($(this).val() + ' ' + 'м2');
		});
	}
}
setSquareRoom();
