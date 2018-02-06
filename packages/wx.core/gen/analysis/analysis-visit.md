<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis-visit.html -->

### 访问分析

获取小程序访问分析数据，数据说明参见[访问分析](https://mp.weixin.qq.com/debug/wxadoc/analysis/regular/?t=201822#%E8%AE%BF%E9%97%AE%E5%88%86%E6%9E%90)

#### 访问趋势

##### 日趋势

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=ACCESS_TOKEN
    

**POST 参数说明**

  参数         | 是否必填|  说明                                
---------------|---------|--------------------------------------
  begin_date   |  是     |  开始日期                            
  end_date     |  是     |结束日期，限定查询1天数据，end_date允许设置的最大值为昨日

**POST 内容示例：**

    {
      "begin_date" : "20170313",
      "end_date" : "20170313"
    }
    

**返回参数说明：**

  参数                |  说明                
----------------------|----------------------
  ref_date            |时间： 如： "20170313"
  session_cnt         |  打开次数            
  visit_pv            |  访问次数            
  visit_uv            |  访问人数            
  visit_uv_new        |  新用户数            
  stay_time_uv        |人均停留时长 (浮点型，单位：秒)
  stay_time_session   |次均停留时长 (浮点型，单位：秒)
  visit_depth         | 平均访问深度 (浮点型)

**返回数据示例：**

    {
      "list": [
        {
          "ref_date": "20170313",
          "session_cnt": 142549,
          "visit_pv": 472351,
          "visit_uv": 55500,
          "visit_uv_new": 5464,
          "stay_time_session": 0,
          "visit_depth": 1.9838
        }
      ]
    }
    

##### 周趋势

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidweeklyvisittrend?access_token=ACCESS_TOKEN
    

**POST 参数说明:**

  参数         | 是否必填|  说明                  
---------------|---------|------------------------
  begin_date   |  是     |  开始日期，为周一日期  
  end_date     |  是     |结束日期，为周日日期，限定查询一周数据

**注意：请求json和返回json与天的一致，这里限定查询一个自然周的数据，时间必须按照自然周的方式输入： 如：20170306(周一), 20170312(周日)**

**POST 内容示例：**

    {
    "begin_date":"20170306",
    "end_date":"20170312"
    }
    

**返回参数说明：**

  参数                |  说明                       
----------------------|-----------------------------
  ref_date            |时间，如："20170306-20170312"
  session_cnt         |  打开次数（自然周内汇总）   
  visit_pv            |  访问次数（自然周内汇总）   
  visit_uv            |  访问人数（自然周内去重）   
  visit_uv_new        |  新用户数（自然周内去重）   
  stay_time_uv        |人均停留时长 (浮点型，单位：秒)
  stay_time_session   |次均停留时长 (浮点型，单位：秒)
  visit_depth         |  平均访问深度 (浮点型)      

**返回内容示例：**

    {
      "list": [
        {
          "ref_date": "20170306-20170312",
          "session_cnt": 986780,
          "visit_pv": 3251840,
          "visit_uv": 189405,
          "visit_uv_new": 45592,
          "stay_time_session": 54.5346,
          "visit_depth": 1.9735
        }
      ]
    }
    

##### 月趋势

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidmonthlyvisittrend?access_token=ACCESS_TOKEN
    

**POST 参数说明：**

  参数         | 是否必填|  说明                      
---------------|---------|----------------------------
  begin_date   |  是     |  开始日期，为自然月第一天  
  end_date     |  是     |结束日期，为自然月最后一天，限定查询一个月数据

**注意：请求json和返回json与天的一致，这里限定查询一个自然月的数据，时间必须按照自然月的方式输入： 如：20170201(月初), 20170228(月末)**

**POST 内容示例：**

    {
    "begin_date":"20170201",
    "end_date":"20170228"
    }
    

**返回参数说明：**

  参数                |  说明                
----------------------|----------------------
  ref_date            |  时间，如："201702"  
  session_cnt         |打开次数（自然月内汇总）
  visit_pv            |访问次数（自然月内汇总）
  visit_uv            |访问人数（自然月内去重）
  visit_uv_new        |新用户数（自然月内去重）
  stay_time_uv        |人均停留时长 (浮点型，单位：秒)
  stay_time_session   |次均停留时长 (浮点型，单位：秒)
  visit_depth         | 平均访问深度 (浮点型)

**返回内容示例：**

    {
      "list": [
        {
          "ref_date": "201702",
          "session_cnt": 126513,
          "visit_pv": 426113,
          "visit_uv": 48659,
          "visit_uv_new": 6726,
          "stay_time_session": 56.4112,
          "visit_depth": 2.0189
        }
      ]
    }
    

#### 访问分布

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidvisitdistribution?access_token=ACCESS_TOKEN
    

**POST 参数说明：**

  参数         | 是否必填|  说明                                
---------------|---------|--------------------------------------
  begin_date   |  是     |  开始日期                            
  end_date     |  是     |结束日期，限定查询1天数据，end_date允许设置的最大值为昨日

**POST 内容示例：**

    {
    "begin_date":"20170313",
    "end_date":"20170313"
    }
    

**返回参数说明：**

  参数       |  说明                
-------------|----------------------
  ref_date   |时间： 如： "20170313"
  list       |存入所有类型的指标情况

**list 的每一项包括：**

  参数        |  说明     
--------------|-----------
  index       |  分布类型 
  item_list   |分布数据列表

**分布类型（index）的取值范围：**

  值                          |  说明      
------------------------------|------------
  access_source_session_cnt   |访问来源分布
  access_staytime_info        |访问时长分布
  access_depth_info           |访问深度的分布

**每个数据项包括：**

  参数                   |  说明    
-------------------------|----------
  key                    |  场景 id 
value   场景下的值（均为整数型）|          

**key对应关系如下：**

访问来源：(index="access\_source\_session_cnt")

> 1：小程序历史列表
> 
> 2：搜索
> 
> 3：会话
> 
> 4：二维码
> 
> 5：公众号主页
> 
> 6：聊天顶部
> 
> 7：系统桌面
> 
> 8：小程序主页
> 
> 9：附近的小程序
> 
> 10：其他
> 
> 11：模板消息
> 
> 12：客服消息
> 
> 13: 公众号菜单
> 
> 14: APP分享
> 
> 15: 支付完成页
> 
> 16: 长按识别二维码
> 
> 17: 相册选取二维码
> 
> 18: 公众号文章
> 
> 19：钱包
> 
> 20：卡包
> 
> 21：小程序内卡券
> 
> 22：其他小程序
> 
> 23：其他小程序返回
> 
> 24：卡券适用门店列表
> 
> 25：搜索框快捷入口
> 
> 26：小程序客服消息
> 
> 27：公众号下发
> 
> 28: 会话左下角菜单
> 
> 29: 小程序任务栏

访问时长：(index="access\_staytime\_info")

> 1: 0-2s
> 
> 2: 3-5s
> 
> 3: 6-10s
> 
> 4: 11-20s
> 
> 5: 20-30s
> 
> 6: 30-50s
> 
> 7: 50-100s
> 
> 8: > 100s

平均访问深度：(index="access\_depth\_info")

> 1: 1页
> 
> 2: 2页
> 
> 3: 3页
> 
> 4: 4页
> 
> 5: 5页
> 
> 6: 6-10页
> 
> 7: >10页

**返回数据示例：**

    {
      "ref_date": "20170313",
      "list": [
        {
          "index": "access_source_session_cnt",
          "item_list": [
            {
              "key": 10,
              "value": 5
            },
            {
              "key": 8,
              "value": 687
            },
            {
              "key": 7,
              "value": 10740
            },
            {
              "key": 6,
              "value": 1961
            },
            {
              "key": 5,
              "value": 677
            },
            {
              "key": 4,
              "value": 653
            },
            {
              "key": 3,
              "value": 1120
            },
            {
              "key": 2,
              "value": 10243
            },
            {
              "key": 1,
              "value": 116578
            }
          ]
        },
        {
          "index": "access_staytime_info",
          "item_list": [
            {
              "key": 8,
              "value": 16329
            },
            {
              "key": 7,
              "value": 19322
            },
            {
              "key": 6,
              "value": 21832
            },
            {
              "key": 5,
              "value": 19539
            },
            {
              "key": 4,
              "value": 29670
            },
            {
              "key": 3,
              "value": 19667
            },
            {
              "key": 2,
              "value": 11794
            },
            {
              "key": 1,
              "value": 4511
            }
          ]
        },
        {
          "index": "access_depth_info",
          "item_list": [
            {
              "key": 5,
              "value": 217
            },
            {
              "key": 4,
              "value": 3259
            },
            {
              "key": 3,
              "value": 32445
            },
            {
              "key": 2,
              "value": 63542
            },
            {
              "key": 1,
              "value": 43201
            }
          ]
        }
      ]
    }
    

#### 访问留存

##### 日留存

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappiddailyretaininfo?access_token=ACCESS_TOKEN
    

**POST 参数说明:**

  参数         | 是否必填|  说明                                
---------------|---------|--------------------------------------
  begin_date   |  是     |  开始日期                            
  end_date     |  是     |结束日期，限定查询1天数据，end_date允许设置的最大值为昨日

**POST 内容示例：**

    {
      "begin_date" : "20170313",
      "end_date" : "20170313"
    }
    

**返回参数说明：**

  参数           |  说明     
-----------------|-----------
  visit_uv_new   |新增用户留存
  visit_uv       |活跃用户留存

**visit\_uv、visit\_uv_new 的每一项包括:**

  参数    |  说明                                                      
----------|------------------------------------------------------------
  key     |标识，0开始，0表示当天，1表示1天后，依此类推，key取值分别是：0,1,2,3,4,5,6,7,14,30
  value   |key对应日期的新增用户数/活跃用户数（key=0时）或留存用户数（k>0时）

**返回数据示例：**

    {
      "ref_date": "20170313",
      "visit_uv_new": [
        {
          "key": 0,
          "value": 5464
        }
      ],
      "visit_uv": [
        {
          "key": 0,
          "value": 55500
        }
      ]
    }
    

##### 周留存

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidweeklyretaininfo?access_token=ACCESS_TOKEN
    

**POST 参数说明：**

  参数         | 是否必填|  说明                  
---------------|---------|------------------------
  begin_date   |  是     |  开始日期，为周一日期  
  end_date     |  是     |结束日期，为周日日期，限定查询一周数据

**注意：请求json和返回json与天的一致，这里限定查询一个自然周的数据，时间必须按照自然周的方式输入： 如：20170306(周一), 20170312(周日)**

**POST 内容示例：**

    {
      "begin_date" : "20170306",
      "end_date" : "20170312"
    }
    

**返回参数说明：**

  参数           |  说明                       
-----------------|-----------------------------
  ref_date       |时间，如："20170306-20170312"
  visit_uv_new   |  新增用户留存               
  visit_uv       |  活跃用户留存               

**visit\_uv、visit\_uv_new 的每一项包括:**

  参数    |  说明                                          
----------|------------------------------------------------
  key     |标识，0开始，0表示当周，1表示1周后，依此类推，key取值分别是：0,1,2,3,4
  value   |key对应日期的新增用户数/活跃用户数（key=0时）或留存用户数（k>0时）

**返回内容示例：**

    {
      "ref_date": "20170306-20170312",
      "visit_uv_new": [
        {
          "key": 0,
          "value": 0
        },
        {
          "key": 1,
          "value": 16853
        }
      ],
      "visit_uv": [
        {
          "key": 0,
          "value": 0
        },
        {
          "key": 1,
          "value": 99310
        }
      ]
    }
    

##### 月留存

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidmonthlyretaininfo?access_token=ACCESS_TOKEN
    

**POST 参数说明：**

  参数         | 是否必填|  说明                      
---------------|---------|----------------------------
  begin_date   |  是     |  开始日期，为自然月第一天  
  end_date     |  是     |结束日期，为自然月最后一天，限定查询一个月数据

**注意：请求json和返回json与天的一致，这里限定查询一个自然月的数据，时间必须按照自然月的方式输入： 如：20170201(月初), 20170228(月末)**

**POST 内容示例：**

    {
      "begin_date":"20170201",
      "end_date":"20170228"
    }
    

**返回参数说明：**

  参数           |  说明            
-----------------|------------------
  ref_date       |时间，如："201702"
  visit_uv_new   |  新增用户留存    
  visit_uv       |  活跃用户留存    

**visit\_uv、visit\_uv_new 的每一项包括:**

  参数    |  说明                                      
----------|--------------------------------------------
  key     |标识，0开始，0表示当月，1表示1月后，key取值分别是：0,1
  value   |key对应日期的新增用户数/活跃用户数（key=0时）或留存用户数（k>0时）

**返回内容示例：**

    {
      "ref_date": "201702",
      "visit_uv_new": [
        {
          "key": 0,
          "value": 346249
        }
      ],
      "visit_uv": [
        {
          "key": 0,
          "value": 346249
        }
      ]
    }
    

#### 访问页面

##### 访问页面

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappidvisitpage?access_token=ACCESS_TOKEN
    

**POST 参数说明：**

  参数         | 是否必填|  说明                                
---------------|---------|--------------------------------------
  begin_date   |  是     |  开始日期                            
  end_date     |  是     |结束日期，限定查询1天数据，end_date允许设置的最大值为昨日

**POST 内容示例：**

    {
      "begin_date":"20170313",
      "end_date":"20170313"
    }
    

**返回参数说明：**

  参数               |  说明     
---------------------|-----------
  page_path          |  页面路径 
  page_visit_pv      |  访问次数 
  page_visit_uv      |  访问人数 
  page_staytime_pv   |次均停留时长
  entrypage_pv       | 进入页次数
  exitpage_pv        | 退出页次数
  page_share_pv      |  转发次数 
  page_share_uv      |  转发人数 

**返回内容示例：**

    {
      "ref_date": "20170313",
      "list": [
        {
          "page_path": "pages/main/main.html",
          "page_visit_pv": 213429,
          "page_visit_uv": 55423,
          "page_staytime_pv": 8.139198,
          "entrypage_pv": 117922,
          "exitpage_pv": 61304,
          "page_share_pv": 180,
          "page_share_uv": 166
        },
        {
          "page_path": "pages/linedetail/linedetail.html",
          "page_visit_pv": 155030,
          "page_visit_uv": 42195,
          "page_staytime_pv": 35.462395,
          "entrypage_pv": 21101,
          "exitpage_pv": 47051,
          "page_share_pv": 47,
          "page_share_uv": 42
        },
        {
          "page_path": "pages/search/search.html",
          "page_visit_pv": 65011,
          "page_visit_uv": 24716,
          "page_staytime_pv": 6.889634,
          "entrypage_pv": 1811,
          "exitpage_pv": 3198,
          "page_share_pv": 0,
          "page_share_uv": 0
        },
        {
          "page_path": "pages/stationdetail/stationdetail.html",
          "page_visit_pv": 29953,
          "page_visit_uv": 9695,
          "page_staytime_pv": 7.558508,
          "entrypage_pv": 1386,
          "exitpage_pv": 2285,
          "page_share_pv": 0,
          "page_share_uv": 0
        },
        {
          "page_path": "pages/switch-city/switch-city.html",
          "page_visit_pv": 8928,
          "page_visit_uv": 4017,
          "page_staytime_pv": 9.22659,
          "entrypage_pv": 748,
          "exitpage_pv": 1613,
          "page_share_pv": 0,
          "page_share_uv": 0
        }
      ]
    }
    

**返回参数说明：**

  参数               |  说明     
---------------------|-----------
  page_path          |  页面路径 
  page_visit_pv      |  访问次数 
  page_visit_uv      |  访问人数 
  page_staytime_pv   |次均停留时长
  entrypage_pv       | 进入页次数
  exitpage_pv        | 退出页次数
  page_share_pv      |  转发次数 
  page_share_uv      |  转发人数 

**注意：目前只提供按 page\_visit\_pv 排序的 top200**
