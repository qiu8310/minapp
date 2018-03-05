/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CacheableFile} from './CacheableFile'

export class ConditionalCacheableFile {
  private cacheableFile?: CacheableFile
  constructor(private getFilePathFn: () => string | undefined | Promise<string | undefined>) {}

  private async getFile() {
    let filepath = await this.getFilePathFn()
    this.cacheableFile = filepath ? new CacheableFile(filepath) : undefined
    return this.cacheableFile
  }

  private async tryGetFileContent() {
    let file = await this.getFile()
    return file ? (await file.getContent()) : undefined
  }

  async getContent() {
    if (this.cacheableFile) {
      try {
        return await this.cacheableFile.getContent()
      } catch (e) {
        if (e.code === 'ENOENT') { // 缓存的文件可能被删除了，重新获取
          return this.tryGetFileContent()
        } else {
          throw e
        }
      }
    } else {
      return this.tryGetFileContent()
    }
  }
}
