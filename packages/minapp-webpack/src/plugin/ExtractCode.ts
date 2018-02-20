import * as webpack from 'webpack'
import * as sources from 'webpack-sources'

export class ExtractCode {

  apply(compiler: webpack.Compiler) {
    compiler.plugin('emit', async (compilation: any) => {

      let {filename} = (compiler.options.output || {}) as webpack.Output
      if (!filename) return


      let source: sources.CachedSource = compilation.assets[filename]

      console.log(source._source)
      return
    })
  }
}
