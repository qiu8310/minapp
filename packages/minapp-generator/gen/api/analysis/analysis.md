<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis.html -->

数据分析接口
------

开发者通过数据分析接口，可获取到小程序的各项数据指标，便于进行数据存储和整理。数据分析详细功能介绍及指标解释参见[数据分析文档](https://mp.weixin.qq.com/debug/wxadoc/analysis/?t=201838)。

### 概况

用户访问小程序的详细数据可从访问分析中获取，概况中提供累计用户数等部分指标数据。

#### 概况趋势

接口地址

    https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=ACCESS_TOKEN
    

获取 access_token 详见[文档](https://mp.weixin.qq.com/wiki?id=mp1421140183)

**POST 请求参数说明：**

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

  参数          |  说明    
----------------|----------
  visit_total   |累计用户数
  share_pv      | 转发次数 
  share_uv      | 转发人数 

**返回数据示例：**

    {
      "list": [
        {
          "ref_date": "20170313",
          "visit_total": 391,
          "share_pv": 572,
          "share_uv": 383
        }
      ]
    }
