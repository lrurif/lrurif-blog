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
## 自适应大屏比例宽高(存在留白)
```javascript
/** 两种方式，一种传入width和height，会进行缩放，一种仅传入比例，不会缩放，仅设置宽高
* @param {String | HTMLElement} resizeDom 外部元素
* @param {String | HTMLElement} changeDom 需要调整宽高元素
* @param {Number} scale 比例
* @return {Function} 取消resize事件函数
*/
function fitReisze(resizeDom, changeDom, options = {
    scale: 16/ 9,
    width: 0,
    height: 0,
}) {
    if(typeof resizeDom === "string") {
        resizeDom = document.querySelector(resizeDom);
    }
    if(typeof changeDom === "string") {
        changeDom = document.querySelector(changeDom);
    }
    let { scale, width, height } = options;
    if(!scale) {
        scale = width / height;
    }
    const resize = () => {
        // 获取外部元素宽高
        const outWidth = resizeDom.offsetWidth;
        const outHeight = resizeDom.offsetHeight;
        // 定义按照比例的话，宽度撑满所需高度
        let setWidth = outWidth, setHeight = outWidth / scale;
        // 如果高度太大，则高度设置为最大高度，宽度进行减少
        if(setHeight > outHeight) {
            setWidth = setWidth / (setHeight / outHeight);
            setHeight = outHeight;
        // 如果高度不足，则说明宽度太大，则减少宽度
        }else if(setHeight < outHeight) {
            setHeight = setWidth / scale;
        }
        // 如果宽度高度存在时，仅设置缩放
        if(width && height) {
            changeDom.style.width = `${width}px`;
            changeDom.style.height = `${height}px`;
            // 设置缩放
            changeDom.style.transform = `scale(${setWidth / width})`;
            return;
        }
        changeDom.style.width = `${setWidth}px`;
        changeDom.style.height = `${setHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
        window.removeEventListener("resize", resize);
    }
}
```