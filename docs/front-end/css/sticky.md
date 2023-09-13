# position: sticky的理解
## 概念点
1、`position: sticky`定位相对的是第一个`祖先元素`为滚动元素的dom。  
2、 当自己的`祖先元素`滚动到`视野之外`时，`position: sticky`定位的dom也会一起滚动到上面。
![](./images/sticky-1.png)
如图所示，祖先元素即将滚动到了视野之外，sticky元素也会跟着祖先元素走，所以还是受祖先元素`控制`的。