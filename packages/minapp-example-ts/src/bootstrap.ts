import m from 'minapp'

export interface GlobalData {
  userInfo?: any
}

export class BaseApp extends m.App<GlobalData> {}

export class BasePage<D = any> extends m.Page<D, BaseApp> {}

export const wxp = m.wxp

export {m}
