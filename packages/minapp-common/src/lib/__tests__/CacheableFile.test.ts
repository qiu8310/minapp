/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CacheableFile} from '../CacheableFile'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs-extra'
import {sleep} from 'mora-common/util/delay'

describe('error', () => {
  test('throws when no file exists', async () => {
    let f = new CacheableFile('aaaa_bbbb')
    let c = 0
    return f.getContent().catch(e => {
      c++
    }).then(() => {
      expect(c).toEqual(1)
    })
  })
})

describe('basic', () => {

  let file: string
  beforeAll(() => file = path.join(os.tmpdir(), 'test.txt'))
  afterEach(() => fs.existsSync(file) && fs.unlinkSync(file))

  test('should get file content', async () => {
    fs.writeFileSync(file, 'abc')
    let f = new CacheableFile(file)
    let c = await f.getContent()
    expect(c.toString()).toEqual('abc')
  })

  test('should cache file content', async () => {
    fs.writeFileSync(file, 'abc')
    let f = new CacheableFile(file)

    let c1 = await f.getContent()
    expect(f.cached).toEqual(false)

    let c2 = await f.getContent()
    expect(f.cached).toEqual(true)

    let c3 = await f.getContent()
    expect(f.cached).toEqual(true)

    expect(c1.toString()).toEqual('abc')
    expect(c2.toString()).toEqual('abc')
    expect(c3.toString()).toEqual('abc')
  })

  test('should reload file when file changed', async () => {
    fs.writeFileSync(file, 'abc')
    let f = new CacheableFile(file)

    let c1 = await f.getContent()
    expect(f.cached).toEqual(false)

    await sleep(1000)

    fs.writeFileSync(file, 'def')
    let c2 = await f.getContent()
    expect(f.cached).toEqual(false)

    expect(c1.toString()).toEqual('abc')
    expect(c2.toString()).toEqual('def')
  })
})
