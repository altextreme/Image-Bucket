// FUNCTION FOR DRAGGABLE ELEMENTS
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
            var resizeWidth = (resizeElement.width() / containerWidth) * 100;
            
            if (!isNaN(resizeWidth)){
                
                // RATIO LESS THAN 40%
                if (resizeWidth <= 40 && !container.hasClass("below-40")){
                    container.removeClass("above-60").addClass("below-40");
                
                // RATIO BETWEEN 40% and 60%   
                } else if ((40 < resizeWidth) && (resizeWidth < 60)){
                    container.removeClass("below-40 above-60");
                
                // RATIO MORE THAN 60%
                } else if (resizeWidth >= 60 && !container.hasClass("above-60")){
                    container.removeClass("below-40").addClass("above-60");
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