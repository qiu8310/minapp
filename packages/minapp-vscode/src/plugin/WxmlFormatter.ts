import {
  workspace,
  FormattingOptions,
  DocumentFormattingEditProvider,
  DocumentRangeFormattingEditProvider,
  TextDocument,
  TextEdit,
  Range
} from 'vscode'

import {EOL} from 'os'
import {parse} from '@minapp/wxml-parser'
import {Config} from './lib/config'

export default class implements DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider {
  constructor(public config: Config) {}

  getEOL() {
    return workspace.getConfiguration('files', null as any).get('eol', EOL) || EOL
  }

  format(doc: TextDocument, range: Range, options: FormattingOptions, prefix = '') {
    let xml = parse(doc.getText(range))

    return [
      new TextEdit(range, xml.toXML({
        prefix,
        eol: this.getEOL(),
        preferSpaces: options.insertSpaces,
        tabSize: options.tabSize,
        maxLineCharacters: this.config.formatMaxLineCharacters
      }))
    ]
  }

  provideDocumentFormattingEdits(doc: TextDocument, options: FormattingOptions): TextEdit[] {
    let range = new Range(doc.lineAt(0).range.start, doc.lineAt(doc.lineCount - 1).range.end)
    return this.format(doc, range, options)
  }

  provideDocumentRangeFormattingEdits(doc: TextDocument, range: Range, options: FormattingOptions): TextEdit[] {
    let prefixRange = doc.getWordRangeAtPosition(range.start, /[ \t]+/)
    let prefix = prefixRange ? doc.getText(prefixRange) : ''
    return this.format(doc, range, options, prefix)
  }
}
