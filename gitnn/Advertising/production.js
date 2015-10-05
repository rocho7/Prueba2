var ProductionPage = (function($) {
	return function ($) {
		var $uls = $('.animated-points ul');
		var _this = this;
		this.scriptLoadIndex = 0;
		this.display = { w: 0, h: 0};
		this.scrollController = $.superscrollorama();

		this.waysPlaced = false;
		var videoPlayer = _V_("reel");
		var videoPlayerInitiated = false;
		this.updateDisplay = function () {
			_this.display.w = window.innerWidth;
			_this.display.h = window.innerHeight;
		}

		this.init = function () {
			if(!_this.waysPlaced) _this.placeWays();
			$(".video-player-cover").click(function(evt) {
				_this.onPlayButtonClick(evt);
			});

			$(".video-player-init-play-button").click(function(evt) {
				if(!videoPlayerInitiated) {
					_this.onPlayButtonClick(evt);
				} else {
					if(videoPlayer.paused()) {
						videoPlayer.play();
					} else {
						videoPlayer.pause();
					}
				}
			});

			$(".video-player-play-button").click(function(evt) {
				if(videoPlayer.paused()) {
					videoPlayer.play();
				} else {
					videoPlayer.pause();
				}
			});
			videoPlayer.ready(function() {
				videoPlayer.addEvent("play", function() {
					$(".video-player-orange-overlay").addClass("transitioning");
					TweenMax.to($(".video-player-init-play-button img"),.25,{css:{opacity:0}});
					TweenMax.to($(".video-player-cover-left"),.4,{ease:Cubic.easeOut,css:{left:'-440px'}});
					TweenMax.to($(".video-player-cover-right"),.4,{ease:Cubic.easeOut,onComplete:onVideoTransitioned,css:{left:'880px'}});

				
					function onVideoTransitioned() {
						$(".video-player-orange-overlay").fadeOut(300,function() {
							$(".video-player-orange-overlay").remove();
							$(".video-player-init-play-button").remove();
						});
					}
					$(".video-player-wrapper").removeClass("paused");
					videoPlayer.controlBar.player.removeEvent("mouseout",videoPlayer.controlBar.proxy(videoPlayer.controlBar.fadeOut));
				});
				videoPlayer.addEvent("pause", function() {
					$(".video-player-wrapper").addClass("paused");
					videoPlayer.controlBar.player.removeEvent("mouseout",videoPlayer.controlBar.proxy(videoPlayer.controlBar.fadeOut));
				});
			});
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
			$('#work-section-1').waypoint(function(evt, dir){
				if(dir === 'down' && !$("#smarter-bigger").hasClass("transitioned")) _this.triggerSmarterBigger($("#smarter-bigger"));
			});
			$('#work-section-2').waypoint(function(evt, dir){
				if(dir === 'down' && !$("#agency-squares").hasClass("transitioned")) _this.triggerSquareGrid($("#agency-squares"));
			});
			$('#work-section-3').waypoint(function(evt, dir){
				if(dir === 'down' && !$("#technology-squares").hasClass("transitioned")) _this.triggerSquareGrid($("#technology-squares"));
			});
		},

		this.triggerScissors = function (elem) {
			elem.data('revealed', true);
			var scissorY = -28;
			var scissorYTo = scissorY+1156;
			var scissorX = ((_this.display.w-1900)/2)+58-151;
			var scissorXTo = scissorX+1154;
			if(elem.hasClass('alt')){
				scissorX = scissorX + 55;
				// scissorY = scissorY + 55;
				scissorXTo = scissorXTo + 55;
				// scissorYTo = scissorYTo - 55;
				// elem.append($('.scissors-right'));
				// var scissors = $('.scissors-right');

				// scissors.css({'top':scissorY, 'right':scissorX, 'display':'block'});

				elem.append("<div class='production-shadow alt'></div>");
				// TweenMax.to(scissors, 2, {css:{'top':scissorYTo+"px", 'right':scissorXTo+'px'}});
			}
			else {
				elem.append($('.scissors-left'));
				// var scissors = $('.scissors-left');

				// scissors.css({'top':scissorY, 'left':scissorX, 'display':'block'});

				elem.append("<div class='production-shadow'></div>");
				// TweenMax.to(scissors, 2, {css:{'top':scissorYTo+"px", 'left':scissorXTo+'px'}});	
			}

			TweenMax.to(elem.find('.production-shadow'), 2, {css:{'autoAlpha':1}});
		},
		this.triggerSmarterBigger = function(smarterBigger) {
			timeline = new TimelineMax();
       
      for(i=0;i<6;i++) {
        timeline.append( TweenMax.to(smarterBigger.find("img").eq(i), .5, {css:{'left':'584px'}}),-0.4 );
      }
		},
		this.triggerSquareGrid = function(gridType) {
			gridType.addClass("transitioned");
			if(!$('html').hasClass("csstransitions")) {
				var rightValue = 0;
				var topValue = 0;
				gridType.find("div").each(function(index) {
					$(this).data('leftValue',$(this).css('left'));
					$(this).data('topValue',$(this).css('top'));
				});
				gridType.removeClass("transitioned");
				gridType.find("div").each(function(index) {
					TweenMax.to($(this), .75, {css:{'left':$(this).data('leftValue')+'px','top':$(this).data('topValue')+'px',delay:index*.25}});
				});
			}
		},
		this.initAnimations = function() {
			$('.product-images').each( function() {
				$.getScript($(this).data('animationfile'), _this.onScriptLoaded).fail(function(jqxhr, settings, exception){
					
				});
			});
		},
		this.onPlayButtonClick = function(evt) {
			evt.preventDefault();
			videoPlayerInitiated = true;
			videoPlayer.play();
		},
		this.onScriptLoaded = function (script, textStatus, jqXHR) {
			if( ++_this.scriptLoadIndex === $('.product-images').length)
			{
				$('.work-section').each(function(){
					var tll = new TimelineLite();
					var extraHeight = 0;
					$('.product-images').each(function(){
						var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
						var func = $(this).data('animationfile').match(re)[1];
						window[func].call(this,tll);
						extraHeight = tll.totalDuration() * 100;
						console.log(extraHeight);
					})
					var waypointTop = ($('.work-section-interior').height()-_this.display.h)/2;
					_this.scrollController.pin($(this), extraHeight, {anim:tll, offset:waypointTop, 
						onUnpin:function(){$.waypoints('refresh');
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
		if ($('body').hasClass('page-template-page-production-php')) {
			//TweenPlugin.activate([CSSPlugin]);
			var productionPage = new ProductionPage($);
			productionPage.init();
			$(window).resize(productionPage.updateDisplay);

		}
	});
}(jQuery);