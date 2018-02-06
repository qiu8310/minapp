<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html -->

基于微信的通知渠道，我们为开发者提供了可以高效触达用户的模板消息能力，以便实现服务的闭环并提供更佳的体验。

模板推送位置：服务通知

模板下发条件：用户本人在微信体系内与页面有交互行为后触发，详见[下发条件说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#下发条件说明)

模板跳转能力：点击查看详情仅能跳转下发模板的该帐号的各个页面

使用说明
----

步骤一：获取模板ID

有两个方法可以获取模版ID

1.  通过模版消息管理接口获取模版ID（详见[模版消息管理](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#模版消息管理)）
2.  在微信公众平台手动配置获取模版ID

登录[https://mp.weixin.qq.com](https://mp.weixin.qq.com) 获取模板，如果没有合适的模板，可以申请添加新模板，审核通过后可使用，详见[模板审核说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#审核说明)

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/mp-notice.png?t=201822)

步骤二：页面的 [`<form/>`](https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html) 组件，属性`report-submit`为`true`时，可以声明为需发模板消息，此时点击按钮提交表单可以获取`formId`，用于发送模板消息。或者当用户完成[支付行为](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html)，可以获取`prepay_id`用于发送模板消息。

步骤三：调用接口下发模板消息（详见[发送模版消息](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#发送模版消息)）

模版消息管理
------

### 1.获取小程序模板库标题列表

**接口地址**

    https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数           |  必填 |  说明                                                             
-----------------|-------|-------------------------------------------------------------------
  access_token   |  是   |  接口调用凭证                                                     
  offset         |  是   |offset和count用于分页，表示从offset开始，拉取count条记录，offset从0开始，count最大为20。
  count          |  是   |offset和count用于分页，表示从offset开始，拉取count条记录，offset从0开始，count最大为20。

##### 示例：

    {
    "offset":0,
    "count":5
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
    "errcode":0,
    "errmsg":"ok",
    "list":[
    {"id":"AT0002","title":"购买成功通知"},
    {"id":"AT0003","title":"购买失败通知"},
    {"id":"AT0004","title":"交易提醒"},
    {"id":"AT0005","title":"付款成功通知"},
    {"id":"AT0006","title":"付款失败通知"}
    ],
    "total_count":599
    }
    

**返回参数说明：**

  参数          |  说明                      
----------------|----------------------------
  id            |模板标题id（获取模板标题下的关键词库时需要）
  title         |  模板标题内容              
  total_count   |  模板库标题总数            

### 2.获取模板库某个模板标题下关键词库

**接口地址**

    https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数           |  必填 |  说明                           
-----------------|-------|---------------------------------
  access_token   |  是   |  接口调用凭证                   
  id             |  是   |模板标题id，可通过接口获取，也可登录小程序后台查看获取

##### 示例：

    {
    "id":"AT0002"
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
        "errcode": 0,
        "errmsg": "ok",
        "id": "AT0002",
        "title": "购买成功通知",
        "keyword_list": [
            {
                "keyword_id": 3,
                "name": "购买地点",
                "example": "TIT造舰厂"
            },
            {
                "keyword_id": 4,
                "name": "购买时间",
                "example": "2016年6月6日"
            },
            {
                "keyword_id": 5,
                "name": "物品名称",
                "example": "咖啡"
            }
        ]
    }
    

**返回参数说明：**

  参数         |  说明            
---------------|------------------
  keyword_id   |关键词id，添加模板时需要
  name         |  关键词内容      
  example      |关键词内容对应的示例

### 3.组合模板并添加至帐号下的个人模板库

**接口地址**

    https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数              |  必填 |  说明                                                           
--------------------|-------|-----------------------------------------------------------------
  access_token      |  是   |  接口调用凭证                                                   
  id                |  是   |  模板标题id，可通过接口获取，也可登录小程序后台查看获取         
  keyword_id_list   |  是   |开发者自行组合好的模板关键词列表，关键词顺序可以自由搭配（例如[3,5,4]或[4,5,3]），最多支持10个关键词组合

##### 示例：

    {
    "id":"AT0002", 
    "keyword_id_list":[3,4,5] 
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
    "errcode": 0,
    "errmsg": "ok",
    "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc"
    }
    

**返回参数说明：**

  参数          |  说明                       
----------------|-----------------------------
  template_id   |添加至帐号下的模板id，发送小程序模板消息时所需

### 4.获取帐号下已存在的模板列表

**接口地址**

    https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数           |  必填 |  说明                                                                                    
-----------------|-------|------------------------------------------------------------------------------------------
  access_token   |  是   |  接口调用凭证                                                                            
  offset         |  是   |offset和count用于分页，表示从offset开始，拉取count条记录，offset从0开始，count最大为20。最后一页的list长度可能小于请求的count
  count          |  是   |offset和count用于分页，表示从offset开始，拉取count条记录，offset从0开始，count最大为20。最后一页的list长度可能小于请求的count

##### 示例：

    {
    "offset":0,
    "count":1
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
    "errcode": 0,
    "errmsg": "ok",
    "list": [
            {
                "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc",
                "title": "购买成功通知",
                "content": "购买地点{{keyword1.DATA}}\n购买时间{{keyword2.DATA}}\n物品名称{{keyword3.DATA}}\n",
                "example": "购买地点：TIT造舰厂\n购买时间：2016年6月6日\n物品名称：咖啡\n"
            }
        ]
    }
    

**返回参数说明：**

  参数          |  说明                       
----------------|-----------------------------
  list          |  帐号下的模板列表           
  template_id   |添加至帐号下的模板id，发送小程序模板消息时所需
  title         |  模板标题                   
  content       |  模板内容                   
  example       |  模板内容示例               

### 5.删除帐号下的某个模板

**接口地址**

    https://api.weixin.qq.com/cgi-bin/wxopen/template/del?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数           |  必填 |  说明       
-----------------|-------|-------------
  access_token   |  是   | 接口调用凭证
  template_id    |  是   |要删除的模板id

##### 示例：

    {
    "template_id":"wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc"
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
    "errcode": 0,
    "errmsg": "ok"
    }
    

发送模版消息
------

### 1\. 获取 access_token

access\_token 是全局唯一接口调用凭据，开发者调用各接口时都需使用 access\_token，请妥善保存。access\_token 的存储至少要保留512个字符空间。access\_token 的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的 access_token 失效。

公众平台的 API 调用所需的 access_token 的使用及生成方式说明：

1.  为了保密 appsecrect，第三方需要一个 access\_token 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 access\_token 均来自于该中控服务器，不应该各自去刷新，否则会造成 access_token 覆盖而影响业务；
2.  目前 access\_token 的有效期通过返回的 expires\_in 来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新 access\_token。在刷新过程中，中控服务器对外输出的依然是老 access\_token，此时公众平台后台会保证在刷新短时间内，新老 access_token 都可用，这保证了第三方业务的平滑过渡；
3.  access\_token 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 access\_token 的接口，这样便于业务服务器在 API 调用获知 access\_token 已超时的情况下，可以触发 access\_token 的刷新流程。

开发者可以使用 AppID 和 AppSecret 调用本接口来获取 access\_token。AppID 和 AppSecret 可登录微信公众平台官网-设置-开发设置中获得（需要已经绑定成为开发者，且帐号没有异常状态）。AppSecret 生成后请自行保存，因为在公众平台每次生成查看都会导致 AppSecret 被重置。注意调用所有微信接口时均需使用 https 协议。如果第三方不使用中控服务器，而是选择各个业务逻辑点各自去刷新 access\_token，那么就可能会产生冲突，导致服务不稳定。

**接口地址：**

    https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    

**HTTP请求方式:**

    GET
    

**参数说明 :**

  参数         |  必填 |  说明                                   
---------------|-------|-----------------------------------------
  grant_type   |  是   | 获取 access_token 填写 client_credential
  appid        |  是   |  第三方用户唯一凭证                     
  secret       |  是   |  第三方用户唯一凭证密钥，即appsecret    

**返回参数说明：**

正常情况下，微信会返回下述 JSON 数据包给开发者：

    {"access_token": "ACCESS_TOKEN", "expires_in": 7200}
    

  参数           |  说明          
-----------------|----------------
  access_token   |  获取到的凭证  
  expires_in     |凭证有效时间，单位：秒

错误时微信会返回错误码等信息，JSON 数据包示例如下（该示例为 AppID 无效错误）:

    {"errcode": 40013, "errmsg": "invalid appid"}
    

### 发送模板消息

**接口地址：(ACCESS\_TOKEN 需换成上文获取到的 access\_token)**

    https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
    

**HTTP请求方式：**

    POST
    

**POST参数说明：**

  参数               |  必填 |  说明                                                                                                                                                                                  
---------------------|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  touser             |  是   |  接收者（用户）的 openid                                                                                                                                                               
  template_id        |  是   |  所需下发的模板消息的id                                                                                                                                                                
  page               |  否   |  点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。                                                                            
  form_id            |  是   |表单提交场景下，为 submit 事件带上的 [formId](https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html)；支付场景下，为本次支付的 [prepay_id](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html)
  data               |  是   |  模板内容，不填则下发空模板                                                                                                                                                            
  color              |  否   |  模板内容字体的颜色，不填默认黑色                                                                                                                                                      
  emphasis_keyword   |  否   |  模板需要放大的关键词，不填则默认无放大                                                                                                                                                

##### 示例：

    {
      "touser": "OPENID",  
      "template_id": "TEMPLATE_ID", 
      "page": "index",          
      "form_id": "FORMID",         
      "data": {
          "keyword1": {
              "value": "339208499", 
              "color": "#173177"
          }, 
          "keyword2": {
              "value": "2015年01月05日 12:30", 
              "color": "#173177"
          }, 
          "keyword3": {
              "value": "粤海喜来登酒店", 
              "color": "#173177"
          } , 
          "keyword4": {
              "value": "广州市天河区天河路208号", 
              "color": "#173177"
          } 
      },
      "emphasis_keyword": "keyword1.DATA" 
    }
    

**返回码说明：**

在调用模板消息接口后，会返回JSON数据包。

正常时的返回JSON数据包示例：

    {
      "errcode": 0,
      "errmsg": "ok"
    }
    

错误时会返回错误码信息，说明如下：

  返回码  |  说明                           
----------|---------------------------------
  40037   |  template_id不正确              
  41028   |  form_id不正确，或者过期        
  41029   |  form_id已被使用                
  41030   |  page不正确                     
  45009   |接口调用超过限额（目前默认每个帐号日调用限额为100万）

**使用效果：**

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/notice.png?t=201822)

### 下发条件说明

1.  支付
    
    当用户在小程序内完成过支付行为，可允许开发者向用户在7天内推送有限条数的模板消息（1次支付可下发3条，多次支付下发条数独立，互相不影响）
    
2.  提交表单
    
    当用户在小程序内发生过提交[表单](https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html)行为且该表单声明为要发模板消息的，开发者需要向用户提供服务时，可允许开发者向用户在7天内推送有限条数的模板消息（1次提交表单可下发1条，多次提交下发条数独立，相互不影响）
    

审核说明
----

### 1.标题

1.1标题不能存在相同

1.2标题意思不能存在过度相似

1.3标题必须以“提醒”或“通知”结尾

1.4标题不能带特殊符号、个性化字词等没有行业通用性的内容

1.5标题必须能体现具体服务场景

1.6标题不能涉及营销相关内容，包括不限于：

消费优惠类、购物返利类、商品更新类、优惠券类、代金券类、红包类、会员卡类、积分类、活动类等营销倾向通知

### 2.关键词

2.1同一标题下，关键词不能存在相同

2.2同一标题下，关键词不能存在过度相似

2.3关键词不能带特殊符号、个性化字词等没有行业通用性的内容

2.4关键词内容示例必须与关键词对应匹配

2.5关键词不能太过宽泛，需要具有限制性，例如：“内容”这个就太宽泛，不能审核通过

违规说明
----

除不能违反运营规范外，还不能违反以下规则，包括但不限于：

1.  不允许恶意诱导用户进行触发操作，以达到可向用户下发模板目的
2.  不允许恶意骚扰，下发对用户造成骚扰的模板
3.  不允许恶意营销，下发营销目的模板

处罚说明
----

根据违规情况给予相应梯度的处罚，一般处罚规则如下：

第一次违规，删除违规模板以示警告，

第二次违规，封禁接口7天，

第三次违规，封禁接口30天，

第四次违规，永久封禁接口

处罚结果及原因以站内信形式告知

### Bug & Tip

1.  `tip`: 微信6.5.2及以上版本支持模板功能。低于该版本将无法收到模板消息。
