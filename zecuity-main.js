$(document).ready(function(){
        
    // =================================
    // =================================
    // TABLET AND ABOVE JAVSCRIPT
    // =================================
    // =================================
    enquire.register("screen and (min-width:768px)", {

        match : function() {

            // =================================
            // FUNCTION FOR DRAGGABLE ELEMENTS
            // =================================
            function drags(dragElement, resizeElement, container) {
                // Initialize the dragging event on mousedown.
                dragElement.on('mousedown touchstart', function(e){

                    dragElement.addClass('draggable');
                    resizeElement.addClass('resizable');

                    // Check if it's a mouse or touch event and pass along the correct value
                    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

                    // Get the initial position
                    var dragWidth = dragElement.outerWidth(),
                        posX = dragElement.offset().left + dragWidth - startX,
                        containerOffset = container.offset().left,
                        containerWidth = container.outerWidth();

                    // Set limits
                    minLeft = containerOffset + 10;
                    maxLeft = containerOffset + containerWidth - dragWidth - 10;

                    // Calculate the dragging distance on mousemove.
                    dragElement.parents().on("mousemove touchmove", function(e) {

                        // Check if it's a mouse or touch event and pass along the correct value
                        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

                        leftValue = moveX + posX - dragWidth;

                        // Prevent going off limits
                        if ( leftValue < minLeft){
                            leftValue = minLeft;
                        } else if (leftValue > maxLeft){
                            leftValue = maxLeft;
                        }

                        // Translate the handle's left value to masked divs width.
                        widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

                        // ADD CLASS TO CONTAINER BASED ON PROPORTION
                        var resizeWidth = (resizeElement.width() / containerWidth) * 100,
                            minWidth = 25,
                            maxWidth = 75;

                        if (!isNaN(resizeWidth)){

                            // RATIO LESS THAN MIN
                            if (resizeWidth <= minWidth && !container.hasClass("below-min")){
                                container.removeClass("above-max").addClass("below-min");

                                // RATIO BETWEEN MIN AND MAX
                            } else if ((minWidth < resizeWidth) && (resizeWidth < maxWidth)){
                                container.removeClass("below-min above-max");

                                // RATIO MORE THAN MAX
                            } else if (resizeWidth >= maxWidth && !container.hasClass("above-60")){
                                container.removeClass("below-min").addClass("above-max");
                            }

                        }

                        // Set the new values for the slider and the handle. 
                        // Bind mouseup events to stop dragging.
                        $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
                            $(this).removeClass('draggable');
                            resizeElement.removeClass('resizable');
                        });
                        $('.resizable').css('width', widthValue);

                    }).on('mouseup touchend touchcancel', function(){
                        dragElement.removeClass('draggable');
                        resizeElement.removeClass('resizable');
                    });

                    e.preventDefault();

                }).on('mouseup touchend touchcancel', function(e){
                    dragElement.removeClass('draggable');
                    resizeElement.removeClass('resizable');
                });
            }


            // =================================
            // PRELOAD IMAGES
            // =================================
            function preload(arrayOfImages) {
                $(arrayOfImages).each(function(){
                    $('<img/>')[0].src = this;
                });
            }
            preload([
                'https://cdn.rawgit.com/altextreme/Image-Bucket/master/clock-red.png',
                'https://cdn.rawgit.com/altextreme/Image-Bucket/master/4hr-delivery-full.png'
            ]);

            console.log("preloading");


            // =================================
            // BEFORE AFTER SLIDER
            // =================================
            $('.slider-panel').each(function(){
                var width = $(this).width()+'px';

                $(this).find('.resize > div').css('width', width);

                // Bind dragging events
                drags($(this).find('.handle'), $(this).find('.resize'), $(this));
            });


            // Update sliders on resize
            $(window).resize(function(){
                $('.slider-panel').each(function(){
                    var width = $(this).width() + 'px';

                    $(this).find('.resize > div').css('width', width);
                });
            });
        }
    });

    // =================================
    // =================================
    // TABLET AND BELOW JAVASCRIPT
    // =================================
    // =================================
    enquire.register("screen and (max-width:991px)", {

        match: function (){

            // =================================
            // SLIDE BODY OVER FOR NAV
            // =================================
            function mobileNav(){
                var $body = $("body"),
                    $navBtn = $(".w-nav-button"),
                    $navOverlay = $(".w-nav-overlay"),
                    menuWidth = $(".w-nav-menu").width(),
                    openMenu;

                $navBtn.on("tap", function(){
                    openMenu = $(".w--nav-menu-open").length;

                    if (openMenu == 0){
                        $body.css({
                            marginLeft: -menuWidth + "px",
                            marginRight: menuWidth + "px"
                        });
                    }
                });

                $body.on("tap", function(e) {
                    openMenu = $(".w--nav-menu-open").length;

                    if ( !$(e.target).is('.w-nav-overlay *') && openMenu >= 1 ){
                        $body.css({
                            marginLeft: 0,
                            marginRight: 0
                        });
                    }
                });

                $(".w-nav-link").on("click", function(){
                    openMenu = $(".w--nav-menu-open").length;

                    if ( openMenu >= 1 ){
                        $body.css({
                            marginLeft: 0,
                            marginRight: 0
                        });
                    }
                })
            }
            mobileNav();
        }

    });

    // =================================
    // =================================
    // MOBILE ONLY JAVASCRIPT
    // =================================
    // =================================
    enquire.register("screen and (max-width:767px)", {

        match: function (){

            // =================================
            // REMOVE B+A SLIDER AND RESET
            // =================================
            $('.slider-panel').each(function(){
                var $handle = $(this).find('.handle'),
                    width = $(this).width();

                $handle.off("mousedown touchstart").off("mouseup touchend touchcancel").css("left", "50%");
                $(this).find('.resize').css('width', '50%');
                $(this).find('.resize > div').css('width', width + "px");
            });

            // Update sliders on resize
            $(window).resize(function(){
                $('.slider-panel').each(function(){
                    var width = $(this).width();

                    $(this).find('.resize > div').css('width', width + "px");
                });
            });
        }

    });


    // =================================
    // =================================
    // BACK TO TOP
    // =================================
    // =================================
    $(".back-to-top").on("click", function(){
        $("html, body").animate({
            scrollTop:0
        }, 1000);
    });


    // =================================
    // =================================
    // TOGGLE PINNED ISI HEIGHT
    // =================================
    // =================================
    $(".fixed-isi").on("click", function(){
        $(this).toggleClass("expanded");
    });


});