/**
 * Created by zhousg on 2016/1/8.
 */
window.onload= function(){
    leftCategory();
};
/*左侧滑动*/
var leftCategory = function(){
    /*拿DOM对象*/
    /*父盒子*/
    var parentDom = document.getElementsByClassName('jd_category_left')[0];
    /*子盒子*/
    var childDom = parentDom.getElementsByClassName('jd_category_left_con')[0];

    var parentHeight = parentDom.offsetHeight;

    var childHeight = childDom.offsetHeight;


    /*左侧盒子定位的区间*/
    var maxY = 0,minY = -(childHeight-parentHeight);
    /*缓冲距离 150*/
    var distance = 150;

    /*改变位置的方法*/
    var changeTranslateY = function(y){
        childDom.style.transform = "translateY("+y+"px)";
        childDom.style.webkitTransform = "translateY("+y+"px)";
    };
    /*加过渡*/
    var addTransition = function(){
        childDom.style.transition = "all .2s ease";
        childDom.style.webkitTransition = "all .2s ease";/*兼容 老版本webkit内核浏览器*/
    };
    /*清除过渡*/
    var removeTransition = function(){
        childDom.style.transition = "none";
        childDom.style.webkitTransition = "none";/*兼容 老版本webkit内核浏览器*/
    };


    var startY = 0;
    var endY = 0;
    var moveY = 0;
    /*记录当前的Y的定位*/
    var currY = 0;

    /*1.滑动*/
    childDom.addEventListener('touchstart',function(e){
        /*初始的Y的坐标*/
        startY = e.touches[0].clientY;

    },false);
    childDom.addEventListener('touchmove',function(e){
        /*不停的做滑动的时候记录的endY的值*/
        endY = e.touches[0].clientY;
        moveY = startY - endY;/*计算了移动的距离*/

        /*2.滑动区间*/
        /*就是滑动区间*/
        if((currY-moveY)<(maxY+distance)&&(currY-moveY)>(minY -distance)){
            removeTransition();
            changeTranslateY(currY-moveY);
        }
    },false);
    childDom.addEventListener('touchend',function(e){
        /*在限制滑动区间之后 重新计算当前定位*/

        /*判断是否在我们的合理定位区间内*/

        /*先向下滑动 */
        if((currY-moveY) > maxY){
            currY = maxY;
            addTransition();
            changeTranslateY(currY);
        }
        /*想上滑动的时候*/
        else if((currY-moveY) < minY){
            currY = minY;
            addTransition();
            changeTranslateY(currY);
        }
        /*正常的情况*/
        else{
            currY = currY-moveY;
        }
        startY = 0;
        endY = 0;
        moveY = 0;
    },false);




};