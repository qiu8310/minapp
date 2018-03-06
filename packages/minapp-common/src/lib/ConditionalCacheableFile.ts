/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CacheableFile} from './CacheableFile'

export class ConditionalCacheableFile {
  public filename?: string
  public cached?: boolean

  private cacheableFile?: CacheableFile
  private cachedParseContent?: any
  constructor(private getFilePathFn: () => string | undefined | Promise<string | undefined>, private parseFileContent?: (filename: string, buffer: Buffer) => any) {}

  private async getFile() {
    let filepath = await this.getFilePathFn()
    this.cacheableFile = filepath ? new CacheableFile(filepath) : undefined
    this.filename = filepath
    return this.cacheableFile
  }

  private async tryGetFileContent() {
    let file = await this.getFile()
    return file ? (await file.getContent()) : undefined
  }

  async getContent() {
    this.cached = false
    let content: Buffer | undefined
    if (this.cacheableFile) {
      try {
        content =  await this.cacheableFile.getContent()
        this.cached = this.cacheableFile.cached
      } catch (e) {
        if (e.code === 'ENOENT') { // 缓存的文件可能被删除了，重新获取
          content = await this.tryGetFileContent()
        } else {
          throw e
        }
      }
    } else {
      content = await this.tryGetFileContent()
    }

    if (content === undefined || !this.parseFileContent) return content

    if (!this.cached || this.cachedParseContent === undefined) {
      this.cachedParseContent = await this.parseFileContent(this.filename as string, content)
    }

    return this.cachedParseContent
  }
}
