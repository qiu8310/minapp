/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {BaseComponent, comify} from '@minapp/core'


@comify()
export default class extends BaseComponent {

  properties = {
    /**
     * 这里是这个属性的描述
     *
     * 建议每个属性都加上描述，好处有两点：
     * 1. 可以通过 `minapp attrs` 命令将这些描述提取到当前目录中的 cjson 文件内
     * 2. 用了 minapp-vscode 的插件了的话，引用了此组件的页面可以获取到实时的提醒
     */
    attr1: String
  }

  /**
   * 生命周期函数
   *
   * 原生的是 ready，为了方便语法提醒，统一改成以 on 开头的函数
   */
  onReady() {
    console.log('require image: ' + require('./res/heart@3x.png'))
  }

  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop, newValue, oldValue) {

  }

}
