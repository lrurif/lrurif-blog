# transform-origin引发的坑
## 坑：
 例如：内部元素高度为`100vh`，当`transform-origin`为`center`时(也就是默认值），且我的缩放为`2`，那么按道理来说body滚动到最底部的话，body的滚动距离加上body本身高度应该为200vh;但是发现放到浏览器端只有`1.5`倍高度。但是`transform-origin`设置为`left top`时，是正常的。（chrome浏览器和safari浏览器效果一样）
## 解决方案：
将`transform-origin`设置为`left top`。
## 代码：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .test {
            width: 100vw;
            height: 100vh;
            transform: scale(2);
            {/* 此处会影响body整个内容的高度 */}
            transform-origin: left top;
        }
    </style>
</head>
<body>
    <div class="test"></div>
</body>
</html>
```

 ## 效果：
 transform-origin: center：
 ![](./images/transform-origin%E5%BC%95%E5%8F%91%E7%9A%84%E5%9D%91-1.png)
 transform-origin: left top:
 ![](./images/transform-origin%E5%BC%95%E5%8F%91%E7%9A%84%E5%9D%91-2.png)



## 知识点：
1. dom的`offsetHeight`值不受`scale`影响，如果要取真实高度的话，则可以利用`getBoundingClientRect`来获取。