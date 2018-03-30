/**
 * Created by zhousg on 2016/1/6.
 */
/*在页面加载完成运行
 * touch
 * */
window.onload = function(){
    search();
    scrollPic();
    secondKill();
};
/*搜索效果*/
var search = function(){
    /*
     * 1.在滚动的时候没有超过我们的banner的时候需要逐渐的加深颜色
     * 2.在超过的时候 不改边颜色
     * */

    /*banner*/
    var bannerDom = document.getElementsByClassName('jd_banner')[0];
    /*取到它的高度*/
    var height = bannerDom.offsetHeight;

    /*取到  头部*/
    var headerDom = document.getElementsByClassName('jd_header_box')[0];

    /*需要监控滚动的距离*/
    window.onscroll = function(){
        /*获取里顶部的高度 取得是body*/
        var top = document.body.scrollTop;
        /*如果 没超过了*/
        var opt = 0;
        if(top <= height){
            opt = top/height * 0.85;
        }else{
            opt = 0.85;
        }
        headerDom.style.background = "rgba(201,21,35,"+opt+")";
    }

}

/*滚动图*/
var scrollPic = function(){
    /*获取需要的dom对象*/

    /*banner*/
    var banner = document.getElementsByClassName('jd_banner')[0];
    /*宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imgBox = banner.getElementsByTagName('ul')[0];
    /*点盒子*/
    var pointBox = banner.getElementsByTagName('ul')[1];
    /*所有的点*/
    var pointList = pointBox.getElementsByTagName('li');

    /*1.滚起来*/
    /*加过渡*/
    var addTransition = function(){
        imgBox.style.transition = "all .2s ease";
        imgBox.style.webkitTransition = "all .2s ease";/*兼容 老版本webkit内核浏览器*/
    };
    /*清除过渡*/
    var removeTransition = function(){
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";/*兼容 老版本webkit内核浏览器*/
    };
    /*改变位置*/
    var changeTranslateX = function(x){
        imgBox.style.transform = "translateX("+x+"px)";
        imgBox.style.webkitTransform = "translateX("+x+"px)";
    };

    /*1.滚起来*/
    var index = 1;/*全局索引*/
    var timer;
    timer = setInterval(function(){
        index ++;
        /*加过渡*/
        addTransition();
        /*改变位子*/
        changeTranslateX(-index*width);
    },3000);

    /*是自定义事件绑定方法*/
    itcast.transitionEnd(imgBox,function(e){
        if(index >= 9){
            index = 1;
            removeTransition();
            changeTranslateX(-index*width);
        }else if(index <=0){
            index =8;
            removeTransition();
            changeTranslateX(-index*width);
        }
        /*设置点*/
        setPoint();
    });

    /*2.让点滚起来*/
    var setPoint = function(){
        for(var i = 0;i <pointList.length;i++){
            pointList[i].className = " ";
        }
        /*index 0-9*/
        var pointIndex = index;/*先让点的索引一致和图片*/
        /*1-8*/
        if(index >= 9){
            pointIndex = 1;
        }else if(index <= 0){
            pointIndex = 8;
        }
        /*设置当期索引的点加上now*/
        pointList[pointIndex-1].className = "now";
    };

    /*3.滑动*/
    var startX =0;/*开始你的X的位置*/
    var endX = 0;/*停止滑动的时候的X的位置*/
    var distanceX = 0;/*是改变的距离*/
    imgBox.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX = e.touches[0].clientX;
    },false);
    imgBox.addEventListener('touchmove',function(e){
        e.preventDefault();
        endX = e.touches[0].clientX;
        distanceX = startX - endX;
        removeTransition();
        changeTranslateX(-index*width-distanceX);

    },false);
    imgBox.addEventListener('touchend',function(e){
        /*5.满足1/3的时候滑动一格*/
        /*满足1/3 并且滑动*/
        if(Math.abs(distanceX) > 1/3*width && endX != 0){
            if(distanceX > 0){
                index ++;
            }else{
                index --;
            }
        }
        /*4.当不满足1/3的时候吸附回去*/
        addTransition();
        changeTranslateX(-index*width);

        /*防止多次绑定setInterval*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /*加过渡*/
            addTransition();
            /*改变位子*/
            changeTranslateX(-index*width);
        },3000);

        startX = 0;
        endX = 0;
        distanceX = 0
    },false);

}
/*倒计时*/
var secondKill = function(){
    /*获取dom*/
    var parentTimeBox = document.getElementsByClassName('sk_time')[0];
    var spans = parentTimeBox.getElementsByTagName('span');

    /*倒计时时间*/
    var time = 8*60*60;
    var timer;

    timer = setInterval(function(){
        time -- ;
        if(time<0){
            clearInterval(timer);
            return false;
        }

        var h = Math.floor(time/(60*60));/*几小时*/
        var m = Math.floor(time%(60*60)/60);/*几分钟*/
        var s = time%60;/*多少秒*/

        spans[0].innerHTML = h>10?Math.floor(h/10):0;
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = m>10?Math.floor(m/10):0;
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = s>10?Math.floor(s/10):0;
        spans[7].innerHTML = s%10;

    },1000);
}