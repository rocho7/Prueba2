/*
 * resizable 1.0.0
 * -----------------
 * Resizes an image to full width & height. Crops where needed
 * http://www.jiffymedia.com/
 *
 *
 * Copyright (c) 2011 Jiffy Media
 * Licensed under the MIT licenses.
 *
 */

;(function($) {
	// Custom selector to find `img` elements that have a valid `src` attribute and have not already loaded.
    $.expr[':'].uncached = function(obj) {
        return $(obj).is('img[src!=""]') && ! obj.complete; 
    };
    
    $.expr[':'].cached = function(obj) {
        return $(obj).is('img[src!=""]') && obj.complete; 
    };
    
    $.fn.extend({
        resizable: function(opts) {
        	var options = {
        		centeredY: true,
        		centeredX: true,
        		useMaxSize: true,
        		widthOnly: false,
        		heightOnly: false,
        		widthPriority: false,
        		heightPriority: false,
        		animationSpeed: 300,
        		addWidthHeightAttributes: true,
        		maxHeight:-1,
        		maxWidth:-1,
        		minHeight:-1,
        		heightOnly:false,
        		resizeObj: 'none' }, origWindowObj, windowObj, windowWidth, windowHeight;

	    	//windowObj = ("onorientationchange" in window) ? $(document) : $(window);
	    	windowObj = $(window);
	    	origWindowObj = windowObj;
	    	windowWidth = windowObj.width();
	    	
	        // Handle options object.
	        
	       // if ($.isPlainObject(opts)) {
	       /*
	       if(opts) {
	            $.each(opts,function(index,value) {
	            	if(options[index]) options[index] = value;
	            });
	        }
	        */
	        
	        
	        if(opts) $.extend(options, opts);
	        
	        if(options.resizeObj != 'none') {
	        	windowObj = $(options.resizeObj);
	        }
	        
	        origWindowObj.resize(onResize);
	        
	        function onResize(evt) {
	        	//setTimeout(resize,40);
	        	resize();
	        }
	        
	        function resize() {
	        	windowWidth = windowObj.width();
	        	windowHeight = windowObj.height();
	        }
	        
	        onResize();
	        
        	return this.each(function() {
        		var $me = $(this),
        			imgRatio, 
        			imgWidth, 
        			imgHeight,
        			resizedWidth,
        			resizedHeight,
        			resizedOffsetTop,
        			resizedOffsetLeft,
        			myCSS,
        			offsetTopAttribute,
        			offsetLeftAttribute,
        			totalWidth,
        			totalHeight,
        			checkImgRatioTries = 0,
        			useMaxSize = options.useMaxSize,
        			animationSpeed = options.animationSpeed,
        			widthOnly = options.widthOnly,
        			heightOnly = options.heightOnly,
        			widthPriority = options.widthPriority,
        			heightPriority = options.heightPriority,
        			resizeTimer,
        			canResize = false,
        			asBGDiv = false,
        			_ieVersion = -1,
        			$backgroundDiv;
        			
        			_ieVersion = _getInternetExplorerVersion();

              $me.on('resizable.animateResize',_onAnimateResize);
  	        	if(options.resizeObj != 'none') {
  	        	  //origWindowObj.on('resize',_onResize);
    	        } else {
    	        	var resizesOnWindow = (options.resizeObj == 'none');
    	        	try {
          	        	if(($me.attr("src").length > 0) && resizesOnWindow) {
          	        	  _swapForBackgroundDivs();
          	        	  //origWindowObj.on('resize',_onResize);
          	        	} else {
          	        	  
          	        	}
    	        	} catch (err) { }
    	        	
    	        }
    	        origWindowObj.on('resize',_onResize);
    	        _onResize();
    	        try {
    	        //	        			if($me.attr('width') && $me.attr('height')) {
    	        //	        				_onImageLoaded();
    	        //	        			} else {
    	        //	        				if(!$me.complete) {
    	        //	        					$me.load(_onImageLoaded);
    	        //	        				} else {
    	        //	        					_onImageLoaded();
    	        //	        				}
    	        //	        			}
                  if(!$me.complete) {
                  	$me.load(_onImageLoaded);
                  } else {
                  	_onImageLoaded();
                  }
  		        	} catch(err) {
  		        		//catch the error and give up
  		        		canResize = false;
  		        	}
	        	
	        	function _getInternetExplorerVersion() {
	        	   var rv = -1; // Return value assumes failure.
	        	   if (navigator.appName == 'Microsoft Internet Explorer')
	        	   {
	        	      var ua = navigator.userAgent;
	        	      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        	      if (re.exec(ua) != null)
	        	         rv = parseFloat( RegExp.$1 );
	        	   }
	        	   return rv;
	        	}
	        	
	        	function _swapForBackgroundDivs() {
	        	  asBGDiv = true;
	        	   _replaceImageWithDiv();
//	        	  if($me.attr("src").indexOf("_high")==-1) {
//	        	    _replaceImageWithDiv();
//	        	  } else {
//	        	    var image = new Image()
//	        	    image.src = this.src.replace("."+(this.src.substr((this.src.length-3),3)),options['highresImageExtension']+"."+(this.src.substr((this.src.length-3),3)))
//	        	  }
//	        	  if(!image.complete) {
//	        	  	image.load(function() {
//	        	  		$(this).data("associated_image").attr("src",$(this).attr("src"));
//	        	  	});
//	        	  } else {
//	        	  	image.data("associated_image").attr("src",image.attr("src"));
//	        	  }
	        	}
	        	
	        	function _replaceImageWithDiv() {
	        	  var imagesrc = $me.attr("src");
	        	  var newElement = $('<div class="resizable-fullscreen"></div>');
	        	  newElement.css('background-image',"url('"+imagesrc+"')");
	        	  //$me.replaceWith(newElement);
	        	  //$me.attr("width","");
	        	  //$me.attr("height","");
	        	  $me.wrap(newElement);
	        	  $backgroundDiv = newElement;
	        	  //$me.resolutionSwitch();
	        	  if(_ieVersion > 0 && _ieVersion < 9) {
	        	    newElement.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imagesrc + "',sizingMethod='scale')";
	        	  }
	        	  $me.on("resolutionSwitched",function(evt,newSrc) {
	        	    var parentTag = $(this).parent();
	        	    parentTag.css('background-image',"url('"+newSrc+"')");
	        	    if(_ieVersion > 0 && _ieVersion < 9) {
	        	      parentTag.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + newSrc + "',sizingMethod='scale')";
	        	    }
	        	  });
	        	  useMaxSize = false;
	        	  widthOnly = true;
	        	  options.centeredY = false;
	        	  options.centeredX = false;
	        	}
	        	
	        	function _onDestroy() {
	        		debug("destroying resizable");
	        		$me.off('animateResize',_onAnimateResize);
	        		origWindowObj.off('resize',_onResize);
	        		origWindowObj.off('resizable.destroy',_onDestroy);
	        		$me.off('resizableDestroy',_onDestroy());
	        	}
        		
        		function _onImageLoaded() {
        			imgWidth = ($me.attr('width')) ? $me.attr('width') : $me.width();
        			imgHeight = ($me.attr('height')) ? $me.attr('height') : $me.height();
        			imgRatio = imgWidth/imgHeight;
        			canResize = true;
        			_onResize();
        		}
        			
        		function _onResize(evt) {
//        		  if(asBGDiv) {
//        		    _resizeForBGDiv();
//        		  } else {
//          			_resize(false);
//          		}
          		_resize(false);
        		}
        		
        		function _onAnimateResize(evt) {
        			_resize(true);
        		}
        		
        		function _resizeForBGDiv() {
        		  return;
        		  //$me.width(windowWidth);
        		  if(windowWidth > 770) {
        		    $me.height(windowHeight);
        		    $me.width(windowWidth);
        		  } else {
        		    $me.height(windowWidth / imgRatio);
        		    $me.css("width","");
        		    
        		  }
        		  
        		}
        		
        		function _resize(withAnimation) {
                    if($me.hasClass("video-player-container")) debug("resizing video");
        			if($me.hasClass("fullscreen-video")) return;
        			if(withAnimation) resize();
        			if(!imgRatio && checkImgRatioTries < 3) {
        				checkImgRatioTries++;
        				_onImageLoaded();
        				return;
        			}

        			if(!canResize) return;
        			totalWidth = windowWidth;
        			totalHeight = windowHeight;

                    if($me.hasClass("video-player-container")) {
                        debug(totalWidth)
                        debug(totalHeight)
                    }

        			if(options.maxWidth > -1 && totalWidth > options.maxWidth) totalWidth = options.maxWidth;
        			if(options.maxHeight > -1 && totalHeight > options.maxHeight) totalHeight = options.maxHeight;
        			
        			resizedWidth = totalWidth;
        			resizedHeight = Math.round(resizedWidth / imgRatio);
        			if(!widthOnly) {
	        			if(useMaxSize) {
		        			if(resizedHeight < totalHeight) {
		        			    resizedHeight = totalHeight;
		        			    resizedWidth = Math.round(resizedHeight * imgRatio);
		        			}
	        			} else {
	        				if(resizedHeight > totalHeight) {
	        					resizedHeight = totalHeight;
	        					resizedWidth = resizedHeight * imgRatio;
	        				}
	        			}
        			}

        			($me.css("position")=="absolute") ? offsetTopAttribute = "top" : offsetTopAttribute = "margin-top";
        			//offsetTopAttribute = "top";
        			resizedOffsetTop = -(resizedHeight - windowHeight)*.5;
        			if(options.centeredY) $me.css(offsetTopAttribute, resizedOffsetTop+"px");
        			
        			resizedOffsetLeft = -(resizedWidth - windowWidth)*.5;
        			($me.css("position")=="absolute") ? offsetLeftAttribute = "left" : offsetLeftAttribute = "margin-left";
        			//offsetLeftAttribute = "margin-left";
        			/*
        			if($me.parent().hasClass("fullscreen") && resizedHeight > $.Window.windowHeight) {
        			    resizedHeight = $.Window.windowHeight;
        			    resizedWidth = Math.round(resizedHeight * imgRatio);
        			    resizedOffsetLeft = $.Window.windowWidth - resizedWidth();
        			}
        			*/
					if(withAnimation) {
						if(options.centeredX) {
							(offsetLeftAttribute=="left") ? $me.animate({width:resizedWidth+'px',height:resizedHeight+'px',left:resizedOffsetLeft+"px"},animationSpeed) : $me.animate({width:resizedWidth+'px',height:resizedHeight+'px',marginLeft:resizedOffsetLeft+"px"},animationSpeed);
						} else {
							$me.animate({width:resizedWidth+'px',height:resizedHeight+'px'},animationSpeed);
						}
						//$me.width(resizedWidth);
						//$me.height(resizedHeight);
						//$me.attr("width","");
						//$me.attr("height","");
					} else {
						if(options.centeredX) $me.css(offsetLeftAttribute, resizedOffsetLeft+"px");
	        			$me.width(resizedWidth);
	        			$me.height(resizedHeight);
	        			//add the width & height attributes to the tag if it's set to do so and if it's an image tag
	        			if($me.is("img") && options.addWidthHeightAttributes) { 
	        				$me.attr("width",resizedWidth);
	        				$me.attr("height",resizedHeight);
	        			}
	        		}
        			
        		}
        	});
        }
    });
})(jQuery);
