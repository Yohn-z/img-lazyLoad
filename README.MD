# img-lazyLoad
前端图片懒加载实现

引入js文件夹下的**img-lazyLoad.js**

```
<script src="js/img-lazyload.js"></script>
```

同时在你需要懒加载的图片上加上**data-src**属性

```
<img data-src="img/12.jpg" src="" alt="">
```

然后进行初始化

```
<script>
    ImgLoad.lazy({
        distance : 10,
        lazyTime : 250
    })
</script>
```

##### ImgLoad.lazy传入参数：

| 参数     | 说明                                                  |
| -------- | ----------------------------------------------------- |
| lazyTime | 图片懒加载时延，默认值250                             |
| dataTxt  | 自定义data,默认获取有data-src属性的图片作为懒加载对象 |
| distance | 距离图片多远可加载，默认值0                           |

