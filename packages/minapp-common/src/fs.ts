/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {promisify} from 'mora-common/util/promisify'
import * as fs from 'fs'

export const stat: (filepath: string) => Promise<fs.Stats> = promisify<fs.Stats>(fs.stat, fs)

export const readdir: (dirpath: string) => Promise<string[]> = promisify<string[]>(fs.readdir, fs)

export const readFile: (filepath: string) => Promise<Buffer> = promisify<Buffer>(fs.readFile, fs)
