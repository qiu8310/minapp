/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

function blogUrl() {
  return siteConfig.baseUrl + 'blog';
}

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          `Learn more using the [documentation on this site.](${docUrl('guide-install.html')})`,
        title: '查看文档',
      },
      {
        content: 'Ask questions about the documentation and project',
        title: '寻求社区的帮助',
      },
      {
        content: `Find out what's new with this project in [blog](${blogUrl()}).`,
        title: '查看最新博客',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>需要帮助？</h2>
            </header>

            <GridBlock contents={supportLinks} layout="threeColumn" />
            <br/>
            <br/>
            <h2>如果还是无法解决你的问题</h2>
            <p>
              可以给我发邮件：<a href="mailto:qiuzhongleiabc@126.com">qiuzhongleiabc@126.com</a>
            </p>
            <p>或者加我微信： <br/><img width="200" src="//n1image.hjfile.cn/res7/2018/03/03/2bdec398b2c2b9d291140127b00786d5.jpeg"/></p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
