const path = require('path')
const fs = require('fs-extra')
const warn = require('mora-scripts/libs/sys/warn')
const info = require('mora-scripts/libs/sys/info')

const GENERATOR_ROOT = path.resolve('../minapp-generator')
const {data} = require(path.join(GENERATOR_ROOT, 'package.json'))

const WX_FILE = path.resolve(GENERATOR_ROOT, data.wx)
const WXP_FILE = path.resolve(GENERATOR_ROOT, data.wxp)
const PROMISABLE_FILE = path.resolve(GENERATOR_ROOT, data.promisable)

const DIST_DIR = path.resolve(__dirname, '../dist')

// 替换 index.js 中的 `var PROMISABLE = { FUNCS: [], KLASS: {} };`
function replaceDistWxpJs() {
  const DIST_INDEX_JS = path.join(DIST_DIR, 'wxp.js')
  let indexContent = fs.readFileSync(DIST_INDEX_JS).toString()
  let regexp = /var\s+PROMISABLE\s+=\s+.*?;/
  if (regexp.test(indexContent)) {
    fs.writeFileSync(
      DIST_INDEX_JS,
      indexContent.replace(regexp, `var PROMISABLE = ${JSON.stringify(require(PROMISABLE_FILE))};`)
    )
    info(`${DIST_INDEX_JS} 文件替换成功`)
  } else {
    warn(`${DIST_INDEX_JS} 文件替换失败`)
  }
}

// 复制 wxp.d.ts 文件到 dist 目录中
function copyWxp() {
  fs.copyFileSync(WX_FILE, path.join(DIST_DIR, '../typing/wx.d.ts'))
  info(`${WX_FILE} 复制成功`)
  fs.copyFileSync(WXP_FILE, path.join(DIST_DIR, 'wxp.d.ts'))
  info(`${WXP_FILE} 复制成功`)
}


replaceDistWxpJs()
copyWxp()
