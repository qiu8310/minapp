/*
  Module dependencies
*/
var ElementType = require('domelementtype');
var entities = require('entities');

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes:any, opts:any) {
  if (!attributes) return;

  var output = '',
      value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    output += key;
    if ((value !== null && value !== '') || opts.xmlMode) {
      value = value.replace(/"/g, '\'');
      output += '="' + (opts.decodeEntities ? entities.encodeXML(value) : value) + '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag:any = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};


export default function render(dom: any, opts: any) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};
  opts.reserveTags = opts.reserveTags || ['text'];

  var output = '';

  for(var i = 0; i < dom.length; i++){
    var elem = dom[i];

    if (elem.type === 'root')
      output += render(elem.children, opts);
    else if (ElementType.isTag(elem))
      output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment)
      output += renderComment(elem, opts);
    else if (elem.type === ElementType.CDATA)
      output += renderCdata(elem);
    else
      output += renderText(elem, opts);
  }

  return output;
};

function renderTag(elem: Element, opts: Options) {
  // Handle SVG
  if (elem.name === "svg") opts.xmlMode = true;

  var tag = '<' + elem.name,
      attribs = formatAttrs(elem.attribs, opts);
  if (attribs) {
    tag += ' ' + attribs;
  }

  if (
    opts.xmlMode
    && (!elem.children || elem.children.length === 0)
  ) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem:any) {
  return '<' + elem.data + '>';
}

function renderText(elem: Element, opts: Options) {
  var data = elem.data || '';

  if (opts.minimize) {
    if (!(elem.parent && elem.parent.type === 'tag' && opts.reserveTags.indexOf(elem.parent.name) >= 0)) {
      data = data.replace(/\n/g, '').trim();
    }
  }

  // if entities weren't decoded, no need to encode them back
  if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem: Element) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem: Element, opts: Options) {
  if (!opts.minimize) {
    return '<!--' + elem.data + '-->';
  } else {
    return '';
  }
}

export interface Element {
  type: string,
  name: string,
  data?: string,
  children: Element[],
  parent?: Element,
  attribs: {[key: string]: string}
}

interface Options {
  minimize: boolean,
  xmlMode?: boolean,
  decodeEntities?: boolean,
  reserveTags: string[]
}