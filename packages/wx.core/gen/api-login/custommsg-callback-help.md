<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/callback_help.html -->

### 接入概述

接入微信小程序消息服务，开发者需要按照如下步骤完成：

1、填写服务器配置

2、验证服务器地址的有效性

3、依据接口文档实现业务逻辑

下面详细介绍这3个步骤。

#### 第一步：填写服务器配置

登录微信小程序官网后，在小程序官网的“设置-消息服务器”页面，管理员扫码启用消息服务，填写服务器地址（URL）、Token 和 EncodingAESKey。

URL是开发者用来接收微信消息和事件的接口URL。 Token可由开发者可以任意填写，用作生成签名（该Token会和接口URL中包含的Token进行比对，从而验证安全性）。 EncodingAESKey由开发者手动填写或随机生成，将用作消息体加解密密钥。

同时，开发者可选择消息加解密方式：明文模式、兼容模式和安全模式。可以选择消息数据格式：XML格式或JSON格式。加密方式的默认状态是明文格式，而数据格式的默认状态是XML格式。

模式的选择与服务器配置在提交后都会立即生效，请开发者谨慎填写及选择。切换加密方式和数据格式需要提前配置好相关代码，详情请参考[消息加解密说明](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318479&token=&lang=zh_CN)。

![填写服务器配置](https://mp.weixin.qq.com/debug/wxadoc/dev/image/callback_help.png?t=201822)

#### 第二步：验证消息的确来自微信服务器

开发者提交信息后，微信服务器将发送GET请求到填写的服务器地址URL上，GET请求携带参数如下表所示：

  参数        |  描述                                                        
--------------|--------------------------------------------------------------
  signature   |微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
  timestamp   |  时间戳                                                      
  nonce       |  随机数                                                      
  echostr     |  随机字符串                                                  

开发者通过检验signature对请求进行校验（下面有校验方式）。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。加密/校验流程如下： 1、将token、timestamp、nonce三个参数进行字典序排序 2、将三个参数字符串拼接成一个字符串进行sha1加密 3、开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

检验signature的PHP示例代码：

    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
    
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );
    
        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
    

PHP示例代码下载：[下载](https://wximg.gtimg.com/shake_tv/mpwiki/cryptoDemo.zip)

#### 第三步：依据接口文档实现业务逻辑

验证URL有效性成功后即接入生效，成为开发者。至此用户向小程序客服发送消息、或者进入会话等情况时，开发者填写的服务器配置URL将得到微信服务器推送过来的消息和事件，开发者可以依据自身业务逻辑进行响应。

另请注意，开发者所填写的URL必须以 http:// 或 https:// 开头，分别支持80端口和443端口。
