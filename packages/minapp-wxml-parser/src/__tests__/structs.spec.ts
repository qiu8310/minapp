/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {parse} from '../'

describe('basic', () => {
  test('simple xml', () => {
    const xml = `<text>   long text  </text>`
    expect(parse(xml).toXML()).toEqual('<text>long text</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5})).toEqual('<text>\n  long text\n</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5, prefix: ':'})).toEqual(':<text>\n:  long text\n:</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5, eol: '-'})).toEqual('<text>-  long text-</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5, preferSpaces: false})).toEqual('<text>\n\t\tlong text\n</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5, preferSpaces: false, tabSize: 1})).toEqual('<text>\n\tlong text\n</text>')
    expect(parse(xml).toXML({maxLineCharacters: 5, reserveTags: ['text']})).toEqual(xml)
  })

  test('format attr', () => {
    const xml = `<text foo="bar"       >   long text  </text>`
    expect(parse(xml).toXML({maxLineCharacters: 5, reserveTags: ['text']})).toEqual('<text foo="bar">   long text  </text>')
  })

  test('should not format source tag', () => {
    const xml = `<wxs> this can be anything<abc> </wxs>`
    expect(parse(xml).toXML()).toEqual(xml)
    expect(parse('<i></i>' + xml).toXML()).toEqual('<i></i>\n' + xml)
  })

  test('comment', () => {
    expect(parse('<!-- comment -->').toXML()).toEqual('<!-- comment -->')
    expect(parse('<!-- comment -->').toXML({removeComment: true})).toEqual('')
    expect(parse('<!-- comment -->\n\n<view>abc</view>\n').toXML({removeComment: true})).toEqual('<view>abc</view>')
    expect(parse('<view>\n<!-- comment -->abc</view>').toXML({removeComment: true})).toEqual('<view>abc</view>')
    expect(parse('<view>\nabc\n<!-- comment --></view>').toXML({removeComment: true})).toEqual('<view>abc</view>')
  })
})
