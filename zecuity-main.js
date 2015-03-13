$(document).ready(function(){ 
        
        // PRELOAD IMAGES
        function preload(arrayOfImages) {
            $(arrayOfImages).each(function(){
                $('<img/>')[0].src = this;
            });
        }
        preload([
            'https://bytebucket.org/altextreme/image-bucket/raw/5ea6c5aefba9cca090b4e85f296ca834ad215455/clock-red.png',
            'https://bytebucket.org/altextreme/image-bucket/raw/6975879ba6b7be06b3a1f17bcd77552554f34af3/4hr-delivery-full.png'
        ]);
        
        // BEFORE AFTER SLIDER
        $('.slider-panel').each(function(){
            var cur = $(this),
                width = cur.width()+'px';
            
            cur.find('.resize > div').css('width', width);
            
            // Bind dragging events
            drags(cur.find('.handle'), cur.find('.resize'), cur);
        });
        
        // Update sliders on resize
        $(window).resize(function(){
            $('.slider-panel').each(function(){
                var cur = $(this),
                    width = cur.width()+'px';
                
                cur.find('.resize > div').css('width', width);
            });
        });
        
    
    });