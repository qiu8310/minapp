import * as webpack from 'webpack'
import * as path from 'path'

export default function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
  console.log(this.resourcePath)
  console.log(path.basename(this.resourcePath))
  console.log(this._compiler.options)
  return ''
}
