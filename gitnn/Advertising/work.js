var WorkPage = (function($) {
	return function ($) {
		var _this = this;
		this.rowHeightIncrement = 225;
		this.display = { w: 0, h: 0};
		this.initPositions = [
			{x:0,y:0}, {x: 225, y:0},
			{x:100,y:225}, {x:450,y:225},
			{x:0,y:450}, {x:290,y:450}, {x:675,y:450}
		];

		this.totalWorkItems = 0;
		this.animateIndex = 0;
		this.scrollBuffer = 1;

		this.init = function () {
			_this.totalWorkItems = $('li.work-item').length;
			
			var placeRow = 3;
			var placeCol = 0;
			var placeLeft = 0;

			var placementIndex = 0;
			$('li.work-item').each(function(){
				if(placementIndex < _this.initPositions.length) 
				{
					$(this).data(_this.initPositions[placementIndex++])
				}
				else
				{
					if(placeCol < 2)
					{
						placeCol++;
					}
					else
					{
						placeLeft = 0;
						placeCol = 0;
						placeRow++;
					}

					placeLeft = _this.getLeft(placeLeft, 880, 0);

					$(this).data({x:placeLeft, y:placeRow*_this.rowHeightIncrement});
					placeLeft += _this.rowHeightIncrement;
				}
				
				$(this).css({'top':$(this).data('y')+200,'left':$(this).data('x')});
			});

			$('.projects-container').css({'height':(placeRow*_this.rowHeightIncrement)+20})
		}

		this.updateDisplay = function () {
			_this.display.w = window.innerWidth;
			_this.display.h = window.innerHeight;
		}

		this.onScroll = function(evt, bypass_buffer){
			if(_this.scrollBuffer++ % 10 === 0 || bypass_buffer){
				//console.log(bypass_buffer);
				var scrollT = $(window).scrollTop() - $('.projects-container').offset().top;
				//console.log(scrollT);
				$('li.work-item').each(function(){
					if($(this).data('y') > scrollT && $(this).data('y')<scrollT + (_this.display.h + 100) && !$(this).data('in'))
					{
						var delay = Math.random() * .25; // .5;
						// TweenMax.fromTo($(this), 2, {css:{autoAlpha:0, top:$(this).data('y')+400}}, {css:{autoAlpha:1, top:$(this).data('y')}, ease:Expo.easeOut, delay:delay});
						TweenMax.to($(this), 1.5, {css:{autoAlpha:1, top:$(this).data('y')}, ease:Expo.easeOut, delay:delay});
						$(this).data('in', true);
					}
					/*else if( $(this).data('y') < scrollT + 200 && $(this).data('in') )
					{
						var delay = Math.random()*.5;
						TweenMax.to($(this), 1.5, {css:{autoAlpha:0, top:$(this).data('y')-300}, ease:Expo.easeInOut, delay:delay});
						$(this).data('in', false);
					}
					else if( $(this).data('y') > scrollT + (_this.display.h + 100) && $(this).data('in') )
					{
						var delay = Math.random()*.5;
						TweenMax.to($(this), 1.5, {css:{autoAlpha:0, top:$(this).data('y')+300}, ease:Expo.easeInOut, delay:delay});
						$(this).data('in', false);
					}*/
				})
			}
		}
		this.getLeft = function(startPos, maxWidth ){
			var maxPos = maxWidth - 225;
			var newPos = startPos + (Math.random()*100);
			if(newPos > maxPos){
				newPos = _this.getLeft(startPos, maxWidth);
				console.log(newPos)
			} 
			return newPos;
		}
		this.displayCapabilities = function () {}
	}
})(jQuery);

// main entry point aka on document ready
!function($) {
	$(function() {
		if ($('body').hasClass('page-template-page-work-php')) {
			var workPage = new WorkPage($);
			workPage.init();
			$(window).resize(workPage.updateDisplay);
			$(window).scroll(workPage.onScroll);

			
			var initialized = false,
				scroll_event_fired = false;
			
			$(window).on('scroll', function() {
				scroll_event_fired = true;
			});

			// Trigger this 
			setInterval(function() {
				if (scroll_event_fired && !initialized) {
					workPage.onScroll(null, true); // first parameter is event object, not used.  Second is parameter telling scroll to override scroll buffer just in this special initialization case.
					initialized = true;
				};
			}, 300);
		}
	});
}(jQuery);
