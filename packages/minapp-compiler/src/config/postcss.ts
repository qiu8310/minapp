const autoprefixer = require('autoprefixer')
import {postcss as minapp} from '@minapp/webpack'

export function postcss(loader: string) {
  return {
    loader,
    options: {
      plugins: [
        minapp.px2rpx({px: 'rpx', rpx: 'px'}), // 将 px => rpx，将 rpx => px
        autoprefixer({
          // https://github.com/ai/browserslist#queries
          browsers: ['last 7 android version', 'last 5 chrome version', 'last 5 safari version'],
          remove: false,
          add: true
        })
      ]
    }
  }
}
