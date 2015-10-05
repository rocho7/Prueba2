var VenitianCarousel = function() {
	
	var $main = $( '#news-slides' ),
		$slides = $main.children( 'li.slide' ),
		$next_page_btn = $( '#pane-2 .slider-next' ),
		$prev_page_btn = $( '#pane-2 .slider-prev' ),
		slideWidth = $slides.outerWidth(),
		xPos = 0,
		animcursor = 1,
		pagesCount = $slides.length,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		rotationYAmount = 10,
		// support css animations
		support = Modernizr.cssanimations;

	function init() {
		$slides.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$next_page_btn.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			nextPage();
		});

		$prev_page_btn.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			prevPage();
		});
	}


	// animates the page to the next one
	function nextPage( animation ) {
		if( isAnimating ) {
			return false;
		}

		animatePage('right');
	}


	// animates the page to the previous one
	function prevPage(){
		if( isAnimating ) {
			return false;
		}

		animatePage('left');
	}

	function animatePage(direction){
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		var xPos;
		var rotY;

		if(direction === 'left'){
			xPos = ($main.position().left + slideWidth > 0 )? 0:$main.position().left + slideWidth;

			var xDist = xPos-$main.position().left;
			rotY = -(xDist/slideWidth)*rotationYAmount;
		}
		else {
			xPos = (($main.position().left - slideWidth) < $(window).width()-$main.width() )? $(window).width()-$main.width():$main.position().left - slideWidth;

			var xDist = $main.position().left-xPos;
			rotY = (xDist/slideWidth)*rotationYAmount;
		}

		TweenLite.to($main, 0.5, {'left':xPos, onComplete:onEndAnimation});

		$slides.each(function(index, el) {
			var tl = new TimelineLite();
			tl.add( TweenMax.to(this, 0.5, {css:{rotationY:rotY}}), index*0.05);
			tl.add( TweenMax.to(this, 1, {css:{rotationY:0}, ease:Elastic.easeOut}));
		});
		
	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		//resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' slide-current' );
	}

	//init();

	return { init : init };

};