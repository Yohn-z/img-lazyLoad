/*!
 *  version　:　1.0
 *  author : zhangyuhong(yuhn-z)
 * 
 */
window.ImgLoad = (function (window,document){
    /*
        （内置参数）
        winHeight : 窗口高度
        tempArr : 图片临时数组
        timer : 函数防抖对象
        （可传入参数）
        distance : 距离图片多远可加载，默认值0
        lazyTime : 图片懒加载时延，默认值250
        dataTxt : 自定义data,默认获取有data-src属性的图片作为懒加载对象


    */
    var tempArr = [],
        winHeight,
        timer,
        distance,
        lazyTime,
        dataTxt




    /*
        init : 初始化函数
    */
    var _init = function (){

        /*获取窗口高度，兼容不同浏览器*/
        winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        /*获取当前页面所有图片元素*/
        var imgArr = document.querySelectorAll('[data-src]');
        /*循环图片数组,加入临时数组*/
        for (var i = 0; i < imgArr.length; i++) {
            
            tempArr.push(imgArr[i]);
            
        }


    }
   
    var lazy = function (obj){
        
        var objs = obj || {};
        distance = obj.distance || 0;
        lazyTime = obj.lazyTime || 250;
        dataTxt = obj.dataTxt || 'data-src';

        _init();
        _debounce();

        /*添加监听事件*/ 
        if (document.addEventListener) {
			window.addEventListener('scroll', _debounce, false);
		} else {
			window.attachEvent('onscroll', _debounce);
		}
    }

    /*
        getElClientRect: 获取元素的上下到窗口的距离
        el : 传入元素对象
    
    */
    var _getElClientRect = function(el) {
        var clientRect = el.getBoundingClientRect();
        var clientTop = clientRect.top;
        var clientBottom = clientRect.bottom;

        return {
            clientTop,
            clientBottom
        }
		
    };

    var _debounce = function(fn) {
        // 函数防抖：用户停止操作之后触发
        clearTimeout(timer);
        timer = setTimeout(_imgLoad, 250);
    }
    
    var _imgLoad = function(){
        for(var i = 0; i < tempArr.length; i++) {  
            var d = parseInt(distance)
            /*调用_getElClientRect()方法*/
            var imgTop = _getElClientRect(tempArr[i]).clientTop + d;
            var imgBottom = _getElClientRect(tempArr[i]).clientBottom + d;
            /*判断图片是否出现在当前可视范围之内，如果出现在当前可视窗口的范围之内，就加载图片*/
            if((imgTop > 0 && imgTop < winHeight + d) || (imgBottom > 0 && imgBottom < winHeight + d)){
                
                tempArr[i].src = tempArr[i].getAttribute(dataTxt);
                /*加载完成后去除该临时数组中该元素，以便不用二次加载*/
                tempArr.splice(i, 1);
               
            }

        }
    }

    return {
        "lazy" : lazy
    }
})(window,document);




