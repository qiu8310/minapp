<!-- https://developers.weixin.qq.com/miniprogram/dev/api/custommsg/typing.html -->

### 客服输入状态

开发者可通过调用“客服输入状态接口”，返回客服当前输入状态给用户。

1.  此接口需要客服消息接口权限。
2.  如果不满足发送客服消息的触发条件，则无法下发输入状态。
3.  下发输入状态，需要客服之前30秒内跟用户有过消息交互。
4.  在输入状态中（持续15s），不可重复下发输入态。
5.  在输入状态中，如果向用户下发消息，会同时取消输入状态。

接口调用请求说明

    http请求方式: POST
    https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=ACCESS_TOKEN
    

JSON数据包如下：

    {
        "touser":"OPENID",
        "command":"Typing"
    }
    

预期返回：

    {
        "errcode":0,
        "errmsg":"ok"
    }
    

##### 参数说明

  参数           | 是否必须|  说明                                                   
-----------------|---------|---------------------------------------------------------
  access_token   |  是     |  调用接口凭证                                           
  touser         |  是     |  普通用户(openid)                                       
  command        |  是     |"Typing"：对用户下发“正在输入"状态；"CancelTyping"：取消对用户的”正在输入"状态

##### 返回码说明

  参数    |  说明                       
----------|-----------------------------
  45072   |  command字段取值不对        
  45080   |下发输入状态，需要之前30秒内跟用户有过消息交互
  45081   | 已经在输入状态，不可重复下发
