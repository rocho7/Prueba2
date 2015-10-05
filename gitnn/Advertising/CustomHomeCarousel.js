var CustomHomeCarousel = function(sectionChangeCallback, mainElement, pagesElements, nextBtn, prevBtn ) {
	
	var $main = (mainElement)? mainElement:$( '#work-slides' ),
		$pages = (pagesElements)? pagesElements:$main.children( 'li.slide' ),
		$next_page_btn = (nextBtn)? nextBtn:$( '#pane-1 .slider-next' ),
		$prev_page_btn = (prevBtn)? prevBtn:$( '#pane-1 .slider-prev' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		timer = 0,
		waittime = 10000,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations,
		inSequence;

	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		});

		$pages.eq( current ).addClass( 'slide-current' );

		$next_page_btn.on( 'click', function() {
			nextPage();
		});

		$prev_page_btn.on( 'click', function() {
			prevPage();
		});

		//timer = setTimeout(nextPage, waittime);

		animatePage();
		sectionChangeCallback.call(this,$pages.eq( current ).data('type'));


		$(window).on('focus',function(){
			if(inSequence.paused()){
				inSequence.play();
			}
		});

		$(window).on('blur',function(){
			if(!inSequence.paused()){
				inSequence.pause();
			}
		});
	}


	// animates the page to the next one
	function nextPage() {
		var $currPage = $pages.eq( current );

		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}

		animatePage($currPage, 'pt-page-rotatePushBottom');
	}


	// animates the page to the previous one
	function prevPage(){
		var $currPage = $pages.eq( current );

		if( current > 0 ) {
			--current;
		}
		else {
			current = pagesCount-1;
		}

		animatePage($currPage, 'pt-page-rotatePushTop');
	}

	function animatePage($currPage, outClass){

		if(timer>0) clearTimeout(timer);
		timer = setTimeout(nextPage, waittime);

		var windowW = $(window).width();
		var windowH = $(window).height();


		var $nextPage = $pages.eq( current ).addClass( 'slide-current' ).addClass('slide-ontop');

		if( isAnimating ) {
			inSequence.pause();
			onInAnimationEnd($nextPage);
		}
		// shuffle the current page out with CSS animation
		
		if($currPage){
			if(Modernizr.csstransforms3d)
			{
				$currPage.addClass( outClass ).on( animEndEventName, function() {
					$currPage.off( animEndEventName );
					onOutAnimationEnd($currPage);
				});
			}
			else{
				TweenLite.to($currPage, 0.5, {top:windowW, onComplete:function(){
					$currPage.off( animEndEventName );
					onOutAnimationEnd($currPage);
				}});
			}
		}
		
		isAnimating = true;

		// bring next page in: /reset css /do sequenced animation via TweenLite
		inSequence = new TimelineLite({onComplete:onInAnimationEnd,onCompleteParams:[$nextPage]});
		if(!$currPage || $currPage.data('type')=='about' || $nextPage.data('type')=='about'  ) inSequence.from($nextPage.find('.headline'), 0.5, {css:{width:0}});

		if($nextPage.data('type') == 'about')
		{
			inSequence.from( $nextPage.find('.header-top'), 2, {css:{rotationX:'-95deg'}, ease:Elastic.easeOut, onStart:function(){$nextPage.find('.header-top').css({'visibility':'visible'});}});
			inSequence.from( $nextPage.find('.header-bottom'), 2, {css:{rotationX:'-95deg'}, ease:Elastic.easeOut, onStart:function(){$nextPage.find('.header-bottom').css({'visibility':'visible'});}}, '-=1.5');
		}
		else if($nextPage.data('type') == 'work')
		{
			inSequence.from( $nextPage.find('.title'), 2, {x:-$nextPage.find('.title').width(), ease:Expo.easeOut});
			inSequence.from( $nextPage.find('.subtitle'), 2, {x:windowW, ease:Expo.easeOut}, '-=1.5');
			inSequence.from( $nextPage.find('.featured-image'), 2, {x:-windowW, ease:Expo.easeOut}, '-=1.5');
		}

		inSequence.play();

		sectionChangeCallback.call(this,$nextPage.data('type'));
	}

	function onInAnimationEnd( $inpage ) {
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' slide-current' );
		isAnimating = false;
	}

	function onOutAnimationEnd( $outpage ) {
		resetPage( $outpage);
	}

	function resetPage( $outpage ) {
		if($outpage){
			$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
			$outpage.find('.header-top').css({'visibility':'hidden', 'transform':'none'});
			$outpage.find('.header-bottom').css({'visibility':'hidden', 'transform':'none'});

			$outpage.find('.title').css({'transform':'none'});
			$outpage.find('.subtitle').css({'transform':'none'});
			$outpage.find('.featured-image').css({'transform':'none'});

			$outpage.css('top',0);
		}
	}


	function getCurrentType(){
		return $pages.eq( current ).data('type');
	}
	//init();

	return { init:init,
						getCurrentType:getCurrentType };
};