<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis-user.html -->

### 用户画像

获取小程序新增或活跃用户的画像分布数据。时间范围支持昨天、最近7天、最近30天。其中，新增用户数为时间范围内首次访问小程序的去重用户数，活跃用户数为时间范围内访问过小程序的去重用户数。画像属性包括用户年龄、性别、省份、城市、终端类型、机型。

接口地址： [https://api.weixin.qq.com/datacube/getweanalysisappiduserportrait?access\_token=ACCESS\_TOKEN](https://api.weixin.qq.com/datacube/getweanalysisappiduserportrait?access_token=ACCESS_TOKEN)

**POST 请求参数说明：**

  参数         | 是否必填|  说明                                                                 
---------------|---------|-----------------------------------------------------------------------
  begin_date   |  是     |  开始日期                                                             
  end_date     |  是     |结束日期，开始日期与结束日期相差的天数限定为0/6/29，分别表示查询最近1/7/30天数据，end_date允许设置的最大值为昨日

**POST 内容示例：**

    {
        "begin_date" : "2017-06-11",
        "end_date" : "2017-06-17"
    }
    

**返回参数说明：**

每次请求返回选定的时间范围及以下指标项：

  参数           |  说明                          
-----------------|--------------------------------
  ref_date       |时间范围,如： "20170611-20170617"
  visit_uv_new   |  新用户                        
  visit_uv       |  活跃用户                      

每个指标项下包括的属性：

  参数        |  说明                        
--------------|------------------------------
  province    |  省份，如北京、广东等        
  city        |  城市，如北京、广州等        
  genders     |  性别，包括男、女、未知      
  platforms   |终端类型，包括iPhone, android,其他
  devices     |机型，如苹果iPhone6, OPPO R9等
  ages        |年龄，包括17岁以下、18-24岁等区间

每个属性下包括的数据项：

  参数    |  说明                                                             
----------|-------------------------------------------------------------------
  id      |  属性值id                                                         
  name    |属性值名称，与id一一对应。如属性为province时，返回的属性值名称包括“广东”等
  value   |属性值对应的指标值，如指标为visit_uv,属性为province,属性值为"广东省”，value对应广东地区的活跃用户数

**返回数据示例：**

    {
      "ref_date": "20170611",
      "visit_uv_new": {
        "province": [
          {
            "id": 31,
            "name": "广东省",
            "value": 215
          }
        ],
        "city": [
         {
            "id": 3102,
            "name": "广州",
            "value": 78
          }
        ],
        "genders": [
          {
            "id": 1,
            "name": "男",
            "value": 2146
          }
        ],
        "platforms": [
          {
            "id": 1,
            "name": "iPhone",
            "value": 27642
          }
        ],
        "devices": [
          {
            "name": "OPPO R9",
            "value": 61
          }
        ],
        "ages": [
          {
            "id": 1,
            "name": "17岁以下",
            "value": 151
          }
        ]
      },
      "visit_uv": {
        "province": [
          {
            "id": 31,
            "name": "广东省",
            "value": 1341
          }
        ],
        "city": [
         {
            "id": 3102,
            "name": "广州",
            "value": 234
          }
        ],
        "genders": [
          {
            "id": 1,
            "name": "男",
            "value": 14534
          }
        ],
        "platforms": [
          {
            "id": 1,
            "name": "iPhone",
            "value": 21750
          }
        ],
        "devices": [
          {
            "name": "OPPO R9",
            "value": 617
          }
        ],
        "ages": [
          {
            "id": 1,
            "name": "17岁以下",
            "value": 3156
          }
        ]
      }
    }
    

注：

1.  由于部分用户属性数据缺失，属性值可能出现 “未知”。
2.  机型数据无 id 字段，暂只提供用户数最多的 top20。
