function pixToInt(pix) {return parseInt(pix.replace("px",""), 10);}

var AboutPage = (function($) {
	return function ($)  {
		var _this = this,
			$uls = $('.animated-points ul'),
			$lis = $uls.find('li'),
			$capabilitys = $('.capability'),
			$clients = $('.client'),
			$leadership = $('.leadership-item'),
			$sweetSpotSlides = $('#sweet-spot-slides-wrapper'),
			$arrows = $('.arrow'),
			display = { w: 0, h: 0};

		this.updateDisplay = function () {
			display.w = window.innerWidth;
			display.h = window.innerHeight;
		};
		this.resetSpacers = function () {
			_this.updateDisplay();
			// Sweet spot pin spacer
			// add 102 for .headline
			var pinHeight = 102,
				openSpace,
				newSpacerHeight;
			// add slider height
			pinHeight = pinHeight + $('#sweet-spot-slide-1').height();
			if (display.h < (pinHeight + 50 )) {
				$('.section-sweet-spot .top-spacer').css('height', '150px');
				$('.sweet-spot-spacer').css('height', '50px');
			} else {
				openSpace = display.h - pinHeight;
				newSpacerHeight = Math.floor(openSpace / 2);
				$('.section-sweet-spot .top-spacer').css('height', '0px');
				$('.sweet-spot-spacer').css('height', newSpacerHeight + "px");
			}
			// Process pin spacer
			// add 132 for .headline - 25 for padding
			pinHeight = 107;
			// add 60 for .process-body margin-top
			pinHeight = pinHeight + 60;
			// add .process-body height
			pinHeight = pinHeight + $('.section-process .process-body').height();
			if (display.h < (pinHeight + 50 )) {
				$('.section-process .top-spacer').css('height', '150px');
				$('.process-spacer').css('height', '50px');
			} else {
				openSpace = display.h - pinHeight;
				newSpacerHeight = Math.floor(openSpace / 2);
				// subtract 25 for .headline padding
				newSpacerHeight = newSpacerHeight - 25;
				$('.section-process .top-spacer').css('height', '0px');
				$('.process-spacer').css('height', newSpacerHeight + 'px');
			}
		};
		this.setInitialAnimationPositions = function () {
			this.resetSpacers();
			
			// Agency profile
			$lis.css('opacity', 0);
			$lis.css('top', '-50px');
			
			// Clients and capabilities
			$capabilitys.css('opacity', 0);
			$clients.css('opacity', 0);
			$clients.css('top', '100px');
			$clients.each(function (index) {
				var leftOffset =  -250 + ( (index % 6) * 100 );
				$(this).css('left', leftOffset + "px");
			});
			
			// Leadership
			$leadership.css('opacity', 0);

			// Our sweet spot
			var sliderWidth = pixToInt($sweetSpotSlides.css('width'));
			var newSliderWidth = $('.sweet-spot-slide').length * sliderWidth;
			$sweetSpotSlides.css('width', newSliderWidth + "px");
			
			// Our process
			$('#x-first').css('height', '0px');
			$('#x-second').css('height', '0px');
			$('#label-intersect').css('opacity', 0);
		};
		this.displayProfileStats = function () {
			var lisIndex = $lis.length;
			$lis.each(function (index) {
				var speed = 150 + index * 175;
				$(this).animate({
					opacity: 1,
					top: '0px'
				}, speed);
			});
			$.waypoints('refresh');
		};
		this.displayCapabilities = function () {
			$capabilitys.each(function (index) {
				var speed = 225;
				var waitTimeGoingLeft = 400 - index * 100;
				var waitTimeGoingRight = index * 100;
				var _this = $(this);
				setTimeout(function() {
					_this.animate({
						opacity: 1
					}, speed);
				}, waitTimeGoingRight);
			});
		};
		this.displayClients = function(client_row) {
			var my_selector = '.client-row-' + client_row + ' .client';
			$(my_selector).each(function (index) {
				var speed = 225;
				var waitTimeGoingLeft = 400 - index * 100;
				var waitTimeGoingRight = index * 100;
				var _this = $(this);
				setTimeout(function() {
					_this.animate({
						opacity: 1
					}, speed);
				}, waitTimeGoingRight);
			});
			$.waypoints('refresh');
		};
		this.displayLeadership = function ($leadership_row) {
			//console.log($leadership_row);
			$leadership_row.find('.leadership-item').each(function (index) {
				var speed = 225;
				var waitTimeGoingLeft = 400 - index * 100;
				var waitTimeGoingRight = index * 100;
				var _this = $(this);
				setTimeout(function() {
					_this.animate({
						opacity: 1
					}, speed);
				}, waitTimeGoingRight);
			});
		};
		this.buildArrowTween = function(dir) {
			var returnTween;
			switch (dir) {
				case 'fadein':
					returnTween = [];
					var leftVal = 0,
						topVal = 0,
						center = {x: 250, y: -3},
						rad = 450,
						vals = [],
						// For circle: divide half-circle evenly by # of arrows
						startAng = 0, // Math.PI / 4;
						angleSpan = 4 * Math.PI, // ath.PI, //2, //3,
						numberOfArrows = $arrows.length,
						angleInc = Math.PI / 6, //angleSpan / numberOfArrows,
						currentAng = startAng,
            // For vertical mvnt
            variationStart = 70,
            variationAmt = 100
            ;
					
					$arrows.each(function (ind, el) {
						vals.push({
							//x: center.x + Math.floor(rad * Math.cos(currentAng)),
							//y: center.y - Math.floor(rad * Math.sin(currentAng))
              y: variationStart 
                + (variationAmt * Math.cos(currentAng))
                + (ind * 5)
						});
						currentAng += angleInc;
					});
					$arrows.each(function (ind, el) {
						var valIndex = (numberOfArrows  - 1) - ind;
						returnTween.push (
             TweenMax.fromTo(
               $(this), 
               0.1, 
               {css: {opacity:1,/*0,left: vals[valIndex].x,*/top: vals[valIndex].y}},
               {css: {opacity:1,/*left: vals[valIndex].x,*/top: vals[valIndex].y}}
               )
             );
					});
					break;
				case 'position':
          returnTween = [];
          var vals = [],
              pyramidLevel = 5,
              currLevel = 0,
              currSpot = 0,
              startX = 188,
              startY = 6,
              incX = 33,
              incY = 17;
          $arrows.each(function (ind, el) {
            vals.push({
              x: startX + (incX * currSpot),
              y: startY
            });
            currSpot += 1;
            if (currSpot >= pyramidLevel) {
              currSpot = 0;
              pyramidLevel -= 1;
              startX += (incX / 2);
              startY += incY;
            }
          });
          $arrows.each(function (ind, el) {
            returnTween.push(
              TweenMax.to(
                $(this),
                0.1,
                {css: {left: vals[ind].x, top: vals[ind].y}}
              )
            );
          });
          break;
        case 'out':
					returnTween = TweenMax.to($('.arrow'), 0.2, {css: {top: 400, opacity: 0}});
          break;
			}
			return returnTween;
		};
	};
})(jQuery);

// main entry point aka on document ready
!function($) {
	$(function() {
		if ($('body').hasClass('page-template-page-about-php')) {

			var aboutPage = new AboutPage($);
			
			aboutPage.setInitialAnimationPositions();
			$(window).resize(aboutPage.resetSpacers);
			
			/**
			 * Timed animations
			 */
			
			// Profile Stats
			$('.animated-points').waypoint(function (e, d) {
				aboutPage.displayProfileStats();
			}, { offset: '80%' });
			
			// Capabilities
			$('.capabilities').waypoint(function(e, d) {
				aboutPage.displayCapabilities();
			}, { offset: '80%' });

			// Clients
			$('.client-row-1').waypoint(function(e, d) {
				aboutPage.displayClients(1);
			}, { offset: '80%' });
			$('.client-row-2').waypoint(function(e, d) {
				aboutPage.displayClients(2);
			}, { offset: '80%' });
			$('.client-row-3').waypoint(function(e, d) {
				aboutPage.displayClients(3);
			}, { offset: '80%' });
			$('.client-row-4').waypoint(function(e, d) {
				aboutPage.displayClients(4);
			}, { offset: '80%' });
			$('.client-row-5').waypoint(function(e, d) {
				aboutPage.displayClients(5);
			}, { offset: '80%' });
			$('.client-row-6').waypoint(function(e, d) {
				aboutPage.displayClients(6);
			}, { offset: '80%' });
			$('.client-row-7').waypoint(function(e, d) {
				aboutPage.displayClients(7);
			}, { offset: '80%' });

			// Leadership
			$('.leadership-items-1').waypoint(function(e, d) {
				aboutPage.displayLeadership( $(this) );
			}, { offset: '80%' });

			$('.leadership-items-2').waypoint(function(e, d) {
				aboutPage.displayLeadership( $(this) );
			}, { offset: '80%' });

			$('.leadership-items-3').waypoint(function(e, d) {
				aboutPage.displayLeadership( $(this) );
			}, { offset: '80%' });


			// Scroll tween animations
			// Sweet spot tween
			var doNothingParam = 0.4;
			var animDuration = 0.4;

			$.superscrollorama({blocks: '.section'})
				.pin($('#sweet-spot-pin'), 1800, {
					anim: (new TimelineLite())
					.append( TweenMax.to($('.do-nothing'), doNothingParam, {}))
					.append(
						TweenMax.to($('#sweet-spot-slide-1'), animDuration,
							{css: {width: 0, height: 0, opacity: 0}}
						)
					)
					.append( TweenMax.to($('.do-nothing'), doNothingParam, {}))
					.append(
						TweenMax.to($('#sweet-spot-slide-2'), animDuration,
							{css: {width: 0, height: 0, opacity: 0}}
						)
					)
					.append( TweenMax.to($('.do-nothing'), doNothingParam, {}))
					.append(
						TweenMax.to($('#sweet-spot-slide-3'), animDuration,
							{css: {width: 0, height: 0, opacity: 0}}
						)
					)
				})
				.pin($('.process-pin'), 3000, {
					anim: (new TimelineLite())
						.insert(
							TweenMax.fromTo($('.process-content'), 0.3,
								{css:{autoAlpha: 0}, immediateRender: true},
								{css:{autoAlpha: 1}}
							),
							0
						)/*.insert(
							TweenMax.fromTo($('.animated-process'), 0.2,
								{css:{autoAlpha: 0}, immediateRender: true},
								{css:{autoAlpha: 1}}
							),
							0
						)*/.insert(
							TweenMax.fromTo($('#x-first'), 0.1,
								{css:{left: 0, autoAlpha: 0, height: 0}, immediateRender: true},
								{css:{left: 140, autoAlpha: 1, height: 260}}
							),
							0.3
						)
						.insert(
							TweenMax.fromTo($('#x-second'), 0.1,
								{css:{left: 280, autoAlpha: 0, height: 0}},
								{css:{left: 140, autoAlpha: 1, height: 260}}
							),
							0.5
						)
						.insert(
							TweenMax.fromTo($('#label-collect'), 0.1,
								{css:{top: 0}},
								{css:{top: 120, autoAlpha: 1}}
							),
							0
						)
						.insert(
							TweenMax.to($('#label-collect'), 0.1,
								{css:{top: 200, autoAlpha: 0}}
							),
							0.3
						)
						.insert(
							TweenMax.fromTo($('#label-find'), 0.1,
								{css:{top: 0}},
								{css:{top: 110, autoAlpha: 1}}
							),
							0.3
            )
            .insert(
              TweenMax.to($('#label-find'), 0.1,
                {css: {top: 200, autoAlpha: 0}}
                ),
              0.5
            )
						.insert(
							TweenMax.fromTo($('#label-intersect'), 0.1,
								{css:{top: 0}},
								{css:{top: 110, autoAlpha: 1}}
							),
							0.5
            )
            .insert(
              TweenMax.to($('#label-intersect'), 0.1,
                {css: {top: 200, autoAlpha: 0}}
                ),
              0.7
            )
						.insert(
							TweenMax.fromTo($('#label-expand'), 0.1,
								{css:{top: 0}},
								{css:{top: 110, autoAlpha: 1}}
							),
							0.7
            )
            /*.insert(
              TweenMax.to($('#label-expand'), 0.1,
                {css: {top: 200, opacity: 0}}
                ),
              0.9
            )*/
						.insert(
							TweenMax.from($('.arrow'), 0.1,
								{css: {autoAlpha: 0}}
							),
							0//.4
						)
						.insertMultiple(
							aboutPage.buildArrowTween('fadein'),
							0
						)
						.insert(
							aboutPage.buildArrowTween('position'),
							0.2
						)
            .insert(
              aboutPage.buildArrowTween('out'),
              0.8
            ).append(
							TweenMax.to($('.process-content'), 0.2,
								//{css:{opacity: 1}},
								{css:{autoAlpha: 0}}
							),
							0
						)
						.append(
							TweenMax.to($('.animated-process'), 0.2,
								//{css:{opacity: 1}},
								{css:{autoAlpha: 0}}
							),
							1.5
						)
			});
		}
	});
}(jQuery);
