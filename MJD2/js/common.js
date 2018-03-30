/**
 * Created by zhousg on 2016/1/8.
 */
/*公用的js文件*/
window.itcast ={};
window.itcast.transitionEnd = function(obj,callback){
    /*当是对象的时候绑定事件*/
    if(typeof obj == 'object'){
        obj.addEventListener('transitionEnd',function(e){
            /*if(callback){
                callback(e);
            }*/
            callback && callback(e);
        },false);  //false是从内向外的冒泡   true是从外向内的捕获
        obj.addEventListener('webkitTransitionEnd',function(e){
            callback && callback(e);
        },false);
    }
}