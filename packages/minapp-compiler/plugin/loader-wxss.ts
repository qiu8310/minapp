// import * as postcss from 'postcss'
// import {Loader} from './inc/'

// import px2rpx from './postcss-px2rpx'
// import assets from './postcss-assets'
// const autoprefixer = require('autoprefixer')

// @Loader.decorate
// export default class extends Loader {
//   async run(content: string) {
//     let emitFile = this.emitFile.replace(/\.\w+$/, '.wxss')
//     let requires: string[] = []
//     let {autoprefixer: config} = this.compiler.options

//     let plugins: any[] = [
//       assets(this, requires)
//     ]

//     if (config !== false) {
//       plugins.push(autoprefixer(
//         typeof config === 'object' ? config : {
//           // https://github.com/ai/browserslist#queries
//           browsers: ['last 7 android version', 'last 5 chrome version', 'last 5 safari version'],
//           remove: false,
//           add: true
//         }
//       ))
//     }

//     plugins.push(px2rpx(this)) // 最后将单位转换成 rpx
//     await postcss(plugins).process(content, {from: this.resourcePath})
//       .then(r => this.emit(emitFile, r.css))

//     return '' // css 都可以用此 loader 处理完，没什么可以让 webpack 效劳的了
//   }
// }
