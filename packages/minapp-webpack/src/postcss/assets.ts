// import * as postcss from 'postcss'
// // import {webpackResolve, replace, getEmitFile, emitFileToRequireSrc} from './util'
// import {error} from 'mora-scripts/libs/sys'
// import {readFile, replace} from '../util'
// import {Loader} from '../loader/Loader'

// const mime = require('mime')

// const process: {
//   [key: string]: (loader: Loader, args: string[], collect: string[]) => Promise<string>
// } = {
//   url: async (loader, [imageFile], collect) => {
//     let src = await loader.loadStaticFile(imageFile)
//     return `url(${src})`
//   },

//   data: async (loader, [imageFile]) => {
//     let mediaType = mime.getType(imageFile)
//     let buffer = await readFile(imageFile)
//     return `url(data:${mediaType};${encodeBuffer(buffer, mediaType)})`
//   },

//   // async width(loader: Loader, args: string[]) {},
//   // async height(loader: Loader, args: string[]) {},
//   // async size(loader: Loader, args: string[]) {},
//   // async image(loader: Loader, args: string[]) {},
// }

// const PROCESS_REGEXP = new RegExp(`(${Object.keys(process).join('|')})\\(([^\\)]+)\\)`)
// const PROCESS_REGEXP_GLOBAL = new RegExp(`(${Object.keys(process).join('|')})\\(([^\\)]+)\\)`, 'g')

// export default function(loader: Loader, collect: string[]) {
//   return async (root: postcss.Root, result: postcss.Result) => {
//     let promises: Array<Promise<any>> = []
//     root.walkDecls(decl => {
//       if (PROCESS_REGEXP.test(decl.value)) {
//         promises.push(parseDecl(decl, loader, collect))
//       }
//     })
//     if (promises.length) return Promise.all(promises).catch(e => error(e))
//   }
// }

// async function parseDecl(decl: postcss.Declaration, loader: Loader, collect: string[]) {
//   let newval = await replace(decl.value, PROCESS_REGEXP_GLOBAL, async (match) => {
//     let key = match[1]
//     if (process[key]) {
//       let args = match[2].split(',').map(a => unquote(a))
//       // 第一个参数都是图片
//       args[0] = await loader.resolve(args[0])
//       loader.addDependency(args[0])
//       return await process[key](loader, args, collect)
//     }
//     return match[0]
//   })
//   if (newval && decl.value !== newval) decl.value = newval
// }

// function unquote(str: string) {
//   str = str.trim()
//   let len = str.length
//   if (str[0] === str[len - 1] && ['"', '\''].indexOf(str[0]) >= 0) return str.substr(1, len - 2)
//   return str
// }

// function encodeBuffer(buffer: Buffer, mediaType: string) {
//   if (mediaType === 'image/svg+xml') {
//     return 'charset=utf-8,' + encodeURIComponent(buffer.toString('utf8').trim())
//   }
//   return 'base64,' + buffer.toString('base64')
// }
