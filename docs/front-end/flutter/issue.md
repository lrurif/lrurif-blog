# 入门flutter遇到的问题

### 1. 使用ListView出现`Vertical viewport was given unbounded height`

解决：
1. 给`ListView`组件加上`shrinkWrap: true`
2. 如果不要`ListView`滚动的话，可以设置`physics: NeverScrollableScrollPhysics()`
### 2.`ListView`组件自带`padding`，导致第一个元素会在中间。

解决：设置`padding`为`EdgeInsets.zero`.

### 3. 使用`Stack`组件，元素覆盖顺序不对

问题：其中一个子组件不展示，被覆盖了  
原因：`stack`组件里面的顺序是从上到下的，后面的元素会在上面的元素上面，并没有css里面的z-index概念。  
解决：将被隐藏的组件放到数组后面。  

### 4.实现一个组件，有圆角并且子元素溢出会隐藏
```
Container(
    height: 100,
    clipBehavior: Clip.hardEdge,
    decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(6)),
    ),
),

```
### 5. flutter实现点击空白处取消TextField焦点
```dart
// GestureDetector最好放在最外层
GestureDetector(
    behavior: HitTestBehavior.translucent,
    onTap: () {
        // 触摸收起键盘
        FocusScope.of(context).requestFocus(FocusNode());
    },
    child: **视图内容**
)
```