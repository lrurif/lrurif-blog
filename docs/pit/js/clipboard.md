# navigator.clipboard的坑

## 坑点
按照MDN文档上面的写法来，write方法写入的是`DataTransfer`实例，但是会报错。正确的传入参数为数组形式的`ClipboardItem`。
```javascript
// 错误案例
function setClipboard(text) {
  let data = new DataTransfer();
  data.items.add("text/plain", text);
  navigator.clipboard.write(data).then(function(res) {
    console.log(res);
    /* success */
  }, function(e) {
    console.log(e);
    /* failure */
  });
}
// TypeError: Failed to execute 'write' on 'Clipboard': The object must have a callable @@iterator property.
```
## 封装方法（默认浏览器支持navigator.clipboard）
### 1. 将图片写入到剪切板中
```javascript
// 复制图片
async function setClipboard(imageUrl) {
    let res = await fetch(imageUrl);
    res = res.blob();
    const item = new ClipboardItem({ 'image/png': res });
    navigator.clipboard.write([item]);
}
```
### 1. 读取剪切板内容

```javascript
// 读取剪切板内容
async function readSource() {
    let data = await navigator.clipboard.read();
    let res = [];
    for (let item of data) {
        for (const type of item.types) {
            const blob = await item.getType(type);
            // 如果为文本形式，则获取内容
            if (["text/plain", "text/html"].includes(type)) {
                let content = await readContent(blob);
                res.push(content);
            }
            // 如果为图片形式，则获取图片链接
            if (/^image/.test(type)) {
                let src = await readImg(blob);
                res.push(src);
            }
        }
    }
    return res;
}
// 读取文字内容
function readContent(content) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(content, 'text/plain');
        fileReader.addEventListener("load", function () {
            resolve(fileReader.result);
        }, false);
    })

}
// 读取图片内容，且生成Url
function readImg(content) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(content);
        fileReader.addEventListener("load", function () {
            resolve(fileReader.result);
        }, false);
    })
}
```