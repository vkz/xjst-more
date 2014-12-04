
/* begin: ../../libs/bem-core/common.blocks/i-bem/i-bem.bemhtml */
oninit(function(exports, context) {

var undef,
    BEM_ = {},
    toString = Object.prototype.toString,
    slice = Array.prototype.slice,
    isArray = Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    },
    SHORT_TAGS = { // хэш для быстрого определения, является ли тэг коротким
        area : 1, base : 1, br : 1, col : 1, command : 1, embed : 1, hr : 1, img : 1,
        input : 1, keygen : 1, link : 1, meta : 1, param : 1, source : 1, wbr : 1 };

(function(BEM, undefined) {

/**
 * Separator for modifiers and their values
 * @const
 * @type String
 */
var MOD_DELIM = '_',

/**
 * Separator between block names and a nested element
 * @const
 * @type String
 */
    ELEM_DELIM = '__',

/**
 * Pattern for acceptable names of elements and modifiers
 * @const
 * @type String
 */
    NAME_PATTERN = '[a-zA-Z0-9-]+';

function buildModPostfix(modName, modVal) {
    var res = MOD_DELIM + modName;
    if (modVal !== true) res += MOD_DELIM + modVal;
    return res;
}

function buildBlockClass(name, modName, modVal) {
    var res = name;
    if (modVal) res += buildModPostfix(modName, modVal);
    return res;
}

function buildElemClass(block, name, modName, modVal) {
    var res = buildBlockClass(block) + ELEM_DELIM + name;
    if (modVal) res += buildModPostfix(modName, modVal);
    return res;
}

BEM.INTERNAL = {

    NAME_PATTERN : NAME_PATTERN,

    MOD_DELIM : MOD_DELIM,
    ELEM_DELIM : ELEM_DELIM,

    buildModPostfix : buildModPostfix,

    /**
     * Builds the class for a block or element with a modifier
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Element name
     * @returns {String} Class string
     */
    buildClass : function(block, elem, modName, modVal) {
        var typeOfModName = typeof modName;
        if(typeOfModName === 'string' || typeOfModName === 'boolean') {
            var typeOfModVal = typeof modVal;
            if(typeOfModVal !== 'string' && typeOfModVal !== 'boolean') {
                modVal = modName;
                modName = elem;
                elem = undef;
            }
        } else if(typeOfModName !== 'undefined') {
            modName = undef;
        } else if(elem && typeof elem !== 'string') {
            elem = undef;
        }

        if(!(elem || modName)) { // simple case optimization
            return block;
        }

        return elem?
            buildElemClass(block, elem, modName, modVal) :
            buildBlockClass(block, modName, modVal);
    },

    /**
     * Builds modifier classes
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {Object} [mods] Modifier name
     * @returns {String} Class string
     */
    buildModsClasses : function(block, elem, mods) {
        var res = '';

        if(mods) {
            var modName; // TODO: do something with OmetaJS and YUI Compressor
            for(modName in mods) {
                if(!mods.hasOwnProperty(modName)) continue;

                var modVal = mods[modName];
                if(!modVal && modVal !== 0) continue;
                typeof modVal !== 'boolean' && (modVal += '');

                res += ' ' + (elem?
                    buildElemClass(block, elem, modName, modVal) :
                    buildBlockClass(block, modName, modVal));
            }
        }

        return res;
    },

    /**
     * Builds full classes for a block or element with modifiers
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {Object} [mods] Modifier name
     * @returns {String} Class string
     */
    buildClasses : function(block, elem, mods) {
        var res = '';

        res += elem?
            buildElemClass(block, elem) :
            buildBlockClass(block);

        res += this.buildModsClasses(block, elem, mods);

        return res;
    }

};

})(BEM_);

var buildEscape = (function() {
    var ts = { '"' : '&quot;', '&' : '&amp;', '<' : '&lt;', '>' : '&gt;' },
        f = function(t) { return ts[t] || t; };
    return function(r) {
        r = new RegExp(r, 'g');
        return function(s) { return ('' + s).replace(r, f); };
    };
})();

context.BEMContext = BEMContext;

function BEMContext(context, apply_) {
    this.ctx = typeof context === 'undefined'? '' : context;
    this.apply = apply_;
    this._str = '';

    // Compatibility stuff, just in case
    var _this = this;
    this._buf = {
        push: function() {
            var chunks = slice.call(arguments).join('');
            _this._str += chunks;
        },
        join: function() {
            return this._str;
        }
    };
    this._ = this;

    // Stub out fields that will be used later
    this._start = true;
    this._mode = '';
    this._listLength = 0;
    this._notNewList = false;
    this.position = 0;
    this.block = undef;
    this.elem = undef;
    this.mods = undef;
    this.elemMods = undef;
}

BEMContext.prototype.isArray = isArray;

BEMContext.prototype.isSimple = function isSimple(obj) {
    if(!obj || obj === true) return true;
    var t = typeof obj;
    return t === 'string' || t === 'number';
};

BEMContext.prototype.isShortTag = function isShortTag(t) {
    return SHORT_TAGS.hasOwnProperty(t);
};

BEMContext.prototype.extend = function extend(o1, o2) {
    if(!o1 || !o2) return o1 || o2;
    var res = {}, n;
    for(n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
    for(n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
    return res;
};

BEMContext.prototype.identify = (function() {
    var cnt = 0,
        id = (+new Date()),
        expando = '__' + id,
        get = function() { return 'uniq' + id + (++cnt); };
    return function(obj, onlyGet) {
        if(!obj) return get();
        if(onlyGet || obj[expando]) {
            return obj[expando];
        } else {
            return (obj[expando] = get());
        }
    };
})();

BEMContext.prototype.xmlEscape = buildEscape('[&<>]');
BEMContext.prototype.attrEscape = buildEscape('["&<>]');

BEMContext.prototype.BEM = BEM_;

BEMContext.prototype.isFirst = function isFirst() {
    return this.position === 1;
};

BEMContext.prototype.isLast = function isLast() {
    return this.position === this._listLength;
};

BEMContext.prototype.generateId = function generateId() {
    return this.identify(this.ctx);
};

// Wrap xjst's apply and export our own
var oldApply = exports.apply;
exports.apply = BEMContext.apply = function BEMContext_apply(context) {
    var ctx = new BEMContext(context || this, oldApply);
    ctx.apply();
    return ctx._str;
};

BEMContext.prototype.reapply = BEMContext.apply;

}); // oninit

match(this._mode === '')(

    match()(function() {
        this.ctx || (this.ctx = {});

        var vBlock = this.ctx.block,
            vElem = this.ctx.elem,
            block = this._currBlock || this.block;

        local('default', {
            block : vBlock || (vElem? block : undefined),
            _currBlock : vBlock || vElem? undefined : block,
            elem : vElem,
            mods : vBlock? this.ctx.mods || (this.ctx.mods = {}) : this.mods,
            elemMods : this.ctx.elemMods || {}
        })(function() {
            (this.block || this.elem)?
                (this.position = (this.position || 0) + 1) :
                this._listLength--;
            apply();
        });
    }),

    match(function() { return this.isArray(this.ctx); })(function() {
        var ctx = this.ctx,
            len = ctx.length,
            i = 0,
            prevPos = this.position,
            prevNotNewList = this._notNewList;

        if(prevNotNewList) {
            this._listLength += len - 1;
        } else {
            this.position = 0;
            this._listLength = len;
        }

        this._notNewList = true;

        while(i < len)
            apply({ ctx : ctx[i++] });

        prevNotNewList || (this.position = prevPos);
    }),

    match(!this.ctx)(function() {
        this._listLength--;
    }),

    match(function() { return this.isSimple(this.ctx); })(function() {
        this._listLength--;

        var ctx = this.ctx;
        if(ctx && ctx !== true || ctx === 0) {
            this._str += ctx + '';
        }
    }),

    // hack-check for Vow-promise
    match(this.ctx && this.ctx._vow)(function() {
        applyCtx(this.ctx._value);
    })

);

def()(function() {
    var _this = this,
        BEM_INTERNAL = _this.BEM.INTERNAL,
        ctx = this.ctx,
        isBEM,
        tag,
        res;

    local({ _str: '' })(function() {
        var vBlock = this.block;

        tag = apply('tag');
        typeof tag !== 'undefined' || (tag = ctx.tag);
        typeof tag !== 'undefined' || (tag = 'div');

        if(tag) {
            var jsParams, js;
            if(vBlock && ctx.js !== false) {
                js = apply('js');
                js = js? this.extend(ctx.js, js === true? {} : js) : ctx.js === true? {} : ctx.js;
                js && ((jsParams = {})[BEM_INTERNAL.buildClass(vBlock, ctx.elem)] = js);
            }

            this._str += '<' + tag;

            isBEM = apply('bem');
            typeof isBEM !== 'undefined' ||
                (isBEM = typeof ctx.bem !== 'undefined'? ctx.bem : ctx.block || ctx.elem);

            var cls = apply('cls');
            cls || (cls = ctx.cls);

            var addJSInitClass = ctx.block && jsParams;
            if(isBEM || cls) {
                this._str += ' class="';
                if(isBEM) {
                    this._str += BEM_INTERNAL.buildClasses(vBlock, ctx.elem, ctx.elemMods || ctx.mods);

                    var mix = apply('mix');
                    ctx.mix && (mix = mix? mix.concat(ctx.mix) : ctx.mix);

                    if(mix) {
                        var visited = {},
                            visitedKey = function(block, elem) {
                                return (block || '') + '__' + (elem || '');
                            };

                        visited[visitedKey(vBlock, this.elem)] = true;

                        // Transform mix to the single-item array if it's not array
                        this.isArray(mix) || (mix = [mix]);
                        for(var i = 0; i < mix.length; i++) {
                            var mixItem = mix[i],
                                hasItem = mixItem.block || mixItem.elem,
                                mixBlock = mixItem.block || mixItem._block || _this.block,
                                mixElem = mixItem.elem || mixItem._elem || _this.elem;

                            hasItem && (this._str += ' ');

                            this._str += BEM_INTERNAL[hasItem? 'buildClasses' : 'buildModsClasses'](
                                mixBlock,
                                mixItem.elem || mixItem._elem ||
                                    (mixItem.block? undefined : _this.elem),
                                mixItem.elemMods || mixItem.mods);

                            if(mixItem.js) {
                                (jsParams ||
                                        (jsParams = {}))[BEM_INTERNAL.buildClass(mixBlock, mixItem.elem)] = mixItem.js === true?
                                    {} :
                                    mixItem.js;
                                addJSInitClass || (addJSInitClass = mixBlock && !mixItem.elem);
                            }

                            // Process nested mixes
                            if(hasItem && !visited[visitedKey(mixBlock, mixElem)]) {
                                visited[visitedKey(mixBlock, mixElem)] = true;
                                var nestedMix = apply('mix', {
                                    block : mixBlock,
                                    elem : mixElem
                                });

                                if(nestedMix) {
                                    for(var j = 0; j < nestedMix.length; j++) {
                                        var nestedItem = nestedMix[j];
                                        if(!nestedItem.block &&
                                                !nestedItem.elem ||
                                                !visited[visitedKey(
                                                    nestedItem.block,
                                                    nestedItem.elem
                                                )]) {
                                            nestedItem._block = mixBlock;
                                            nestedItem._elem = mixElem;
                                            mix.splice(i + 1, 0, nestedItem);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                cls && (this._str += isBEM? ' ' + cls : cls);
                this._str += addJSInitClass? ' i-bem"' : '"';
            }

            if(isBEM && jsParams) {
                this._str += ' data-bem="' +
                    this.attrEscape(JSON.stringify(jsParams)) +
                    '"';
            }

            var attrs = apply('attrs');
            // NOTE: maybe we need to make an array for quicker serialization
            attrs = this.extend(attrs, ctx.attrs);
            if(attrs) {
                var name, attr; // TODO: do something with OmetaJS and YUI Compressor
                for(name in attrs) {
                    attr = attrs[name];
                    if(typeof attr === 'undefined') continue;
                    this._str += ' ' + name + '="' +
                        this.attrEscape(this.isSimple(attr)?
                            attr :
                            this.reapply(attr)) +
                        '"';
                }
            }
        }

        if(this.isShortTag(tag)) {
            this._str += '/>';
        } else {
            tag && (this._str += '>');

            var content = apply('content');
            if(content || content === 0) {
                isBEM = vBlock || this.elem;
                apply('', {
                    _notNewList : false,
                    position : isBEM? 1 : this.position,
                    _listLength : isBEM? 1 : this._listLength,
                    ctx : content
                });
            }

            tag && (this._str += '</' + tag + '>');
        }

        // If the buffer was replaced, pretend that we're pushing to the buffer
        res = this._str;
    });

    this._buf.push(res);
});

tag()(undefined);
attrs()(undefined);
cls()(undefined);
js()(undefined);
bem()(undefined);
mix()(undefined);
content()(function() { return this.ctx.content; });

/* end: ../../libs/bem-core/common.blocks/i-bem/i-bem.bemhtml */


/* begin: ../../libs/bem-core/common.blocks/page/page.bemhtml */
block('page')(

    def()(function() {
        var ctx = this.ctx;
        applyCtx([
            ctx.doctype || '<!DOCTYPE html>',
            {
                tag : 'html',
                cls : 'ua_js_no',
                content : [
                    {
                        elem : 'head',
                        content : [
                            { tag : 'meta', attrs : { charset : 'utf-8' } },
                            { tag : 'title', content : ctx.title },
                            { block : 'ua' },
                            ctx.head,
                            ctx.styles,
                            ctx.favicon? { elem : 'favicon', url : ctx.favicon } : ''
                        ]
                    },
                    // Добавляем элемент, чтобы сработал другой шаблон и не было зацикливания
                    this.extend(ctx, { elem : 'body' })
                ]
            }
        ]);
    }),

    elem('body')(
        tag()('body'),
        content()(function() {
            return [
                applyNext(),
                this.ctx.scripts
            ];
        }),
        def()(function() {
            // Обратно очищаем поле elem, чтобы сохранить правильный контекст
            this.ctx.elem = null;
            applyNext();
        })
    ),

    elem('head')(
        bem()(false),
        tag()('head')
    ),

    elem('meta')(
        bem()(false),
        tag()('meta')
    ),

    elem('link')(
        bem()(false),
        tag()('link')
    ),

    elem('favicon')(
        bem()(false),
        tag()('link'),
        attrs()(function() { return { rel : 'shortcut icon', href : this.ctx.url }; })
    )

);

/* end: ../../libs/bem-core/common.blocks/page/page.bemhtml */


/* begin: ../../libs/bem-core/desktop.blocks/page/page.bemhtml */
block('page')(
    elem('head')(
        content()(function () {
            return [
                this.ctx['x-ua-compatible'] === false ?
                    false :
                    {
                        tag : 'meta',
                        attrs : {
                            'http-equiv' : 'X-UA-Compatible',
                            content : this.ctx['x-ua-compatible'] || 'IE=edge'
                        }
                    },
                applyNext()
            ];
        })
    )
);

/* end: ../../libs/bem-core/desktop.blocks/page/page.bemhtml */


/* begin: ../../libs/bem-core/common.blocks/ua/ua.bemhtml */
block('ua')(
    tag()('script'),
    bem()(false),
    content()([
        '(function(e,c){',
            'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");',
        '})(document.documentElement,"className");'
    ])
);

/* end: ../../libs/bem-core/common.blocks/ua/ua.bemhtml */


/* begin: ../../libs/bem-core/common.blocks/page/__css/page__css.bemhtml */
block('page').elem('css')(
    bem()(false),
    tag()('style'),
    match(function() { return this.ctx.url; })(
        tag()('link'),
        attrs()(function() { return { rel : 'stylesheet', href : this.ctx.url }; })
    )
);

/* end: ../../libs/bem-core/common.blocks/page/__css/page__css.bemhtml */


/* begin: ../../libs/bem-core/desktop.blocks/page/__css/page__css.bemhtml */
block('page').elem('css')(
    def()
        .match(function() { return this.ctx.hasOwnProperty('ie'); })
        .match(function() { return !this.ctx._ieCommented; })(
            function() {
                var ie = this.ctx.ie,
                    hideRule = !ie?
                        ['gt IE 9', '<!-->', '<!--'] :
                        ie === '!IE'?
                            [ie, '<!-->', '<!--'] :
                            [ie, '', ''];
                apply(
                    '',
                    { 'ctx._ieCommented' : true },
                    {
                        ctx : [
                            '<!--[if ' + hideRule[0] + ']>' + hideRule[1],
                            this.ctx,
                            hideRule[2] + '<![endif]-->'
                        ]
                    }
                );
            },
            match(function() { return this.ctx.ie === true; })(function() {
                var url = this.ctx.url;
                applyCtx([6, 7, 8, 9].map(function(v) {
                    return { elem : 'css', url : url + '.ie' + v + '.css', ie : 'IE ' + v };
                }));
            }))
);

/* end: ../../libs/bem-core/desktop.blocks/page/__css/page__css.bemhtml */


/* begin: ../../libs/bem-core/common.blocks/page/__js/page__js.bemhtml */
block('page').elem('js')(
    bem()(false),
    tag()('script'),
    attrs().match(function() { return this.ctx.url; })(function() {
        return { src : this.ctx.url };
    })
);

/* end: ../../libs/bem-core/common.blocks/page/__js/page__js.bemhtml */


/* begin: ../../common.blocks/header/header.bemhtml */
block('header')(
    mix()({ block: 'container' })
);

/* end: ../../common.blocks/header/header.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/link/link.bemhtml */
block('link')(
    tag()('a'),

    js()(true),

    // Implements `base-control`'s interface
    mix()([{ elem : 'control' }]),

    attrs()(function() {
        var ctx = this.ctx,
            attrs = {
                tabindex : ctx.tabIndex
            },
            url = ctx.url,
            typeOfUrl = typeof url;

        typeOfUrl !== 'undefined' && (attrs.href = typeOfUrl === 'string'?
            url :
            this.reapply(url)); // url could contain bemjson

        // default value for tabindex in case of link \wo href, so link could be focusable
        typeof attrs.href === 'undefined' &&
            typeof attrs.tabindex === 'undefined' &&
            (attrs.tabindex = 0);

        ctx.title && (attrs.title = ctx.title);
        ctx.target && (attrs.target = ctx.target);

        return attrs;
    })
)

/* end: ../../libs/bem-components/common.blocks/link/link.bemhtml */


/* begin: ../../common.blocks/logo/logo.bemhtml */
block('logo')(
    tag()('a'),

    attrs()({href: '/'})
);

/* end: ../../common.blocks/logo/logo.bemhtml */


/* begin: ../../common.blocks/content/content.bemhtml */
block('content')(
    mix()({ block: 'container' })
);

/* end: ../../common.blocks/content/content.bemhtml */


/* begin: ../../common.blocks/article/article.bemhtml */
block('article')(
    mix()({ block: 'clearfix' }),
    elem('title')(
        tag()('h2')
    )
);

/* end: ../../common.blocks/article/article.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/image/image.bemhtml */
block('image')(
    tag()('img'),
    attrs()(function() {
        var ctx = this.ctx;
        return {
            src : ctx.url,
            width : ctx.width,
            height : ctx.height,
            alt : ctx.alt,
            title : ctx.title
        };
    })
)

/* end: ../../libs/bem-components/common.blocks/image/image.bemhtml */


/* begin: ../../common.blocks/board/board.bemhtml */
block('board')(
    elem('title')(
        tag()('h3')
    ),
    elem('subtitle')(
        tag()('h4')
    )
);

/* end: ../../common.blocks/board/board.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/dropdown/dropdown.bemhtml */
block('dropdown')(
    js()(true),

    content()(function() {
        var popup = this.ctx.popup;

        if(this.isSimple(popup) || popup.block !== 'popup') {
            (popup = { block : 'popup', content : popup });
        }

        var popupMods = popup.mods || (popup.mods = {});
        popupMods.theme || (popupMods.theme = this.mods.theme);
        popupMods.hasOwnProperty('autoclosable') || (popupMods.autoclosable = true);

        return [
            { elem : 'switcher', content : this.ctx.switcher },
            popup
        ];
    })
)

/* end: ../../libs/bem-components/common.blocks/dropdown/dropdown.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/dropdown/__switcher/dropdown__switcher.bemhtml */
block('dropdown').elem('switcher').tag()('')

/* end: ../../libs/bem-components/common.blocks/dropdown/__switcher/dropdown__switcher.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/popup/popup.bemhtml */
block('popup')(
    js()(true)
)

/* end: ../../libs/bem-components/common.blocks/popup/popup.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_button.bemhtml */
block('dropdown').mod('switcher', 'button').elem('switcher').content()(function() {
    var content = this.ctx.content;
    if(this.isArray(content)) return content;

    var res = this.isSimple(content)?
        { block : 'button', text : content } :
        content;

    if(res.block === 'button') {
        var resMods = res.mods || (res.mods = {}),
            dropdownMods = this.mods;
        resMods.size || (resMods.size = dropdownMods.size);
        resMods.theme || (resMods.theme = dropdownMods.theme);
        resMods.disabled = dropdownMods.disabled;
    }

    return res;
})

/* end: ../../libs/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_button.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/button/button.bemhtml */
block('button')(
    def()(function() {
        var mods = this.mods;
        applyNext({ _button : this.ctx });
    }),

    tag()(function() {
        return this.ctx.tag || 'button';
    }),

    js()(true),

    // Implements `base-control`'s interface
    mix()([{ elem : 'control' }]),

    attrs()(
        // Common attributes
        function() {
            var ctx = this.ctx,
                attrs = { role : 'button' };

            ctx.tabIndex && (attrs.tabindex = ctx.tabIndex);

            return attrs;
        },

        // Attributes for button variant
        match(function() { return !this.mods.type })(function() {
            var ctx = this.ctx,
                attrs = {};

            ctx.tag || (attrs.type = ctx.type || 'button');

            ctx.name && (attrs.name = ctx.name);
            ctx.val && (attrs.value = ctx.val);
            this.mods.disabled && (attrs.disabled = 'disabled');

            return this._.extend(applyNext(), attrs);
        })
    ),

    content()(
        function() {
            var ctx = this.ctx, content = [this.ctx.icon];
            // NOTE: не вынесли в отдельные шаблоны ради оптимизации
            ctx.text && content.push({ elem : 'text', content : ctx.text });
            return content;
        },
        match(function() { return typeof this.ctx.content !== 'undefined' })(function() {
            return this.ctx.content;
        })
    )
)

/* end: ../../libs/bem-components/common.blocks/button/button.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/button/__text/button__text.bemhtml */
block('button').elem('text')(
    tag()('span'),
    match(function() { return typeof this._button.textMaxWidth === 'number' }).attrs()(function() {
        return { style : 'max-width:' + this._button.textMaxWidth + 'px' };
    })
)

/* end: ../../libs/bem-components/common.blocks/button/__text/button__text.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/button/_focused/button_focused.bemhtml */
block('button').mod('focused', true).js()(function() {
    return this.extend(applyNext(), { live : false });
})

/* end: ../../libs/bem-components/common.blocks/button/_focused/button_focused.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_link.bemhtml */
block('dropdown').mod('switcher', 'link').elem('switcher').content()(function() {
    var content = this.ctx.content;
    if(this.isArray(content)) return content;

    var res = this.isSimple(content)?
        { block : 'link', mods : { pseudo : true }, content : content } :
        content;


    if(res.block === 'link') {
        var resMods = res.mods || (res.mods = {}),
            dropdownMods = this.mods;
        resMods.theme || (resMods.theme = dropdownMods.theme);
        resMods.disabled = dropdownMods.disabled;
    }

    return res;
})

/* end: ../../libs/bem-components/common.blocks/dropdown/_switcher/dropdown_switcher_link.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/link/_pseudo/link_pseudo.bemhtml */
block('link').mod('pseudo', true)(
    tag().match(function() { return !this.ctx.url })('span')
)

/* end: ../../libs/bem-components/common.blocks/link/_pseudo/link_pseudo.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/input/input.bemhtml */
block('input')(
    tag()('span'),
    js()(true),
    def()(function() {
        var ctx = this.ctx;
        ctx.id = ctx.id || this.generateId();
        applyNext({ _input: ctx })
    }),
    content()(
        function() {
            var ctx = this.ctx, content = [{ elem: 'control' }];
            // NOTE: not made in separate templates for perf optimization
            ctx.label && this.mods['has-label'] && content.unshift({ elem: 'label', content: ctx.label });
            return content;
        },
        match(function() { return typeof this.ctx.content !== 'undefined' })(function() {
            return this.ctx.content;
        })
    )
)

/* end: ../../libs/bem-components/common.blocks/input/input.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/input/__box/input__box.bemhtml */
block('input').elem('box').tag()('span')

/* end: ../../libs/bem-components/common.blocks/input/__box/input__box.bemhtml */


/* begin: ../../libs/bem-components/common.blocks/input/__control/input__control.bemhtml */
block('input').elem('control')(

    tag()('input'),

    attrs()(function() {
        var input = this._input,
            attrs = {
                id: input.id,
                name: input.name,
                value: input.val,
                maxlength: input.maxLength,
                tabindex: input.tabIndex,
                placeholder: input.placeholder
            };

        input.autocomplete === false && (attrs.autocomplete = 'off');
        this.mods.disabled && (attrs.disabled = 'disabled');

        return attrs;
    }),

    def().match(function() { return !this._input__control })(function() {
        applyCtx(
            { '_input__control': true },
            {
                elem: 'box',
                content: this.ctx
            })
    })

)

/* end: ../../libs/bem-components/common.blocks/input/__control/input__control.bemhtml */


/* begin: ../../common.blocks/list/list.bemhtml */
block('list')(
    tag()('ul'),
    elem('item')(
        tag()('li')
    )
);

/* end: ../../common.blocks/list/list.bemhtml */


/* begin: ../../common.blocks/footer/footer.bemhtml */
block('footer')(
    mix()({ block: 'container' })
);

/* end: ../../common.blocks/footer/footer.bemhtml */
