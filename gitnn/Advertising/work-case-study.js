var WorkCaseStudyPage = (function($) {
	return function ($) {
		var $uls = $('.animated-points ul');
		var _this = this;
		this.scriptLoadIndex = 0;
		this.display = { w: 0, h: 0};
		this.scrollController = $.superscrollorama();
		this.timelines = [];
		this.waysPlaced = false;


		this.updateDisplay = function () {
			_this.display.w = window.innerWidth;
			_this.display.h = window.innerHeight;

			if(!_this.waysPlaced) _this.placeWays();
		}

		this.init = function () {
			_this.initAnimations();
		}

		this.placeWays = function () {
			_this.waysPlaced = true;
			$('.work-section').each(function(index,item){
				var waypointTop = ($('.work-section-interior').height()-_this.display.h)/2;
				$(item).append("<div class='product-item-waypoint' style='position:absolute; top:"+waypointTop+"px; left:0px'></div>");
			})

			$('.work-section').waypoint(function(evt, dir){
				if(dir === 'down' && !$(evt.target).closest('.work-section').data('revealed'))_this.triggerScissors($(evt.target).closest('.work-section'));
			});
		},

		this.triggerScissors = function (elem) {
			elem.data('revealed', true);
			var scissorY = 48;
			var scissorYTo = 1448;
			var scissorX = ((_this.display.w-1900)/2)+58;
			var scissorXTo = scissorX+1380;

			if(elem.hasClass('alt')){

				elem.append($('.scissors-right'));
				var scissors = $('.scissors-right');

				scissors.css({'top':scissorY, 'right':scissorX, 'display':'block'});

				elem.append("<div class='work-case-study-shadow alt'></div>");
				TweenMax.to(scissors, 2, {css:{'top':scissorYTo+"px", 'right':scissorXTo+'px'}});
			}
			else {
				elem.append($('.scissors-left'));
				var scissors = $('.scissors-left');

				scissors.css({'top':scissorY, 'left':scissorX, 'display':'block'});

				elem.append("<div class='work-case-study-shadow'></div>");
				TweenMax.to(scissors, 2, {css:{'top':scissorYTo+"px", 'left':scissorXTo+'px'}});	
			}

			TweenMax.to(elem.find('.work-case-study-shadow'), 2, {css:{'autoAlpha':1}});
		},

		this.revealProduct = function (elem, isAlt) {
			//console.log('revealing product')
		},

		this.initAnimations = function() {

			$('.product-images').each( function() {
				var _thisThing = $(this);
				//console.log('attempting load', _thisThing.data('animationfile'));
				$.getScript($(this).data('animationfile'), _this.onScriptLoaded).fail(function(jqxhr, settings, exception){
					//console.log('script load failed', _thisThing.data('animationfile'), settings, exception);
				});
			});
		},

		this.onScriptLoaded = function (script, textStatus, jqXHR) {
			if( ++_this.scriptLoadIndex === $('.product-images').length)
			{
				$('.work-section').each(function(){
					var tll = new TimelineLite();
					var extraHeight = 0;
					$(this).find('.product-images').each(function(){
						var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
						var func = $(this).data('animationfile').match(re)[1];
						//console.log('attempting to call animation', func);
						window[func].call(this,tll);
						extraHeight = tll.totalDuration() * 100;
					})
					var waypointTop = ($('.work-section-interior').height()-window.innerHeight)/2;
					//console.log('_this.display.h',_this.display.h);
					_this.timelines.push(tll);
					_this.scrollController.pin($(this), extraHeight, {anim:tll, offset:waypointTop, 
						onUnpin:function(){ $.waypoints('refresh');
						}});
				})
			}
		},

		this.displayCapabilities = function () {}
	}
})(jQuery);

// main entry point aka on document ready
!function($) {
	$(function() {
		if ($('body').hasClass('page-template-page-work-detail-php')) {
			//TweenPlugin.activate([CSSPlugin]);
			
			var workCaseStudyPage = new WorkCaseStudyPage($);
			workCaseStudyPage.init();

			$(window).resize(workCaseStudyPage.updateDisplay);
			$(window).trigger('resize');

			$(window).scroll(function(){
				if($(window).scrollTop() < 50){
					$('.pin-spacer').height(0);

					for (var i = workCaseStudyPage.timelines.length - 1; i >= 0; i--) {
						workCaseStudyPage.timelines[i].seek(0);
					};
				}
			})
		}
	});
}(jQuery);
