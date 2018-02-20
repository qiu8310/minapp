import * as webpack from 'webpack'
import * as fs from 'fs-extra'
import {join} from 'path'

export class RemoveEntryFile {

  apply(compiler: webpack.Compiler) {
    compiler.plugin('done', () => {
      let {filename, path} = (compiler.options.output || {}) as any
      if (!filename || !path) return

      let entry = join(path, filename)
      if (fs.existsSync(entry)) fs.unlinkSync(entry)
    })
  }
}
