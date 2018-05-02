/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {cli, compiler} from './base'
import * as portscanner from 'portscanner'

export const devOptions: cli.Options = {
  'srcDir':   '<string> specify code source directory     {{"src"}}',
  'distDir':  '<string> specify build files directory     {{"dist"}}',
  'host':     '<string> server host  {{"localhost"}}',
  'port':     '<string> server port  {{"8080"}}',
  'e | empty':      '<boolean> empty distDir before compile',
}

/**
 * @param res 命令行的参数（由 cli 脚本生成）
 */
export function devCommand(res: cli.Response) {
  // 写入域名相关信息
  let host = res.host || 'localhost'
  let rawPort = res.port || '8080'
  let intPort = parseInt(rawPort, 10)
  portscanner.findAPortNotInUse(intPort, intPort + 10, host, (err, port) => {
    if (err) return console.error(err)

    process.env.NODE_ENV = 'development'
    process.env.MINAPP_HOST = host
    process.env.MINAPP_PORT = port + ''
    if (res.srcDir) process.env.MINAPP_SRC_DIR = res.srcDir
    if (res.distDir) process.env.MINAPP_DIST_DIR = res.distDir

    compiler(false, {host, port}, {empty: res.empty})
  })

}
