import * as findup from 'mora-scripts/libs/fs/findup'
import {dirname, resolve, join} from 'path'

// 相关 URL
export const URL = {
  BASE_API: 'https://mp.weixin.qq.com/debug/wxadoc/dev/api/',
  BASE_TPL: 'https://mp.weixin.qq.com/debug/wxadoc/dev/component/'
}

// 相关目录
export const ROOT = dirname(findup.pkg(__dirname))
export const DIR = {
  ROOT,
  GEN_API: join(ROOT, 'gen', 'api'),
  GEN_TPL: join(ROOT, 'gen', 'tpl'),
  MODIFY_API: join(ROOT, 'dist', 'modify', 'api'),
  MODIFY_TPL: join(ROOT, 'dist', 'modify', 'tpl'),
}

// 输出的文件 （在 package.json 中的 data 字段中配置）
const pkg = require(join(ROOT, 'package.json'))
const {tpl, wx, wxp, promisable} = pkg.data
export const OUTPUT = {
  TPL: resolve(ROOT, tpl),
  WX: resolve(ROOT, wx),
  WXP: resolve(ROOT, wxp),
  PROMISABLE: resolve(ROOT, promisable),
  PRE_PROMISABLE: resolve(ROOT, promisable.replace(/(\w+\.json$)/, 'pre-$1'))
}
