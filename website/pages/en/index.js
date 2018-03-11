/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('minapp-transparent.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href="https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-core-ts">TS 示例项目</Button>
            <Button href="https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-core-js">JS 示例项目</Button>
            <Button href="https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-mobx-ts">MOBX 示例项目</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const tryItOut = `
<div style="text-align: left;">
  <code>npm install -g @minapp/cli</code>
  <br/><br/>
  <code>minapp init projectDir</code>
  <br/><br/>
  建议 vscode 用户安装两个插件
  <a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode">minapp</a>
  和 <a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode">dot-template</a>
  以获取更好的编码体验
</div>
`

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'ts/js/wxml/json/css 所有语言在 vscode 中都能自动补全，让你轻松上手小程序开发',
        image: imgUrl('feature-complete.svg'),
        imageAlign: 'top',
        title: '所有语言都能自动补全',
      },
      {
        content: '可以将原生的小程序代码直接移入 minapp 环境，完全兼容',
        image: imgUrl('minapp.svg'),
        imageAlign: 'top',
        title: '兼容原生小程序代码',
      },
      {
        content: '所有的 App/Page/Component 都基于 class 开发，集成 mobx，轻松管理全局数据对象',
        image: imgUrl('feature-js.svg'),
        imageAlign: 'top',
        title: '最时尚的开发模式',
      },
      {
        content: '采用 webpack 构建，集成 webpack-dev-server，给你一个开发 web 应用一样的体验',
        image: imgUrl('feature-webpack.svg'),
        imageAlign: 'top',
        title: '简化开发与部署的流程',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try" background="light">
    {[
      {
        content: tryItOut,
        image: 'https://n1image.hjfile.cn/res7/2018/03/11/4d83fcb9e0a1d94c749911af2fa9ffc9.gif',
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark" className="homeGif" layout="twoColumn">
    {[
      {
        image: '//n1image.hjfile.cn/res7/2018/03/01/428c4297bb1f6b6cf335317f89bab237.gif',
        imageAlign: 'bottom',
        title: 'wx api 自动补全',
      },
      {
        image: '//n1image.hjfile.cn/res7/2018/03/01/a8ccc97ac7146b81e080daf8eb778b4d.gif',
        imageAlign: 'bottom',
        title: 'promise 版的 wx api 自动补全',
      },
      {
        image: '//n1image.hjfile.cn/res7/2018/03/01/18702b10498aee7ddc394eb04a703a43.gif',
        imageAlign: 'bottom',
        title: 'class 方法智能提示',
      },
      {
        image: '//n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif',
        imageAlign: 'bottom',
        title: 'wxml 文件自动补全',
      },
      {
        image: '//n1image.hjfile.cn/res7/2018/03/01/ee0ec301194156469cfe5533a2008d04.gif',
        imageAlign: 'bottom',
        title: 'json 文件自动补全',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"谁在使用这个项目？"}</h2>
      <p>下面这些人或组织在使用此项目</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          更多 {siteConfig.title} 用户
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <TryOut />
          <div className="homeGifContainer">
            <Description />
          </div>
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
