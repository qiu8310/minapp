## 贡献代码

1. 安装 lerna

```bash
npm i -g lerna
```

2. clone 整个仓库

```bash
git clone https://github.com/qiu8310/minapp.git
```

3. cd 到对应目录

```bash
cd path/to/minapp/packages/minapp-generator
```

4. 用 lerna 安装依赖

```bash
lerna bootstrap --scope @minapp/generator
```

5. 开启 watch 模式

```bash
npm run watch
```

6. 调试文档的某个页面

  比如，官方的 wx.request 页面在 https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html 这里，你只需要运行下面脚本就可以测试跑此单个页面的结果

  ```bash
  node dist/cli/cmd.js api -m network-request   # -m 表示生成 gen/api/api-network/network-request.md 文件
  node dist/cli/cmd.js api network-request      # 不带 -m 表示生成 gen/api/api-network/network-request.d.ts 文件

  # 更多命令行详情可以加上 -h 查看

  node dist/cli/cmd.js api -h
  ```
