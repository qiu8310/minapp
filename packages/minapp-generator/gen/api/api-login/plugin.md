<!-- https://developers.weixin.qq.com/miniprogram/dev/api/plugin.html -->

插件管理
====

小程序开发者可通过以下接口管理插件，包括：添加、删除、查询已添加的插件。插件开发者也可调用接口管理插件使用申请。

1.申请使用插件
--------

此接口用于小程序向插件开发者发起使用插件的申请。

**请求方式: POST（请使用https协议）**

[https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN](https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN)

POST数据示例

    {
      "action":"apply",
      "plugin_appid":"aaaa",
    }
    

**参数说明**

  参数           |  说明      
-----------------|------------
  action         |  填写apply 
  plugin_appid   |  插件appid 

**返回说明**

    {
      "errcode":0,
      "errmsg":"ok",
    }
    

**参数说明**

  参数      |  说明   
------------|---------
  errcode   |  错误码 
  errmsg    | 错误信息

**错误码说明**

  错误码  |  说明             
----------|-------------------
  0       |  成功             
  -1      |  系统错误         
  89236   |  该插件不能申请   
  89237   |  已经添加该插件   
  89238   |申请或使用的插件已经达到上限
  89239   |  该插件不存在     

2.查询已添加的插件
----------

**请求方式: POST（请使用https协议）**

[https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN](https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN)

POST数据示例：

    {
      "action":"list",
    }
    

**参数说明**

  参数     |  说明     
-----------|-----------
  action   |  填写list 

**返回说明（正常时返回的json示例）**

    {
      "errcode":0,
      "errmsg":"ok",
      "plugin_list":[
      "appid":"aaaa",
      "status":1,
      "nickname":"插件昵称",
      "headimgurl":"http://plugin.qq.com",
      ],
    }
    

**参数说明**

  参数          |  说明                             
----------------|-----------------------------------
  errcode       |  错误码                           
  errmsg        |  错误信息                         
  plugin_list   |  申请或使用中的插件列表           
  appid         |  插件appid                        
  status        |插件状态（1：申请中，2：申请通过，3：已拒绝，4：已超时）
  nickname      |  插件昵称                         
  headimgurl    |  插件头像                         

**错误码说明**

  错误码  |  说明           
----------|-----------------
  0       |  成功           
  -1      |  系统错误       
  89243   |“待确认”的申请不可删除
  89044   |不存在该插件appid

3.删除已添加的插件
----------

**请求方式: POST（请使用https协议）**

[https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN](https://api.weixin.qq.com/wxa/plugin?access_token=TOKEN)

**POST数据示例**

    {
      "action":"unbind"
      "plugin_appid":"aaaa"
    }
    

**参数说明**

  参数           |  说明      
-----------------|------------
  action         |  填写list  
  plugin_appid   |  插件appid 

**返回说明（正常时返回的json示例）**

    {
      "errcode":0,
      "errmsg":"ok",
    }
    

**错误码说明**

 错误码 |  说明   
--------|---------
  0     |  成功   
  -1    | 系统错误

4.获取当前所有插件使用方（供插件开发者调用）
-----------------------

**请求方式: POST（请使用https协议）**

[https://api.weixin.qq.com/wxa/devplugin?access_token=TOKEN](https://api.weixin.qq.com/wxa/devplugin?access_token=TOKEN)

**POST数据示例**

    {
      "action":"dev_apply_list"
      "page":1
      "num":10
    }
    

**参数说明**

  参数        |  说明                                         
--------------|-----------------------------------------------
  action      |  填写dev_apply_list                           
  page, num   |page  page和num用于分页，表示每页num条记录，拉取第page页的数据。

**返回说明（正常时返回的json示例）**

    {
      "errcode":0,
      "errmsg":"ok",
      "apply_list":[
      "appid":"aaaa",
      "status":1,
      "nickname":"小程序昵称",
      "headimgurl":"http://weixin.qq.com",
      ],
    }
    

**参数说明**

  参数         |  说明                            
---------------|----------------------------------
  apply_list   |  申请或使用中的插件列表          
  appid        |  使用者的appid                   
  status       |插件状态（1：申请中，2：申请通过，3：拒绝；4.已超时）
  nickname     |  使用者的昵称                    
  headimgurl   |  使用者的昵称                    

**错误码说明**

 错误码 |  说明   
--------|---------
  0     |  成功   
  -1    | 系统错误

5.修改插件使用申请的状态（供插件开发者调用）
-----------------------

**请求方式: POST（请使用https协议）**

[https://api.weixin.qq.com/wxa/devplugin?access_token=TOKEN](https://api.weixin.qq.com/wxa/devplugin?access_token=TOKEN)

**POST数据示例**

    {
      "action":"dev_agree"  （或dev_refuse、dev_delete）
    }
    

**参数说明**

  参数     |  说明                                                  
-----------|--------------------------------------------------------
  action   |dev_agree：同意申请；dev_refuse：拒绝申请；dev_delete：删除已拒绝的申请者
  appid    |  使用者的appid                                         

**返回说明（正常时返回的json示例）**

    {
      "errcode":0,
      "errmsg":"ok",
    }
    

**错误码说明**

  错误码  |  说明                          
----------|--------------------------------
  0       |  成功                          
  -1      |  系统错误                      
  89240   |无法进行此操作，只有“待确认”的申请可操作通过/拒绝
  89241   |无法进行此操作，只有“已拒绝/已超时”的申请可操作删除
  89242   |  该appid不在申请列表内         
