/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {stat, readFile} from './fs'

/**
 * 支持缓存的文件
 *
 * 避免频繁去读取文件系统
 *
 * @export
 * @class File
 */
export class CacheableFile {
  private ctime?: number
  private mtime?: number
  private cachedContent: Buffer | undefined
  /** 用于标识 getContent 是不是从 Cache 中取出的 */
  public cached?: boolean

  constructor(private filepath: string) {}

  /**
   * 获取文件内容(如果文件没有更新过，优先使用缓存)
   *
   * @returns Promise<Buffer>
   * @memberof CacheableFile
   */
  async getContent() {
    let stats = await stat(this.filepath)
    if (!stats.isFile()) throw new Error(`${this.filepath} is not a file`)

    let ctime = stats.ctime.getTime()
    let mtime = stats.mtime.getTime()

    if (!this.ctime || !this.mtime || !this.cachedContent || this.ctime !== ctime || this.mtime !== mtime) {
      this.ctime = ctime
      this.mtime = mtime
      this.cachedContent = await readFile(this.filepath)
      this.cached = false
    } else {
      this.cached = true
    }

    return this.cachedContent
  }
}
