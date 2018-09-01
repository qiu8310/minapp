/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {kebabCase} from '../base'

/**
 * 抓取微信文档首页（ https://mp.weixin.qq.com/debug/wxadoc/dev/api/ ）可以得到下面这样的结构，
 * 使用 Node 来将它转化成树状结构
 *
 * 1.4.1        api-network.html       网络
 * 1.4.1.1      network-request.html   发起请求
 * 1.4.1.1.1    network-request.html   wx.request
 * 1.4.1.2      network-file.html      上传、下载
 * 1.4.1.2.1    network-file.html      wx.uploadFile
 * 1.4.1.2.2    network-file.html      wx.downloadFile
 * 1.4.1.3      network-socket.html    WebSocket
 * 1.4.1.3.1    network-socket.html    wx.connectSocket
 * 1.4.1.3.2    network-socket.html    wx.onSocketOpen
 * 1.4.1.3.3    network-socket.html    wx.onSocketError
 * 1.4.1.3.4    network-socket.html    wx.sendSocketMessage
 * 1.4.1.3.5    network-socket.html    wx.onSocketMessage
 * 1.4.1.3.6    network-socket.html    wx.closeSocket
 * 1.4.1.3.7    network-socket.html    wx.onSocketClose
 * 1.4.1.3.8    socket-task.html       SocketTask
 * 1.4.2        media-picture.html     媒体
 * 1.4.2.1      media-picture.html     图片
 * 1.4.2.1.1    media-picture.html     wx.chooseImage
 * 1.4.2.1.2    media-picture.html     wx.previewImage
 * 1.4.2.1.3    media-picture.html     wx.getImageInfo
 * 1.4.2.1.4    media-picture.html     wx.saveImageToPhotosAlbum
 * 1.4.2.2      media-record.html      录音
 */
export class Node {
  /**
   * 最近一次创建的节点，方便下一个节点找到和之前创建节点的关系
   */
  static prevNode: Node

  /**
   * 所有子节点
   */
  children: Node[] = []

  /**
   * 父节点，如果是 root 节点，则此字段为空
   */
  parent?: Node

  constructor(public level: string, public file: string, public name: string, isCreateRoot?: boolean) {
    if (!isCreateRoot) {
      if (!level || !file || !name) throw new Error(`level: <${level}>; file: <${file}>; name: <${name}> 字段都不能为空`)
      let node = Node.prevNode
      while (!node.isParentOf(this)) node = node.parent as Node
      this.parent = node
      node.children.push(this)
    }

    this.file = file.replace(/^\.\//, '')
    Node.prevNode = this
  }

  get normilizedFile() {
    return kebabCase(this.file.replace(/\.\w+$/, ''))
  }

  get isCanvas() {
    return this.file.startsWith('canvas/')
  }

  /**
   * 是否是根节点
   */
  get isRootNode() {
    return this.parent == null
  }

  /**
   * 是否是叶子节点
   */
  get isLeafNode() {
    return this.children.length === 0
  }

  /**
   * 获取所有叶子节点（要去重，file 字段一样的会忽略 ）
   */
  get leafNodes() {
    let all: Node[] = []
    let fileMap: any = {}
    let run = (node: Node) => {
      if (node.isLeafNode && !fileMap[node.file]) {
        all.push(node)
        fileMap[node.file] = true
      } else {
        node.children.forEach(run)
      }
    }
    run(this)
    return all
  }

  /**
   * 获取当前节点的顶级的非 root 节点的节点
   */
  get topNode() {
    let node = this as Node
    if (node.isRootNode) throw new Error('root 节点无法获取 topNode')
    while (!(node.parent as Node).isRootNode) node = node.parent as Node
    return node
  }

  /**
   * 当前节点是不是 node 的父节点
   */
  isParentOf(node: Node): boolean {
    return this.isRootNode || node.level.indexOf(this.level + '.') === 0
  }
}

export const rootNode = new Node('', '', '', true)
