<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/open-data.html -->

#### open-data

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

用于展示微信开放的数据。

  属性名     |  类型     | 默认值 |  说明                          
-------------|-----------|--------|--------------------------------
  type       |  String   |        |  开放数据类型                  
  open-gid   |  String   |        |当 type="groupName" 时生效, 群id

**type 有效值：**

  值          |  说明    | 最低版本 
--------------|----------|----------
  groupName   |拉取群名称|  1.4.0   

**Tips:** 只有当前用户在此群内才能拉取到群名称

    <open-data type="groupName" open-gid="xxxxxx"></open-data>
    

**Tips:** 关于open-gid的获取请查看 [转发](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxgetshareinfoobject)
