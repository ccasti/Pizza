(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":5,"hyperx":8,"on-load":12}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],4:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],5:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],6:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],8:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":7}],9:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                                }

                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],10:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],11:[function(require,module,exports){
/*! nouislider - 11.1.0 - 2018-04-02 11:18:13 */

(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';

	var VERSION = '11.1.0';


	function isValidFormatter ( entry ) {
		return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
	}

	function removeElement ( el ) {
		el.parentElement.removeChild(el);
	}

	function isSet ( value ) {
		return value !== null && value !== undefined;
	}

	// Bindable version
	function preventDefault ( e ) {
		e.preventDefault();
	}

	// Removes duplicates from an array.
	function unique ( array ) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem, orientation ) {

		var rect = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var pageOffset = getPageOffset(doc);

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		if (duration > 0) {
		addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	// Note that an input array is returned by reference!
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		numStr = String(numStr);
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( doc ) {

		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
		var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
		var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// we provide a function to compute constants instead
	// of accessing window.* as soon as the module needs it
	// so that we do not compute anything if not needed
	function getActions ( ) {

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		return window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		};
	}

	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// Issue #785
	function getSupportsPassive ( ) {

		var supportsPassive = false;

		try {

			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});

			window.addEventListener('test', null, opts);

		} catch (e) {}

		return supportsPassive;
	}

	function getSupportsTouchActionNone ( ) {
		return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
	}


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct );
		var a = xPct[j-1];
		var b = xPct[j];

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( !Array.isArray(value) ){
			throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}

		that.xHighestCompleteStep.push(0);
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i+1]], n) / subRangeRatio(that.xPct[i], that.xPct[i+1]);

		var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
		var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
		var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

		that.xHighestCompleteStep[i] = step;
	}


// Interface

	function Spectrum ( entry, snap, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];
		this.xHighestCompleteStep = [];

		this.snap = snap;

		var index;
		var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {

		var step = this.xNumSteps[0];

		if ( step && ((value / step) % 1) !== 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
		}

		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		return fromStepping( this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		return value;
	};

	Spectrum.prototype.getNearbySteps = function ( value ) {

		var j = getJ(value, this.xPct);

		return {
			stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
			thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
			stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
		};
	};

	Spectrum.prototype.countStepDecimals = function () {
		var stepDecimals = this.xNumSteps.map(countDecimals);
		return Math.max.apply(null, stepDecimals);
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function validateFormat ( entry ) {

		// Any object with a to and from method is supported.
		if ( isValidFormatter(entry) ) {
			return true;
		}

		throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
	}

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length ) {
			throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
		}
	}

	function testAnimationDuration ( parsed, entry ) {

		parsed.animationDuration = entry;

		if ( typeof entry !== 'number' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
		}
	}

	function testConnect ( parsed, entry ) {

		var connect = [false];
		var i;

		// Map legacy options
		if ( entry === 'lower' ) {
			entry = [true, false];
		}

		else if ( entry === 'upper' ) {
			entry = [false, true];
		}

		// Handle boolean options
		if ( entry === true || entry === false ) {

			for ( i = 1; i < parsed.handles; i++ ) {
				connect.push(entry);
			}

			connect.push(false);
		}

		// Reject invalid input
		else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
		}

		else {
			connect = entry;
		}

		parsed.connect = connect;
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
			case 'horizontal':
				parsed.ort = 0;
				break;
			case 'vertical':
				parsed.ort = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit || parsed.handles < 2 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
		}
	}

	function testPadding ( parsed, entry ) {

		if ( !isNumeric(entry) && !Array.isArray(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1])) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( entry === 0 ) {
			return;
		}

		if ( !Array.isArray(entry) ) {
			entry = [entry, entry];
		}

		// 'getMargin' returns false for invalid values.
		parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

		if ( parsed.padding[0] === false || parsed.padding[1] === false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
		}

		if ( parsed.padding[0] < 0 || parsed.padding[1] < 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
		}

		if ( parsed.padding[0] + parsed.padding[1] >= 100 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
			case 'ltr':
				parsed.dir = 0;
				break;
			case 'rtl':
				parsed.dir = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0;
		var drag = entry.indexOf('drag') >= 0;
		var fixed = entry.indexOf('fixed') >= 0;
		var snap = entry.indexOf('snap') >= 0;
		var hover = entry.indexOf('hover') >= 0;

		if ( fixed ) {

			if ( parsed.handles !== 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
			}

			// Use margin to enforce fixed state
			testMargin(parsed, parsed.start[1] - parsed.start[0]);
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === false ) {
			return;
		}

		else if ( entry === true ) {

			parsed.tooltips = [];

			for ( var i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}
		}

		else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testAriaFormat ( parsed, entry ) {
		parsed.ariaFormat = entry;
		validateFormat(entry);
	}

	function testFormat ( parsed, entry ) {
		parsed.format = entry;
		validateFormat(entry);
	}

	function testCssPrefix ( parsed, entry ) {

		if ( typeof entry !== 'string' && entry !== false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
		}

		parsed.cssPrefix = entry;
	}

	function testCssClasses ( parsed, entry ) {

		if ( typeof entry !== 'object' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
		}

		if ( typeof parsed.cssPrefix === 'string' ) {
			parsed.cssClasses = {};

			for ( var key in entry ) {
				if ( !entry.hasOwnProperty(key) ) { continue; }

				parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
			}
		} else {
			parsed.cssClasses = entry;
		}
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			padding: 0,
			animate: true,
			animationDuration: 300,
			ariaFormat: defaultFormatter,
			format: defaultFormatter
		};

		// Tests are executed in the order they are presented here.
		var tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'animationDuration': { r: false, t: testAnimationDuration },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'padding': { r: false, t: testPadding },
			'behaviour': { r: true, t: testBehaviour },
			'ariaFormat': { r: false, t: testAriaFormat },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: true, t: testCssPrefix },
			'cssClasses': { r: true, t: testCssClasses }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal',
			'cssPrefix' : 'noUi-',
			'cssClasses': {
				target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
				connects: 'connects',
				ltr: 'ltr',
				rtl: 'rtl',
				draggable: 'draggable',
				drag: 'state-drag',
				tap: 'state-tap',
				active: 'active',
				tooltip: 'tooltip',
				pips: 'pips',
				pipsHorizontal: 'pips-horizontal',
				pipsVertical: 'pips-vertical',
				marker: 'marker',
				markerHorizontal: 'marker-horizontal',
				markerVertical: 'marker-vertical',
				markerNormal: 'marker-normal',
				markerLarge: 'marker-large',
				markerSub: 'marker-sub',
				value: 'value',
				valueHorizontal: 'value-horizontal',
				valueVertical: 'value-vertical',
				valueNormal: 'value-normal',
				valueLarge: 'value-large',
				valueSub: 'value-sub'
			}
		};

		// AriaFormat defaults to regular format, if any.
		if ( options.format && !options.ariaFormat ) {
			options.ariaFormat = options.format;
		}

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( !isSet(options[name]) && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, !isSet(options[name]) ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// All recent browsers accept unprefixed transform.
		// We need -ms- for IE9 and -webkit- for older Android;
		// Assume use of -webkit- if unprefixed and -ms- are not supported.
		// https://caniuse.com/#feat=transforms2d
		var d = document.createElement("div");
		var msPrefix = d.style.msTransform !== undefined;
		var noPrefix = d.style.transform !== undefined;

		parsed.transformRule = noPrefix ? 'transform' : (msPrefix ? 'msTransform' : 'webkitTransform');

		// Pips don't move, so we can place them using left/top.
		var styles = [['left', 'top'], ['right', 'bottom']];

		parsed.style = styles[parsed.dir][parsed.ort];

		return parsed;
	}


function scope ( target, options, originalOptions ){

	var actions = getActions();
	var supportsTouchActionNone = getSupportsTouchActionNone();
	var supportsPassive = supportsTouchActionNone && getSupportsPassive();

	// All variables local to 'scope' are prefixed with 'scope_'
	var scope_Target = target;
	var scope_Locations = [];
	var scope_Base;
	var scope_Handles;
	var scope_HandleNumbers = [];
	var scope_ActiveHandlesCount = 0;
	var scope_Connects;
	var scope_Spectrum = options.spectrum;
	var scope_Values = [];
	var scope_Events = {};
	var scope_Self;
	var scope_Pips;
	var scope_Document = target.ownerDocument;
	var scope_DocumentElement = scope_Document.documentElement;
	var scope_Body = scope_Document.body;


	// For horizontal sliders in standard ltr documents,
	// make .noUi-origin overflow to the left so the document doesn't scroll.
	var scope_DirOffset = (scope_Document.dir === 'rtl') || (options.ort === 1) ? 0 : 100;

/*! In this file: Construction of DOM elements; */

	// Creates a node, adds it to target, returns the new node.
	function addNodeTo ( addTarget, className ) {

		var div = scope_Document.createElement('div');

		if ( className ) {
			addClass(div, className);
		}

		addTarget.appendChild(div);

		return div;
	}

	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {

		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);

		handle.setAttribute('data-handle', handleNumber);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
		// 0 = focusable and reachable
		handle.setAttribute('tabindex', '0');
		handle.setAttribute('role', 'slider');
		handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

		if ( handleNumber === 0 ) {
			addClass(handle, options.cssClasses.handleLower);
		}

		else if ( handleNumber === options.handles - 1 ) {
			addClass(handle, options.cssClasses.handleUpper);
		}

		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( connectOptions, base ) {

		var connectBase = addNodeTo(base, options.cssClasses.connects);

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(connectBase, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( var i = 0; i < options.handles; i++ ) {
			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, i));
			scope_HandleNumbers[i] = i;
			scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( addTarget ) {

		// Apply classes and data to the target.
		addClass(addTarget, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(addTarget, options.cssClasses.ltr);
		} else {
			addClass(addTarget, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(addTarget, options.cssClasses.horizontal);
		} else {
			addClass(addTarget, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(addTarget, options.cssClasses.base);
	}


	function addTooltip ( handle, handleNumber ) {

		if ( !options.tooltips[handleNumber] ) {
			return false;
		}

		return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(values, handleNumber, unencoded) {

			if ( !tips[handleNumber] ) {
				return;
			}

			var formattedValue = values[handleNumber];

			if ( options.tooltips[handleNumber] !== true ) {
				formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
			}

			tips[handleNumber].innerHTML = formattedValue;
		});
	}


	function aria ( ) {

		bindEvent('update', function ( values, handleNumber, unencoded, tap, positions ) {

			// Update Aria Values for all handles, as a change in one changes min and max values for the next.
			scope_HandleNumbers.forEach(function( index ){

				var handle = scope_Handles[index];

				var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
				var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

				var now = positions[index];
				var text = options.ariaFormat.to(unencoded[index]);

				handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
				handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
				handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
				handle.children[0].setAttribute('aria-valuetext', text);
			});
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			if ( values < 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
			}

			// Divide 0 - 100 in 'count' parts.
			var interval = values - 1;
			var spread = ( 100 / interval );

			values = [];

			// List these parts and have them handled as 'positions'.
			while ( interval-- ) {
				values[ interval ] = ( interval * spread );
			}

			values.push(100);

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var indexes = {};
		var firstInRange = scope_Spectrum.xVal[0];
		var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
		var ignoreFirst = false;
		var ignoreLast = false;
		var prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step;
			var i;
			var q;
			var low = current;
			var high = group[index+1];
			var newPct;
			var pctDifference;
			var pctPos;
			var type;
			var steps;
			var realSteps;
			var stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Make sure step isn't 0, which would cause an infinite loop (#654)
			step = Math.max(step, 0.0000001);

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the amount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var element = scope_Document.createElement('div');

		var valueSizeClasses = [
			options.cssClasses.valueNormal,
			options.cssClasses.valueLarge,
			options.cssClasses.valueSub
		];
		var markerSizeClasses = [
			options.cssClasses.markerNormal,
			options.cssClasses.markerLarge,
			options.cssClasses.markerSub
		];
		var valueOrientationClasses = [
			options.cssClasses.valueHorizontal,
			options.cssClasses.valueVertical
		];
		var markerOrientationClasses = [
			options.cssClasses.markerHorizontal,
			options.cssClasses.markerVertical
		];

		addClass(element, options.cssClasses.pips);
		addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

		function getClasses( type, source ){
			var a = source === options.cssClasses.value;
			var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
			var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

			return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
		}

		function addSpread ( offset, values ){

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			var node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.marker);
				node.style[options.style] = offset + '%';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.value);
				node.setAttribute('data-value', values[0]);
				node.style[options.style] = offset + '%';
				node.innerText = formatter.to(values[0]);
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function removePips ( ) {
		if ( scope_Pips ) {
			removeElement(scope_Pips);
			scope_Pips = null;
		}
	}

	function pips ( grid ) {

		// Fix #669
		removePips();

		var mode = grid.mode;
		var density = grid.density || 1;
		var filter = grid.filter || false;
		var values = grid.values || false;
		var stepped = grid.stepped || false;
		var group = getGroup( mode, values, stepped );
		var spread = generateSpread( density, mode, group );
		var format = grid.format || {
			to: Math.round
		};

		scope_Pips = scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));

		return scope_Pips;
	}

/*! In this file: Browser events (not slider events like slide, change); */

	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect();
		var alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// Handler for attaching events trough a proxy.
	function attachEvent ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			e = fixEvent(e, data.pageOffset, data.target || element);

			// fixEvent returns false if this event has a different target
			// when handling (multi-) touch events;
			if ( !e ) {
				return false;
			}

			// doNotReject is passed by all end events to make sure released touches
			// are not rejected, leaving the slider "stuck" to the cursor;
			if ( scope_Target.hasAttribute('disabled') && !data.doNotReject ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			// 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
			// iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
			// touch-action: manipulation, but that allows panning, which breaks
			// sliders after zooming/on non-responsive pages.
			// See: https://bugs.webkit.org/show_bug.cgi?id=133112
			if ( !supportsPassive ) {
				e.preventDefault();
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		};

		var methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset, eventTarget ) {

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0;
		var mouse = e.type.indexOf('mouse') === 0;
		var pointer = e.type.indexOf('pointer') === 0;

		var x;
		var y;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// In the event that multitouch is activated, the only thing one handle should be concerned
		// about is the touches that originated on top of it.
		if ( touch ) {

			// Returns true if a touch originated on the target.
			var isTouchOnTarget = function (checkTouch) {
				return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
			};

			// In the case of touchstart events, we need to make sure there is still no more than one
			// touch on the target so we look amongst all touches.
			if (e.type === 'touchstart') {

				var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

				// Do not support more than one touch per handle.
				if ( targetTouches.length > 1 ) {
					return false;
				}

				x = targetTouches[0].pageX;
				y = targetTouches[0].pageY;

			} else {

				// In the other cases, find on changedTouches is enough.
				var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

				// Cancel if the target touch has not moved.
				if ( !targetTouch ) {
					return false;
				}

				x = targetTouch.pageX;
				y = targetTouch.pageY;
			}
		}

		pageOffset = pageOffset || getPageOffset(scope_Document);

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		e.pageOffset = pageOffset;
		e.points = [x, y];
		e.cursor = mouse || pointer; // Fix #435

		return e;
	}

	// Translate a coordinate in the document to a percentage on the slider
	function calcPointToPercentage ( calcPoint ) {
		var location = calcPoint - offset(scope_Base, options.ort);
		var proposal = ( location * 100 ) / baseSize();

		// Clamp proposal between 0% and 100%
		// Out-of-bound coordinates may occur when .noUi-base pseudo-elements
		// are used (e.g. contained handles feature)
		proposal = limit(proposal);

		return options.dir ? 100 - proposal : proposal;
	}

	// Find handle closest to a certain percentage on the slider
	function getClosestHandle ( proposal ) {

		var closest = 100;
		var handleNumber = false;

		scope_Handles.forEach(function(handle, index){

			// Disabled handles are ignored
			if ( handle.hasAttribute('disabled') ) {
				return;
			}

			var pos = Math.abs(scope_Locations[index] - proposal);

			if ( pos < closest || (pos === 100 && closest === 100) ) {
				handleNumber = index;
				closest = pos;
			}
		});

		return handleNumber;
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			eventEnd (event, data);
		}
	}

	// Handle movement on document for handle and range drag.
	function eventMove ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return eventEnd(event, data);
		}

		// Check if we are moving up or down
		var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

		// Convert the movement into a percentage of the slider width/height
		var proposal = (movement * 100) / data.baseSize;

		moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
	}

	// Unbind move events on document, call callbacks.
	function eventEnd ( event, data ) {

		// The handle is no longer active, so remove the class.
		if ( data.handle ) {
			removeClass(data.handle, options.cssClasses.active);
			scope_ActiveHandlesCount -= 1;
		}

		// Unbind the move and end events, which are added on 'start'.
		data.listeners.forEach(function( c ) {
			scope_DocumentElement.removeEventListener(c[0], c[1]);
		});

		if ( scope_ActiveHandlesCount === 0 ) {
			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);
			setZindex();

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				scope_Body.style.cursor = '';
				scope_Body.removeEventListener('selectstart', preventDefault);
			}
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('change', handleNumber);
			fireEvent('set', handleNumber);
			fireEvent('end', handleNumber);
		});
	}

	// Bind move events on document.
	function eventStart ( event, data ) {

		var handle;
		if ( data.handleNumbers.length === 1 ) {

			var handleOrigin = scope_Handles[data.handleNumbers[0]];

			// Ignore 'disabled' handles
			if ( handleOrigin.hasAttribute('disabled') ) {
				return false;
			}

			handle = handleOrigin.children[0];
			scope_ActiveHandlesCount += 1;

			// Mark the handle as 'active' so it can be styled.
			addClass(handle, options.cssClasses.active);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Record the event listeners.
		var listeners = [];

		// Attach the move and end events.
		var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
			// The event target has changed so we need to propagate the original one so that we keep
			// relying on it to extract target touches.
			target: event.target,
			handle: handle,
			listeners: listeners,
			startCalcPoint: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handleNumbers: data.handleNumbers,
			buttonsProperty: event.buttons,
			locations: scope_Locations.slice()
		});

		var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		// We want to make sure we pushed the listeners in the listener list rather than creating
		// a new one as it has already been passed to the event handlers.
		listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			scope_Body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, options.cssClasses.drag);
			}

			// Prevent text selection when dragging the handles.
			// In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
			// which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
			// meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
			// The 'cursor' flag is false.
			// See: http://caniuse.com/#search=selectstart
			scope_Body.addEventListener('selectstart', preventDefault, false);
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('start', handleNumber);
		});
	}

	// Move closest handle to tapped location.
	function eventTap ( event ) {

		// The tap event shouldn't propagate up
		event.stopPropagation();

		var proposal = calcPointToPercentage(event.calcPoint);
		var handleNumber = getClosestHandle(proposal);

		// Tackle the case that all handles are 'disabled'.
		if ( handleNumber === false ) {
			return false;
		}

		// Flag the slider as it is now in a transitional state.
		// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
		if ( !options.events.snap ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		setHandle(handleNumber, proposal, true, true);

		setZindex();

		fireEvent('slide', handleNumber, true);
		fireEvent('update', handleNumber, true);
		fireEvent('change', handleNumber, true);
		fireEvent('set', handleNumber, true);

		if ( options.events.snap ) {
			eventStart(event, { handleNumbers: [handleNumber] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function eventHover ( event ) {

		var proposal = calcPointToPercentage(event.calcPoint);

		var to = scope_Spectrum.getStep(proposal);
		var value = scope_Spectrum.fromStepping(to);

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function bindSliderEvents ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			scope_Handles.forEach(function( handle, index ){

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attachEvent ( actions.start, handle.children[0], eventStart, {
					handleNumbers: [index]
				});
			});
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attachEvent (actions.start, scope_Base, eventTap, {});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attachEvent (actions.move, scope_Base, eventHover, { hover: true });
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			scope_Connects.forEach(function( connect, index ){

				if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
					return;
				}

				var handleBefore = scope_Handles[index - 1];
				var handleAfter = scope_Handles[index];
				var eventHolders = [connect];

				addClass(connect, options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					eventHolders.push(handleBefore.children[0]);
					eventHolders.push(handleAfter.children[0]);
				}

				eventHolders.forEach(function( eventHolder ) {
					attachEvent ( actions.start, eventHolder, eventStart, {
						handles: [handleBefore, handleAfter],
						handleNumbers: [index - 1, index]
					});
				});
			});
		}
	}

/*! In this file: Slider events (not browser events); */

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0];
		var namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0];
			var tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// External event handling
	function fireEvent ( eventName, handleNumber, tap ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( eventName === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						scope_Values.map(options.format.to),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						scope_Values.slice(),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations.slice()
					);
				});
			}
		});
	}

/*! In this file: Mechanics for slider operation */

	function toPct ( pct ) {
		return pct + '%';
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward, getValue ) {

		// For sliders with multiple handles, limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.max(to, reference[handleNumber - 1] + options.margin);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.min(to, reference[handleNumber + 1] - options.margin);
			}
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable.
		if ( scope_Handles.length > 1 && options.limit ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.min(to, reference[handleNumber - 1] + options.limit);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.max(to, reference[handleNumber + 1] - options.limit);
			}
		}

		// The padding option keeps the handles a certain distance from the
		// edges of the slider. Padding must be > 0.
		if ( options.padding ) {

			if ( handleNumber === 0 ) {
				to = Math.max(to, options.padding[0]);
			}

			if ( handleNumber === scope_Handles.length - 1 ) {
				to = Math.min(to, 100 - options.padding[1]);
			}
		}

		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === reference[handleNumber] && !getValue ) {
			return false;
		}

		return to;
	}

	// Uses slider orientation to create CSS rules. a = base value;
	function inRuleOrder ( v, a ) {
		var o = options.ort;
		return (o?a:v) + ', ' + (o?v:a);
	}

	// Moves handle(s) by a percentage
	// (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
	function moveHandles ( upward, proposal, locations, handleNumbers ) {

		var proposals = locations.slice();

		var b = [!upward, upward];
		var f = [upward, !upward];

		// Copy handleNumbers so we don't change the dataset
		handleNumbers = handleNumbers.slice();

		// Check to see which handle is 'leading'.
		// If that one can't move the second can't either.
		if ( upward ) {
			handleNumbers.reverse();
		}

		// Step 1: get the maximum percentage that any of the handles can move
		if ( handleNumbers.length > 1 ) {

			handleNumbers.forEach(function(handleNumber, o) {

				var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

				// Stop if one of the handles can't move.
				if ( to === false ) {
					proposal = 0;
				} else {
					proposal = to - proposals[handleNumber];
					proposals[handleNumber] = to;
				}
			});
		}

		// If using one handle, check backward AND forward
		else {
			b = f = [true];
		}

		var state = false;

		// Step 2: Try to set the handles with the found percentage
		handleNumbers.forEach(function(handleNumber, o) {
			state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
		});

		// Step 3: If a handle moved, fire events
		if ( state ) {
			handleNumbers.forEach(function(handleNumber){
				fireEvent('update', handleNumber);
				fireEvent('slide', handleNumber);
			});
		}
	}

	// Takes a base value and an offset. This offset is used for the connect bar size.
	// In the initial design for this feature, the origin element was 1% wide.
	// Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
	// in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
	function transformDirection ( a, b ) {
		return options.dir ? 100 - a - b : a;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

		var rule = 'translate(' + inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), '0') + ')';
		scope_Handles[handleNumber].style[options.transformRule] = rule;

		updateConnect(handleNumber);
		updateConnect(handleNumber + 1);
	}

	// Handles before the slider middle are stacked later = higher,
	// Handles after the middle later is lower
	// [[7] [8] .......... | .......... [5] [4]
	function setZindex ( ) {

		scope_HandleNumbers.forEach(function(handleNumber){
			var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
			var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
			scope_Handles[handleNumber].style.zIndex = zIndex;
		});
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to, lookBackward, lookForward ) {

		to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;
	}

	// Updates style attribute for connect nodes
	function updateConnect ( index ) {

		// Skip connects set to false
		if ( !scope_Connects[index] ) {
			return;
		}

		var l = 0;
		var h = 100;

		if ( index !== 0 ) {
			l = scope_Locations[index - 1];
		}

		if ( index !== scope_Connects.length - 1 ) {
			h = scope_Locations[index];
		}

		// We use two rules:
		// 'translate' to change the left/top offset;
		// 'scale' to change the width of the element;
		// As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
		var connectWidth = h - l;
		var translateRule = 'translate(' + inRuleOrder(toPct(transformDirection(l, connectWidth)), '0') + ')';
		var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';

		scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule;
	}

/*! In this file: All methods eventually exposed in slider.noUiSlider... */

	// Parses value passed to .set method. Returns current value if not parse-able.
	function resolveToValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null || to === false || to === undefined ) {
			return scope_Locations[handleNumber];
		}

		// If a formatted number was passed, attempt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);
		to = scope_Spectrum.toStepping(to);

		// If parsing the number failed, use the current value.
		if ( to === false || isNaN(to) ) {
			return scope_Locations[handleNumber];
		}

		return to;
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray(input);
		var isInit = scope_Locations[0] === undefined;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// Animation is optional.
		// Make sure the initial values were set before using animated placement.
		if ( options.animate && !isInit ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		// First pass, without lookAhead but with lookBackward. Values are set from left to right.
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
		});

		// Second pass. Now that all base values are set, apply constraints
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, scope_Locations[handleNumber], true, true);
		});

		setZindex();

		scope_HandleNumbers.forEach(function(handleNumber){

			fireEvent('update', handleNumber);

			// Fire the event only for handles that received a new value, as per #579
			if ( values[handleNumber] !== null && fireSetEvent ) {
				fireEvent('set', handleNumber);
			}
		});
	}

	// Reset slider to initial values
	function valueReset ( fireSetEvent ) {
		valueSet(options.start, fireSetEvent);
	}

	// Get the slider value.
	function valueGet ( ) {

		var values = scope_Values.map(options.format.to);

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		return values;
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		return scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location );
			var value = scope_Values[index];
			var increment = nearbySteps.thisStep.step;
			var decrement = null;

			// If the next value in this step moves into the next step,
			// the increment is the start of the next step - the current value
			if ( increment !== false ) {
				if ( value + increment > nearbySteps.stepAfter.startValue ) {
					increment = nearbySteps.stepAfter.startValue - value;
				}
			}


			// If the value is beyond the starting point
			if ( value > nearbySteps.thisStep.startValue ) {
				decrement = nearbySteps.thisStep.step;
			}

			else if ( nearbySteps.stepBefore.step === false ) {
				decrement = false;
			}

			// If a handle is at the start of a step, it always steps back into the previous step first
			else {
				decrement = value - nearbySteps.stepBefore.highestStep;
			}


			// Now, if at the slider edges, there is not in/decrement
			if ( location === 100 ) {
				increment = null;
			}

			else if ( location === 0 ) {
				decrement = null;
			}

			// As per #391, the comparison for the decrement step can have some rounding issues.
			var stepDecimals = scope_Spectrum.countStepDecimals();

			// Round per #391
			if ( increment !== null && increment !== false ) {
				increment = Number(increment.toFixed(stepDecimals));
			}

			if ( decrement !== null && decrement !== false ) {
				decrement = Number(decrement.toFixed(stepDecimals));
			}

			return [decrement, increment];
		});
	}

	// Updateable: margin, limit, padding, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet();

		var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

		// Only change options that we're actually passed to update.
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				originalOptions[name] = optionsToUpdate[name];
			}
		});

		var newOptions = testOptions(originalOptions);

		// Load new options into the slider state
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = newOptions[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.padding = newOptions.padding;

		// Update pips, removes existing.
		if ( options.pips ) {
			pips(options.pips);
		}

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}

/*! In this file: Calls to functions. All other scope_ files define functions only; */

	// Create the base element, initialize HTML and set classes.
	// Add handles and connect elements.
	addSlider(scope_Target);
	addElements(options.connect, scope_Base);

	// Attach user events.
	bindSliderEvents(options.events);

	// Use the public value method to set the start values.
	valueSet(options.start);

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		reset: valueReset,
		// Exposed for unit testing, don't use this in your application.
		__moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
		options: originalOptions, // Issue #600, #678
		updateOptions: updateOptions,
		target: scope_Target, // Issue #597
		removePips: removePips,
		pips: pips // Issue #594
	};

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	aria();

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target || !target.nodeName ) {
			throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
		}

		// Throw an error if the slider was already initialized.
		if ( target.noUiSlider ) {
			throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target );
		var api = scope( target, options, originalOptions );

		target.noUiSlider = api;

		return api;
	}

	// Use an object instead of a function for future expandability;
	return {
		version: VERSION,
		create: initialize
	};

}));
},{}],12:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":10,"global/document":5,"global/window":6}],13:[function(require,module,exports){
(function (process){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.page = factory());
}(this, (function () { 'use strict';

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var suffix = res[6];
    var asterisk = res[7];

    var repeat = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';
    var delimiter = prefix || '/';
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$');
    }
  }

  return function (obj) {
    var path = '';
    var data = obj || {};

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = encodeURIComponent(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path);
  var re = tokensToRegExp(tokens, options);

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i]);
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';
  var lastToken = tokens[tokens.length - 1];
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.pattern;

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || [];

  if (!isarray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/**
   * Module dependencies.
   */

  

  /**
   * Module exports.
   */

  var page_js = page;
  page.default = page;
  page.Context = Context;
  page.Route = Route;
  page.sameOrigin = sameOrigin;

  /**
   * Short-cuts for global-object checks
   */

  var hasDocument = ('undefined' !== typeof document);
  var hasWindow = ('undefined' !== typeof window);
  var hasHistory = ('undefined' !== typeof history);
  var hasProcess = typeof process !== 'undefined';

  /**
   * Detect click event
   */
  var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var isLocation = hasWindow && !!(window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Strict path matching.
   */

  var strict = false;

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * The window for which this `page` is running
   */
  var pageWindow;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Get or set strict path matching to `enable`
   *
   * @param {boolean} enable
   * @api public
   */

  page.strict = function(enable) {
    if (0 === arguments.length) return strict;
    strict = enable;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    pageWindow = options.window || (hasWindow && window);
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate && hasWindow) pageWindow.addEventListener('popstate', onpopstate, false);
    if (false !== options.click && hasDocument) {
      pageWindow.document.addEventListener(clickEvent, onclick, false);
    }
    hashbang = !!options.hashbang;
    if(hashbang && hasWindow && !hasHistory) {
      pageWindow.addEventListener('hashchange', onpopstate, false);
    }
    if (!dispatch) return;

    var url;
    if(isLocation) {
      var loc = pageWindow.location;

      if(hashbang && ~loc.hash.indexOf('#!')) {
        url = loc.hash.substr(2) + loc.search;
      } else if (hashbang) {
        url = loc.search + loc.hash;
      } else {
        url = loc.pathname + loc.search + loc.hash;
      }
    }

    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    hasDocument && pageWindow.document.removeEventListener(clickEvent, onclick, false);
    hasWindow && pageWindow.removeEventListener('popstate', onpopstate, false);
    hasWindow && pageWindow.removeEventListener('hashchange', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state),
      prev = prevContext;
    prevContext = ctx;
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx, prev);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      hasHistory && pageWindow.history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(getBase(), state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state),
      prev = prevContext;
    prevContext = ctx;
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx, prev);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */

  page.dispatch = function(ctx, prev) {
    var i = 0,
      j = 0;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = isLocation && getBase() + pageWindow.location.hash.replace('#!', '');
    } else {
      current = isLocation && pageWindow.location.pathname + pageWindow.location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    isLocation && (pageWindow.location.href = ctx.canonicalPath);
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    var pageBase = getBase();
    if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(pageBase, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = (hasDocument && pageWindow.document.title);
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = this.pathname = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    if (hasHistory) {
        pageWindow.history.pushState(this.state, this.title,
          hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
    }
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    if (hasHistory && pageWindow.location.protocol !== 'file:') {
        pageWindow.history.replaceState(this.state, this.title,
          hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
    }
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    options.strict = options.strict || strict;
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathToRegexp_1(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ( ! hasWindow ) {
      return;
    }
    if (hasDocument && document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else if (isLocation) {
        var loc = pageWindow.location;
        page.show(loc.pathname + loc.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  /* jshint +W054 */
  function onclick(e) {
    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;

    // continue ensure link
    // el.nodeName for svg links are 'a' instead of 'A'
    while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
    if (!el || 'A' !== el.nodeName.toUpperCase()) return;

    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if(!hashbang && samePath(el) && (el.hash || '#' === link)) return;

    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    // svg target is an object and its desired value is in .baseVal property
    if (svg ? el.target.baseVal : el.target) return;

    // x-origin
    // note: svg links that are not relative don't call click events (and skip page.js)
    // consequently, all svg links tested inside page.js are relative and in the same origin
    if (!svg && !sameOrigin(el.href)) return;

    // rebuild path
    // There aren't .pathname and .search properties in svg links, so we use href
    // Also, svg href is an object and its desired value is in .baseVal property
    var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

    path = path[0] !== '/' ? '/' + path : path;

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;
    var pageBase = getBase();

    if (path.indexOf(pageBase) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (pageBase && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || (hasWindow && window.event);
    return null == e.which ? e.button : e.which;
  }

  /**
   * Convert to a URL object
   */
  function toURL(href) {
    if(typeof URL === 'function' && isLocation) {
      return new URL(href, location.toString());
    } else if (hasDocument) {
      var anc = document.createElement('a');
      anc.href = href;
      return anc;
    }
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    if(!href || !isLocation) return false;
    var url = toURL(href);

    var loc = pageWindow.location;
    return loc.protocol === url.protocol &&
      loc.hostname === url.hostname &&
      loc.port === url.port;
  }

  function samePath(url) {
    if(!isLocation) return false;
    var loc = pageWindow.location;
    return url.pathname === loc.pathname &&
      url.search === loc.search;
  }

  /**
   * Gets the `base`, which depends on whether we are using History or
   * hashbang routing.
   */
  function getBase() {
    if(!!base) return base;
    var loc = hasWindow && pageWindow.location;
    return (hasWindow && hashbang && loc.protocol === 'file:') ? loc.pathname : base;
  }

  page.sameOrigin = sameOrigin;

return page_js;

})));

}).call(this,require('_process'))
},{"_process":14}],14:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],15:[function(require,module,exports){
function Agent() {
  this._defaults = [];
}

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(fn) {
  /** Default setting for all requests from this agent */
  Agent.prototype[fn] = function(/*varargs*/) {
    this._defaults.push({fn:fn, arguments:arguments});
    return this;
  }
});

Agent.prototype._setDefaults = function(req) {
    this._defaults.forEach(function(def) {
      req[def.fn].apply(req, def.arguments);
    });
};

module.exports = Agent;

},{}],16:[function(require,module,exports){
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var ResponseBase = require('./response-base');
var Agent = require('./agent-base');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify,
};

/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse,
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[\/+]json($|[^-\w])/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str) {
  var parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    };
  }

  var encoder = function(string) {
    if ('function' === typeof btoa) {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = (this.xhr = request.getXHR());
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

request.agent = function() {
  return new Agent();
};

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(method) {
  Agent.prototype[method.toLowerCase()] = function(url, fn) {
    var req = new request.Request(method, url);
    this._setDefaults(req);
    if (fn) {
      req.end(fn);
    }
    return req;
  };
});

Agent.prototype.del = Agent.prototype['delete'];

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn) {
  var req = request('GET', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn) {
  var req = request('HEAD', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn) {
  var req = request('OPTIONS', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  var req = request('DELETE', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn) {
  var req = request('PATCH', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn) {
  var req = request('POST', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn) {
  var req = request('PUT', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":15,"./is-object":17,"./request-base":18,"./response-base":19,"component-emitter":3}],17:[function(require,module,exports){
'use strict';

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],18:[function(require,module,exports){
'use strict';

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count, fn){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
RequestBase.prototype._shouldRetry = function(err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch(e) {
      console.error(e);
    }
  }
  if (res && res.status && res.status >= 500 && res.status != 501) return true;
  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
    // Superagent timeout
    if (err.timeout && err.code == 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {

  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject) {
      self.end(function(err, res) {
        if (err) innerReject(err);
        else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {
  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + base64Encoder(user + ':' + pass));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header,
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":17}],19:[function(require,module,exports){
'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":20}],20:[function(require,module,exports){
'use strict';

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, changesOrigin){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  // secuirty
  if (changesOrigin) {
    delete header['authorization'];
    delete header['cookie'];
  }
  return header;
};

},{}],21:[function(require,module,exports){

var orig = document.title;

exports = module.exports = set;

function set(str) {
  var i = 1;
  var args = arguments;
  document.title = str.replace(/%[os]/g, function(_){
    switch (_) {
      case '%o':
        return orig;
      case '%s':
        return args[i++];
    }
  });
}

exports.reset = function(){
  set(orig);
};

},{}],22:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":23,"bel":1,"morphdom":9}],23:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],24:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');
var aPesos = require('../utilities/aPesos');
var wNumb = require('../utilities/aPesos/wNumb');

page('/carta', header, loadPizzas, loadIngredientes, loadOtros, loadPacks, loadItems, footer, function (ctx, next) {
	title('Ragustino - Carta');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.pizzas, ctx.otros, ctx.ingredientes, ctx.packs, ctx.items));

	function Carrito() {
		var catalogo = [];
		var contChequeo = [];

		for (i of ctx.pizzas) {
			catalogo.push(i);
		}

		for (i of ctx.otros) {
			catalogo.push(i);
		}

		for (i of ctx.packs) {
			catalogo.push(i);
		}

		for (i of ctx.items) {
			catalogo.push(i);
		}

		this.constructor = function () {
			if (!localStorage.getItem("carrito")) {
				localStorage.setItem('carrito', '[]');
			}
		};

		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

		this.mantenedorChequeo = function () {
			if (JSON.parse(localStorage.getItem("carrito")).length > 0) {
				for (i of this.getCarrito) {
					var manChequeo = i;
					contChequeo.push({ id: manChequeo.id, price: manChequeo.price });
				}
			}
		};

		this.agregarItemPack = function (item) {
			for (i of catalogo) {
				if (i.id === item) {
					var registroPack = i;
				}
			}
			if (!registroPack) {
				return;
			}

			for (n of registroPack.contents.opciones) {
				if (n.selec === true) {
					for (i of n.items) {
						if (i.selected === false) {
							delete i.idpack;
							delete i.idopt;
							delete i.iditem;
							delete i.itemname;
							delete i.selected;
						}
					}
				}
				if (!n.selec) {
					alert("Debes Seleccionar tu Pizza y Líquido");
					return agregarItemPack(null);
				}
			}

			contChequeo.push({ id: registroPack.id, price: registroPack.price });
			registroPack.cantidad = 1;
			this.getCarrito.push(registroPack);
			localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
		};

		this.selectOption = function (idPack, idOpt, idItem) {
			for (p of catalogo) {
				if (p.id === idPack) {
					for (n of p.contents.opciones) {
						if (n.id === idOpt) {
							for (i of n.items) {
								if (i.selected === true) {
									i.selected = false;
									n.selec = false;
								}
								if (i.iditem === idItem) {
									i.selected = true;
									n.selec = true;
									let eleccion = i.itemname;
									let tipo = n.tipo;
									document.getElementById(idOpt).innerHTML = '- ' + tipo + ': ' + eleccion;
									document.getElementById(idOpt + idOpt).style.display = "none";
								}
							}
						}
					}
				}
			}
		};

		this.agregarItem = function (item) {
			for (i of catalogo) {
				if (i.id === item) {
					var registro = i;
				}
			}
			if (!registro) {
				return;
			}

			for (i of localStorage.getItem("carrito")) {
				if (i.id === item) {
					i.cantidad++;
					localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
					return;
				}
			}
			contChequeo.push({ id: registro.id, price: registro.price });
			registro.cantidad = 1;
			this.getCarrito.push(registro);
			localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
		};

		this.agergarOferta = function () {
			var ventaOferta = { name: 'Oferta', cantidad: '1', pizname: '', bebname: '', id: '900001', price: 11900, oferta: 1 };
			var pOferta = document.getElementById('pizzaOferta').value;
			var bOferta = document.getElementById('bebidaOferta').value;

			var opcPizOf = [{ id: '101', name: 'Pizza Margherita' }, { id: '102', name: 'Pizza Caprese' }, { id: '103', name: 'Pizza Pollo al Pesto' }, { id: '104', name: 'Pizza Zuchinni Parmesano' }];

			var opcBebOf = [{ id: '201', name: 'Coca Cola Normal' }, { id: '202', name: 'Coca Cola Zero' }, { id: '203', name: 'Fanta Normal' }, { id: '204', name: 'Fanta Zero' }, { id: '205', name: 'Sprite Normal' }, { id: '206', name: 'Sprite Zero' }];

			for (p of opcPizOf) {
				if (pOferta === p.id) {
					ventaOferta.pizname = p.name;
				}
			}

			for (b of opcBebOf) {
				if (bOferta === b.id) {
					ventaOferta.bebname = b.name;
				}
			}
			contChequeo.push({ id: ventaOferta.id, price: ventaOferta.price });
			$('#modal7').modal('close');
			this.getCarrito.push(ventaOferta);
			localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
			Materialize.toast('Se agregó un producto', 1500, 'rounded');
			carrito_view.totalProductos();
			carrito_view.renderCarrito();
			$('#modal9').modal('open');
		};

		this.agregarCustom = function () {
			let n = 0;
			for (i of armar_pizza.getIngredientes) {
				if (i.control == 1) {
					n += 1;
				}
			}
			if (n < 3) {
				alert("Para ofrecerte una verdadera experiencia gourmet, debes seleccionar un mínimo de 3 ingredientes, recuerda que las especias no son consideradas.)");
				return;
			}
			if (n > 5) {
				alert("Nuestra masa de fermentación lenta se romperá con más de 5 ingredientes, seleciona un máximo de 5 ingredientes.");
				return;
			}
			contChequeo.push({ id: '100100', price: armar_pizza.getTotal() });
			let itemCustom = { id: '100100', name: 'Pizza a tu gusto', price: armar_pizza.getTotal(), cantidad: 1, custom: true, ingredientes: armar_pizza.getIngredientes };
			this.getCarrito.push(itemCustom);
			localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
			Materialize.toast('Se agregó un producto', 1500, 'rounded');
			localStorage.setItem('ingredientes', '[]');
			carrito_view.totalProductos();
			carrito_view.renderCarrito();
			$('#modal9').modal('open');
			alert("Para optimizar el funcionamiento de la página deberemos refrescarla, no te preocupes que al volver tu pizza estará en tu carro.");
			setTimeout('document.location.reload()', 2000);
		};

		this.getTotal = function () {
			var total = 0;
			for (i of JSON.parse(localStorage.getItem("carrito"))) {
				total += parseFloat(i.cantidad) * parseFloat(i.price);
			}
			return total;
		};

		this.eliminarItem = function (item) {
			for (var i in this.getCarrito) {
				if (this.getCarrito[i].id === item) {
					this.getCarrito.splice(i, 1);
				}
			}
			localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
			for (var i in contChequeo) {
				if (contChequeo[i].id === item) {
					contChequeo.splice(i, 1);
				}
			}
		};

		this.iraComprar = function () {
			if (JSON.parse(localStorage.getItem("carrito")).length <= 0) {
				alert("No tienes productos en tu carro");
				return;
			}
			var restMonto = this.getTotal();
			if (restMonto < 10000) {
				alert("Lo sentimos, el monto mínimo de compra es de $10.000.-");
			} else {
				var totalChequeo = 0;
				for (i of contChequeo) {
					totalChequeo += parseFloat(i.price);
				}
				if (totalChequeo === this.getTotal()) {
					$('#modal9').modal('close');
					page.redirect('/compra');
				}
			}
		};
	}

	function Carrito_View() {
		this.renderCarrito = function () {
			if (JSON.parse(localStorage.getItem("carrito")).length <= 0) {
				templateNoItems = `<div class="row">
					<div class="col s12 center-align">
						No tienes productos en tu carro
					</div>
				</div>`;
				document.getElementById('productosCarrito').innerHTML = templateNoItems;
			} else {
				templateItems = ``;
				for (i of carrito.getCarrito) {
					templateItems += `<li class="collection-item">
						<div class="row itemCarrito">
							<div class="col s4 m4 titCarro">
								${i.name}
							</div>
							<div class="col s3 m2 center-align titCarro">
								${aPesos(i.price)}.-
							</div>
							<div class="col s1 m2 center-align titCarro">
								${i.cantidad}
							</div>
							<div class="col s3 m2 center-align titCarro">
								${aPesos(i.cantidad * i.price)}.-
							</div>
							<div class="col s1 m2 center-align titCarro">
								<a href="#"><i class="material-icons iconoBorrar" id="deleteItem" data-id="${i.id}">delete_forever</i></a>
							</div>
						</div>
					</li>`;
				}
				document.getElementById('productosCarrito').innerHTML = templateItems;
			}
			document.getElementById('totalCarrito').innerHTML = aPesos(carrito.getTotal()) + ".-";
		};

		this.totalProductos = function () {
			var total = JSON.parse(localStorage.getItem("carrito")).length;
			document.getElementById('totalProductos').innerHTML = total;
		};
	}

	function Armar_Pizza() {
		var ingredientes = ctx.ingredientes;

		this.constructor = function () {
			if (!localStorage.getItem("ingredientes")) {
				localStorage.setItem('ingredientes', '[]');
			} else {
				if (JSON.parse(localStorage.getItem("ingredientes")).length > 0) {
					localStorage.setItem('ingredientes', '[]');
				}
			}
		};

		this.getIngredientes = JSON.parse(localStorage.getItem("ingredientes"));

		this.cambiarIcono = function (item) {
			for (i of ingredientes) {
				if (i.id === item) {
					document.getElementById(item).classList.toggle('hide');
					document.getElementById(item + item).classList.toggle('hide');
				}
			}
		};

		this.agregarIngrediente = function (item) {
			for (var i in this.getIngredientes) {
				if (this.getIngredientes[i].id === item) {
					this.getIngredientes.splice(i, 1);
					localStorage.setItem("ingredientes", JSON.stringify(this.getIngredientes));
					Materialize.toast('Se eliminó un ingrediente', 1500, 'rounded');
					return;
				}
			}

			for (n of ingredientes) {
				if (n.id === item) {
					var ingrediente = n;
				}
			}
			if (!ingrediente) {
				return;
			}
			this.getIngredientes.push(ingrediente);
			localStorage.setItem("ingredientes", JSON.stringify(this.getIngredientes));
			Materialize.toast('Se agregó un ingrediente', 1500, 'rounded');
		};

		this.getTotal = function () {
			var total = 6990;
			for (i of this.getIngredientes) {
				total += parseFloat(i.price);
			}
			return total;
		};
	}

	function Custom_View() {
		this.renderCustom = function () {
			templateIngredientes = ``;
			for (i of armar_pizza.getIngredientes) {
				templateIngredientes += `<div class="row filaIng">
					<div class="col s8">
						${i.name}
					</div>
					<div class="col s4 sp right-align">
						${aPesos(i.price)}.-
					</div>
				</div>`;
			}
			document.getElementById('ingCustom').innerHTML = templateIngredientes;
			document.getElementById('totalIngredientes').innerHTML = aPesos(armar_pizza.getTotal()) + ".-";
		};
	}

	function Comprando() {
		this.constructor = function () {
			if (!localStorage.getItem("comprando")) {
				localStorage.setItem('comprando', '[]');
			}
		};
	}

	var carrito = new Carrito();
	var carrito_view = new Carrito_View();
	var armar_pizza = new Armar_Pizza();
	var comprando = new Comprando();
	var custom_view = new Custom_View();

	$(document).ready(function () {
		$('.collapsible').collapsible();
		$('select').material_select();
		$('.slider').slider();
		carrito.constructor();
		carrito.mantenedorChequeo();
		comprando.constructor();
		armar_pizza.constructor();
		carrito_view.renderCarrito();
		carrito_view.totalProductos();

		document.getElementById('catalogo').addEventListener("click", function (ev) {
			ev.preventDefault();
			if (ev.target.id === "addItem") {
				var id = ev.target.dataset.id;
				carrito.agregarItem(id);
				Materialize.toast('Se agregó un producto', 1500, 'rounded');
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				$('#modal9').modal('open');
			}

			if (ev.target.id === "itemSelect") {
				var idPack = ev.target.dataset.idpack;
				var idOpt = ev.target.dataset.idopt;
				var idItem = ev.target.dataset.id;
				carrito.selectOption(idPack, idOpt, idItem);
			}

			if (ev.target.id === "addItemPack") {
				var id = ev.target.dataset.id;
				carrito.agregarItemPack(id);
				Materialize.toast('Se agregó un producto', 1500, 'rounded');
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				$('#modal9').modal('open');
			}

			if (ev.target.id === "agPizzaCustom") {
				carrito.agregarCustom();
			}
		});

		document.getElementById('productosCarrito').addEventListener("click", function (ev) {
			ev.preventDefault();
			if (ev.target.id === "deleteItem") {
				carrito.eliminarItem(ev.target.dataset.id);
				Materialize.toast('Se eliminó un producto', 1500, 'rounded');
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
			}
		});

		document.getElementById('ingredientes').addEventListener("click", function (ev) {
			if (ev.target.id === "addIngrediente") {
				armar_pizza.constructor();
				var id = ev.target.dataset.id;
				armar_pizza.cambiarIcono(id);
				armar_pizza.agregarIngrediente(id);
				custom_view.renderCustom();
				$('#modal8').modal('open');
			}
		});

		document.getElementById('addOferta').addEventListener("click", function (ev) {
			ev.preventDefault();
			carrito.agergarOferta();
		});

		document.getElementById('comprando').addEventListener("click", function (ev) {
			ev.preventDefault();
			carrito.iraComprar();
		});
	});
});

function loadPizzas(ctx, next) {
	request.get('/api/pizzas') //https://www.ragustino.cl/js/Conector.php
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.pizzas = res.body;
		next();
	});
}

function loadIngredientes(ctx, next) {
	request.get('/api/ingredientes') //https://www.ragustino.cl/js/ingredientes.php
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.ingredientes = res.body;
		next();
	});
}

function loadOtros(ctx, next) {
	request.get('/api/otro') //https://www.ragustino.cl/js/otro.php
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.otros = res.body;
		next();
	});
}

function loadPacks(ctx, next) {
	request.get('/api/packs') //https://www.ragustino.cl/js/pack
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.packs = res.body;
		next();
	});
}

function loadItems(ctx, next) {
	request.get('/api/items') //https://www.ragustino.cl/js/items.php
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.items = res.body;
		next();
	});
}

},{"../footer":35,"../header":37,"../utilities/aPesos":62,"../utilities/aPesos/wNumb":63,"./template":25,"empty-element":4,"page":13,"superagent":16,"title":21}],25:[function(require,module,exports){
var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');
var calzon = require('../products/calzon');
var piadina = require('../products/piadina');
var ingrediente = require('../products/ingrediente');
var item = require('../products/item');
var pack = require('../products/pack');
var aPesos = require('../utilities/aPesos');
var wNumb = require('../utilities/aPesos/wNumb');

module.exports = function (pizzas, otros, ingredientes, packs, items) {
	let mixsIng = ingredientes;
	var quesos = mixsIng.filter(function (obj) {
		if (obj.tipo === 'queso') {
			return true;
		} else {
			return false;
		}
	});

	var carnes = mixsIng.filter(function (obj) {
		if (obj.tipo === 'carne') {
			return true;
		} else {
			return false;
		}
	});

	var embus = mixsIng.filter(function (obj) {
		if (obj.tipo === 'embus') {
			return true;
		} else {
			return false;
		}
	});

	var espec = mixsIng.filter(function (obj) {
		if (obj.tipo === 'espec') {
			return true;
		} else {
			return false;
		}
	});

	var marinos = mixsIng.filter(function (obj) {
		if (obj.tipo === 'mar') {
			return true;
		} else {
			return false;
		}
	});

	var veget = mixsIng.filter(function (obj) {
		if (obj.tipo === 'verdu') {
			return true;
		} else {
			return false;
		}
	});

	let mixsPac = packs;
	var single = mixsPac.filter(function (obj) {
		if (obj.tipo === 'single') {
			return true;
		} else {
			return false;
		}
	});

	var four = mixsPac.filter(function (obj) {
		if (obj.tipo === 'four') {
			return true;
		} else {
			return false;
		}
	});

	var six = mixsPac.filter(function (obj) {
		if (obj.tipo === 'six') {
			return true;
		} else {
			return false;
		}
	});

	var eight = mixsPac.filter(function (obj) {
		if (obj.tipo === 'eight') {
			return true;
		} else {
			return false;
		}
	});

	let mixsIte = items;
	var queso = mixsIte.filter(function (obj) {
		if (obj.tipo === 'queso') {
			return true;
		} else {
			return false;
		}
	});

	var aceitunas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'aceit') {
			return true;
		} else {
			return false;
		}
	});

	var secos = mixsIte.filter(function (obj) {
		if (obj.tipo === 'secos') {
			return true;
		} else {
			return false;
		}
	});

	var papas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'papas') {
			return true;
		} else {
			return false;
		}
	});

	var chocos = mixsIte.filter(function (obj) {
		if (obj.tipo === 'choco') {
			return true;
		} else {
			return false;
		}
	});

	var galletas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'galle') {
			return true;
		} else {
			return false;
		}
	});

	var acces = mixsIte.filter(function (obj) {
		if (obj.tipo === 'acces') {
			return true;
		} else {
			return false;
		}
	});

	var latas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'beblata') {
			return true;
		} else {
			return false;
		}
	});

	var medias = mixsIte.filter(function (obj) {
		if (obj.tipo === 'bebgra') {
			return true;
		} else {
			return false;
		}
	});

	var bigs = mixsIte.filter(function (obj) {
		if (obj.tipo === 'bebext') {
			return true;
		} else {
			return false;
		}
	});

	var cervezas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'cerveza') {
			return true;
		} else {
			return false;
		}
	});

	var secos = mixsIte.filter(function (obj) {
		if (obj.tipo === 'secos') {
			return true;
		} else {
			return false;
		}
	});

	var aguas = mixsIte.filter(function (obj) {
		if (obj.tipo === 'agua') {
			return true;
		} else {
			return false;
		}
	});

	var jugos = mixsIte.filter(function (obj) {
		if (obj.tipo === 'jugo') {
			return true;
		} else {
			return false;
		}
	});

	var jugos = mixsIte.filter(function (obj) {
		if (obj.tipo === 'jugo') {
			return true;
		} else {
			return false;
		}
	});

	let mixsOtr = otros;
	var piadinas = mixsOtr.filter(function (obj) {
		if (obj.tipo === 'piadina') {
			return true;
		} else {
			return false;
		}
	});

	var calzones = mixsOtr.filter(function (obj) {
		if (obj.tipo === 'calzone') {
			return true;
		} else {
			return false;
		}
	});

	var el = yo`<div id="catalogo" class="col s12 seccion">
		<div class="row principal2">
			<div class="col s2 offset-s10 sp center-align">
				<a class="btn modal-trigger blue darken-2 chip-carro" href="#modal9"><i class="small material-icons left carrito">shopping_cart</i><span id="totalProductos">0</span></a>
			</div>
		</div>
		<div class="row">
			<div class="col s12 sp">
				<div class="slider hide-on-small-only">
					<ul class="slides">
						<li>
							<img src="slider1.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text">Aprovecha la oferta del mes</h3>
								<h5 class="light black-text">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal7">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="slider2.png"> <!-- random image -->
							<div class="caption right-align">
								<h3 class="black-text">Agenda fácilmente el DIA y HORA que quieres recibir tu pedido.</h3>
								<h5 class="light black-text">PROGRAMA para el mismo día o cuando quieras</h5>
								<h5 class="light black-text">SIN COBROS ADICIONALES</h5>
							</div>
						</li>
						<li>
							<img src="slider3.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text">Disfruta de nuestras exquisitas Pizzas, Calzones y Piadinas</h3>
								<h5 class="light black-text">y muchas sorpresas más...</h5>
							</div>
						</li>
					</ul>
				</div>
				<div class="slider hide-on-med-and-up">
					<ul class="slides">
						<li>
							<img src="sliders1.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Aprovecha la oferta del mes</h3>
								<h5 class="light black-text sliderMas">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal7">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="sliders2.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Agenda fácilmente el DIA y HORA que quieres recibir tu pedido.</h3>
								<h5 class="light black-text sliderMas">PROGRAMA para el mismo día o cuando quieras</h5>
								<h5 class="light black-text sliderMas">SIN COBROS ADICIONALES</h5>
							</div>
						</li>
						<li>
							<img src="sliders3.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Disfruta de nuestras exquisitas Pizzas, Calzones y Piadinas</h3>
								<h5 class="light black-text sliderMas">y muchas sorpresas más...</h5>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="collapsible popout" data-collapsible="accordion">
					<p class="menu-text pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
					<li>
					    <div id="collapPizzas" class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						    	<div class="col s12 white">
						    		<div class="row principal2">
						    			<div class="col s12 separar">
						    				<p class="menu-text grey-text text-darken-4 center-align">"Pizzas 100% artesanales, siguiendo la receta que aprendimos en Bagnoli, Nápoles.  Fermentamos la masa por más de 24 horas  para conseguir una pizza esponjosa, liviana y fácil de digerir.  Todas son cocinadas en horno de leña con ingredientes frescos y preparados con pasión, cariño y el toque RAGUSTINO."</p>
						    			</div>
						    		</div>
						    		<div class="row">
										<div class="col s12 ajuste-menu-store">
								    		${pizzas.map(function (pic) {
		return pizza(pic);
	})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas Calzones</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						   		<div class="col s12 white">
						   			<div class="row">
						   				<div class="col s12">
						   					<p class="menu-text">Pizza Calzones (2 Unidades)</p>
						   				</div>	
						   			</div>
						   			<div class="row">
						   				<div class="col s12 ajuste-menu-store">
						   	    			${calzones.map(function (pic) {
		return calzon(pic);
	})}
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Piadinas</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						   		<div class="col s12 white">
						   			<div class="row">
						   				<div class="col s12">
						   					<p class="menu-text">Piadinas (2 Unidades)</p>
						   				</div>	
						   			</div>
						   			<div class="row">
						   				<div class="col s12 ajuste-menu-store">
						   	    			${piadinas.map(function (pic) {
		return piadina(pic);
	})}
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Arma tu Pizza</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row" id="ingredientes">
						   		<div class="col s12 white">
						   			<div class="row principal2">
						   				<div class="col s12 separar">
						   					<p class="menu-text grey-text text-darken-4 center-align">Preparada en Masa Napolitana Clásica de Fermentación Lenta, más sanas y livianas para nuestro organismo. Para entregarte una verdadera experiencia gourmet, debes seleccionar entre 3 y 5 ingredientes, las especias no mestarán consideradas.</p>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Quesos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${quesos.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Carnes</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${carnes.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Embutidos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${embus.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Pescados y Mariscos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${marinos.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Vegetales</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${veget.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Especias</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${espec.map(function (pic) {
		return ingrediente(pic);
	})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row top">
						   				<div class="col s10 offset-s1 m4 offset-m4 center-align">
						   					<a id="agPizzaCustom" class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Para Beber</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
						       				<p class="menu-text">Bebidas en Lata</p>
						           		</div>	
						           	</div>
						           	<div class="row">
						       		   	${latas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Bebida de 1,5 Litros</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${medias.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Bebida de 3,0 Litros</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${bigs.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Cervezas sin Alcohol</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${cervezas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Jugos</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${jugos.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Aguas</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${aguas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Para Picar</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Quesos</p>
						           		</div>	
					           		</div>
						           	<div class="row">
					       		    	${queso.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Aceitunas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${aceitunas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Papas Fritas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${papas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Frutos Secos</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${secos.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Chocolates</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${chocos.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Galletas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${galletas.map(function (pic) {
		return item(pic);
	})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Accesorios</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
							       	<div class="row">
						       			<div class="col s12 ajuste-menu-store">
						       				${acces.map(function (pic) {
		return item(pic);
	})}
						       			</div>
						       		</div>
							    </div>
						    </div>
					    </div>
					</li>
				</ul>
			</div>
		</div>
	</div>`;

	return layout(el);
};
/*
<li>
    <div class="collapsible-header grey lighten-2 itemsCarta">
    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pack Regalo</p>
    </div>
    <div class="collapsible-body">
       	<div class="row">
	       	<div class="col s12 white">
	       		<div class="row">
	       			<div class="col s12 center-align">
       					<p class="menu-text">Sorprende a quien tu quieras con nuestros packs preparados con exquisitos productos.</p>
	           		</div>	
           		</div>
	           	<div class="row">
	           		<div class="col s12 ajuste-menu-store">
	       		    	${single.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       	</div>
	    </div>
    </div>
</li>
<li>
    <div class="collapsible-header grey lighten-2 itemsCarta">
    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pack Fiesta</p>
    </div>
    <div class="collapsible-body">
       	<div class="row">
	       	<div class="col s12 white">
	       		<div class="row">
	       			<div class="col s12 center-align">
       					<p class="menu-text">No te preocupes de los preparativos, la fiesta la armamos nosotros...</p>
	           		</div>	
           		</div>
	       		<div class="row">
	       			<div class="col s12">
       					<p class="menu-text">Pack´s para 04 personas.</p>
	           		</div>	
           		</div>
           		<div class="row">
	           		<div class="col s12 ajuste-menu-store">
	       		    	${four.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       		<div class="divider separar"></div>
	       		<div class="row">
	       			<div class="col s12">
       					<p class="menu-text">Pack´s para 06 personas.</p>
	           		</div>	
           		</div>
           		<div class="row">
	           		<div class="col s12 ajuste-menu-store">
	       		    	${six.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       		<div class="divider separar"></div>
	       		<div class="row">
	       			<div class="col s12">
       					<p class="menu-text">Pack´s para 08 personas.</p>
	           		</div>	
           		</div>
           		<div class="row">
	           		<div class="col s12 ajuste-menu-store">
	       		    	${eight.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       	</div>
	    </div>
    </div>
</li>
*/

},{"../layout":41,"../products/calzon":42,"../products/ingrediente":43,"../products/item":44,"../products/pack":45,"../products/piadina":49,"../products/pizza":50,"../utilities/aPesos":62,"../utilities/aPesos/wNumb":63,"yo-yo":22}],26:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');
var noUiSlider = require('nouislider');
var aPesos = require('../utilities/aPesos');
var wNumb = require('../utilities/aPesos/wNumb');

page('/compra', header, loadCarrito, footer, function (ctx, next) {
	title('Ragustino - Carro');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.itemsCarrito));

	function Carrito() {
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

		this.getTotal = function () {
			var total = 0;
			for (i of this.getCarrito) {
				total += parseFloat(i.cantidad) * parseFloat(i.price);
			}
			return total;
		};
	}

	function Comprando() {
		this.constructor = function () {
			if (!localStorage.getItem("comprando")) {
				localStorage.setItem('comprando', '[]');
			}
		};

		this.getComprando = JSON.parse(localStorage.getItem("comprando"));

		this.getDelivey = function () {
			var delivery = 0;
			var checkear = carrito.getTotal();
			for (i of carrito.getCarrito) {
				if (i.id === '900001') {
					var existeOferta = i;
				}
			}
			if (!existeOferta) {
				if (checkear < 30000) {
					delivery += 1500;
				}
			}

			return parseFloat(delivery);
		};
	}

	function Comprando_View() {
		this.renderCompra = function () {
			document.getElementById('todoHeader').classList.toggle('hide');
			if (carrito.getCarrito.length <= 0) {
				templateNoItemsCompra = `<p>No tienes productos en tu carro</p>`;
				document.getElementById('pintandoCompra').innerHTML = templateNoItemsCompra;
			}
			document.getElementById('deliveryCost').innerHTML = aPesos(comprando.getDelivey()) + ".-";
			let total = carrito.getTotal() + comprando.getDelivey();
			document.getElementById('totalCompra').innerHTML = aPesos(total) + ".-";
		};
	}

	function Programando_Compra() {
		var estaCompra = {};
		this.determinarAbierto = function (año, mes, dia, diaM, hora) {
			if (dia === 1 || dia === 2 || dia === 3) {
				document.getElementById('paraAhora').classList.toggle('hide');
				document.getElementById('templateParaAhora').innerHTML = `<div class="center-align blue-text text-darken-2">
					<p>Lo sentimos, hoy no atendemos</p>
					<p class="horariosCompra" >Nuestros Horarios</p>
					<p class="horariosCompra" >Jueves 18:00 - 0:00</p>
					<p class="horariosCompra" >Viernes 18:00 - 1:00</p>
					<p class="horariosCompra" >Sábado 18:00 - 1:00</p>
					<p class="horariosCompra" >Domingo 18:00 - 0:00</p>
				</div>`;
			} else {
				if (dia === 4 || dia === 0) {
					if (hora >= 18 && hora <= 23) {
						programando_compra.tiendaAbierta(año, mes, diaM);
					} else {
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy atendemos de 18:00 a 00:00 horas</p>`;
					}
				}
				if (dia === 5 || dia === 6) {
					if (hora >= 18 && hora <= 24) {
						programando_compra.tiendaAbierta(año, mes, diaM);
					} else {
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy atendemos de 18:00 a 01:00 horas</p>`;
					}
				}
			}
		};

		this.tiendaAbierta = function (año, mes, diaM) {
			document.getElementById('paraAhora').classList.toggle('hide');
			document.getElementById('templateParaAhora').innerHTML = `<div class="container">
				<div class="row">
					<div class="col s12 center-align">
						<i class="medium material-icons blue-text text-darken-2">check</i>
					</div>
				</div>
				<div id="contConfirmar" class="row nobottom">
					<div class="col s12 center-align">
						<a href="#" id="confirmandoAhora" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
					</div>
				</div>
			</div>`;
			document.getElementById('confirmandoAhora').addEventListener("click", function (ev) {
				ev.preventDefault();
				document.getElementById('listaMasTarde').classList.toggle('hide');
				document.getElementById('listaOtroDia').classList.toggle('hide');
				document.getElementById('contConfirmar').classList.toggle('hide');
				programando_compra.setearAhora(año, mes, diaM);
			});
		};

		this.setearAhora = function (año, mes, diaM) {
			estaCompra.delivery = '1';
			estaCompra.año = año;
			estaCompra.mes = mes;
			estaCompra.diam = diaM;
		};

		this.programandoHoy = function (año, mes, dia, diaM, hora, minuto) {
			if (dia === 1 || dia === 2 || dia === 3) {
				document.getElementById('masTarde').classList.toggle('hide');
				document.getElementById('templateMasTarde').innerHTML = `<div class="center-align blue-text text-darken-2">
					<p>Lo sentimos, hoy no atendemos</p>
					<p class="horariosCompra" >Nuestros Horarios</p>
					<p class="horariosCompra" >Jueves 18:00 - 0:00</p>
					<p class="horariosCompra" >Viernes 18:00 - 1:00</p>
					<p class="horariosCompra" >Sábado 18:00 - 1:00</p>
					<p class="horariosCompra" >Domingo 18:00 - 0:00</p>
				</div>`;
			} else {
				if (dia === 5 || dia === 6) {
					document.getElementById('masTarde').classList.toggle('hide');
					document.getElementById('textoMasTarde').classList.toggle('hide');
					document.getElementById('rangeMasTarde').classList.toggle('hide');

					var sliderH = document.getElementById('slider-hora');
					noUiSlider.create(sliderH, {
						start: [18],
						connect: [false, true],
						step: 1,
						range: {
							'min': 18,
							'max': 24
						},
						format: wNumb({
							decimals: 0
						})
					});

					var sliderHValueElement = document.getElementById('slider-hora-value');
					sliderH.noUiSlider.on('update', function (val) {
						sliderHValueElement.innerHTML = val;
					});

					var sliderM = document.getElementById('slider-minutos');
					noUiSlider.create(sliderM, {
						start: [10],
						connect: [false, true],
						step: 5,
						range: {
							'min': 0,
							'max': 59
						},
						format: wNumb({
							decimals: 0
						})
					});

					var sliderMValueElement = document.getElementById('slider-minutos-value');
					sliderM.noUiSlider.on('update', function (val) {
						sliderMValueElement.innerHTML = val;
					});
				}
				if (dia === 0 || dia === 4) {
					document.getElementById('masTarde').classList.toggle('hide');
					document.getElementById('textoMasTarde').classList.toggle('hide');
					document.getElementById('rangeMasTarde').classList.toggle('hide');

					var sliderH = document.getElementById('slider-hora');
					noUiSlider.create(sliderH, {
						start: [18],
						connect: [false, true],
						step: 1,
						range: {
							'min': 18,
							'max': 23
						},
						format: wNumb({
							decimals: 0
						})
					});

					var sliderHValueElement = document.getElementById('slider-hora-value');
					sliderH.noUiSlider.on('update', function (val) {
						sliderHValueElement.innerHTML = val;
					});

					var sliderM = document.getElementById('slider-minutos');
					noUiSlider.create(sliderM, {
						start: [10],
						connect: [false, true],
						step: 5,
						range: {
							'min': 0,
							'max': 59
						},
						format: wNumb({
							decimals: 0
						})
					});

					var sliderMValueElement = document.getElementById('slider-minutos-value');
					sliderM.noUiSlider.on('update', function (val) {
						sliderMValueElement.innerHTML = val;
					});
				}
			}
			document.getElementById('confirmandoMasTarde').addEventListener("click", function (ev) {
				ev.preventDefault();
				var checkHora = hora + 1;
				if (minuto < 30) {
					if (sliderH.noUiSlider.get() <= hora) {
						alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger la opción de Tan pronto sea posible.");
					} else {
						var horaP = sliderH.noUiSlider.get();
						var minP = sliderM.noUiSlider.get();
						programando_compra.programarOk(año, mes, diaM, horaP, minP);
					}
				} else {
					if (sliderH.noUiSlider.get() > checkHora) {
						var horaP = sliderH.noUiSlider.get();
						var minP = sliderM.noUiSlider.get();
						programando_compra.programarOk(año, mes, diaM, horaP, minP);
					} else {
						if (sliderH.noUiSlider.get() > hora) {
							if (sliderM.noUiSlider.get() < 30) {
								alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger la opción de Tan pronto sea posible.");
							} else {
								var horaP = sliderH.noUiSlider.get();
								var minP = sliderM.noUiSlider.get();
								programando_compra.programarOk(año, mes, diaM, horaP, minP);
							}
						} else {
							alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger un horario valido");
						}
					}
				}
			});
		};

		this.programarOk = function (año, mes, diaM, horaP, minP) {
			document.getElementById('listaAhora').classList.toggle('hide');
			document.getElementById('listaOtroDia').classList.toggle('hide');
			document.getElementById('rangeContainer').classList.toggle('hide');
			document.getElementById('confirmandoMasTarde').classList.toggle('hide');
			programando_compra.setearHoy(año, mes, diaM, horaP, minP);
		};

		this.setearHoy = function (año, mes, diaM, horaP, minP) {
			estaCompra.delivery = '2';
			estaCompra.año = año;
			estaCompra.mes = mes;
			estaCompra.diam = diaM;
			estaCompra.horap = horaP;
			estaCompra.minutop = minP;
		};

		this.setearOtro = function (fechaP, diaP, horaP, minP, año, mes, diaM) {
			if (diaP <= diaM) {
				alert("Debes programar un día a partir de mañana");
			} else {
				if (!fechaP) {
					alert("Tienes que seleccionar la fecha de entrega");
					return;
				}

				if (!horaP) {
					alert("Tienes que seleccionar la hora de entrega");
					return;
				}

				if (!minP) {
					alert("Tienes que seleccionar el minuto de entrega");
					return;
				}

				document.getElementById('listaAhora').classList.toggle('hide');
				document.getElementById('listaMasTarde').classList.toggle('hide');
				document.getElementById('texto1OtroDia').classList.toggle('hide');
				document.getElementById('texto2OtroDia').classList.toggle('hide');
				document.getElementById('texto3OtroDia').classList.toggle('hide');
				document.getElementById('paraOtro').classList.toggle('hide');
				estaCompra.delivery = '3';
				estaCompra.año = año;
				estaCompra.mes = mes;
				estaCompra.diam = diaM;
				estaCompra.fechap = fechaP;
				estaCompra.horap = horaP;
				estaCompra.minutop = minP;
			}
		};

		this.formaPago = function (pago) {
			if (pago == 1) {
				estaCompra.pago = pago;
				document.getElementById('pagoRedb').classList.toggle('hide');
				document.getElementById('pagoTran').classList.toggle('hide');
				document.getElementById('botonEfec').classList.toggle('hide');
				document.getElementById('tempEfec').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}

			if (pago == 2) {
				estaCompra.pago = pago;
				document.getElementById('pagoEfec').classList.toggle('hide');
				document.getElementById('pagoTran').classList.toggle('hide');
				document.getElementById('botonRedb').classList.toggle('hide');
				document.getElementById('tempRedb').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}

			if (pago == 3) {
				estaCompra.pago = pago;
				document.getElementById('pagoEfec').classList.toggle('hide');
				document.getElementById('pagoRedb').classList.toggle('hide');
				document.getElementById('botonTran').classList.toggle('hide');
				document.getElementById('tempTran').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}
		};

		this.setearDatos = function (client, address, email, fono) {
			if (!client) {
				alert("Debes ingresar nombre y apellido");
				return;
			}

			if (!address) {
				alert("Debes ingresar tu dirección");
				return;
			}

			if (!email) {
				alert("Debes ingresar tu correo electrónico");
				return;
			}

			if (!fono) {
				alert("Debes ingresar tu número de teléfono");
				return;
			}

			estaCompra.client = client;
			estaCompra.address = address;
			estaCompra.email = email;
			estaCompra.fono = fono;
			estaCompra.repartidor = '';
			estaCompra.cocina = 0;
			estaCompra.reparto = 0;
			estaCompra.ok = 0;
			document.getElementById('formCompra').classList.toggle('hide');
			document.getElementById('contFormCompra').innerHTML = `<div class="row">
				<div class="col s12 center-align">
					<p>${client}</p>
					<p>${address}</p>
					<p>${email}</p>
					<p>${fono}</p>
				</div>	
			</div>`;
		};

		this.setearFinal = function (hora, minuto) {
			if (!estaCompra.año) {
				alert("Debes programar tu entrega para ahora o después.");
				return;
			}

			if (!estaCompra.pago) {
				alert("Debes seleccionar tu forma de pago");
				return;
			}

			if (!estaCompra.client) {
				alert("Debes ingresar tus datos");
				return;
			}

			estaCompra.hora = hora;
			estaCompra.minuto = minuto;
			estaCompra.content = [];
			estaCompra.monto = carrito.getTotal();
			estaCompra.content.push(JSON.parse(localStorage.getItem("carrito")));
			var data = JSON.stringify(estaCompra);
			request.post('https://www.ragustino.cl/js/Compra.php').send(data).end(function (err, res) {
				alert("Gracias por tu preferencia, estamos procesando tu compra");
				localStorage.clear();
				page.redirect('/');
			});
		};
	}

	var carrito = new Carrito();
	var comprando = new Comprando();
	var comprando_view = new Comprando_View();
	var programando_compra = new Programando_Compra();

	$(document).ready(function () {
		$('.collapsible').collapsible();
		$('select').material_select();
		$('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 1,
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Ok',
			closeOnSelect: false,
			container: undefined
		});
		comprando_view.renderCompra();
		comprando.constructor();

		document.getElementById('finalizando').addEventListener("click", function (ev) {
			ev.preventDefault();
			var hoy = new Date();
			var año = hoy.getFullYear();
			var mes = hoy.getMonth();
			var dia = hoy.getDay();
			var diaM = hoy.getDate();
			if (ev.target.id === "paraAhora") {
				var hora = hoy.getHours();
				programando_compra.determinarAbierto(año, mes, dia, diaM, hora);
			}

			if (ev.target.id === "masTarde") {
				var hora = hoy.getHours();
				var minuto = hoy.getMinutes();
				programando_compra.programandoHoy(año, mes, dia, diaM, hora, minuto);
			}

			if (ev.target.id === "paraOtro") {
				var fechaP = document.getElementById("fechaOtro").value;
				var diaP = document.getElementById("fechaOtro").value[0] + document.getElementById("fechaOtro").value[1];
				var horaP = document.getElementById("horaOtro").value;
				var minP = document.getElementById("minOtro").value;
				programando_compra.setearOtro(fechaP, diaP, horaP, minP, año, mes, diaM);
			}

			if (ev.target.id === "botonEfec" || ev.target.id === "botonRedb" || ev.target.id === "botonTran") {
				var pago = ev.target.dataset.pago;
				programando_compra.formaPago(pago);
			}

			if (ev.target.id === "confDatos") {
				var client = document.getElementById("nomCompra").value;
				var address = document.getElementById("dirCompra").value;
				var email = document.getElementById("mailCompra").value;
				var fono = document.getElementById("fonoCompra").value;
				programando_compra.setearDatos(client, address, email, fono);
			}

			if (ev.target.id === "compraFinal") {
				var hora = hoy.getHours();
				var minuto = hoy.getMinutes();
				programando_compra.setearFinal(hora, minuto);
			}
		});
	});
});

function loadCarrito(ctx, next) {
	var itemsCarrito = JSON.parse(localStorage.getItem("carrito"));
	ctx.itemsCarrito = itemsCarrito;
	next();
}

},{"../footer":35,"../header":37,"../utilities/aPesos":62,"../utilities/aPesos/wNumb":63,"./template":34,"empty-element":4,"nouislider":11,"page":13,"superagent":16,"title":21}],27:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (picC) {
	return yo`<p class="itemPackOk">- ${picC.name}</p>`;
};

},{"yo-yo":22}],28:[function(require,module,exports){
var yo = require('yo-yo');
var opcionC = require('./customOp');
var aPesos = require('../../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			${aPesos(pic.price)}.-
		</div>
		<div class="col s12">
			${pic.ingredientes.map(function (picC) {
		return opcionC(picC);
	})}
		</div>
	</div>`;
};

},{"../../../utilities/aPesos":62,"./customOp":27,"yo-yo":22}],29:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			${aPesos(pic.price)}.-
		</div>
		<div class="col s12">
			<p class="itemPackOk">- ${pic.pizname}</p>
			<p class="itemPackOk">- ${pic.bebname}</p>
		</div>
	</div>`;
};

},{"../../../utilities/aPesos":62,"yo-yo":22}],30:[function(require,module,exports){
var yo = require('yo-yo');
var opcionI = require('./ipOpcion');
var aPesos = require('../../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			${aPesos(pic.price)}.-
		</div>
		<div class="col s12">
			${pic.contents.opciones.map(function (picI) {
		return opcionI(picI);
	})}
		</div>
	</div>`;
};

},{"../../../utilities/aPesos":62,"./ipOpcion":31,"yo-yo":22}],31:[function(require,module,exports){
var yo = require('yo-yo');
var opcionOk = require('./opcionCheck');

module.exports = function (picI) {
	return yo`<div class="row itemOk">
		<div class="col s12">
			${picI.items.map(function (picOk) {
		return opcionOk(picOk);
	})}
		</div>
	</div>`;
};

},{"./opcionCheck":32,"yo-yo":22}],32:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (picOk) {
	return yo`<p class="itemPackOk">${picOk.itemname}</p>`;
};

},{"yo-yo":22}],33:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			${aPesos(pic.price)}.-
		</div>
	</div>`;
};

},{"../../../utilities/aPesos":62,"yo-yo":22}],34:[function(require,module,exports){
var yo = require('yo-yo');
var layout = require('../layout');
var itemS = require('./products/itemSingle');
var itemP = require('./products/itemPack');
var itemC = require('./products/itemCustom');
var itemO = require('./products/itemOferta');

module.exports = function (itemsCarrito) {
	var singles = itemsCarrito.filter(function (obj) {
		if (!obj.excep && !obj.custom && !obj.oferta) {
			return true;
		} else {
			return false;
		}
	});
	var packs = itemsCarrito.filter(function (obj) {
		if (obj.excep) {
			return true;
		} else {
			return false;
		}
	});
	var customs = itemsCarrito.filter(function (obj) {
		if (obj.custom) {
			return true;
		} else {
			return false;
		}
	});

	var ofertas = itemsCarrito.filter(function (obj) {
		if (obj.oferta) {
			return true;
		} else {
			return false;
		}
	});

	var el = yo`<div id="finalizando" class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h3 class="compraTit">RAGUSTINO FOOD EXPERIENCE</h3>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="detalleCompra">Detalle de tu compra</p>
			</div>
		</div>
		<div class="row nobottom">
			<div id="pintandoCompra" class="col s12 center-align">
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${singles.map(function (pic) {
		return itemS(pic);
	})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${packs.map(function (pic) {
		return itemP(pic);
	})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${customs.map(function (pic) {
		return itemC(pic);
	})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${ofertas.map(function (pic) {
		return itemO(pic);
	})}
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando">
					<div class="col s9">
						<i class="tiny material-icons">motorcycle</i>Delivery
					</div>
					<div id="deliveryCost" class="col s3 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando totales">
					<div class="col s8">
						Total Compra
					</div>
					<div id="totalCompra" class="col s4 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<a href="/" class="waves-effect waves-light btn blue darken-2">Seguir Comprando</a>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programarCompra">Programa la Entrega</p>
			</div>
		</div>
		<div class="row">
			<div class="col s10 offset-s1 m4 offset-m4">
				<ul class="collapsible" class="">
					<li id="listaAhora">
						<div class="collapsible-header">Tan pronto sea posible</div>
						<div id="templateParaAhora" class="collapsible-body center-align">
							<a href="#" id="paraAhora" class="waves-effect waves-light btn blue darken-2">Consultar</a>
						</div>
					</li>
					<li id="listaMasTarde" class="">
						<div class="collapsible-header">Para más tarde</div>
						<div id="templateMasTarde" class="collapsible-body center-align">
							<a href="#" id="masTarde" class="waves-effect waves-light btn blue darken-2">Consultar</a>
							<div id="textoMasTarde" class="hide row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Selecciona Hora y Minutos</p>
								</div>
							</div>
							<div id="rangeMasTarde" class="hide row nobottom">
								<div class="col s12 center-align">
									<div id="rangeContainer" class="row">
										<div class="col s12 center-align">
											<div id="slider-hora"></div>
											<div class="separador" id="slider-minutos"></div>
										</div>
									</div>
									<div class="row">
										<div class="col s12 center-align">
											<span id="slider-hora-value"></span>:<span id="slider-minutos-value"></span> hrs.
										</div>
									</div>
									<div class="row">
										<div class="col s12 center-align">
											<a href="#" id="confirmandoMasTarde" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</li>
					<li id="listaOtroDia" class="">
						<div class="collapsible-header">Para otro día</div>
						<div class="collapsible-body">
							<div id="texto1OtroDia" class="row nobottom">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Indicanos la fecha de entrega en formato Día/Mes/Año</p>
								</div>
							</div>
							<div class="row nobottom">
								<div class="col s6 offset-s3">
									<input id="fechaOtro" type="text" class="datepicker fechaFinal">
								</div>
							</div>
							<div id="texto2OtroDia" class="row nobottom">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Indicanos la hora de entrega</p>
								</div>
							</div>
							<div class="row nobottom">
								<div class="col s6 offset-s3 center-align">
									<div id="" class="row nobottom">
										<div class="input-field col s5 horaFutura">
											<select id="horaOtro">
												<option value="" disabled selected>Hora</option>
												<option value="18">18</option>
												<option value="19">19</option>
												<option value="20">20</option>
												<option value="21">21</option>
												<option value="22">22</option>
												<option value="23">23</option>
												<option value="24">24</option>
											</select>
										</div>
										<div class="col s2 center-align separadorHora">
											<span>:</span>
										</div>
										<div class="input-field col s5 horaFutura">
											<select id="minOtro">
												<option value="" disabled selected>Min.</option>
												<option value="0">00</option>
												<option value="10">10</option>
												<option value="20">20</option>
												<option value="30">30</option>
												<option value="40">40</option>
												<option value="50">50</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div id="texto3OtroDia" class="row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Nuestro administrador se contactará contigo para confirmar factibilidad.</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12 center-align">
									<a href="#" id="paraOtro" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
								</div>
							</div>
						</div>
					</li>					
				</ul>
			</div>
		</div>
		<div id="contFormCompra" class="">
			<div id="formCompra" class="form">
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="programarCompra">Ingresa tus datos</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="nomCompra" type="text" class="validate formDefault">
						<label for="nomCompra">Nombre y Apellido</label>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="dirCompra" type="text" class="validate formDefault">
						<label for="dirCompra">Dirección</label>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="mailCompra" type="email" class="validate formDefault">
						<label for="mailCompra">Email</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="fonoCompra" type="tel" class="validate formDefault">
						<label for="fonoCompra">Teléfono</label>
					</div>
				</div>
				<div class="row">
					<div id="" class="col s12 center-align">
						<a href="#" id="confDatos" class="waves-effect waves-light btn blue darken-2">Confirmar Datos</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programarCompra">Forma de Pago</p>
			</div>
		</div>
		<div class="row">
			<div class="col s10 offset-s1 m4 offset-m4">
				<ul class="collapsible" class="">
					<li id="pagoEfec">
						<div class="collapsible-header">Pago en Efectivo</div>
						<div class="collapsible-body center-align">
							<div class="row">
								<div id="tempEfec" class="col s12 center-align">	
									<a href="#" id="botonEfec" class="waves-effect waves-light btn blue darken-2" data-pago="1">Confirmar</a>
								</div>
							</div>
						</div>
					</li>
					<li id="pagoRedb" class="">
						<div class="collapsible-header">Pago Redbank</div>
						<div id="tempRedb" class="collapsible-body center-align">
							<a href="#" id="botonRedb" class="waves-effect waves-light btn blue darken-2" data-pago="2">Confirmar</a>
						</div>
					</li>
					<li id="pagoTran" class="">
						<div class="collapsible-header">Transferencia</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12 center-align blue-text text-darken-2">
									<p>Nuestros datos:</p>
									<p class="horariosCompra" >Cuenta Corriente N° 1300242665</p>
									<p class="horariosCompra" >Banco Estado</p>
									<p class="horariosCompra" >Rut: 76.830.997-3</p>
									<p class="horariosCompra" >Servicios Gastronómicos GRC Ltda.</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Una vez confirmada la transferencia procesaremos tu pedido.</p>
								</div>
							</div>
							<div class="row">
								<div id="tempTran" class="col s12 center-align">
									<a href="#" id="botonTran" class="waves-effect waves-light btn blue darken-2" data-pago="3">Confirmar</a>
								</div>
							</div>
						</div>
					</li>					
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<a href="#" id="compraFinal" class="waves-effect waves-light btn blue darken-2">Comprar</a>
			</div>
		</div>
	</div>`;

	return layout(el);
};

},{"../layout":41,"./products/itemCustom":28,"./products/itemOferta":29,"./products/itemPack":30,"./products/itemSingle":33,"yo-yo":22}],35:[function(require,module,exports){
var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo`<footer class="page-footer grey lighten-2">
    <div class="container">
        <div class="row nobottom">
		    <div class="col l6 s12 boxEmp">
                <h5 class="grey-text text-darken-4 titFooter">RAGUSTINO FOOD EXPERIENCE</h5>
                <p class="grey-text text-darken-4 descFooter">Es una empresa perteneciente a SERVICIOS GASTRONOMICOS GRC LTDA.</p>
            </div>
            <div class="col s7 m3 center-align">
                <h5 class="grey-text text-darken-4 titFooter">Horarios Ragustino</h5>
                <ul class="listFooter">
                    <li><p class="grey-text text-darken-4 descFooter">Jueves y Domingo de 18:00 a 00:00 hrs.</p></li>
                    <li><p class="grey-text text-darken-4 descFooter">Viernes y Sábados de 18:00 a 01:00 hrs.</p></li>
                </ul>
            </div>
            <div class="col s5 m3 center-align">
                <h5 class="grey-text text-darken-4 titFooter">info@ragustino.cl</h5>
                <ul class="listFooter">
	                <li><p class="grey-text text-darken-4 descFooter">Whatsapp +56 986574828</p></li>
                    <li><p class="grey-text text-darken-4 descFooter">Fono Iquique 2 23106944</p></li>
                </ul>
        	</div>
        </div>
  	</div>
  	<div class="footer-copyright">
        <div class="grey-text text-darken-4 container">
            <div class="row nobottom descFooter">
                <div class="col s9">
        	       © 2018 Ragustino. Todos los derechos reservados. Diseñado por Casti
                </div>
                <div class="col s3">
                    <a class="grey-text text-darken-4 descFooter" href="/carta">-------</a>
                </div>
            </div>
        </div>
  	</div>
</footer>`;

module.exports = function footer(ctx, next) {
    var container = document.getElementById('footer-container');
    empty(container).appendChild(el);
    next();
};

},{"empty-element":4,"yo-yo":22}],36:[function(require,module,exports){
var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function () {
	$(".button-collapse").sideNav({
		menuWidth: 200,
		closeOnClick: true,
		draggable: true
	});
});

var el = yo`<nav class="header grey lighten-3">
	<div class="container smallH">
		<div class="row piso-nav">
			<div class="col s12 sp carrito">
				<div class="hide nav-wrapper">
					<div id="todoHeader" class="container barra">
						<div class="row piso-nav">
							<div class="col s2 sp">
							  	<a href="/" class="brand-logo ragus hide-on-med-and-down">Ragustino Food Experience</a>
							  	<a href="/" class="brand-logo ragus hide-on-large-only">Ragustino</a>
							  	<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
							</div>
							<div class="col l6">
								<ul class="right right hide-on-med-and-down">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
								<ul class="side-nav lateral" id="mobile-demo">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
							</div>
							<div class="col s2 offset-s6 l2 center-align sp">
								<a href="#" class="btn btn-flat dropdown-button chip-user center-align" data-activates="drop-user"><i class="small material-icons iconoSign">perm_identity</i></a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>`;

module.exports = function header(ctx, next) {

	var container = document.getElementById('header-container');
	empty(container).appendChild(el);
	next();
};

},{"empty-element":4,"yo-yo":22}],37:[function(require,module,exports){
var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function () {
	$(".button-collapse").sideNav({
		menuWidth: 200,
		closeOnClick: true,
		draggable: true
	});
});

var el = yo`<nav class="header grey lighten-3">
	<div class="container smallH">
		<div class="row piso-nav">
			<div class="col s12 sp carrito">
				<div class="nav-wrapper">
					<div id="todoHeader" class="container barra">
						<div class="row piso-nav">
							<div class="col s2 sp">
							  	<a href="/" class="brand-logo ragus hide-on-med-and-down">Ragustino Food Experience</a>
							  	<a href="/" class="brand-logo ragus hide-on-large-only">Ragustino</a>
							  	<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
							</div>
							<div class="col l6">
								<ul class="right right hide-on-med-and-down">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
								<ul class="side-nav lateral" id="mobile-demo">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
							</div>
							<div class="col s2 offset-s6 l2 center-align sp">
								<a href="#" class="btn btn-flat dropdown-button chip-user center-align" data-activates="drop-user"><i class="small material-icons iconoSign">perm_identity</i></a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>`;

module.exports = function header(ctx, next) {

	var container = document.getElementById('header-container');
	empty(container).appendChild(el);
	next();
};

},{"empty-element":4,"yo-yo":22}],38:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../headerTest');
var footer = require('../footer');

page('/', header, footer, function (ctx, next) {
	title('Ragustino');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());

	function Carrito() {
		this.constructor = function () {
			if (!localStorage.getItem("carrito")) {
				localStorage.setItem('carrito', '[]');
			}
		};
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));
	}

	function Armar_Pizza() {
		this.constructor = function () {
			if (!localStorage.getItem("ingredientes")) {
				localStorage.setItem('ingredientes', '[]');
			} else {
				if (this.getIngredientes.length > 0) {
					localStorage.setItem('ingredientes', '[]');
				}
			}
		};
		this.getIngredientes = JSON.parse(localStorage.getItem("ingredientes"));
	}

	function Comprando() {
		this.constructor = function () {
			if (!localStorage.getItem("comprando")) {
				localStorage.setItem('comprando', '[]');
			}
		};
	}

	var carrito = new Carrito();
	var armar_pizza = new Armar_Pizza();
	var comprando = new Comprando();

	$(document).ready(function () {
		carrito.constructor();
		comprando.constructor();
		armar_pizza.constructor();
	});
});

},{"../footer":35,"../headerTest":36,"./template":39,"empty-element":4,"page":13,"title":21}],39:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function () {
	return yo`<div class="col s12 seccion sp">
		<div class="row sp nobottom">
			<div class="col s12 center-align picHomeL">
				<img class="pic-ini hide-on-small-only" src="home.png" />
				<img class="pic-ini hide-on-med-and-up" src="home-small.png" />
			</div>
		</div>
	</div>`;
};

},{"yo-yo":22}],40:[function(require,module,exports){
var page = require('page');

require('./homepage');
require('./carta');
require('./somos');
require('./compra');
require('./ragsystem/homesystem');
require('./ragsystem/admin');

/*
require('./ragsystem-cocina');
require('./clients/signup');
require('./clients/signin');
*/

page();

},{"./carta":24,"./compra":26,"./homepage":38,"./ragsystem/admin":55,"./ragsystem/homesystem":58,"./somos":60,"page":13}],41:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function layout(content) {

	$(document).ready(function () {
		$('.modal').modal();
	});

	return yo`<div class="content fondo base">
		<div>
			<img class="pic-ini" src="arriba.png" />
		</div>
		<div class="container principal">
			<div class="row principal2">
				<div class="col s12 seccion">
					<div class="row">
						${content}
					</div>
				</div>
			</div>
		</div>
		<div id="modal9" class="modal bottom-sheet">
			<div class="container">
				<div class="row">
					<div class="col s12 titCarro">
						<div class="modal-content carritoV">
							<div class="row itemCarrito">
								<div class="col s8">
									<h4 class="tituloCarro">Tu Carro de Compras</h4>
								</div>
								<div class="col s4 right-align">
									<h4 class="tituloCarro" id="totalCarrito"></h4>
								</div>
							</div>
							<ul class="collection">
								<div class="row itemCarrito">
									<div class="col s12">
										<li class="collection-item arregloPad">
											<div class="row itemCarrito">
												<div class="col s3 m4 titCarro">
													Nombre
												</div>
												<div class="col s3 m2 right-align titCarro">
													Precio
												</div>
												<div class="col s2 m2 center-align titCarro">
													Cant.
												</div>
												<div class="col s2 m2 center-align titCarro">
													Total
												</div>
												<div class="col s2 m2 center-align titCarro">
													Quitar
												</div>
											</div>
										</li>
									</div>
								</div>
								<div class="row itemCarrito">
									<div id="productosCarrito" class="col s12">
									</div>
								</div>
							</ul>
						</div>
						<div class="modal-footer">
							<a id="comprando" class="waves-effect waves-light btn blue darken-2">Comprar</a>
							<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="modal8" class="modal">
			<div class="modal-content">
				<h4 class="armandoTit center-align">Nuestra Pizza a tu gusto</h4>
				<div class="row boxIng">
					<div class="col s12">
						<div class="row filaIng">
							<div class="col s8">
								Base
							</div>
							<div class="col s4 sp right-align">
								$ 6990.-
							</div>
						</div>
					</div>
					<div id="ingCustom" class="col s12">
					</div>
					<div class="col s12">
						<div class="row filaIng">
							<div class="col s6 totales">
								Total
							</div>
							<div class="col s6 sp right-align">
								<h4 class="totales" id="totalIngredientes"></h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="modal7" class="modal">
			<div class="modal-content">
				<h4 class="armandoTit center-align">Elije Pizza y Bebida</h4>
				<div class="row nobottom">
					<div class="input-field col s12">
						<select id="pizzaOferta">
							<option value="" disabled selected>Elije tu Pizza</option>
							<option value="101">Margherita</option>
							<option value="102">Caprese</option>
							<option value="103">Pollo al Pesto</option>
							<option value="104">Zuchinni Parmesano</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<select id="bebidaOferta">
							<option value="" disabled selected>Elije tu Bebida</option>
							<option value="201">Coca Cola Normal</option>
							<option value="202">Coca Cola zero</option>
							<option value="203">Fanta Normal</option>
							<option value="204">Fanta Zero</option>
							<option value="205">Sprite Normal</option>
							<option value="206">Sprite Zero</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 offset-s2 btnOferta center-align">
						<a href="#" id="addOferta" class="waves-effect waves-light btn blue darken-2">Confirmar Compra</a>
					</div>
				</div>
			</div>
		</div>
		<div>
			<img class="pic-ini" src="abajo.png" />
		</div>
	</div>`;
};

},{"yo-yo":22}],42:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="card pizza-card-content">
		<div class="card-image waves-effect waves-block waves-light">
			<img class="activator responsive" src="${pic.url}">
		</div>
		<div class="card-content">
			<span class="pizza-text card-title activator grey-text text-darken-2">${pic.name}</span>
			<a class="btn-floating right waves-effect waves-light blue darken-2 botonAgregar"><i class="material-icons" id="addItem" data-id="${pic.id}">add</i></a>
		</div>
		<div class="card-reveal">
		    <span class="pizza-text card-title blue-text text-darken-2">${pic.name}<i class="material-icons right">close</i></span>
		    <p class="pizza-content-text">${pic.content}</p>
		    <span class="left likes blue-text text-darken-2">Valor: ${aPesos(pic.price)}.-</span>
		</div>
	</div>`;
};

},{"../../utilities/aPesos":62,"yo-yo":22}],43:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="col s12 m6 contIng">
		<div class="row cursorHover">
			<div id="addIngrediente" data-id="${pic.id}" class="col s1 checkbox">
				<span id="${pic.id}" class=""><i id="addIngrediente" data-id="${pic.id}" class="small material-icons">check_box_outline_blank</i></span>
				<span id="${pic.id}${pic.id}" class="hide"><i id="addIngrediente" data-id="${pic.id}" class="small material-icons iconoCheck">check_box</i></span>
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s2 imgCont">
				<img src="${pic.url}" id="addIngrediente" data-id="${pic.id}" class="vegetal" />
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s7 m6 nameCont">
				<p id="addIngrediente" data-id="${pic.id}" class="ingName">${pic.name}</p>
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s2 precioIng">
				<p id="addIngrediente" data-id="${pic.id}" class="ingName">${aPesos(pic.price)}.-</p>
			</div>
		</div>
	</div>`;
};

},{"../../utilities/aPesos":62,"yo-yo":22}],44:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="col s12 m6 contItem">
		<div class="row">
			<div class="col s2 l2 offset-l1 contItem">
				<img src="${pic.url}" class="imagenItem" />
			</div>
			<div class="col s6 l5 col-text">
				<div class="row fila-nombre">
					<div class="col s12">
						<P class="item-text">${pic.name}</p>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<P class="detalle-text">${pic.content}</p>
					</div>
				</div>
			</div>
			<div class="col s2 contItem right-align">
				<span class="precioItem">${aPesos(pic.price)}.-</span>
			</div>
			<div class="col s2">
				<a class="btn-floating left waves-effect waves-light blue darken-2"><i class="material-icons" id="addItem" data-id="${pic.id}">add</i></a>
			</div>
		</div>
	</div>`;
};

},{"../../utilities/aPesos":62,"yo-yo":22}],45:[function(require,module,exports){
var yo = require('yo-yo');
var itemopt = require('./item-opt');
var itemoptt = require('./item-opt-opt');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="card pack-card-content">
		<div class="card-image waves-effect waves-block waves-light">
			<img class="activator responsive" src="${pic.url}">
		</div>
		<div class="card-content">
			<span class="pizza-text card-title activator grey-text text-darken-2">${pic.name}</span>
			<a class="btn-floating right waves-effect waves-light blue darken-2 botonAgregar"><i class="material-icons" id="addItemPack" data-id="${pic.id}">add</i></a>
		</div>
		<div class="card-reveal">
		    <span class="pizza-text card-title blue-text text-darken-2">${pic.name}<i class="material-icons right">close</i></span>
		    ${pic.contents.opciones.map(function (optt) {
		return itemoptt(optt);
	})}
		    ${pic.content.map(function (opt) {
		return itemopt(opt);
	})}
			<span class="left pack-price blue-text text-darken-2">Valor: ${aPesos(pic.price)}.-</span>
		</div>
	</div>`;
};

},{"../../utilities/aPesos":62,"./item-opt":48,"./item-opt-opt":46,"yo-yo":22}],46:[function(require,module,exports){
var yo = require('yo-yo');
var option = require('./option');

module.exports = function (optt) {
	return yo`<div class="col s12 opt-pizza">
		<ul>
			<li class="itemOpt"><a href="#" class="elegirOpcion" id="${optt.id}">- Selecciona tu ${optt.tipo}<i class="material-icons right">arrow_drop_down</i></a>
				<ul class="list" id="${optt.id}${optt.id}">	
					${optt.items.map(function (item) {
		return option(item);
	})}
				</ul>		
			</li>
		</ul>
	</div>`;
};

},{"./option":47,"yo-yo":22}],47:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (item) {
	return yo`<li class="itemOpt hover" id="itemSelect" data-idpack="${item.idpack}" data-idopt="${item.idopt}" data-id="${item.iditem}"><a href="#" id="itemSelect" class="opcionElejida" data-idpack="${item.idpack}" data-idopt="${item.idopt}" data-id="${item.iditem}">- ${item.itemname}</a></li>`;
};

},{"yo-yo":22}],48:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (opt) {
	return yo`<div class="col s12 opt-pizza">
		<p class="item-name-pack">${opt.optname}</p>
	</div>`;
};

},{"yo-yo":22}],49:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"../../utilities/aPesos":62,"dup":42,"yo-yo":22}],50:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="card pizza-card-content">
		<div class="card-image waves-effect waves-block waves-light">
			<img class="activator responsive" src="${pic.url}">
		</div>
		<div class="card-content">
			<span class="pizza-text card-title activator grey-text text-darken-2">${pic.name}</span>
			<a class="btn-floating right waves-effect waves-light blue darken-2 botonAgregar"><i class="material-icons" id="addItem" data-id="${pic.id}">add</i></a>
		</div>
		<div class="card-reveal">
		    <span class="pizza-text card-title blue-text text-darken-2">${pic.name}<i class="material-icons right">close</i></span>
		    <p class="pizza-content-text">${pic.content}</p>
		    <span class="left blue-text text-darken-2 pricePizza">Valor: ${aPesos(pic.price)}.-</span>
		</div>
	</div>`;
};

},{"../../utilities/aPesos":62,"yo-yo":22}],51:[function(require,module,exports){
var yo = require('yo-yo');
var opcCustom = require('./opcCustom');

module.exports = function (picC) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s9">
			${picC.name}
		</div>
		<div class="col s12">
			${picC.ingredientes.map(function (picCu) {
		return opcCustom(picCu);
	})}
		</div>
	</div>`;
};

},{"./opcCustom":52,"yo-yo":22}],52:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (picCu) {
	return yo`<p class="itemPackOk">- ${picCu.name}</p>`;
};

},{"yo-yo":22}],53:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (picO) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s11">
			${picO.name}
		</div>
		<div class="col s11">
			<p class="itemPackOk">- ${picO.pizname}</p>
			<p class="itemPackOk">- ${picO.bebname}</p>
		</div>
	</div>`;
};

},{"yo-yo":22}],54:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function (picS) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s11">
			<p class="datoVenta">${picS.cantidad} ${picS.name}</p>
		</div>
	</div>`;
};

},{"yo-yo":22}],55:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');

page('/ragsystem-admin', loadCompras, function (ctx, next) {
	title('Ragustino - Cocina');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.compras));

	function Administrando() {
		this.constructor = function () {
			if (!localStorage.getItem("administrando")) {
				localStorage.setItem('administrando', '[]');
			}
		};

		this.getAdministrando = JSON.parse(localStorage.getItem("administrando"));
	}

	var administrando = new Administrando();

	$(document).ready(function () {
		$('ul.tabs').tabs();
		administrando.constructor();
	});
});

function loadCompras(ctx, next) {
	request.get('/api/Compra') //https://www.ragustino.cl/js/...
	.end(function (err, res) {
		if (err) return console.log(err);

		ctx.compras = res.body;
		next();
	});
}

},{"./template":57,"empty-element":4,"page":13,"superagent":16,"title":21}],56:[function(require,module,exports){
var yo = require('yo-yo');
var aPesos = require('../../../utilities/aPesos');
var single = require('../compras/single');
var custom = require('../compras/custom');
var oferta = require('../compras/oferta');

module.exports = function (pic) {
	var singles = pic.content.filter(function (obj) {
		if (!obj.custom && !obj.oferta) {
			return true;
		} else {
			return false;
		}
	});

	var customs = pic.content.filter(function (obj) {
		if (obj.custom) {
			return true;
		} else {
			return false;
		}
	});

	var ofertas = pic.content.filter(function (obj) {
		if (obj.oferta) {
			return true;
		} else {
			return false;
		}
	});

	function tipoDelivery(val) {
		if (val === '1') {
			val = "ENTREGA INMEDIATA";
			return val;
		}

		if (val === '2') {
			val = "PARA MAS TARDE";
			return val;
		}

		if (val === '3') {
			val = "PARA OTRO DIA";
			return val;
		}
	}

	function tipoPago(val) {
		if (val === '1') {
			val = "Pago en Efectivo";
			return val;
		}

		if (val === '2') {
			val = "Pago con Redbank";
			return val;
		}

		if (val === '3') {
			val = "Pago con Transferencia";
			return val;
		}
	}

	return yo`<div class="col s12 left-align">
		<div class="row">
			<div class="col s12 m4">
				<p class="datoVenta">${pic.client}</p>
				<p class="datoVenta">${pic.address}</p>
				<p class="datoVenta">${pic.email}</p>
				<p class="datoVenta">${pic.fono}</p>
				<p class="datoVenta">${aPesos(pic.monto)}</p>
				<p class="datoVenta">${tipoPago(pic.pago)}</p>
				${tipoDelivery(pic.delivery)}
				<p class="datoVenta">Entregar a las ${pic.horap}:${pic.minutop}</p>
				<p class="datoVenta">Pedido a las ${pic.hora}:${pic.minuto}</p>
			</div>
			<div class="col s12 m5 left-align">
				${singles.map(function (picS) {
		return single(picS);
	})}
				${customs.map(function (picC) {
		return custom(picC);
	})}
				${ofertas.map(function (picO) {
		return oferta(picO);
	})}
			</div>
			<div class="col s12 m3">
				<div class="row nobottom">
					<div class="col s10 offset-s1 center-align">
						<p class="estado">Actualmente en:</p>
						<p id="estadoAdmin" class="red darken-4 white-text estadoCiclo">ADMIN</p>
						<p id="estadoCocina" class="blue darken-4 white-text estadoCiclo">COCINA</p>
						<p id="estadoReparto" class="orange darken-4 white-text estadoCiclo">REPARTO</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s10 offset-s1 center-align">
						<p class="pasar">Pasar a:</p>
						<a href="#" id="pasarCocina" class="waves-effect waves-light btn blue darken-2">COCINA</a>
						<a href="#" id="pasarReparto" class="waves-effect waves-light btn blue darken-2">REPARTO</a>
						<a href="#" id="finalFinal" class="waves-effect waves-light btn blue darken-2">CERRAR</a>
					</div>
				</div>			
			</div>
		</div>
		<div class="divider separar black"></div>
	</div>`;
};

},{"../../../utilities/aPesos":62,"../compras/custom":51,"../compras/oferta":53,"../compras/single":54,"yo-yo":22}],57:[function(require,module,exports){
var yo = require('yo-yo');
var nuevo = require('./nuevo');

module.exports = function (compra) {

	return yo`<div class="blue lighten-5">
		<div class="container grey lighten-2">
			<div class="row">
				<div class="col s12">
					<ul id="tabs" class="tabs blue darken-2">
						<li class="tab col s3"><a class="white-text" href="#test1">Pedidos</a></li>
						<li class="tab col s3"><a class="white-text" href="#test2">Otros</a></li>
						<li class="tab col s3"><a class="white-text" href="#test3">Otros</a></li>
					</ul>
					<div id="test1" class="col s12 grey lighten-2 systemView">
						<h3 class="systemTitulo">Pedidos en Proceso</h3>
						<div class="row nobottom">
							<div class="col s12 m4 left-align">
								<p>Datos</p>
							</div>
							<div class="col s12 m5 left-align">
								<p>Detalle</p>				
							</div>
							<div class="col s12 m3 center-align">
								<p>Acciones</p>		
							</div>
						</div>
						<div class="row nobottom">
							${compra.map(function (pic) {
		return nuevo(pic);
	})}
						</div>
					</div>
					<div id="test2" class="col s12 grey lighten-2 systemView">
						Proximamente
					</div>
					<div id="test3" class="col s12 grey lighten-2 systemView">
						Proximamente
					</div>
				</div>
			</div>	
		</div>
	</div>`;
};

},{"./nuevo":56,"yo-yo":22}],58:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/ragsystem', function (ctx, next) {
	title('Ragustino - System');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());
});

},{"./template":59,"empty-element":4,"page":13,"title":21}],59:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = function () {
	return yo`<div class="content">
		<div class="container">
			<div class="top row">
			    <div class="col s12 m6 offset-m3 l4 offset-l4 signin-box">
		            <form class="signin-form">
		                <div class="row">
		                    <div class="col s12">
		                        <h2 class="center-align">Inicia sesión</h2>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input id="email" type="email" class="validate formDefault" />
		                        <label for="email">Correo Electronico</label>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input id="password" type="password" class="validate formDefault">
		                        <label for="password">Contraseña</label>
		                    </div>
		                </div>
		                <div class="row signin-btn">
		                    <div class="col s12 center-align">
		                        <button class="btn waves-effect waves-light blue darken-2">Ingresar</button>
		                    </div>
		                </div>
		            </form>
		        </div>
			</div>
		</div>	
	</div>`;
};
/*
<ul class="collection with-header">
	<li class="collection-header"><h4>Pedidos</h4></li>
	<li class="collection-item avatar venta-item">
		<div class="row">
			<div class="col s12 m6">
				<span class="title">Dueño</span>
				<p>Direccion <br>
					Fono <br>
					Detalle
				</p>
			</div>
			<div class="col s12 m6">
				<form action="#">
					<div class="row">
						<div class="col s12 m4">
							<input type="checkbox" class="filled-in" id="filled-in-box50" />
							<label for="filled-in-box50">Cocina</label>
						</div>
						<div class="col s12 m4">
							<input type="checkbox" class="filled-in" id="filled-in-box52" />
							<label for="filled-in-box52">Despacho</label>
						</div>
						<div class="col s12 m4">
							<input type="checkbox" class="filled-in" id="filled-in-box53" />
							<label for="filled-in-box53">Entregado</label>
						</div>
					</div>		
				</form>
			</div>
		</div>
		<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
	</li>
</ul>
*/

},{"yo-yo":22}],60:[function(require,module,exports){
var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');

page('/somos', header, footer, function (ctx, next) {
	title('Nuestra Filosofia');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());
});

},{"../footer":35,"../header":37,"./template":61,"empty-element":4,"page":13,"title":21}],61:[function(require,module,exports){
var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">RAGUSTINO FOOD EXPERIENCE</h2>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programa">En RAGUSTINO FOOD EXPERIENCE puedes agendar fácilmente el DIA y HORA que quieres recibir tu pedido.   Entra a nuestra carta, selecciona tus favoritos y PROGRAMA para el mismo día o cuando quieras, SIN COBROS ADICIONALES</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Disfruta de la comida más deliciosa, equilibrada y nutritiva a tu puerta sin esperas ni retrasos...</p>
			</div>
			<div class="col s12 m4 offset-m4 center-align">
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horario"></p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">HORARIO: RAGUSTINO</p>
					</div>
				</div><div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Realiza repartos sólo de jueves a domingo:</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Jueves 18:00 - 0:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Viernes 18:00 - 1:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Sábado 18:00 - 1:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Domingo 18:00 - 0:00</p>
					</div>
				</div>
				<div class="row programa">
					<div class="col s2 offset-s4 l2 offset-l4 face center-align">
						<a href="http://www.facebook.com/ragustinofoodexperience" target="_blank" class="icon-facebook iconoRedes"></a>
					</div>
					<div class="col s2 l2 center-align insta">
						<a href="http://www.instagram.com/ragustinofoodexperience" target="_blank" class="icon-instagram iconoRedes"></a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Es un nuevo concepto de negocio, innovador, diferenciado y acorde a los tiempos actuales. Somos parte del cambio radical que ha experimentado la industria gastronómica desde la expansión sin precedentes de internet y las redes sociales. Somos un DELI GOURMET o un PORTAL WEB DE PEDIDOS GASTRONÓMICOS, pero queremos ir mucho más allá y darle un salto de calidad al ya clásico e irregular servicio de “pedido a domicilio”. Nuestro principal objetivo es entregar una experiencia gastronómica integral, moderna y de excelencia. Para ello contamos con una cocina creativa y versátil, procesos completamente digitalizados para pagos online, rastreo interactivo de reparto y programación de pedidos por horas o días. Cocinamos con pasión y trabajamos con energía porque NOS ENCANTA LO QUE HACEMOS! Queremos crecer e innovar pero por sobre todo queremos hacer la diferencia entregando siempre un servicio de calidad orientado al cliente. Te invitamos a disfrutar hoy de una nueva experiencia gourmet a domicilio. TE ESPERAMOS!!!</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>"Nuestras Pizzas son 100% artesanales, siguiendo la receta que aprendimos en Bagnoli, Nápoles.  Fermentamos la masa por más de 24 horas  para conseguir una pizza esponjosa, liviana y fácil de digerir.  Todas son cocinadas en horno de leña con ingredientes frescos y preparados con pasión, cariño y el toque RAGUSTINO."</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">QUE ES UNA PIADINA?</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>La piadina es un producto gastronómico de origen italiano, típico de las provincias de la Romaña. Está compuesto por una masa hojaldrada de harina de trigo, manteca o aceite de oliva, sal y agua. Se rellena con vegetales, quesos y jamones y se cocina sobre una piedra o plancha caliente por unos minutos. El resultado es delicioso, saludable y contundente. Ideal para quienes buscan nuevas opciones además de pizzas, sándwiches o creppes. Pide la tuya en exclusiva en RAGUSTINO FOOD EXPERIENCE!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">QUE ES UNA FOCACCIA?</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Es una pieza de pan aromática y apetitosa de origen italiano muy relacionada a la popular pizza aunque de mayor altura. Se cocina al fuego con romero y aceite de oliva y otros ingredientes. A nosotros nos encantan con aceitunas, un poco de cebolla glaseada y queso mozzarella. Mmmmm … Majestuosas!!!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">GRISSINIS</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Los grissinis italianos son palitos de pan aromatizados con especias, muy crocantes y de forma fina y alargada. Son el acompañamiento perfecto para ensaladas, jamones, quesos y salsas. Nuestro chef los prepara de albahaca y queso y los acompaña con una salsa sublime. IMPERDIBLES!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">ENSALADA RAGUSTINO</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>La más clásica de nuestras ensaladas y la primera de una serie que verán la luz muy pronto, inaugurando nuestra carta “primavera-verano”. “La RAGUSTINO” se compone de un mix de hojas verdes (espinaca, rúcula, lechuga francesa y escarola), un sutil toque de repollo, tomates cherry, cubitos de pepino, pollo a la plancha, tortilla chips, semillas de sésamo, nueces y aderezo (yoghurt griego, vinagre balsámico, aceite de oliva, mostaza Dijon, sal y pimienta). LOS CLÁSICOS NO PASAN DE MODA!</p>
			</div>
		</div>
	</div>`;

	return layout(el);
};

},{"../layout":41,"yo-yo":22}],62:[function(require,module,exports){
var wNumb = require('./wNumb');

module.exports = function (val) {
	var renderPrecio = parseInt(val);
	var formatoPesos = wNumb({
		decimals: 0,
		thousand: '.',
		prefix: '$ '
	});

	return formatoPesos.to(renderPrecio);
};

},{"./wNumb":63}],63:[function(require,module,exports){
(function (factory) {

	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {

		// Node/CommonJS
		module.exports = factory();
	} else {

		// Browser globals
		window.wNumb = factory();
	}
})(function () {

	'use strict';

	var FormatOptions = ['decimals', 'thousand', 'mark', 'prefix', 'suffix', 'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'];

	// General

	// Reverse a string
	function strReverse(a) {
		return a.split('').reverse().join('');
	}

	// Check if a string starts with a specified prefix.
	function strStartsWith(input, match) {
		return input.substring(0, match.length) === match;
	}

	// Check is a string ends in a specified suffix.
	function strEndsWith(input, match) {
		return input.slice(-1 * match.length) === match;
	}

	// Throw an error if formatting options are incompatible.
	function throwEqualError(F, a, b) {
		if ((F[a] || F[b]) && F[a] === F[b]) {
			throw new Error(a);
		}
	}

	// Check if a number is finite and not NaN
	function isValidNumber(input) {
		return typeof input === 'number' && isFinite(input);
	}

	// Provide rounding-accurate toFixed method.
	// Borrowed: http://stackoverflow.com/a/21323330/775265
	function toFixed(value, exp) {
		value = value.toString().split('e');
		value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)));
		value = value.toString().split('e');
		return (+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp))).toFixed(exp);
	}

	// Formatting

	// Accept a number as input, output formatted string.
	function formatTo(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

		var originalInput = input,
		    inputIsNegative,
		    inputPieces,
		    inputBase,
		    inputDecimals = '',
		    output = '';

		// Apply user encoder to the input.
		// Expected outcome: number.
		if (encoder) {
			input = encoder(input);
		}

		// Stop if no valid number was provided, the number is infinite or NaN.
		if (!isValidNumber(input)) {
			return false;
		}

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
			input = 0;
		}

		// Formatting is done on absolute numbers,
		// decorated by an optional negative symbol.
		if (input < 0) {
			inputIsNegative = true;
			input = Math.abs(input);
		}

		// Reduce the number of decimals to the specified option.
		if (decimals !== false) {
			input = toFixed(input, decimals);
		}

		// Transform the number into a string, so it can be split.
		input = input.toString();

		// Break the number on the decimal separator.
		if (input.indexOf('.') !== -1) {
			inputPieces = input.split('.');

			inputBase = inputPieces[0];

			if (mark) {
				inputDecimals = mark + inputPieces[1];
			}
		} else {

			// If it isn't split, the entire number will do.
			inputBase = input;
		}

		// Group numbers in sets of three.
		if (thousand) {
			inputBase = strReverse(inputBase).match(/.{1,3}/g);
			inputBase = strReverse(inputBase.join(strReverse(thousand)));
		}

		// If the number is negative, prefix with negation symbol.
		if (inputIsNegative && negativeBefore) {
			output += negativeBefore;
		}

		// Prefix the number
		if (prefix) {
			output += prefix;
		}

		// Normal negative option comes after the prefix. Defaults to '-'.
		if (inputIsNegative && negative) {
			output += negative;
		}

		// Append the actual number.
		output += inputBase;
		output += inputDecimals;

		// Apply the suffix.
		if (suffix) {
			output += suffix;
		}

		// Run the output through a user-specified post-formatter.
		if (edit) {
			output = edit(output, originalInput);
		}

		// All done.
		return output;
	}

	// Accept a sting as input, output decoded number.
	function formatFrom(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

		var originalInput = input,
		    inputIsNegative,
		    output = '';

		// User defined pre-decoder. Result must be a non empty string.
		if (undo) {
			input = undo(input);
		}

		// Test the input. Can't be empty.
		if (!input || typeof input !== 'string') {
			return false;
		}

		// If the string starts with the negativeBefore value: remove it.
		// Remember is was there, the number is negative.
		if (negativeBefore && strStartsWith(input, negativeBefore)) {
			input = input.replace(negativeBefore, '');
			inputIsNegative = true;
		}

		// Repeat the same procedure for the prefix.
		if (prefix && strStartsWith(input, prefix)) {
			input = input.replace(prefix, '');
		}

		// And again for negative.
		if (negative && strStartsWith(input, negative)) {
			input = input.replace(negative, '');
			inputIsNegative = true;
		}

		// Remove the suffix.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
		if (suffix && strEndsWith(input, suffix)) {
			input = input.slice(0, -1 * suffix.length);
		}

		// Remove the thousand grouping.
		if (thousand) {
			input = input.split(thousand).join('');
		}

		// Set the decimal separator back to period.
		if (mark) {
			input = input.replace(mark, '.');
		}

		// Prepend the negative symbol.
		if (inputIsNegative) {
			output += '-';
		}

		// Add the number
		output += input;

		// Trim all non-numeric characters (allow '.' and '-');
		output = output.replace(/[^0-9\.\-.]/g, '');

		// The value contains no parse-able number.
		if (output === '') {
			return false;
		}

		// Covert to number.
		output = Number(output);

		// Run the user-specified post-decoder.
		if (decoder) {
			output = decoder(output);
		}

		// Check is the output is valid, otherwise: return false.
		if (!isValidNumber(output)) {
			return false;
		}

		return output;
	}

	// Framework

	// Validate formatting options
	function validate(inputOptions) {

		var i,
		    optionName,
		    optionValue,
		    filteredOptions = {};

		if (inputOptions['suffix'] === undefined) {
			inputOptions['suffix'] = inputOptions['postfix'];
		}

		for (i = 0; i < FormatOptions.length; i += 1) {

			optionName = FormatOptions[i];
			optionValue = inputOptions[optionName];

			if (optionValue === undefined) {

				// Only default if negativeBefore isn't set.
				if (optionName === 'negative' && !filteredOptions.negativeBefore) {
					filteredOptions[optionName] = '-';
					// Don't set a default for mark when 'thousand' is set.
				} else if (optionName === 'mark' && filteredOptions.thousand !== '.') {
					filteredOptions[optionName] = '.';
				} else {
					filteredOptions[optionName] = false;
				}

				// Floating points in JS are stable up to 7 decimals.
			} else if (optionName === 'decimals') {
				if (optionValue >= 0 && optionValue < 8) {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

				// These options, when provided, must be functions.
			} else if (optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo') {
				if (typeof optionValue === 'function') {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}

				// Other options are strings.
			} else {

				if (typeof optionValue === 'string') {
					filteredOptions[optionName] = optionValue;
				} else {
					throw new Error(optionName);
				}
			}
		}

		// Some values can't be extracted from a
		// string if certain combinations are present.
		throwEqualError(filteredOptions, 'mark', 'thousand');
		throwEqualError(filteredOptions, 'prefix', 'negative');
		throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

		return filteredOptions;
	}

	// Pass all options as function arguments
	function passAll(options, method, input) {
		var i,
		    args = [];

		// Add all options in order of FormatOptions
		for (i = 0; i < FormatOptions.length; i += 1) {
			args.push(options[FormatOptions[i]]);
		}

		// Append the input, then call the method, presenting all
		// options as arguments.
		args.push(input);
		return method.apply('', args);
	}

	function wNumb(options) {

		if (!(this instanceof wNumb)) {
			return new wNumb(options);
		}

		if (typeof options !== "object") {
			return;
		}

		options = validate(options);

		// Call 'formatTo' with proper arguments.
		this.to = function (input) {
			return passAll(options, formatTo, input);
		};

		// Call 'formatFrom' with proper arguments.
		this.from = function (input) {
			return passAll(options, formatFrom, input);
		};
	}

	return wNumb;
});

},{}]},{},[40]);
