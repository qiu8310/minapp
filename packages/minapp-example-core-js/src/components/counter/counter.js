/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {MyComponent, comify} from 'base'

@comify()
export default class extends MyComponent {
  /**
   * 组件的属性列表
   */
  properties = {
    number: {
      value: 0,
      type: Number
    }
  }

  /**
   * 组件的初始数据
   */
  data = {

  }

  // 虽然是 Math.random()， 但所有此组件的此值都会是一样的， 因为组件只会初始化一次
  // 所以建议在 onCreated 中初化化组件的属性（也不要在 constructor 中初始化）
  prop = Math.random()

  /**
   * 生命周期函数
   *
   * 原生的是 create，为了方便语法提醒，统一改成以 on 开头的函数
   */
  onCreated() {
    console.log('获取属性 prop: %o, 获取 app 实例: %o', this.prop, this.app)
  }

  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop, newValue, oldValue) {
    console.log(`属性 ${prop} 从 %o 更新到了 %o`, oldValue, newValue)
  }

  /**
   * 自定义的函数，不需要放在 methods 中，在 comify() 执行过程中会帮你提取出来放到 methods
   */
  increase() {
    this.setDataSmart({number: this.data.number + 1})
  }

  /**
   * 自定义的函数，不需要放在 methods 中，在 comify 中会帮你提取出来放到 methods
   */
  decrease() {
    this.setDataSmart({number: this.data.number - 1})
  }
}

