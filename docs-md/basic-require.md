---
title: 关于 js 或 ts 中的 require
---

像你用 webpack 开发 web 程序一样，图片文件路径不能直接写在 js 或 ts 中，需要使用 require 来引用，如： `require("path/to/image.png")`

另外，为了方便复用 json 文件，你也可以直接在 js 或 ts 中 require json 文件，如 `require("path/to/some.json")`;
通过这种方式 require 进的 json 会全部导入到文件中，可能有时你只需要 json 中的某个字段，这时你可以在文件后面加上字段的参数，如
现在需要取出 app.json 文件中的 tabBar 中的 list 字段，可以这样用 `require("./app.json?tabBar.list")`，如果这个字段
不存在，会返回 `undefined`。
