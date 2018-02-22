// 这些变量是通过 webpack 的 DefinePlugin 导入的
/**
 * process.env.NODE_ENV 中的值
 *
 * 如果没有指定则默认为 "developemnt"
 *
 * 如果编译时带了 -p 选项，则此值一定是 "production"
 */
declare var __ENV__: string;
