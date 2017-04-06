/*得到所有的页面*/
        var $pages = $(".slide-wrapper .slide-pages .slide-page");
        var height = $(document.body).height();
        $(function () {
            /*鼠标按下*/
            $(document.body).on('vmousedown', function (event) {
                /*首先获取当前的页面*/
                var $curr = $pages.filter(".curr-page");
                /*当前 页面的下一个页面*/
                var $next = $curr.next();
                /*console.log(event.pageY);获取y值*/
                var y = event.pageY;
                var move;
                /*鼠标移动*/
                $(this).on('vmousemove', function (event) {
                    /*console.log(event.pageY);移动时候的y值*/
                    /* console.log(event.pageY-y);*/
                    move = event.pageY - y;
                    /*判断鼠标是往上移的*/
                    /* console.log(move);*/
                    if (move < 0) {
                        $curr.css({
                            transform: "scale(" + (move / 800 + 1) + ")"
                        }); /*缩小 0-1*/
                        $next.css({
                            transform: "translateY(" + move + "px)"
                        }); /*改变y的值*/
                    }

                    /*鼠标松开*/
                }).on('vmouseup', function () {
                    $(this).off('vmousemove');
                    if (height / 2 + move < 0) {
                        /*超过一半*/
                        $curr.addClass("animate").css({
                            transform: "scale(0.3)"
                        }).removeClass("curr-page"); /*缩小 0-1*/
                        $next.addClass("animate").css({
                            transform: "translateY(-" + height + "px)"
                        }).addClass("curr-page"); /*改变y的值*/
                        window.setTimeout(function () {
                            $curr.removeClass("animate").css({
                                transform: "scale(1)"
                            }).appendTo($curr.parent());
                            $next.removeClass("animate").css({
                                transform: "translateY(0px)"
                            });
                        }, 500)

                    } else {
                        $curr.addClass("animate").css({
                            transform: "scale(1)"
                        }); /*缩小 0-1*/
                        $next.addClass("animate").css({
                            transform: "translateY(0px)"
                        });
                    }
                });
            });
        })