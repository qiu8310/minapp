/* tslint:disable */
export type Component = {name: string, docLink?: string, since?: string, desc: string[], attrs?: ComponentAttr[], authorize?: any, relateApis?: any[], notices?: string[], tips?: string[], bugs?: string[]}
export type ComponentAttrValue = {value: string, desc?: string, since?: string}
export type ComponentAttr = {name: string, type?: any, desc?: string[], required?: boolean, since?: string, defaultValue?: string, enum?: any[], extras?: any[], subAttrs?: Array<{equal: string, attrs: ComponentAttr[]}>}