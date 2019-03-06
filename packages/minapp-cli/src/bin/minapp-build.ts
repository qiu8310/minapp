/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {cli, compiler} from './base'

export const buildOptions: cli.Options = {
  'srcDir':   '<string> specify code source directory     {{"src"}}',
  'distDir':  '<string> specify build files directory     {{"dist"}}',
  'pretty':   '<boolean> do not minimize source code',
  'p | publicPath': '<string> static file\'s publicPath, just like `output.publicPath` in webpack',
  'w | watch':      '<boolean> watch mode, without webpack-dev-server',
  'e | empty':      '<boolean> empty distDir before compile',
  'l | useLocalAssetsFile': '<boolean> use Local assets path instead of publicPath'
}

/**
 * @param res 命令行的参数（由 cli 脚本生成）
 */
export function buildCommand(res: cli.Response) {

  process.env.NODE_ENV = 'production'
  if (res.srcDir)  process.env.MINAPP_SRC_DIR = res.srcDir
  if (res.distDir) process.env.MINAPP_DIST_DIR = res.distDir
  if (res.pretty)  process.env.MINAPP_PRETTY = 'true'
  if (res.publicPath)  process.env.MINAPP_PUBLIC_PATH = res.publicPath
  if (res.useLocalAssetsFile) process.env.MINAPP_USE_LOCAL_ASSETS_FILE = 'true'

  compiler(res.watch, null, {empty: res.empty})
}
