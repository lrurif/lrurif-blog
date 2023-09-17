# 父元素flex布局，子元素scale缩放引发的坑
## 问题
当父元素设置了flex布局，且子元素进行了transform: scale之后，子元素的宽度在父元素宽度变化时，没有按照自身宽度*缩放比例走。
![](./images/flex-scale-pit-1.png)
## 原因
由于父元素宽度减少时，如果子元素flex-shrink不等于0时，flex布局会影响子元素的宽度。
## 解决办法
将子元素设置样式：flex-shrink: 0;
![](./images/flex-scale-pit-2.png)
