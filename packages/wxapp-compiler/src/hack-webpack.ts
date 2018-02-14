import * as webpack from 'webpack'
import {loader, Loader} from './loader'

export interface InjectedData {
  srcDir: string
  distDir: string
  modulesDir: string
  entryName: string
}

export function injectDataToCompiler(compiler: webpack.Compiler, data: InjectedData) {
  let c: any = compiler
  c.__wxapp_hacked = data
}

export function getDataFromLoaderContext(ctx: webpack.loader.LoaderContext): InjectedData & {loader: Loader} {
  return {...(ctx._compiler as any).__wxapp_hacked, loader}
}
