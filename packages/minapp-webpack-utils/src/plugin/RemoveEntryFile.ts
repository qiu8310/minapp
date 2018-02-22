import * as webpack from 'webpack'
const debug = require('debug')('minapp:webpack-utils:RemoveEntryFile')

export class RemoveEntryFile {

  apply(compiler: webpack.Compiler) {
    compiler.plugin('emit', async (compilation: any, done) => {
      debug('emit start')

      let {filename} = (compiler.options.output || {}) as webpack.Output
      if (!filename) return

      debug('remove entry asset %o', filename)
      delete compilation.assets[filename]
      return done()
    })
  }
}
