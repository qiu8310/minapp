<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/nearby.html -->

概述
--

附近的小程序API，提供给需快速批量创建附近地点的小程序开发者使用，使用前请先调高附近地点额度。

调高附近地点额度申请方式如下：

下载[《调高地点额度申请表》](https://mp.weixin.qq.com/mpres/zh_CN/htmledition/comm_htmledition/res/entityshop/location_count_apply36df73.xlsx)，填写后发送至 placeofminiprogram@qq.com。

邮件主题为：“帐号名称”申请调高附近地点额度。审核通过后可调高额度。

添加地点
----

### 接口地址：

    https://api.weixin.qq.com/wxa/addnearbypoi?access_token=ACCESS_TOKEN
    

请求方式: POST（请使用https协议）

**获取 access_token 详见[文档](https://mp.weixin.qq.com/wiki?id=mp1421140183)**

### 请求参数说明：

  参数                     |  说明                  |  备注                                       
---------------------------|------------------------|---------------------------------------------
  related_name             |  经营资质主体          |经营资质主体与小程序同主体--不填;   经营资质主体与小程序非同主体--必填;
  related_credential       |  经营资质证件号        |  必填                                       
  related_address          |  经营资质地址          |  必填                                       
  related_proof_material   |相关证明材料照片临时素材mediaid|经营资质主体与小程序同主体--不填;   经营资质主体与小程序非同主体--必填;

**注**： 1.添加请求暂不支持并发调用，建议使用时间隔1s进行串行调用

2.related\_proof\_material通过临时素材上传接口上传，接口地址：

    https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
    

**临时素材\[接口文档\]**([https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726))

POST数据示例：

    {
    
    "related_name":"XXX公司",
    
    "related_credential":"12345678-0",
    
    "related_address":"广州市新港中路397号TIT创意园",
    
    "related_proof_material":"3LaLzqiTrQcD20DlX_o-OV1-nlYMu7sdVAL7SV2PrxVyjZFZZmB3O6LPGaYXlZWq"
    
    }
    

### 返回json示例：

返回参数说明：

  参数                 |  说明      |  备注 
-----------------------|------------|-------
  audit_id             |  审核单ID  |  必填 
  poi_id               | 附近地点ID |  必填 
  related_credential   |经营资质证件号|  必填 

返回内容示例：

    {
      "errcode":0,
      "errmsg":"ok",
      "data":{
        "audit_id":416620525
      }
    }
    

### 错误码说明：

  返回码  |  说明                  
----------|------------------------
  47001   |  POST数据json格式错误  
  20002   |  POST参数非法          
  44002   |  POST数据为空          
  92000   |该经营资质已添加，请勿重复添加
  92002   |附近地点添加数量达到上线，无法继续添加
  92004   |  附近功能被封禁        
  93011   |  个人类型小程序不可用  

### 事件推送

    <xml>
      <ToUserName><![CDATA[gh_4346ac1514d8]]></ToUserName>
      <FromUserName><![CDATA[od1P50M-fNQI5Gcq-trm4a7apsU8]]></FromUserName>
      <CreateTime>1488856741</CreateTime>
      <MsgType><![CDATA[event]]></MsgType>
      <Event><![CDATA[add_nearby_poi_audit_info]]></Event>
      <audit_id>11111</audit_id>
      <status>3</status>
      <reason><![CDATA[xxx]]></reason>
      <poi_id>111111</poi_id>
    </xml>
    

参数说明

  参数       |  说明                       
-------------|-----------------------------
  audit_id   |  审核单id                   
  status     |审核状态（3：审核通过，2：审核失败）
  reason     |如果status为3或者4，会返回审核失败的原因
  poi_id     |  poi_id                     

查看地点列表
------

### 接口地址

    https://api.weixin.qq.com/wxa/getnearbypoilist?page=1&page_rows=20&access_token=ACCESS_TOKEN
    

请求方式: GET（请使用https协议）

### 请求参数说明：

  参数        |  说明              |  备注 
--------------|--------------------|-------
  page        |起始页id（从1开始计数）|  必填 
  page_rows   |每页展示个数（最多1000个）|  必填 

返回参数说明：

  参数                                          |  说明                          |  备注                
------------------------------------------------|--------------------------------|----------------------
  data.left_apply_num                           |  剩余可添加地点个数            |                      
  data.max_apply_num                            |  最大可添加地点个数            |                      
  data.data                                     |  地址列表的json格式字符串      |                      
  data.data.poi_list[i].poi_id                  |  poi_id                        |                      
  data.data.poi_list[i].qualification_address   |  资质证件地址                  |                      
  data.data.poi_list[i].qualification_num       |  资质证件证件号                |                      
  data.data.poi_list[i].audit_status            |地点审核状态（3：审核中，4：审核失败，5：审核通过）|                      
  data.data.poi_list[i].display_status          |地点展示在附近状态（0：未展示，1：展示中）|                      
  data.data.poi_list[i].refuse_reason           |  审核失败原因                  | audit_status=4时返回 

### 返回json示例：

    {
      "errcode":0,
      "errmsg":""，
      "data":
      {
         "left_apply_num" : 9,
         "max_apply_num" : 10,
         "data":
         "{
             "poi_list":
             [
                {
                    "poi_id":"123456",
                    "qualification_address":"广东省广州市海珠区新港中路123号",
                    "qualification_num":"123456789-1",
                    "audit_status":3,
                    "display_status":0,
                    "refuse_reason":""
                }
             ]
         }"
      }
    }
    

### 错误码说明：

 返回码 |  说明   
--------|---------
  -1    | 系统错误

删除地点
----

### 接口地址

    https://api.weixin.qq.com/wxa/delnearbypoi?access_token=ACCESS_TOKEN
    

请求方式: POST（请使用https协议）

### 请求参数说明：

  参数     |  说明     |  备注 
-----------|-----------|-------
  poi_id   | 附近地点ID|  必填 

POST数据示例：

    {
      "poi_id":"469382092"
    }
    

### 返回json示例：

    {
      "errcode":92005,
      "errmsg":"地点正在审核中"
    }
    

### 错误码说明：

  返回码  |  说明         
----------|---------------
  92004   |  近功能被封禁 
  92005   | 地点正在审核中
  92006   |地点正在展示小程序
  93010   |  地点不存在   
  93011   |个人类型小程序不可用

展示/取消展示附近小程序
------------

### 接口地址

    https://api.weixin.qq.com/wxa/setnearbypoishowstatus?access_token=ACCESS_TOKEN
    

请求方式: POST（请使用https协议）

### 请求参数说明

  参数     |  说明          |  备注 
-----------|----------------|-------
  poi_id   |  附近地点ID    |  必填 
  status   |0：取消展示；1：展示|  必填 

POST数据示例：

    {
      "poi_id":"469487775",
      "status":0
    }
    

### 返回json示例：

    {
      "errcode":92008,
      "errmsg":"小程序未展示在该地点"
    }
    

### 错误码说明：

  返回码  |  说明          
----------|----------------
  92003   |地点已被其它小程序占用
  92004   | 附近功能被封禁 
  92005   | 地点正在审核中 
  92007   |  地点审核失败  
  92008   |程序未展示在该地点
  93009   |小程序未上架或不可见
  93010   |  地点不存在    
  93011   |个人类型小程序不可用
