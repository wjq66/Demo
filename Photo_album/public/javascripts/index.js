/*分散图片*/
var imgl = document.getElementsByTagName("img").length;
var mIndex = parseInt(imgl / 2); /*求中间的图片的序号*/
function addLeft() {
    var winW = document.body.clientWidth; /*屏幕的宽度*/
    var imgW = document.getElementsByTagName("img")[0].offsetHeight; /*图片的宽度*/
    /*offsetwidth是对象的宽度*/
    var mLeft = (winW - imgW) / 2;
    /*便利所有的img。设置left的值*/
    for (var i = 0; i < imgl; i++) {
        document.getElementsByTagName("img")[i].style.left =
            mLeft - 100 * (mIndex - i) + "px";
    }

}
addLeft();
/*改变窗体大小时自动居中*/
window.onresize = function(){
    addLeft();
}
for (var i = 0; i < imgl; i++) {
    if (i < mIndex) {
        document.getElementsByTagName("img")[i].setAttribute("class", "left");
    } else if (i == mIndex) {
        document.getElementsByTagName("img")[i].setAttribute("class", "middle");
    } else {
        document.getElementsByTagName("img")[i].setAttribute("class", "right");
    }
}

for (var i = 0; i < imgl; i++) {
    document.getElementsByTagName("img")[i].index = i;
    document.getElementsByTagName("img")[i].onclick = function () {
        var index = this.index;
        for (var j = 0; j < imgl; j++) {
            document.getElementsByTagName("img")[j].style.left = parseInt(document.getElementsByTagName("img")[j].offsetLeft) - 100 * (index - mIndex) + "px";
            if (j < index) {
                document.getElementsByTagName("img")[j].setAttribute("class", "left");
            } else if (j == index) {
                document.getElementsByTagName("img")[j].setAttribute("class", "middle");
            } else {
                document.getElementsByTagName("img")[j].setAttribute("class", "right");
            }
        }
        mIndex = index;
    }
}





