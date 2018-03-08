/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

export class Location {
  public pathname: string
  public query: {[key: string]: string}

  constructor() {
    let pages = getCurrentPages()
    let page = pages[pages.length - 1]
    this.pathname = page.route
    this.query = page.options || {}
  }
}

