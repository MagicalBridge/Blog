## H5 页面适配iphoneX，就是这么简单

### 前言

iphone取消了物理按键，改成了小黑条，这一改动导致网页出现了比较尴尬的屏幕适配问题，对于网页而言，顶部（刘海位置）适配问题浏览器已经做了处理，所以我们只需要关注底部与小黑条的适配问题即可（即常见的吸底导航、返回顶部等各种相对底部fixed定位的元素）。

笔者通过查阅一些官方的文档，以及结合实际项目中的一些处理经验，整理了一套简单的适配方案分享给大家，希望对大家有所帮助，以下是处理前后的效果图：

大家都知道，iPhoneX，屏幕顶部有一个齐刘海，iPhoneX取消了物理按键，改成底部小黑条，如果不适配，这些地方就会被遮挡，因此本文讲述下齐刘海与底部小黑条的适配方法。


### 几个新的概念

#### 安全区域
安全区域指的是一个可视化窗口的范围，处于安全区域的内容不受圆角（corners）、齐刘海（sensor housing）、小黑条（Home indicator）影响，如下图所示:

#### viewport-fit

> ios11 新增特性，苹果公司为了适配 iPhoneX对现有 viewport meta 标签的一个扩展，用于设置网页在可视窗口的布局方式，可以设置三个值：

 + auto: 默认值，跟contain表现一致，页面内容显示在safe area内，viewport-fit：auto 等同于 viewport-fit：contain
 + contain：可视窗口完全包含网页内容（左图）。页面内容显示在safe area内，viewport-fit：contain
 + cover：网页内容完全覆盖可视窗口（右图）。页面内容充满屏幕。viewport-fit：cover

#### constant 函数
ios11新增特性，webkit的一个 css 函数，用于设定安全区域与边界的距离，有四个预定义的变量（单位是px）：

* safe-area-inset-left：安全区域距离左边界距离
* safe-area-inset-right：安全区域距离右边界距离
* safe-area-inset-top：安全区域距离顶部边界距离
* safe-area-inset-bottom：安全区域距离底部边界距离

注意：网页默认不添加扩展的表现是 viewport-contain，需要适配iPhoneX 必须设置 viewport-fit=cover，不然 constant函数是不会起作用的，这是适配的必要条件。
* 官方文档中提到将来 env()要替换 constant ()，目前还不可用
* 这两个函数都是 webkit 中 css 函数，可以直接使用变量函数，只有在 webkit 内核下才支持
* env：针对于iOS >= 11.2的系统

> 注意：网页默认不添加扩展的表现是 viewport-fit=contain，需要适配 iPhone 必须设置 viewport-fit=cover，这是适配的关键步骤。

### 适配例子:

第一步：设置网页在可视化窗口的布局方式

```html
<meta name='viewport'  content="width=device-width, viewport-fit=cover"  />
```

第二步：页面主体内容限定在安全区域内
```css
body {
  /* 适配齐刘海*/
  padding-top: constant(safe-area-inset-top);  
 /* 适配底部黑条*/
  padding-bottom: constant(safe-area-inset-bottom);
}
```



