export interface Snippet {
  body: string | string[]
  description?: string
  /** 程序中生成的，不需要配置 */
  markdown?: string
}
export interface Snippets { [key: string]: Snippet }

export const PugSnippets: Snippets = {
  icon: {
    body: 'icon(type="${1|success,success_no_circle,info,warn,waiting,cancel,download,search,clear|}" size="${2:23}" color="$3") $0'
  },
}
export const WxmlSnippets: Snippets = {
  'swiper': {
    body: [
      '<swiper indicator-dots="{{${1|true,false|}}}" autoplay="{{${2|true,false|}}}" interval="{{${3:5000}}}" duration="{{${4:500}}}">',
      '\t<block wx:for="{{${5:imgUrls}}}">',
      '\t\t<swiper-item>',
      '\t\t\t<image class="${6:swiper-image}" src="{{${7:item}}}" />',
      '\t\t</swiper-item>',
      '\t</block>',
      '</swiper>$0'
    ]
  },
  'icon': {
    body: '<icon type="${1|success,success_no_circle,info,warn,waiting,cancel,download,search,clear|}" size="${2:23}" color="$3" /> $0'
  },
  'button': {
    body: [
      '<button class="${1:btn}" type="${2|primary,default,warn|}" loading="{{${3:loading}}}" disabled="{{${4:disabled}}}" bindtap="${5:onTap}">',
      '\t${7:按钮文本}',
      '</button>$0'
    ]
  },
  'picker time': {
    body: [
      '<picker mode="time" value="{{${1:time}}}" start="${2:09:01}" end="${3:21:01}" bindchange="${4:bindTimeChange}">',
      '\t<view>当前选择: {{${1:time}}}</view>',
      '</picker>$0'
    ]
  },
  'picker date': {
    body: [
      '<picker mode="date" value="{{${1:date}}}" start="${2:2015-09-01}" end="${3:2017-09-01}" bindchange="${4:bindDateChange}">',
      '\t<view>当前选择: {{${1:date}}}</view>',
      '</picker>$0'
    ]
  },
  'picker region': {
    body: [
      '<picker mode="region" value="{{${1:region}}}" bindchange="${3:bindRegionChange}">',
      '\t<view>当前选择：{{${1:region}[0]}}，{{${1:region}[1]}}，{{${1:region}[2]}}</view>',
      '</picker>$0'
    ]
  },
  'checkbox-group': {
    body: [
      '<checkbox-group>',
      '\t<label wx:for="{{${1:array}}}" wx:for-item="${2:item}" wx:key="{{${2:item}.${3:id}}}">',
      '\t\t<checkbox value="{{${2:item}.${4:value}}}" /> {{${2:item}.${5:name}}}',
      '\t</label>',
      '</checkbox-group>$0'
    ]
  },
  'radio-group': {
    body: [
      '<radio-group>',
      '\t<label wx:for="{{${1:array}}}" wx:for-item="${2:item}" wx:key="{{${2:item}.${3:id}}}">',
      '\t\t<radio value="{{${2:item}.${4:value}}}" /> {{${2:item}.${5:name}}}',
      '\t</label>',
      '</radio-group>$0'
    ]
  }
}
