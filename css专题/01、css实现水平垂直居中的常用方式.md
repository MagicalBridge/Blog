划重点，这是一道面试必考题目，很多面试官都很喜欢问这个问题，这里总结一下一些常用的方法

要实现上面的效果看似很简单，实则暗藏玄机，本文总结了一下css实现水平垂直居中的方式，下面逐一介绍。

仅居中元素定宽、定高适用
+ absolute + 负margin
+ absolute + margin auto
+ absolute + calc

居中元素不定宽高
+ absolute + transform
+ lineheight
+ writing-mode
+ table
+ css-table
+ flex
+ grid

## absolute + 负margin
为了实现上面的效果，先来做些准备工作，假设HTML代码如下，总共有两个元素，父元素和子元素
```html
<div class="wp">
  <div class="box size">absolute + 负margin</div>
</div>
```
wp是父元素的类名，box是子元素的类名，因为有定宽和不定宽的区别，size用来表示指定宽度，下面是所有效果都需要用到的公共代码，主要是设置颜色和宽高

**注意：后面不再重复这段公共代码，只会给出相应的提示**
```css
/* 公共代码 */
.wp {
  border: 1px solid red;
  width: 300px;
  height: 300px;
}

.box {
  background: green;    
}

.box.size{
  width: 100px;
  height: 100px;
}
/* 公共代码 */
```
绝对定位的百分比是相对于父元素的宽高，通过这个特性可以让子元素居中显示，但是绝对定位是基于子元素的左上角，也就是当我们为绝对定位，并且 `top` 和 `left` 为50%的时候，子元素的左上角刚好位于父元素的中心，而我们期望的效果是子元素中心居中显示

为了修正这个问题，可以借助外边距的负值，负的外边距可以让元素向相反的方向定位，通过指定子元素的外边距为子元素宽度的一半的负值，就可以实现子元素居中了，css 代码如下
```js
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  position: relative;
}
.box {
  position: absolute;;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```
这是我比较常用的方式，这种方式比较好理解，兼容性也很好，缺点是需要知道子元素的宽高

## absolute + margin auto
这种方式是要求居中元素的宽高必须固定，HTML 代码如下：
```html
<div class="wp">
  <div class="box size">absolute + margin auto</div>
</div>
```
这种方式是设置各个方向的具体都是0，这个时候再设置`margin:auto` 就可以在各个方向上面居中了。
```css
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```
这种方式兼容性也好，缺点也是需要知道子元素的宽高

## absolute + calc
这种方式也是要求居中的元素宽高必须固定，所以我们为box增加 size 属性 HTML 代码如下：
```html
<div class="wp">
  <div class="box size">absolute + calc</div>
</div>
```
感谢css3 带来了计算属性，既然top的百分比是基于元素的左上角，那么减去宽度的一半就好了，代码如下:
```css
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  position: relative;
}
.box {
  position: absolute;;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```
上面这种实现方式和第一种 `absolute+负margin` 原理一样，只是实现方式不一样，这种方法兼容性依赖`calc`的兼容性，缺点是需要知道子元素的宽高。

## absolute + transform
还是绝对定位，但是这个方法不需要子元素固定宽高，所以不需要size类了，html代码如下
```html
<div class="wp">
  <div class="box">absolute + transform</div>
</div>
```

核心还是修复绝对定位的问题，还可以使用css3新增的特性 transform，transform的translate 属性也可以设置百分比，其实是相对于自身的宽和高，所以可以讲 translate设置为 -50%，就可以居中了，代码如下：
```css
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
这种方法兼容性依赖`translate2d`的兼容性

## lineheight
利用行内元素居中属性也可以做到水平垂直居中，HTML代码如下:

```html
<div class="wp">
  <div class="box">line-height</div>
</div>
```

这种方式原理也很简单，将box元素设置为行内元素，通过`text-align`就可以做到水平居中，但是很多同学可能不知道通过`vertical-align` 也可以在垂直方向上做到居中，代码如下:
```css
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}
.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
  text-align: left; /* 修正文字 */
}
```
这种方法需要在子元素中将文字显示重置为想要的效果。

## writing-mode

很多同学一定和我一样不知道 writing-mode属性，简单的说就是 writing-mode可以改变文字的显示方向比如通过writing-mode让文字显示方向变为垂直方向
```html
<div class="div1">水平方向</div>
<div class="div2">垂直方向</div>
```

```css
.div2 {
  writing-mode: vertical-lr;
}
```
```html
水平方向
垂
直
方
向
```
更加神奇的是所有水平方向上的css属性，都会变为垂直方向上的属性，比如`text-align`,通过`writing-mode`和`text-align`就可以
做到水平和垂直方向的居中了，只不过稍微麻烦一些。
```html
<div class="wp">
  <div class="wp-inner">
    <div class="box">123123</div>
  </div>
</div>
```

```css
/* 此处引用上面的公共代码 */
/* 此处引用上面的公共代码 */

/* 定位代码 */
.wp {
  writing-mode: vertical-lr;
  text-align: center;
}
.wp-inner {
  writing-mode: horizontal-tb;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.box {
  display: inline-block;
  margin: auto;
  text-align: left;
}
```
这种方法实现起来和理解起来都稍微有些复杂








