
// main entry point aka on document ready
!function($) {
	$(function() {
		var panel_snap_enabled = true;
	
		// fix the width of the lower news content
		$('#news-slides').width($('#news-slides li').length*440);

		$('#footer').bind('inview', function (event, visible) {

			panel_snap_enabled = !visible;
			// if (visible == true) {
			//   console.log('footer!');
			// } else {
			//   console.log('no footer!');
			// }
		});

		// Sets up the page transition for the top product slides
		var chc = new CustomHomeCarousel(changeNavIndicator);
		chc.init();

		// Sets up the page transition for the top product slides
		var vc = new VenitianCarousel();
		vc.init();

		var tm = new xylem.TransitionManager($('.page-template-page-homepage-php .pane'),$(window),onSectionChange, onSectionChangeFinished, false);
		tm.initialize();

		var currSectionType;
		// Section change transitions
		function onSectionChange(){
			if($(this).attr('id') === 'pane-1'){
				changeNavIndicator(chc.getCurrentType());
			}
			else{
				changeNavIndicator($(this).data('type'));
			}
		}

		function changeNavIndicator(pane_type){	
			if(pane_type === currSectionType){
				return false;
			}

			currSectionType = pane_type;

			$('#nav-main .indicator.current > .interior').animate(
				{left: 151},
				100,
				'easeInCirc',
				function() {}
			).closest('.indicator').removeClass('current');


			$('#nav-main .menu-item-page-' + pane_type + ' .indicator > .interior').animate(
				{left: 0},
				100,
				'easeOutCirc',
				function() {}
			).closest('.indicator').addClass('current');
		}

		function onSectionChangeFinished(vDiffSection){
			$pane = $(this);

			if (panel_snap_enabled) {
				tm.scrollToSection("#"+$(this).attr('id'));
			}
		}
	});
}(jQuery);