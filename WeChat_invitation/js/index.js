$(function () {
            
            /*停止音乐播放*/
            var bgMusic = $("#bg_music")[0];
            var index = 0;
            var $pages = $("#pages");
            var last = $pages.find("li").length - 1;
            
            
            $("#coffee-flow").on('click', function () {
                //toggleClass的作用就是更替变换music-disc
                var isPlay = $(this).find(".coffee-music").toggleClass("music-disc").hasClass("music-disc");
                /*audio内置api*/
                isPlay ? bgMusic.play() : bgMusic.pause();

            });
            
            
            $("#u-arrow").on('click',function(){
                index++;
                if(index>last){
                    index = 0;
                }
                $pages.css({
                    "-webkit-transform":"translateY(-"+index+"00%)",
                    "-moz-transform":"translateY(-"+index+"00%)",
                    "-ms-transform":"translateY(-"+index+"00%)",
                    "-o-transform":"translateY(-"+index+"00%)",
                    "transform":"translateY(-"+index+"00%)",
                });
            });
            
        });