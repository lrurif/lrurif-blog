# style外部标签对domcontentloaded的影响
## 当外部style标签放到head中，（没有script）
当外部style标签放到head中，不阻塞DOMContentLoaded执行。
```html
<!DOCTYPE html>
<html lang="en">
<link>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="http://localhost:3000/aaa" rel="stylesheet"></link>
</head>
<body>
    <div>hhhhh</div>

</body>
</html>
```
![](./images/style-1.png)
## 当外部style标签放到body中或body后，（没有script）
当外部style标签放到body中或body后，会阻塞DOMContentLoaded执行。
```html
<!DOCTYPE html>
<html lang="en">
<link>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>hhhhh</div>
    <link href="http://localhost:3000/aaa" rel="stylesheet"></link>

</body>
</html>
```
![](./images/style-2.png)