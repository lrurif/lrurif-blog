# animejs 的使用

## 安装

1. 使用 npm 安装

```
npm install animejs --save
```

2. 使用 cdn

```javascript
<script src="https://cdn.bootcdn.net/ajax/libs/animejs/3.2.1/anime.min.js"></script>
```

## 如何使用

### TARGETS（动画的目标对象）

1. 使用 css 选择器（不支持伪元素）

```javascript
// css选择器
anime({
    targets: ".block",
    translateX: 250,
});
```

2. 使用 Dom 节点或节点列表

```javascript
// 节点列表
var elements = document.querySelectorAll(".dom-node-demo");

anime({
    targets: elements,
    translateX: 270,
});
```

```javascript
// 节点
var element = document.querySelector(".dom-node-demo");

anime({
    targets: element,
    translateX: 270,
});
```

3. 使用 js 对象并且只要带有一个属性值包含数字

```javascript
let battery = {
    weight: 0, // 属性起始值
};
anime({
    targets: battery,
    weight: 100, // 对应属性最终值
    easing: "linear",
    update(e) {
        console.log(battery.weight);
    },
});
```

4. 数组，包括上面三个的值类型

```javascript
anime({
    targets: [document.querySelector(".block-temp"), ".block"],
    translateX: 250,
});
```

### PROPERTIES（可执行动画的目标属性）

1. css 属性

```javascript
anime({
    targets: ".css-prop-demo .el",
    left: "240px",
    backgroundColor: "#FFF",
    borderRadius: ["0%", "50%"],
    easing: "easeInOutQuad",
});
```

2. css transforms

```javascript
anime({
    targets: el,
    translateX: 100,
    easing: "linear",
    scale: 2,
    rotate: "360deg",
});
```

3. 对象属性
   参考上方`TARGETS第三条`
4. DOM 属性

```javascript
let input = document.querySelector("#input");
input.temp = `0 dogs`;
anime({
    targets: input,
    easing: "linear",
    value: 1000,
    temp: "10 dogs", // js设置的属性值
});
```

5. svg 属性

```javascript
<svg>
    <circle
        cx="100"
        cy="50"
        r="40"
        id="circle"
        stroke-width="2"
        fill="transparent"
    />
</svg>;
anime({
    targets: "#circle",
    easing: "linear",
    "stroke-dasharray": "251.2 0",
});
```

### PROPERTY PARAMETERS（动画基础参数）

1. duration：执行时间，默认 1000ms

```javascript
anime({
    targets: ".item",
    translateX: 300,
    duration: 3000,
});
```

2.  delay：延迟，默认 0ms

```javascript
anime({
    targets: ".delay-demo .el",
    translateX: 250,
    delay: 1000,
});
```

3. endDelay：结束延迟，默认 0ms，可以理解为延迟触发 finished 事件的时长。

```javascript
async function run() {
    await anime({
        targets: circle,
        easing: "linear",
        duration: 300,
        "stroke-dasharray": "251.2 0",
        endDelay: 1000, // 此操作会延迟执行下一个动画
    }).finished;
    anime({
        targets: line,
        duration: 200,
        easing: "linear",
        "stroke-dashoffset": 0,
    });
}
```

4. easing：定义动画的定时函数，默认`easeOutElastic(1, .5)`

```javascript
anime({
    targets: ".easing-demo .el",
    translateX: 250,
    easing: "linear",
});
```

5. round：将值四舍五入为 x 个小数，设置为 1 没有小数，为 10 则只有一位小数

```javascript
var roundLogEl = document.querySelector(".round-log");

anime({
    targets: roundLogEl,
    innerHTML: [0, 10000],
    easing: "linear",
    round: 10, // Will round the animated value to 1 decimal
});
```

6. 特殊动画属性  
   可将动画属性设置为对象，设置上述动画基础参数。

```javascript
anime({
    targets: ".block",
    translateX: {
        value: 250,
        easing: "linear",
    },
    scale: {
        value: 2,
        easing: "linear",
    },
    delay: 250, // All properties except 'scale' inherit 250ms delay
});
```

7. 函数动画参数  
   函数里面有三个形参：target-目标元素，index-如果 targets 为数组，则对应索引，targetsLength-targets 为数组的长度。

```javascript
anime({
    targets: ".block",
    translateX: 270,
    direction: "alternate",
    loop: true,
    delay: function (target, index, targetsLength) {
        return index * 1000;
    },
    endDelay: function (target, index, targetsLength) {
        return (targetsLength - index) * 100;
    },
});
```

### ANIMATION PARAMETERS（动画参数）

1. direction(动画方向)  
   可选参数：

-   `normal`：动画方向从 0 到 100%
-   `reverse`：动画方向从 100%到 0%
-   `alternate`：动画方向从 0 到 100%，然后从 100%到 0

2. loop (定义动画的迭代次数)
   可选参数

-   `Number`, 执行几次
-   `true`，无限循环

3. autoplay(定义动画是否自动开始)

-   `true`: 自动开始
-   `false`: 默认暂停

### VALUES（属性值）

1. 无单位赋值：如果原始值有一个单位，它将自动添加到动画值中。
2. 特殊单位赋值：如果 DOM 宽度初始为 px 单位，最终 DOM 宽度设置为百分比，那初始值会被强制转换为百分比。
3. 相对单位赋值
   可选为：

-   `+=`
-   `-=`
-   `*=`

```javascript
var relativeEl = document.querySelector(".el.relative-values");
relativeEl.style.transform = "translateX(100px)";

anime({
    targets: ".el.relative-values",
    translateX: {
        value: "*=2.5", // 100px * 2.5 = '250px'
        duration: 1000,
    },
});
```

4. 颜色单位：接受十六进制、RGB、RGBA、HSL 和 HSLA 颜色值。
5. 设置动画初始值，需要设置为一个数组，`[from, to]`

```javascript
anime({
    targets: ".el.from-to-values",
    translateX: [100, 250], // from 100 to 250
    delay: 500,
    direction: "alternate",
    loop: true,
});
```

6. 函数值单位
   函数里面有三个形参：target-目标元素，index-如果 targets 为数组，则对应索引，targetsLength-targets 为数组的长度。

```javascript
anime({
    targets: ".function-based-values-demo .el",
    translateX: function (el) {
        return el.getAttribute("data-x");
    },
    translateY: function (el, i) {
        return 50 + -50 * i;
    },
    rotate: function () {
        return anime.random(-360, 360);
    },
    borderRadius: function () {
        return ["50%", anime.random(10, 35) + "%"];
    },
    duration: function () {
        return anime.random(1200, 1800);
    },
    delay: function () {
        return anime.random(0, 400);
    },
    direction: "alternate",
    loop: true,
});
```

### keyframes（关键帧）

1. 动画帧
   动画关键帧是使用 keyframes 属性中的数组定义的。如果关键帧内没有指定 duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。

```javascript
anime({
    targets: ".item",
    keyframes: [
        { translateY: -40, duration: 1000 },
        { translateX: 250, duration: 1000 },
        { translateY: 40, duration: 1000 },
        { translateX: 0, duration: 500 },
        { translateY: 0, duration: 500 },
    ],
    duration: 4000,
    easing: "linear",
    loop: true,
});
```

2. 属性关键帧  
   与动画关键帧类似，属性关键帧是使用属性对象的 Array 定义的。 属性关键帧允许重叠动画，因为每个属性都有自己的关键帧数组。
   如果关键帧内没有指定 duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。

### STAGGERING(交错值函数)

1. 基础交错动画

```javascript
anime({
    targets: ".basic-staggering-demo .el",
    translateX: 270,
    delay: anime.stagger(100), // 每个元素的延迟为 (索引 * 100)
});
```

2. 设置开始值

```javascript
anime({
    targets: ".basic-staggering-demo .el",
    translateX: 270,
    delay: anime.stagger(100, { start: 500 }), // 每个元素的延迟为 500 + (索引 * 100)
});
```

3. 设置两个值之间的平均值

```javascript
anime({
    targets: ".range-value-staggering-demo .el",
    translateX: 270,
    rotate: anime.stagger([-360, 360]), // 每个DOM旋转角度为-360 + ((360 - (-360)) / DOM数量) * 索引
    easing: "easeInOutQuad",
});
```

4. 设置起始位置

```javascript
anime({
    targets: ".staggering-from-demo .el",
    translateX: 270,
    delay: anime.stagger(100, { from: "center" }), //从中间开始执行效果，然后每个元素增加100毫秒,所以中间的元素延迟最短。
});
```

5. 交错方向
   可选值为`normal`|`reverse`

```javascript
anime({
    targets: ".staggering-direction-demo .el",
    translateX: 270,
    delay: anime.stagger(100, { direction: "reverse" }),
});
```

6. 交错的时间曲线

```javascript
anime({
    targets: ".staggering-easing-demo .el",
    translateX: 270,
    // 可以理解为总量延迟为1500，但是时间函数可以设置为从快到慢，那么前面的元素之间延迟相差较小，后面较大
    delay: anime.stagger(300, { easing: "easeOutQuad" }),
});
```

7. 网格交错
   基于数组的交错值，以产生“波纹”效应。两个值的数组，第一个值是列数，第二个值是行数

```javascript
anime({
    targets: ".staggering-grid-demo .el",
    scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
    ],
    // 网格设置为14, 5,从中间开始
    delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
});
```

8. 设置方向的网格交错  
   定义网格交错效果的方向

-   x 沿着 x 轴
-   y 沿着 y 轴

```javascript
anime({
    targets: ".staggering-axis-grid-demo .el",
    translateX: anime.stagger(10, { grid: [14, 5], from: "center", axis: "x" }),
    translateY: anime.stagger(10, { grid: [14, 5], from: "center", axis: "y" }),
    rotateZ: anime.stagger([0, 90], {
        grid: [14, 5],
        from: "center",
        axis: "x",
    }),
    delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
    easing: "easeInOutQuad",
});
```

### 时间轴

1. 基础时间轴
   默认时间轴会在上一个动画执行完，然后顺序执行下一个。

```javascript
var tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 750,
});

// Add children
tl.add({
    targets: ".basic-timeline-demo .el.square",
    translateX: 250,
})
    .add({
        targets: ".basic-timeline-demo .el.circle",
        translateX: 250,
    })
    .add({
        targets: ".basic-timeline-demo .el.triangle",
        translateX: 250,
    });
```

2. 时间轴偏移量  
   可以使用时间轴的 .add()函数的第二个可选参数指定时间偏移。它定义动画在时间轴中的开始时间，如果未指定偏移，则动画将在上一个动画结束后开始。  
   偏移可以相对于最后一个动画，也可以相对于整个时间轴。
```javascript
// Create a timeline with default parameters
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.offsets-demo .el.square',
  translateX: 250,
})
.add({
  targets: '.offsets-demo .el.circle',
  translateX: 250,
}, '-=600') // 相对偏移-会在第一个动画执行150ms时执行
.add({
  targets: '.offsets-demo .el.triangle',
  translateX: 250,
}, 400); // 绝对偏移，会在第一个动画执行400ms后执行
```
3. 参数继承  
父时间轴实例中设置的参数将由所有子项继承.
### CONTROLS(控制)
```javascript
var animation = anime({
  targets: '.play-pause-demo .el',
  translateX: 270,
  direction: 'alternate',
  autoplay: false,
});
```
1. 开始  
`animation.start()`
2. 停止  
`animation.parse()`
3. 重新开始  
`animation.retart()`
4. 反转  
`animation.reverse()`
5. 反转  
`animation.seek(timeStamp)`

### 回调函数（事件）
1. `update`事件，动画更新时执行，有一个参数`animation`：当前动画对象
2. `begin`事件，动画开始时执行，有一个参数`animation`：当前动画对象
3. `complete`事件，动画结束时执行，有一个参数`animation`：当前动画对象
4. `loopBegin`，每次循环开始时都会触发执行,有一个参数`animation`：当前动画对象
5. `loopComplete`事件，每次循环结束时都会触发执行,有一个参数`animation`：当前动画对象
6. `change`事件，在动画的delay和endDelay之间的每个帧上触发此回调。使用该函数需要设置`delay`、`endDelay`。
7. `changeBegin`事件，每次动画开始改变时都会触发changeBegin()回调。
8. `changeComplete`事件，每次动画停止变化时都会触发changeComplete()回调。使用该函数需要设置`delay`、`endDelay`
9. finished属性，返回一个promise，当动画执行完成后promise会变为fulfilled状态。
### SVG
略，[可参考官网](https://animejs.com/documentation/#motionPath)
### easing的值
略，[可参考官网](https://animejs.com/documentation/#linearEasing)
### 辅助属性和函数
1. `remove`函数：将目标从动画中移除
2. `get`函数：获取目标的属性，可以转换成其他单位。
3. `set`函数：将目标的属性设置为其他值。
4. `random`函数，获取一个区间内的随机数。
5. `tick`函数：手动执行每一帧的动画。
6. `running`属性：返回正在执行的动画实例
7. `suspendWhenDocumentHidden`属性，可以设置为true或者false，为true的时候，切换浏览器选项卡时不会执行动画，为false，则会执行。


## 参考
[animejs官方文档](https://animejs.com/documentation/#cssSelector)
