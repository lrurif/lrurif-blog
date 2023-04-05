# 小技巧

## 获取缩放比例
```javascript
/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
};
```