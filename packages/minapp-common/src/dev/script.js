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
    `export {Component, ComponentAttr, ComponentAttrValue} from '@minapp/generator/dist/generator/struct/Component'\n`
  )
}


function makeProdComponentTs() {
  fs.writeFileSync(
    path.resolve(__dirname, 'Component.ts'),
    `/* tslint:disable */
export type Component = {name: string, docLink?: string, since?: string, desc: string[], attrs?: ComponentAttr[], authorize?: any, relateApis?: any[], notices?: string[], tips?: string[], bugs?: string[]}
export type ComponentAttrValue = {value: string, desc?: string, since?: string}
export type ComponentAttr = {name: string, type?: any, desc?: string[], required?: boolean, since?: string, defaultValue?: string, enum?: any[], extras?: any[], subAttrs?: Array<{equal: string, attrs: ComponentAttr[]}>}`
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
