/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import * as fs from 'fs-extra'
import {sys, cli} from './base'

export const clearOptions: cli.Options = {

}

/**
 * 删除指定的文件夹（默认为 dist 文件夹）
 * @param res 命令行的参数（由 cli 脚本生成）
 */
export function clearCommand(res: cli.Response) {
  let directories = res._.length
    ? res._       // 使用命令行上指定的文件夹
    : ['dist']    // 使用根目录下的 dist 文件夹

  directories.forEach(directory => {
    directory = path.resolve(directory)

    if (fs.existsSync(directory)) {
      sys.info(`Empty directory ${directory}\n`)
      fs.emptyDirSync(directory)
    }
  })
}
