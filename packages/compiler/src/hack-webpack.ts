import * as webpack from 'webpack'
import {Compiler} from './Compiler'

export interface InjectedData {
  srcDir: string
  distDir: string
  modulesDir: string
  entryName: string
}

export function injectDataToCompiler(compiler: webpack.Compiler, data: Compiler) {
  let c: any = compiler
  c.__wxapp_hacked = data
}

export function getDataFromLoaderContext(ctx: webpack.loader.LoaderContext): Compiler {
  return (ctx._compiler as any).__wxapp_hacked
}
