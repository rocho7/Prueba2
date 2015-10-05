!function($) {
	$(function() {
		var $win = $(window),
			$home_main = $('.page-home #main'),
			$page_background = $('#page-background'),
			$work_detail = $('.single .post-work'),
			bg_img_ratio = 1387/861,
			vid_ratio = 16/9,
			arrow_animation_speed = 50,
			homepage_initialized = false;


		// $('html, body').bind('mousewheel DOMMouseScroll',function(e){
		// $(this).stop();
		// });

		// Homepage sliding functionality
		/*$('.rs-slider').each(function() {
			var $slider = $(this),
			options = {useArrows: true, useThumbs: false};

			if ($slider.hasClass('vertical')) {
				$slider.bind('mousewheel DOMMouseScroll', function(event){
					event.preventDefault();
					var $nav_links = $slider.closest('.rs-wrap').children('.rs-arrows');

					var evt = window.event || event //equalize event object     
					evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
					var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

					if (delta < 0) {
						$nav_links.find('.rs-next').click();
					}
					else {
						$nav_links.find('.rs-prev').click();						
					}

				});


				options.transition = 'cubeV';
				options.fallback3d = 'fade';
			}
			if ($slider.hasClass('horizontal')) {
				options.transition = 'cubeH';
				options.fallback3d = 'fade';
			}

			$slider.refineSlide(options);


			// Adjust Z-Index on transition so that transitioning slider transforms over top of all other content.
			$slider.closest('.rs-wrap').children('.rs-arrows').find('a').on('click', function() {
				// console.log('test!');
				$('.pane').css('z-index', 0);
				$(this).closest('.pane').css('z-index', 500);
			});
			// console.log($slider);
		});*/


		/* GOOGLE TRACKING */

		$('#button').on('click', function() {
			ga('send', 'event', 'button', 'click', 'nav-buttons');
		});

		$(window).resize(function() {
			var $win = $(this),
				win_ratio,
				my_class;

			if ($home_main.length > 0) {
				// Figure out if browser is wider or taller than video
				win_ratio = $home_main.width()/$home_main.height();
				my_class = (win_ratio >= vid_ratio)?'wide':'tall';

				// Apply wide/tall as a class to the #page container
				$('#page').removeClass('wide').removeClass('tall').addClass(my_class);
				$('#main .pane').height( $(this).height() );
			}
			if ($page_background.length > 0) {
				// Figure out if browser is wider or taller than video
				win_ratio = $win.width()/$win.height();
				my_class = (win_ratio >= bg_img_ratio)?'wide':'tall';

				// Apply wide/tall as a class to the background image
				$page_background.removeClass('wide tall').addClass(my_class);
			}

			if ($work_detail.length > 0) {
				if ($work_detail.hasClass('open')) {
					$work_detail.find('.content-container').css('margin-left', -get_work_detail_slider_migration_distance( $(window) ));
				}
			}
		});

		setInterval(function() {
			if (!homepage_initialized) {
				$(window).trigger('resize');
				homepage_initialized = true;
			}
		}, 300);

		// Homepage video play button
		var $video = $home_main.find('video'),
			$video_still = $home_main.find('#video-still');

		// Bind onEnd event for homepage video
		$video.bind('ended', function() {
			$video_still.show();
			$video.hide();
		});

		$home_main.find('.go').click(function() {
			$video.show();
			$video_still.hide();

			$video.get(0).play();
		});

		// Vertical center alignment
		$('.align-vertical-center').each(function() {
			var $item = $(this);
			var itmh = ($item.find('.fixed-items').length>0 && $item.find('.fixed-items').height()>$item.height())? Math.floor($item.find('.fixed-items').height()/2):Math.floor($item.height()/2);
			$item.css( 'margin-top', -(itmh) );
		});


		/*
		 *	Work Page
		 */

		// Index Work Subnav items
		$('.work-subnav .menu-item').each(function(idx, val) {
			$(this).addClass('menu-item-idx-'+idx);
		});

		// Project Item link hover effect
		var work_link_slide_duration = 200;
		$('.page-work .project-item a').append('<div class="slider"></div>').hover(
			function(){
				var $link = $(this);
				$link.find('.slider').animate(
					{'top': -205},
					work_link_slide_duration,
					'easeOutCirc',
					function() {
						$link.find('.title').hide().css({visibility: 'visible'}).fadeIn(work_link_slide_duration);
					}
				);
			},
			function(){
				var $link = $(this);
				$link.find('.title').fadeOut(work_link_slide_duration, function() {
					$(this).css({visibility: 'hidden'}).show();
					$link.find('.slider').animate(
						{'top': 205},
						work_link_slide_duration,
						'easeInCirc'
					);
				});
			}
		);

		$('.work-subnav .menu-item a, .sales-nav .sales-nav-item a').append('<div class="slider"></div>').hover(
			function(){
				$(this).find('.slider').animate(
					{'top': -205},
					work_link_slide_duration,
					'easeOutCirc'
				);
			},
			function(){
				$(this).find('.slider').animate(
					{'top': 205},
					work_link_slide_duration,
					'easeInCirc'
				);
			}
		);




		// Work Detail
		nav_main_hover_delay = 10;
		$work_detail.find('.toggle').on('click', function() {

			// Define Animation Parameters
			var $link = $(this),
				work_detail_slider_animation_duration = 750,
				leftVal,
				newClass,
				easeMethod;

			// Set Animation Parameters
			if( $link.closest('.post').hasClass('closed') ) {
				// This function  opens

				// because we are using margins and everything is centered, we are migrating twice as far as as would need to.
				migrationDistance = get_work_detail_slider_migration_distance();
				newClass = 'open';
				easeMethod = 'easeOutCirc';
			}
			else {
				// This function closes
				migrationDistance = 0;
				linkMigrationDistance = migrationDistance;
				newClass = 'closed';
				easeMethod = 'easeOutCirc';
			}

			// Perform Animation
			$link.closest('.content-container').animate(
				{ 'margin-left': -migrationDistance },
				work_detail_slider_animation_duration,
				easeMethod,
				function () {
					$link.closest('.post').removeClass('closed').removeClass('open').addClass(newClass);
				}
			);
		}).mouseenter(function () {
			var $icon = $(this).find('.icon'),
				isOpen = $icon.closest('.post').hasClass('open');
				migration_points = [null, null];
			if (isOpen) {
				migration_points[0] = 27;
				migration_points[1] = -27;
			}
			else {
				migration_points[0] = -27;
				migration_points[1] = 27;
			}

			$icon.animate(
				{ 'margin-left': migration_points[0] },
				arrow_animation_speed,
				'linear',
				function () {
					$icon.css('margin-left', migration_points[1]).animate(
						{ 'margin-left': 0 },
						arrow_animation_speed,
						'linear'
					);
				}
			);
		});

		// Main Nav hover animation
		var nav_main_sprite_width = 400;

		$non_selected_nav_main_items = $('#nav-main .menu-item a:not(.current-menu-item a, .current-page-ancestor a, .menu-item-type-supplemental a, .single-work .menu-item-page-work a, .page-template-page-production-php .menu-item-page-work a, .contact-form-open .menu-item-custom-contact a, .archive.category .menu-item-page-blog a)');
		$non_selected_nav_main_items.mouseenter(
			function(){
				var $this = $(this);
				// // reset all other nav item backgrounds
				// $non_selected_nav_main_items.each(function(){
				// $(this).find('.background').css('left', 0);
				// });

				/*var $nav_item = $(this),
					$nav_item_background = $nav_item.find('.background');
				setTimeout(function() {
					hover_nav_main_on($nav_item_background, 100);
				}, nav_main_hover_delay);*/
			}).mouseleave(
			function(){
				var $this = $(this);
				/*var $nav_item = $(this),
					$nav_item_background = $nav_item.find('.background');
				setTimeout(function() {
					hover_nav_main_off($nav_item_background, nav_main_sprite_width);
				}, nav_main_hover_delay);*/
			}
		);

		// Nav Main hover effects
		var nav_main_hover_effects_selectors = [];
		nav_main_hover_effects_selectors.push('#nav-main .menu-item-back-to-top');
		nav_main_hover_effects_selectors.push('#nav-main .menu-item-work-item-previous');
		nav_main_hover_effects_selectors.push('#nav-main .menu-item-work-item-next');

		$( nav_main_hover_effects_selectors.join() ).mouseenter(function () {

			/*
			var $nav_item = $(this),
				$icon = $nav_item.find('.text'),
				migration_points = [null, null],
				nav_item_classes = $nav_item.attr('class'),
				css_property;

			if ( nav_item_classes.indexOf('menu-item-back-to-top') >= 0 ) {
				migration_points[0] = -27;
				migration_points[1] = 27;

				$icon.animate(
					{ 'margin-top': migration_points[0] },
					arrow_animation_speed,
					'linear',
					function () {
						$icon.css('margin-top', migration_points[1]).animate(
							{ 'margin-top': 0 },
							arrow_animation_speed,
							'linear'
						);
					}
				);

			}
			else if ( nav_item_classes.indexOf('menu-item-work-item-previous') >= 0 ) {

				migration_points[0] = -27;
				migration_points[1] = 27;

				$icon.animate(
					{ 'margin-left': migration_points[0] },
					arrow_animation_speed,
					'linear',
					function () {
						$icon.css('margin-left', migration_points[1]).animate(
							{ 'margin-left': 0 },
							arrow_animation_speed,
							'linear'
						);
					}
				);
			}
			else if ( nav_item_classes.indexOf('menu-item-work-item-next') >= 0 ) {
				migration_points[0] = 27;
				migration_points[1] = -27;

				$icon.animate(
					{ 'margin-left': migration_points[0] },
					arrow_animation_speed,
					'linear',
					function () {
						$icon.css('margin-left', migration_points[1]).animate(
							{ 'margin-left': 0 },
							arrow_animation_speed,
							'linear'
						);
					}
				);
			}*/
		});

		// Activate Back To Top scroll animation
		addScrollTopAnimation();


		/**
		 *	Enable sliding in and out of Contact Form
		 */

		var $contact_us = $('#section-form-contact'),
			contact_us_ease_speed = 1000,
			contact_us_fade_speed = 200;

		// Open
		$('.menu-item-page-contact a').click(function() {
			var $page = $('#page');

			if ( $page.hasClass('contact-form-closed') ) {
				openContact();
			}
			else if ( $page.hasClass('contact-form-open') ) {
				$('#page').animate(
					{ 'margin-top': -$contact_us.outerHeight() },
					contact_us_ease_speed,
					'easeInCirc',
					function() {
						$('#page').removeClass('contact-form-open').addClass('contact-form-closed');
					}
				);
			}
			return false;
		});
		$contact_us.find('.gform_footer').hover(
			function() {
				$(this).find('.gform_button').animate(
					{'width': 355},
					100,
					'easeOutCirc'
				);
			},
			function() {
				$(this).find('.gform_button').animate(
					{'width': 40},
					100,
					'easeOutCirc'
				);
			}
		);

		// Apply watermarked text, ignore required asterisks
		$('.gform_wrapper').find('.watermarked .gfield input, .watermarked .gfield textarea').each(function() {
			$(this).watermark( $(this).closest('.gfield').find('.gfield_label').hide().find('.gfield_required').remove().end().text() );
		});

		// saturate and desaturate images
		$('.single .post-work .projects a').hover(
			function() {
				$(this).closest('.project-item').find('img').addClass('desaturate');
			},
			function() {
				$(this).closest('.project-item').find('img').removeClass('desaturate');
			}
		);

		/**
		 *	Fancybox
		 */

		$('.fancybox').fancybox({
			showCloseButton: false,
			height: 40
		});

		// Avoid FOUC.  Fade in jQuery formatted content after they are loaded.
		var selectors_fade_in = [];
		selectors_fade_in.push('#nav-main');
		selectors_fade_in.push('.single .post-work');

		$(selectors_fade_in.join()).hide().css({visibility: 'visible'}).fadeIn(200);


		var $homepage_main = $('.page-template-page-homepage-php #main');

		if ($homepage_main.length > 0) {
			setTimeout( function() {
				$homepage_main.hide().css({visibility: 'visible'}).fadeIn(200);
			}, 300);
		}

		var hash = window.location.hash;
		console.log('hash');
		console.log(hash);
		if( hash && hash.indexOf('contact')>-1 ){
			openContact();
		}
	});

	function openContact(){
		var $contact_us = $('#section-form-contact'),
			contact_us_ease_speed = 1000,
			contact_us_fade_speed = 200,
			$page = $('#page');
		$( 'html, body' ).animate(
			{ scrollTop: 0 },
			700,
			function() {
				$page.animate(
					{ 'margin-top': 0 },
					contact_us_ease_speed,
					'easeOutCirc',
					function() {
						$page.removeClass('contact-form-closed').addClass('contact-form-open');
					}
				);
			}
		);
	}


	function hover_nav_main_on ($nav_item, idx) {
		$nav_item.css('left', -idx);
		if (idx < nav_main_sprite_width) {
			setTimeout(function() {
				hover_nav_main_on($nav_item, idx + 100);
			}, nav_main_hover_delay);
		}
	}
	function hover_nav_main_off ($nav_item, idx) {
		$nav_item.css('left', -idx);
		if (idx > 0) {
			setTimeout(function() {
				hover_nav_main_off($nav_item, idx - 100);
			}, nav_main_hover_delay);
		}
	}
	function get_work_detail_slider_migration_distance($win) {
		if (!$win) {
			$win = $(window);
		}
		return $win.width() - 79; // offset for toggle link
	}
	function addScrollTopAnimation() {

		var $scrolltop_link = $('.menu-item-back-to-top');
		$scrolltop_link.on( 'click' ,  function ( ev ) {
			ev.preventDefault();
			$( 'html, body' ).animate(
				{ scrollTop: 0 },
				700,
				'easeInCubic'
			);
		})

		// Hides the link initially
		.data('hidden', 1).hide();

		var scroll_event_fired = false;
		$(window).on('scroll', function() {
			scroll_event_fired = true;
		});
		/*
		Checks every 300 ms if a scroll event has been fired.
		*/

		setInterval( function() {
			if( scroll_event_fired ) {
				// Stop code below from being executed until the next scroll event.
				scroll_event_fired = false;
				var is_hidden =  $scrolltop_link.data('hidden');

				/*
				Display the scroll top link when the page is scrolled
				down the height of half a viewport from top,  Hide it otherwise.
				*/

				if ( $( this ).scrollTop()  >  $( this ).height() / 2 ) {
					if( is_hidden ) {
						$scrolltop_link.slideDown(600).data('hidden', 0);
					}
				}
				else {
					if( !is_hidden ) {
						$scrolltop_link.slideUp(600).data('hidden', 1);
					}
				}
			}
		}, 300);
	}
	function animateArrow($icon, property, point_a, point_b) {}
}(jQuery);