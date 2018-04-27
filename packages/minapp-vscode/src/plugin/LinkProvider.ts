/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {DocumentLinkProvider, DocumentLink, CancellationToken, TextDocument, Uri, Range} from 'vscode'
import { Config } from './lib/config'
import * as fs from 'fs'
import * as path from 'path'

export default class implements DocumentLinkProvider {
  constructor(public config: Config) {}

  async provideDocumentLinks(doc: TextDocument, token: CancellationToken) {
    return this.getLinks(doc)
  }

  private getLinks(doc: TextDocument) {
    let links: DocumentLink[] = []
    let {linkAttributeNames} = this.config
    if (!linkAttributeNames.length) return links

    let roots = [path.dirname(doc.fileName), ...this.config.getResolveRoots(doc)]
    let regexp = new RegExp(`\\b(${linkAttributeNames.join('|')})=['"]([^'"]+)['"]`, 'g')
    let remote = /^\w+:\/\// // 是否是远程路径，如 "http://" ...
    doc.getText().replace(regexp, (raw, tag: string, key: string, index: number) => {
      let isRemote = remote.test(key)
      let file = isRemote ? key : roots.map(root => path.resolve(root, key)).find(f => fs.existsSync(f))
      if (file) {
        let offset = index + tag.length + 2
        let startPoint = doc.positionAt(offset)
        let endPoint = doc.positionAt(offset + key.length)
        links.push(new DocumentLink(new Range(startPoint, endPoint), isRemote ? Uri.parse(file) : Uri.file(file)))
      }
      return raw
    })

    return links
  }
}
