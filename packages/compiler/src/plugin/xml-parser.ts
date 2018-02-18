export type XMLNodeType = 'text' | 'tag'
export class XMLNode {
  type: XMLNodeType = 'tag'
  attrs: Array<{key: string, value: string}> = []
  children: XMLNode[] = []
  /** 只有 type 为 text 此字段才会有值 */
  content?: string
  constructor(public name: string) {
  }
}
