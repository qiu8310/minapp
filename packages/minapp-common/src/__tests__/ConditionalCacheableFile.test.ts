/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import {ConditionalCacheableFile} from '../ConditionalCacheableFile'

import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs-extra'
import {sleep} from 'mora-common/util/delay'

let file: string
beforeAll(() => file = path.join(os.tmpdir(), 'test.txt'))
afterEach(() => fs.existsSync(file) && fs.removeSync(file))

test('should get exists file content', async () => {
  fs.writeFileSync(file, 'abc')
  let f = new ConditionalCacheableFile(() => file)
  let c1 = await f.getContent()

  expect(c1 && c1.toString()).toEqual('abc')
})


test('should retry get file function when file first was cached and then removed', async () => {
  fs.writeFileSync(file, 'abc')
  let c = 0
  let f = new ConditionalCacheableFile(() => {
    c++
    return c > 1 ? undefined : file
  })

  let c1 = await f.getContent()

  expect(c1 && c1.toString()).toEqual('abc')

  fs.unlinkSync(file)
  let c2 = await f.getContent()
  expect(c2).toBeUndefined()
  expect(c).toEqual(2)
})

test('throw when file changed to directory', async () => {
  fs.writeFileSync(file, 'abc')
  let f = new ConditionalCacheableFile(() => file)
  await f.getContent()

  fs.removeSync(file)

  sleep(1000)
  fs.mkdirpSync(file)

  let c = 1
  try {
    await f.getContent()
  } catch (e) {
    c++
  }
  expect(c).toEqual(2)
})
