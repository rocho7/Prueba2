/**************************
 * @author Dan Alexander
 **************************/

xylem = {
	// e is the element that we are going to be transitioning
	TransitionManager : function(cs,e,sectionReachedCB,sectionChangedCB,d){
		var scrollTimer = 0;
		var scrollColumn = e;
		var contentSet = cs;
		var sectionReached = sectionReachedCB;
		var sectionChanged = sectionChangedCB;
		var oldTarget;
		var oldSectionTarget;
		var animatingToSection = false;

		var tm = this;

		var device = d;

		this.initialize = function(){
			scrollColumn = e;
			if(!device) e.scroll(onWindowScroll);
		};

		this.scrollToSection = function(s){
			var target = $(s);
			animatingToSection = true;

			$('html,body').stop();
			$('html,body').animate({scrollTop: Math.floor(target.offset().top)}, 500, onScrollAnimationFinished);
		};

		var onScrollAnimationFinished = function(){
			animatingToSection = false;
		};

		this.onScrollFinished = function()
		{
			if(!device)
			{
				//find the closest element
				var target = getNearestSection();

				sectionChanged.apply(target,[(oldSectionTarget === undefined || target.attr('id') != oldSectionTarget.attr('id'))]);

				oldSectionTarget = target;
				//let jqueryaddress hande the page transition from here
				//$('html,body').stop();
				//$('html,body').animate({scrollTop: target.offset().top}, 300);
			}
		};

		var onWindowScroll = function()
		{
			var target = getNearestSection();
			if(oldTarget === undefined || target.attr('id') != oldTarget.attr('id'))
			{
				oldTarget = target;
				sectionReached.apply(target);
			}
			clearTimeout(scrollTimer);
			if(!animatingToSection) scrollTimer = setTimeout( tm.onScrollFinished, 500 );
		};

		var getNearestSection = function(){
			var targetOffset = 1000000000;
			var closestTarget;
			contentSet.each(function(){
				if(Math.abs($(scrollColumn).scrollTop()-$(this).offset().top)<=targetOffset)
				{
					closestTarget = $(this);
					targetOffset = Math.abs(scrollColumn.scrollTop()-$(this).offset().top);
				}
			});
			return closestTarget;
		};
	}
};