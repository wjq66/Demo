(function ($) {
    var $doc = $(document),
        $containers = $('.text-container,.phone-container'),
        $phoneContent = $($containers[1]).find('.content'),
        startX,
        _vw = window.innerWidth,
        endX,
        distX,
        _dir,
        cleft,
        cindex,
        _offset = 250,
        degOff,
        _prevDeg,
        _nextDeg,
        colorOff = {};

    $doc.on('touchstart', startCallBack);
    $doc.on('touchmove', moveCallBack);
    $doc.on('touchend', endCallBack);

    moveBg($phoneContent[0], cindex);


    function startCallBack(e) {

        startX = e.touches[0].pageX;
        cleft = $($containers[0]).offset().left;
        cindex = Math.abs(cleft / _vw);

    }

    function moveCallBack(e) {
        endX = e.touches[0].pageX;
        distX = startX - endX;
        degOff = distX * 0.3;
        colorOff.mid = 70 + Math.abs(distX / _vw * 185);
        colorOff.out = 255 - Math.abs(distX / _vw * 185);

        _dir = distX > 0 ? 'L' : 'R';

        /*开始移动*/
        if (!(_dir == 'L' && cindex == 2 || _dir == 'R' && cindex == 0)) {
            $containers.css('left', -distX + cleft + 'px');

            if (_dir == 'L') {
                _prevDeg = -degOff < -90 ? -90 : -degOff;
                _nextDeg = 90 - degOff < 0 ? 0 : 90 - degOff;
                $($phoneContent[cindex]).css('transform', 'rotate(' + _prevDeg + 'deg)');
                $($phoneContent[cindex + 1]).css('transform', 'rotate(' + _nextDeg + 'deg)');

                if (cindex == 0) {
                    $doc.find('body').css('backgroundColor', 'rgb(70,208,' + colorOff.mid + ')');
                } else if (cindex = 1) {
                    $doc.find('body').css('backgroundColor', 'rgb(70,208,' + colorOff.out + ')');
                }

            } else {
                _prevDeg = -degOff > 90 ? 90 : -degOff;
                _next = -90 - degOff > 0 ? 0 : -90 - degOff;

                $($phoneContent[cindex]).css('transform', 'rotate(' + _prevDeg + 'deg)');
                $($phoneContent[cindex - 1]).css('transform', 'rotate(' + _nextDeg + 'deg)');

                if (cindex == 2) {
                    $doc.find('body').css('backgroundColor', 'rgb(70,208,' + colorOff.mid + ')');
                } else if (cindex = 1) {
                    $doc.find('body').css('backgroundColor', 'rgb(70,208,' + colorOff.out + ')');
                }
            }


        }
    };

    function endCallBack(e) {
        var abs = Math.abs(distX),
            _left;
        if (abs >= _offset) {
            if (_dir == 'L' && cindex != 2) {
                _left = -_vw + cleft;

                $($phoneContent[cindex]).css('transform', 'rotate(-90deg)');
                $($phoneContent[cindex + 1]).css('transform', 'rotate(0deg)');

                moveBg($phoneContent[cindex + 1], cindex + 1);
                resetBg($phoneContent[cindex], cindex);
            } else if (_dir == 'R' && cindex != 0) {
                _left = _vw + cleft;

                $($phoneContent[cindex]).css('transform', 'rotate(90deg)');
                $($phoneContent[cindex - 1]).css('transform', 'rotate(0deg)');

                moveBg($phoneContent[cindex - 1], cindex - 1);
                resetBg($phoneContent[cindex], cindex);
            } else {
                _left = cleft;
            }
        } else if (abs < _offset) {
            _left = cleft;
            $($phoneContent[cindex]).css('transform', 'rotate(0deg)');
            if (_dir == 'L') {
                $($phoneContent[cindex + 1]).css('transform', 'rotate(90deg)');
            } else {
                $($phoneContent[cindex - 1]).css('transform', 'rotate(-90deg)');
            }
        }
        $containers.css('left', _left + 'px');
    }

    function moveBg(ele, cindex) {
        var pos = $(ele).find('.andr-container').width(),
            $logos = $(ele).closest('.phone-container').prev().find('img');
        setTimeout(function () {
            $(ele).css('backgroundPosition', '-100vw 0');
            $(ele).find('.andr-container').css('bacgroundPosition', '-' + pos + 'px 0');
            $logos.eq(cindex).css({
                border: '1px solid #fff',
                borderImage: 'url(images/4x.png) 2 2 2 2 fill/1 1 1 1/1px repeat'
            })
        }, 500)
    }

    function resetBg(ele, cindex) {
        var $logos = $(ele).closest('.phone-container').prev().find('img');
        $(ele).css('backgroundPosition', '0');
        $(ele).find('.andr-container').css('backgroundPosition', '0');
        $logos.eq(cindex).css('border', 'none');
    }


})(Zepto)