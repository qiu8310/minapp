---
title: 关于样式
---

## 样式单位

由于微信小程序中支持 `rpx` 单位

```
新增了尺寸单位。在写 CSS 样式时，开发者需要考虑到手机设备的屏幕会有不同的宽度和设备像素比，
采用一些技巧来换算一些像素单位。WXSS 在底层支持新的尺寸单位 rpx ，开发者可以免去换算的烦恼，
只要交给小程序底层来换算即可，由于换算采用的浮点数运算，所以运算结果会和预期结果有一点点偏差
```

**v1.x 版本的 minapp 会默认把所有 `px` 转化成 `rpx` 单位，而把所有的 `rpx` 单位转化成 `px`**

**v2.x 版本的 minapp 默认不会转化任何单位，需要手动配置 `unitTransformer` 配置，配置方法如下：**


在 `minapp.json` 中通过修改 `unitTransformer` 来修改对应的转化关系，如：

```js
{
  "unitTransformer": {
    "px": "2rpx"  // 表示将 1px 转化成 2rpx (配置中第一个单位不能出现数字)
    /* 也就是说如果在 css 中写 "margin: 20px;"，会被转化成 "margin: 40rpx;" */
  }
}
```

## json2sassPath

`minapp.json` 文件中的 `compiler` 选项中的配置

指定一个 json 文件的路径，`json2sass-loader` 会将这个 json 文件转化成 scss 变量的定义，这样你这个 json 文件就可以同时在 js 和 css 中使用


## urlLoaderLimit

在 `minapp.json` 中的 `compiler` 中可以设置此字段，类似于 [url-loader](https://github.com/webpack-contrib/url-loader) 中的 `limit` 选项，
表示：如果图片大小小于此值，则会使用 base64 对图片进行编码，而不会生成一个新的文件

**注意，不仅样式中的图片，wxml 和 js 中的图片满足条件的话也会进行 base64 编码**

## 图片相关的辅助方法

* data("path/to/image/file")

  返回图片的 base64 编码的格式，同时会加上 `url()`，如

  ```css
  {
    background: data("path/to/image/file.png");
  }
  ```

  会生成类似下面的结构

  ```css
  {
    background: url(data:image/png;base64,iVB...CC);
  }
  ```

* width("path/to/image/file", disableAutoRatio?)

  返回图片的宽度，并带上单位 `px`，如

  ```css
  {
    width: width("image-40x20.png");

    /* 会转化成 */

    width: 40px;
  }
  ```

  另外，现在经常需要用到高分辨率的图片，会在图片后面加上如 `@2x` 或 `@3x` 的后缀，
  width 函数会智能识别出此后缀，返回的宽度会除对应的后缀，如果图片宽度是 `40px`，
  而它带了 `@2x` 的后缀，则返回的宽度会是 `20px`，如：

  ```css
  {
    width: width("image-40x20@2x.png");

    /* 会转化成 */

    width: 20px;
  }
  ```

  如果不想自动识别图片的 `@2x` 这样的后缀，可以指定第二个参数为 `true`，如：

  ```css
  {
    width: width("image-40x20@2x.png", true);

    /* 会转化成 */

    width: 40px;
  }
  ```


* height("path/to/image/file", disableAutoRatio?)

  类似于 `width`，返回的是图片的高度

* size("path/to/image/file", disableAutoRatio?)

  类似于 `width`，返回的是图片的宽度和高度，如


  ```css
  {
    background-size: size("image-40x20@2x.png");

    /* 会转化成 */

    background-size: 20px 10px;
  }
  ```
