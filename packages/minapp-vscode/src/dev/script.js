const fs = require('fs')
const path = require('path')

const GEN_DIR = path.resolve(__dirname, '../../../minapp-generator/')
const GEN_PKG = require(path.join(GEN_DIR, 'package.json'))

function copyComponentsJson() {
  fs.writeFileSync(
    path.resolve(__dirname, '../../res/components.json'),
    fs.readFileSync(path.resolve(GEN_DIR, GEN_PKG.data.components))
  )
}

function makeDevComponentTs() {
  fs.writeFileSync(
    path.resolve(__dirname, 'Component.ts'),
    `export {Component, ComponentAttr} from '@minapp/generator/dist/generator/struct/Component'\n`
  )
}

function makeProdComponentTs() {
  fs.writeFileSync(
    path.resolve(__dirname, 'Component.ts'),
    `export type Component = any\nexport type ComponentAttr = any\n`
  )
}

switch (process.argv[2]) {
  case 'copy': copyComponentsJson(); break
  case 'dev': makeDevComponentTs(); break
  case 'prod': makeProdComponentTs(); break
  default:
    console.log('')
    console.log('  use `copy` to copy generator project\'s components.json file to current dir')
    console.log('  use `dev` to make Component.ts in development mode')
    console.log('  use `prod` to make Component.ts in production mode')
    console.log('')
}
