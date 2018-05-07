import { Config } from './lib/config'
import { TextEditor, window, Disposable, workspace, TextDocumentChangeEvent, TextDocument, Range, TextEditorDecorationType } from 'vscode'

const COMMENT_REGEXP = /<!--([\s\S]*?)-->/g
const DOUBLE_BIND_REGEXP = /\b(?:[\w-]+).sync\s*=\s*['"]([^'"]*)['"]/g
// pug 语言属性前可能是 "("
const DIRECTIVE_REGEXP = /(?:\s|\()(?:v-|bind:|catch:|wx:|:|@)[\w-]+(?:\.[\w-]+)?\s*=\s*['"]([^'"]*)['"]/g
const INTERPOLATION_SIMPLE_REGEXP = /\{\{\s*([\w.-\[\]]*)\s*\}\}/g // 可以匹配 a、a.b、a[1].b 等
const INTERPOLATION_COMPLEX_REGEXP = /\{\{\s*(.*?)\s*\}\}/g

export default class ActiveTextEditorListener {
  disposables: Disposable[] = []
  decorationType?: TextEditorDecorationType
  constructor(public config: Config) {
    // 首次立即更新，文件变化延迟更新
    if (window.activeTextEditor) this.onChange(window.activeTextEditor)

    let tid: NodeJS.Timer
    let update = (editor: TextEditor) => {
      if (tid) clearTimeout(tid)
      tid = setTimeout(() => this.onChange(editor), 500)
    }

    let handle = (e?: TextEditor | TextDocumentChangeEvent) => {
      if (e && window.activeTextEditor && e.document === window.activeTextEditor.document) {
        update(window.activeTextEditor)
      }
    }

    this.disposables.push(
      window.onDidChangeActiveTextEditor(handle),
      workspace.onDidChangeTextDocument(handle)
    )
  }

  onChange(editor: TextEditor) {
    let doc = editor.document
    if (this.config.disableDecorate) return

    if (doc.languageId === 'wxml' || doc.languageId === 'wxml-pug') {
      this.decorateWxml(editor)
    }
  }

  decorateWxml(editor: TextEditor) {
    let doc = editor.document
    let text = doc.getText()
    let interpolation = this.config.decorateComplexInterpolation ? INTERPOLATION_COMPLEX_REGEXP : INTERPOLATION_SIMPLE_REGEXP

    let comments = getRanges(text, COMMENT_REGEXP, doc, [])
    let ranges = [
      ...getRanges(text, DOUBLE_BIND_REGEXP, doc, comments),
      ...getRanges(text, DIRECTIVE_REGEXP, doc, comments),
      ...getRanges(text, interpolation, doc, comments)
    ]

    this.disposeDecorationType()
    this.decorationType = window.createTextEditorDecorationType(Object.assign({
      // 设置默认样式
    }, this.config.decorateType))

    editor.setDecorations(this.decorationType, ranges)
  }

  disposeDecorationType() {
    if (this.decorationType) this.decorationType.dispose()
  }
  dispose() {
    this.disposeDecorationType()
    this.disposables.forEach(d => d.dispose())
  }
}

function getRanges(content: string, regexp: RegExp, doc: TextDocument, excludeRanges: Range[]) {
  let match: RegExpExecArray | null
  let ranges: Range[] = []
  // tslint:disable:no-conditional-assignment
  while (match = regexp.exec(content)) {
    if (match[1]) {
      let {index} = match
      let word = match[1]
      let createRange = true
      if (regexp === DIRECTIVE_REGEXP || regexp === DOUBLE_BIND_REGEXP) {
        index += match[0].length - word.length - 1
        createRange = shouldCreateRange(word)
      } else if (regexp === COMMENT_REGEXP) {
        word = match[0]
      } else {
        index += match[0].indexOf(word)
        createRange = shouldCreateRange(word)
      }

      if (createRange) {
        let start = doc.positionAt(index)
        let end = doc.positionAt(index + word.length)
        let range = new Range(start, end)
        if (excludeRanges.every(r => !r.contains(range))) {
          ranges.push(range)
        }
      }
    }
  }

  return ranges
}

function shouldCreateRange(word: string) {
  let key = word.trim()
  if (!key) return false

  let firstChar = key[0]
  let lastChar = key[key.length - 1]
  // 不是 boolean，不是字符串，也不是以数字开头，也不是以 {{ 开头的
  return ['true', 'false'].indexOf(key) < 0
    && !(['"', '\''].indexOf(firstChar) >= 0 && firstChar === lastChar) // 前后两个是引号，则为字符串
    && !key.startsWith('{{')
    && !/\d/.test(firstChar) // 数字开头的肯定不是变量
}
