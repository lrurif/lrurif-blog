# nodejs上传文件的坑
## 问题
连续上传同一个文件，然后用的是同一个`FormData`对象，第一个可以上传成功，第二个就会挂起，axios的请求拦截会执行，但是服务端接收不到请求。

使用了`其他请求库`，例如`got`,也还是同样存在问题。

## 问题代码
```javascript
import fs from 'fs';
import FormData  from 'form-data';
import axios  from 'axios';

(async () => {
    let formData = new FormData();
    formData.append("file", fs.createReadStream("./file.js"))
    const uploadUrl = "http://localhost:3000/api/say/upload"
    let res = await axios.post(uploadUrl, formData);
    // 这一段代码会执行
    console.log(res.data, 'res')
    let res2 = await axios.post(uploadUrl, formData);
    // 这一段代码永远不会执行
    console.log(res2.data, 'res')
})();
```

## 如何解决
每次文件上传都创建一个新的的`FormData对象`，即可解决。