# 我终于知道了svg中stroke-dasharray和stroke-dashoffset如何计算了！！！

## 理解
1. 如果`stroke-dashoffset`为正数，则可以理解为将原线段从头裁剪了`stroke-dashoffset`的长度,可以理解为整体左移了`stroke-dashoffset`个单位。  
2. 如果`stroke-dashoffset`为负数，最好理解的方法就是转换为正数，公式为`Math.sum(...stroke-dasharray的值) - Math.abs(stroke-dashoffset的值)`(参考下方7-9条例子);第二种我觉得难以理解：就是原线段整体右移了`stroke-dashoffset`个单位。（理解时记得线段左边补充好线条样式）。


![1001678461341_.pic_hd.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72ca180bce6a4580b0146d21b982a101~tplv-k3u1fbpfcp-watermark.image?)

## 实际规则
**首先来一张文档里面的图，哈哈哈，是不是看了都头疼。**
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f08b3cd29c69450bbea71f809787c1b6~tplv-k3u1fbpfcp-watermark.image?)

翻译一下：  
1、定义一个变量`pathlength`为路径总长度  
2、定义`dashes`为stroke-dasharray的值，转换为用户单位，必要时重复，使元素个数为偶数;如果属性值为none，则列表只有一个值0。  
3、定义`count`为dashes`的长度。`  
4、定义`sum`为dashes的总和  
5、如果为`sum`为`0`，直接返回结果`[[0, pathlength]]`。  
6、定义`positions`为一个空值，当做是个空数组吧。  
7、定义`offset`为`stroke-dashoffset`的值。  
8、如果`offset`为负数，设置offset为`sum - abs(offset)`  
9、设置`offset`为`offset % sum`  
10、定义`index`为`sum(dashes[i], 0 ≤ i ≤ index) ≥ offset`,可以理解为从索引0到i的和比offset大，则index就置为i。  
11、定义`dashlength`为`min(sum(dashes[i], 0 ≤ i ≤ index) − offset, pathlength)`,注意此处index为上一个定义的`index`,而不是数组长度；这里可以理解获取`dashes`中索引`0`到`index`的`和`减去`offset`与`pathlength`中的最小值。  
12、如果`index % 2 === 0`,将`[0, dashlength]`加入到结果集`positions`中。  
13、让`position`为`dashlength`  
14、当`position`小与`pathlength`时，进行循环

```js
1、设置`index`为`(index + 1) % count`
2、让`dashlength`为`Math.min(dashes[index], pathlength - position)`
3、如果`index % 2 === 0`,将`[position, position + dashlength]`加入到positions中。
4、设置`position`为`position + dashlength`
```
15、返回这个结果集`positions`;

[w3c参考文档](https://www.w3.org/TR/SVG/painting.html#TermDashPositions)