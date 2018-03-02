/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

    return (
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>谁在使用这个项目？</h1>
              <p>下面这些人或组织在使用此项目</p>
            </div>
            <div className="logos">{showcase}</div>
            <p>你在用这个项目吗？</p>
            <a
              href="https://github.com/qiu8310/minapp/edit/master/website/siteConfig.js"
              className="button">
              快来添加
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
