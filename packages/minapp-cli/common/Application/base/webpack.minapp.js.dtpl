
/**
 * 修改 loader 或 loader 配置
 */
module.exports.updateLoaders = function(loaders, env) {
  /** 修改 ts loader **/
  // loaders.ts.loader = 'awesome-typescript-loader' // 使用本地的 awesome-typescript-loader
  // loaders.ts.options = {} // 修改配置


  /** 添加 postcss plugin **/
  // loaders.postcss.options.plugins.push(/* your plugin */)


  /** 添加 babel plugin (ts 项目不会使用 babel-loader) **/
  // loaders.babel.options.plugins.push(/* your plugin */)


  Object.assign(loaders.wxml.options, {
    // 更多 format 配置查看：https://github.com/qiu8310/minapp/blob/master/packages/minapp-wxml-parser/src/structs.ts#L7-L28
    format: {
      /** 是否删除注释，默认在 build 的时候会删除，dev 时候会保留 */
      // removeComment: true,

      /**
       * 开启此项可以使的 text 标签内的文本不会做任何的修改；
       *
       * 默认如果标签内的文本内容比较少，会将它前后的空格去除，
       * 而如果标签内的文本内容很多时，会在它前后加上换行字符
       */
      // reserveTags: ['text']
    }
  })

  /** 查看 loaders 结构 **/
  // console.log(loaders)
}



/**
 * 修改 webpack 配置
 */
module.exports.webpack = function(wpConf, webpack, env) {
  // minapp build 时 env.mode 为 production
  // minapp dev   时 env.mode 为 development

  if (env.mode === 'production') {

  } else {

  }

  // env 中还有许多其它环境相关的变量，输出查看其结构
  // console.log(env)
}


