(function(g) {
  var __bem_xjst = function(exports) {
     var $$mode = "", $$block = "", $$elem = "", $$elemMods = null, $$mods = null;

var __$ref = {};

function apply(ctx) {
    ctx = ctx || this;
    $$mods = ctx["mods"];
    $$elemMods = ctx["elemMods"];
    $$elem = ctx["elem"];
    $$block = ctx["block"];
    $$mode = ctx["_mode"];
    try {
        return applyc(ctx, __$ref);
    } catch (e) {
        e.xjstContext = ctx;
        throw e;
    }
}

exports.apply = apply;

function applyc(__$ctx, __$ref) {
    var __$t = $$mode;
    if (__$t === "content") {
        var __$mr = __$m1[$$block];
        if (__$mr) {
            __$mr = __$mr(__$ctx, __$ref);
            if (__$mr !== __$ref) return __$mr;
        }
        return __$ctx.ctx.content;
    } else if (__$t === "tag") {
        var __$mr = __$m2[$$block];
        if (__$mr) {
            __$mr = __$mr(__$ctx, __$ref);
            if (__$mr !== __$ref) return __$mr;
        }
        return undefined;
    } else if (__$t === "bem") {
        var __$r = __$g0(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "js") {
        var __$mr = __$m3[$$block];
        if (__$mr) {
            __$mr = __$mr(__$ctx, __$ref);
            if (__$mr !== __$ref) return __$mr;
        }
        return undefined;
    } else if (__$t === "attrs") {
        var __$mr = __$m4[$$block];
        if (__$mr) {
            __$mr = __$mr(__$ctx, __$ref);
            if (__$mr !== __$ref) return __$mr;
        }
        return undefined;
    } else if (__$t === "default") {
        var __$r = __$g1(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "mix") {
        var __$t = $$block;
        if (__$t === "button") {
            if (!$$elem) {
                return {
                    elem: "control"
                };
            }
        } else if (__$t === "edit-form") {
            if (!$$elem) {
                return {
                    block: "form",
                    mods: {
                        type: "edit"
                    },
                    js: true
                };
            }
        } else if (__$t === "dnd-attach") {
            if (!$$elem) {
                return {
                    block: "dnd-drop"
                };
            }
        } else if (__$t === "link") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "menu") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "radio-group") {
            if (!$$elem) {
                return [ {
                    block: "control-group"
                } ];
            }
        } else if (__$t === "checkbox-group") {
            if (!$$elem) {
                return [ {
                    block: "control-group"
                } ];
            }
        }
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a1 & 8) === 0) {
            var __$r = __$b47(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b48(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b49(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b50(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b51(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    }
}

[ function(exports, context) {
    var undef, BEM_ = {}, toString = Object.prototype.toString, slice = Array.prototype.slice, isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }, SHORT_TAGS = {
        area: 1,
        base: 1,
        br: 1,
        col: 1,
        command: 1,
        embed: 1,
        hr: 1,
        img: 1,
        input: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        wbr: 1
    };
    (function(BEM, undefined) {
        var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
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
            NAME_PATTERN: NAME_PATTERN,
            MOD_DELIM: MOD_DELIM,
            ELEM_DELIM: ELEM_DELIM,
            buildModPostfix: buildModPostfix,
            buildClass: function(block, elem, modName, modVal) {
                var typeOfModName = typeof modName;
                if (typeOfModName === "string" || typeOfModName === "boolean") {
                    var typeOfModVal = typeof modVal;
                    if (typeOfModVal !== "string" && typeOfModVal !== "boolean") {
                        modVal = modName;
                        modName = elem;
                        elem = undef;
                    }
                } else if (typeOfModName !== "undefined") {
                    modName = undef;
                } else if (elem && typeof elem !== "string") {
                    elem = undef;
                }
                if (!(elem || modName)) {
                    return block;
                }
                return elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal);
            },
            buildModsClasses: function(block, elem, mods) {
                var res = "";
                if (mods) {
                    var modName;
                    for (modName in mods) {
                        if (!mods.hasOwnProperty(modName)) continue;
                        var modVal = mods[modName];
                        if (!modVal && modVal !== 0) continue;
                        typeof modVal !== "boolean" && (modVal += "");
                        res += " " + (elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal));
                    }
                }
                return res;
            },
            buildClasses: function(block, elem, mods) {
                var res = "";
                res += elem ? buildElemClass(block, elem) : buildBlockClass(block);
                res += this.buildModsClasses(block, elem, mods);
                return res;
            }
        };
    })(BEM_);
    var ts = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, f = function(t) {
        return ts[t] || t;
    };
    var buildEscape = function(r) {
        r = new RegExp(r, "g");
        return function(s) {
            return ("" + s).replace(r, f);
        };
    };
    context.BEMContext = BEMContext;
    function BEMContext(context, apply_) {
        this.ctx = typeof context === "undefined" ? "" : context;
        this.apply = apply_;
        this._str = "";
        var _this = this;
        this._buf = {
            push: function() {
                var chunks = slice.call(arguments).join("");
                _this._str += chunks;
            },
            join: function() {
                return this._str;
            }
        };
        this._ = this;
        this._start = true;
        this._mode = "";
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
        if (!obj || obj === true) return true;
        var t = typeof obj;
        return t === "string" || t === "number";
    };
    BEMContext.prototype.isShortTag = function isShortTag(t) {
        return SHORT_TAGS.hasOwnProperty(t);
    };
    BEMContext.prototype.extend = function extend(o1, o2) {
        if (!o1 || !o2) return o1 || o2;
        var res = {}, n;
        for (n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
        for (n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
        return res;
    };
    var cnt = 0, id = +new Date(), expando = "__" + id, get = function() {
        return "uniq" + id + ++cnt;
    };
    BEMContext.prototype.identify = function(obj, onlyGet) {
        if (!obj) return get();
        if (onlyGet || obj[expando]) {
            return obj[expando];
        } else {
            return obj[expando] = get();
        }
    };
    BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
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
    var oldApply = exports.apply;
    exports.apply = BEMContext.apply = function BEMContext_apply(context) {
        var ctx = new BEMContext(context || this, oldApply);
        ctx.apply();
        return ctx._str;
    };
    BEMContext.prototype.reapply = BEMContext.apply;
} ].forEach(function(fn) {
    fn(exports, this);
}, {
    recordExtensions: function(ctx) {
        ctx["__$a0"] = 0;
        ctx["_mode"] = undefined;
        ctx["ctx"] = undefined;
        ctx["_ieCommented"] = undefined;
        ctx["_checkedOption"] = undefined;
        ctx["_menuMods"] = undefined;
        ctx["_select"] = undefined;
        ctx["_checkedOptions"] = undefined;
        ctx["_firstOption"] = undefined;
        ctx["_input"] = undefined;
        ctx["__$a1"] = 0;
        ctx["_button"] = undefined;
        ctx["_str"] = undefined;
        ctx["block"] = undefined;
        ctx["elem"] = undefined;
        ctx["_notNewList"] = undefined;
        ctx["position"] = undefined;
        ctx["_listLength"] = undefined;
        ctx["_currBlock"] = undefined;
        ctx["mods"] = undefined;
        ctx["elemMods"] = undefined;
    },
    resetApplyNext: function(ctx) {
        ctx["__$a0"] = 0;
        ctx["__$a1"] = 0;
    }
});

var __$m1 = {
    metrika: function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                content: {
                    tag: "img",
                    attrs: {
                        src: "//mc.yandex.ru/watch/20004958",
                        style: "position:absolute; left:-9999px;",
                        alt: ""
                    }
                }
            };
        }
        return __$ref;
    },
    "promo-snippet": function(__$ctx, __$ref) {
        if (!$$elem && (__$ctx.__$a0 & 1) === 0) {
            return [ __$ctx.ctx.src ? __$ctx.ctx.url ? {
                block: "link",
                url: __$ctx.ctx.url,
                content: {
                    block: "promo-snippet",
                    elem: "thumb",
                    tag: "img",
                    attrs: {
                        src: __$ctx.ctx.src
                    }
                }
            } : {
                elem: "thumb",
                attrs: {
                    src: __$ctx.ctx.src
                }
            } : "", __$ctx.ctx.url ? {
                block: "link",
                url: __$ctx.ctx.url,
                mix: {
                    block: "promo-snippet",
                    elem: "title"
                },
                content: __$ctx.ctx.title
            } : {
                elem: "title",
                tag: "span",
                content: __$ctx.ctx.title
            }, __$ctx.ctx.faq ? [ {
                tag: "br"
            }, {
                block: "link",
                url: __$ctx.ctx.faq,
                content: "Частые вопросы"
            } ] : "", function __$lb__$0() {
                var __$r__$1;
                var __$l0__$2 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 1;
                __$r__$1 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$2;
                return __$r__$1;
            }() ];
        }
        return __$ref;
    },
    "phone-number": function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b54(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    email: function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b55(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    button: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if (typeof __$ctx.ctx.content !== "undefined") {
                return __$ctx.ctx.content;
            }
            var __$r = __$b57(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    checkbox: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b58(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b59(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    select: function(__$ctx, __$ref) {
        if (!$$elem && $$mods && $$mods["mode"] === "radio-check" && __$ctx._checkedOptions[0] && (__$ctx.__$a0 & 8) === 0) {
            return [ {
                elem: "control",
                val: __$ctx._checkedOptions[0].val
            }, function __$lb__$18() {
                var __$r__$19;
                var __$l0__$20 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 8;
                __$r__$19 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$20;
                return __$r__$19;
            }() ];
        }
        var __$t = $$elem;
        if (__$t === "button") {
            var __$t = $$mods;
            if (__$t) {
                var __$t = $$mods["mode"];
                if (__$t === "radio-check") {
                    return [ {
                        elem: "text",
                        content: (__$ctx._checkedOptions[0] || __$ctx._select).text
                    } ];
                } else if (__$t === "radio") {
                    return [ {
                        elem: "text",
                        content: __$ctx._checkedOption.text
                    } ];
                }
            }
        }
        var __$t = !$$elem;
        if (__$t) {
            var __$t = $$mods;
            if (__$t) {
                var __$t = $$mods["mode"];
                if (__$t === "radio") {
                    if ((__$ctx.__$a0 & 65536) === 0) {
                        return [ {
                            elem: "control",
                            val: __$ctx._checkedOption.val
                        }, function __$lb__$82() {
                            var __$r__$83;
                            var __$l0__$84 = __$ctx.__$a0;
                            __$ctx.__$a0 = __$ctx.__$a0 | 65536;
                            __$r__$83 = applyc(__$ctx, __$ref);
                            __$ctx.__$a0 = __$l0__$84;
                            return __$r__$83;
                        }() ];
                    }
                } else if (__$t === "check") {
                    if (__$ctx._checkedOptions[0] && (__$ctx.__$a0 & 262144) === 0) {
                        var __$r = __$b64(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                }
            }
        }
        if ($$elem === "button" && $$mods && $$mods["mode"] === "check") {
            var __$r = __$b65(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!$$elem) {
            return [ {
                elem: "button"
            }, {
                block: "popup",
                mods: {
                    target: "anchor",
                    theme: $$mods.theme,
                    autoclosable: true
                },
                directions: [ "bottom-left", "bottom-right", "top-left", "top-right" ],
                content: {
                    block: $$block,
                    mods: $$mods,
                    elem: "menu"
                }
            } ];
        }
        return __$ref;
    },
    input: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "control") {
            if ($$mods && $$mods["type"] === "textarea") {
                return __$ctx._input.val;
            }
        } else if (__$t === "box") {
            if ($$mods && $$mods["has-clear"] === true) {
                return [ __$ctx.ctx.content, {
                    elem: "clear"
                } ];
            }
        }
        var __$t = !$$elem;
        if (__$t) {
            if (typeof __$ctx.ctx.content !== "undefined") {
                return __$ctx.ctx.content;
            }
            return {
                elem: "box",
                content: {
                    elem: "control"
                }
            };
        }
        return __$ref;
    },
    "dialog-window": function(__$ctx, __$ref) {
        if (!$$elem && (__$ctx.__$a0 & 128) === 0) {
            return [ {
                elem: "inner",
                content: [ {
                    elem: "body",
                    content: [ {
                        elem: "header",
                        elemMods: {
                            type: __$ctx.ctx.mods.type
                        },
                        content: [ {
                            elem: "close",
                            mix: [ {
                                block: "dialog-window",
                                elem: "control",
                                elemMods: {
                                    type: "close"
                                }
                            } ],
                            content: "&#10006;"
                        }, {
                            elem: "icon",
                            elemMods: {
                                type: __$ctx.ctx.mods.type
                            }
                        }, {
                            elem: "title",
                            content: __$ctx.ctx.title
                        } ]
                    }, {
                        elem: "content",
                        content: function __$lb__$31() {
                            var __$r__$32;
                            var __$l0__$33 = __$ctx.__$a0;
                            __$ctx.__$a0 = __$ctx.__$a0 | 128;
                            __$r__$32 = applyc(__$ctx, __$ref);
                            __$ctx.__$a0 = __$l0__$33;
                            return __$r__$32;
                        }()
                    } ]
                } ]
            }, {
                block: "paranja",
                js: true,
                mods: {
                    visibility: "hidden"
                },
                mix: [ {
                    block: "dialog-window",
                    elem: "paranja"
                } ]
            } ];
        }
        return __$ref;
    },
    serp: function(__$ctx, __$ref) {
        if ($$elem === "spinner") {
            return {
                block: "spin",
                mods: {
                    progress: true,
                    size: "xl",
                    theme: "islands"
                }
            };
        }
        return __$ref;
    },
    logo: function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                elem: "img"
            };
        }
        return __$ref;
    },
    page: function(__$ctx, __$ref) {
        if ($$elem === "head" && (__$ctx.__$a0 & 8192) === 0) {
            return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            }, function __$lb__$68() {
                var __$r__$69;
                var __$l0__$70 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 8192;
                __$r__$69 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$70;
                return __$r__$69;
            }() ];
        }
        if (!$$elem && (__$ctx.__$a0 & 16384) === 0) {
            return [ function __$lb__$71() {
                var __$r__$72;
                var __$l0__$73 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 16384;
                __$r__$72 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$73;
                return __$r__$72;
            }(), __$ctx.ctx.scripts ];
        }
        return __$ref;
    },
    radio: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b76(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b77(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    menu: function(__$ctx, __$ref) {
        if ($$elem === "group" && typeof __$ctx.ctx.title !== "undefined" && (__$ctx.__$a0 & 1048576) === 0) {
            return [ {
                elem: "group-title",
                content: __$ctx.ctx.title
            }, function __$lb__$102() {
                var __$r__$103;
                var __$l0__$104 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 1048576;
                __$r__$103 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$104;
                return __$r__$103;
            }() ];
        }
        return __$ref;
    },
    "radio-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b79(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    "checkbox-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b80(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    ua: function(__$ctx, __$ref) {
        if (!$$elem) {
            return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
        }
        return __$ref;
    }
};

var __$m2 = {
    metrika: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "noscript";
        }
        return __$ref;
    },
    compare: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "cell") {
            return "td";
        } else if (__$t === "row") {
            return "tr";
        } else if (__$t === "table") {
            return "table";
        }
        return __$ref;
    },
    "snippet-specs": function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "value") {
            return "span";
        } else if (__$t === "caption") {
            return "span";
        } else if (__$t === "item") {
            return "li";
        }
        if (!$$elem) {
            return "ul";
        }
        return __$ref;
    },
    snippet: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "title") {
            if ($$elemMods && $$elemMods["h1"] === true) {
                return "h1";
            }
        } else if (__$t === "variant-value") {
            return "span";
        } else if (__$t === "variant") {
            return "span";
        } else if (__$t === "thumb") {
            if (__$ctx.ctx.url) {
                return "img";
            }
            return "i";
        }
        return __$ref;
    },
    price: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "value") {
            return "span";
        } else if (__$t === "currency") {
            return "span";
        }
        return __$ref;
    },
    form: function(__$ctx, __$ref) {
        if ($$elem === "inner") {
            return "form";
        }
        return __$ref;
    },
    "visiting-card": function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "image") {
            if ($$elemMods && $$elemMods["default"] === true) {
                return "i";
            }
            return "img";
        }
        return __$ref;
    },
    button: function(__$ctx, __$ref) {
        if (!$$elem && $$mods && $$mods["type"] === "link") {
            return "a";
        }
        if ($$elem === "text") {
            return "span";
        }
        if (!$$elem) {
            return __$ctx.ctx.tag || "button";
        }
        return __$ref;
    },
    checkbox: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
        return __$ref;
    },
    realty: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "realty-feed";
        }
        return __$ref;
    },
    "edit-form": function(__$ctx, __$ref) {
        if ($$elem === "control" && $$elemMods && $$elemMods["type"] === "reset") {
            return "span";
        }
        return __$ref;
    },
    select: function(__$ctx, __$ref) {
        if ($$elem === "control") {
            return "input";
        }
        return __$ref;
    },
    input: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "control") {
            if ($$mods && $$mods["type"] === "textarea") {
                return "textarea";
            }
        } else if (__$t === "box") {
            if ($$mods && $$mods["type"] === "textarea") {
                return false;
            }
        }
        if (!$$elem && $$mods && $$mods["type"] === "textarea") {
            return "div";
        }
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        } else if (__$t === "clear") {
            return "i";
        }
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    "dnd-attach": function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "input") {
            return "input";
        } else if (__$t === "img") {
            return "img";
        }
        return __$ref;
    },
    time: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    date: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    link: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "a";
        }
        return __$ref;
    },
    nav: function(__$ctx, __$ref) {
        if ($$elem === "item") {
            return "li";
        }
        if (!$$elem) {
            return "ul";
        }
        return __$ref;
    },
    logo: function(__$ctx, __$ref) {
        if ($$elem === "img") {
            return "i";
        }
        if (!$$elem && __$ctx.ctx.url) {
            return "a";
        }
        return __$ref;
    },
    page: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "js") {
            return "script";
        } else if (__$t === "link") {
            return "link";
        } else if (__$t === "css") {
            if (__$ctx.ctx.url) {
                return "link";
            }
            return "style";
        } else if (__$t === "head") {
            return "head";
        } else if (__$t === "favicon") {
            return "link";
        } else if (__$t === "meta") {
            return "meta";
        }
        if (!$$elem) {
            return "body";
        }
        return __$ref;
    },
    sitemap: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "priority") {
            return "priority";
        } else if (__$t === "changefreq") {
            return "changefreq";
        } else if (__$t === "lastmod") {
            return "lastmod";
        } else if (__$t === "loc") {
            return "loc";
        } else if (__$t === "url") {
            return "url";
        }
        if (!$$elem) {
            return "urlset";
        }
        return __$ref;
    },
    spin: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    declension: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    sort: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "form";
        }
        return __$ref;
    },
    icon: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "i";
        }
        return __$ref;
    },
    radio: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
        return __$ref;
    },
    "radio-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    "checkbox-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            return "span";
        }
        return __$ref;
    },
    ua: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "script";
        }
        return __$ref;
    },
    filters: function(__$ctx, __$ref) {
        if (!$$elem) {
            return "form";
        }
        return __$ref;
    }
};

var __$m3 = {
    compare: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    snippet: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    form: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["saveable"] === true) {
                return {
                    live: false
                };
            }
            return true;
        }
        return __$ref;
    },
    fotorama: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    button: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            var __$t = $$mods;
            if (__$t) {
                if ($$mods && $$mods["type"] === "link" && $$mods["disabled"] === true && (__$ctx.__$a0 & 256) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$34() {
                        var __$r__$35;
                        var __$l0__$36 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 256;
                        __$r__$35 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$36;
                        return __$r__$35;
                    }(), {
                        url: __$ctx.ctx.url
                    });
                    if (__$r !== __$ref) return __$r;
                }
                if ($$mods["focused"] === true && (__$ctx.__$a1 & 1) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$183() {
                        var __$r__$184;
                        var __$l0__$185 = __$ctx.__$a1;
                        __$ctx.__$a1 = __$ctx.__$a1 | 1;
                        __$r__$184 = applyc(__$ctx, __$ref);
                        __$ctx.__$a1 = __$l0__$185;
                        return __$r__$184;
                    }(), {
                        live: false
                    });
                    if (__$r !== __$ref) return __$r;
                }
            }
            return true;
        }
        return __$ref;
    },
    checkbox: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    "dnd-sort": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    "edit-form": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    select: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            var __$t = $$mods;
            if (__$t) {
                var __$t = $$mods["mode"];
                if (__$t === "radio-check") {
                    if ((__$ctx.__$a0 & 16) === 0) {
                        var __$r = __$ctx.extend(function __$lb__$21() {
                            var __$r__$22;
                            var __$l0__$23 = __$ctx.__$a0;
                            __$ctx.__$a0 = __$ctx.__$a0 | 16;
                            __$r__$22 = applyc(__$ctx, __$ref);
                            __$ctx.__$a0 = __$l0__$23;
                            return __$r__$22;
                        }(), {
                            text: __$ctx.ctx.text
                        });
                        if (__$r !== __$ref) return __$r;
                    }
                } else if (__$t === "check") {
                    if ((__$ctx.__$a0 & 524288) === 0) {
                        var __$r = __$ctx.extend(function __$lb__$98() {
                            var __$r__$99;
                            var __$l0__$100 = __$ctx.__$a0;
                            __$ctx.__$a0 = __$ctx.__$a0 | 524288;
                            __$r__$99 = applyc(__$ctx, __$ref);
                            __$ctx.__$a0 = __$l0__$100;
                            return __$r__$99;
                        }(), {
                            text: __$ctx.ctx.text
                        });
                        if (__$r !== __$ref) return __$r;
                    }
                }
                if ($$mods["focused"] === true && (__$ctx.__$a0 & 134217728) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$143() {
                        var __$r__$144;
                        var __$l0__$145 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 134217728;
                        __$r__$144 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$145;
                        return __$r__$144;
                    }(), {
                        live: false
                    });
                    if (__$r !== __$ref) return __$r;
                }
            }
            var __$r = __$b164(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    input: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    "dnd-attach": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    "dnd-drop": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    map: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    serp: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    link: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["disabled"] === true && (__$ctx.__$a0 & 1024) === 0) {
                var __$r = __$ctx.extend(function __$lb__$42() {
                    var __$r__$43;
                    var __$l0__$44 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 1024;
                    __$r__$43 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$44;
                    return __$r__$43;
                }(), {
                    url: __$ctx.ctx.url
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
        return __$ref;
    },
    rt: function(__$ctx, __$ref) {
        if (!$$elem && $$mods && $$mods["view"] === "list") {
            return true;
        }
        return __$ref;
    },
    sort: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    radio: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    popup: function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b175(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    menu: function(__$ctx, __$ref) {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["focused"] === true && (__$ctx.__$a0 & 4194304) === 0) {
                var __$r = __$ctx.extend(function __$lb__$108() {
                    var __$r__$109;
                    var __$l0__$110 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 4194304;
                    __$r__$109 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$110;
                    return __$r__$109;
                }(), {
                    live: false
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
        return __$ref;
    },
    "menu-item": function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                val: __$ctx.ctx.val
            };
        }
        return __$ref;
    },
    "radio-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    "checkbox-group": function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    },
    filters: function(__$ctx, __$ref) {
        if (!$$elem) {
            return true;
        }
        return __$ref;
    }
};

var __$m4 = {
    snippet: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "pending") {
            return {
                title: "Подождите, идет загрузка..."
            };
        } else if (__$t === "thumb") {
            if (__$ctx.ctx.url) {
                return {
                    src: __$ctx.ctx.url
                };
            }
        }
        return __$ref;
    },
    feature: function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                title: __$ctx.ctx.content
            };
        }
        return __$ref;
    },
    price: function(__$ctx, __$ref) {
        if ($$elem === "currency" && $$elemMods && $$elemMods["type"] === "RUR") {
            return {
                title: "руб."
            };
        }
        return __$ref;
    },
    form: function(__$ctx, __$ref) {
        if ($$elem === "inner") {
            return {
                method: "POST",
                action: "/mail/"
            };
        }
        return __$ref;
    },
    button: function(__$ctx, __$ref) {
        if (!$$elem && $$mods && $$mods["type"] === "link" && (__$ctx.__$a0 & 512) === 0) {
            var __$r = __$b187(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if ($$elem === "text" && typeof __$ctx._button.textMaxWidth === "number") {
            return {
                style: "max-width:" + __$ctx._button.textMaxWidth + "px"
            };
        }
        var __$t = !$$elem;
        if (__$t) {
            if ((!$$mods.type || $$mods.type === "submit") && (__$ctx.__$a1 & 2) === 0) {
                var __$r = __$b189(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b190(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    checkbox: function(__$ctx, __$ref) {
        if ($$elem === "control") {
            var __$r = __$b191(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    realty: function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                xmlns: "http://webmaster.yandex.ru/schemas/feed/realty/2010-06"
            };
        }
        return __$ref;
    },
    "dnd-sort": function(__$ctx, __$ref) {
        if ($$elem === "item") {
            return {
                draggable: true
            };
        }
        return __$ref;
    },
    select: function(__$ctx, __$ref) {
        if ($$elem === "control") {
            var __$r = __$b194(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    input: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "control") {
            if ($$mods && $$mods["type"] === "textarea" && (__$ctx.__$a0 & 32) === 0) {
                var __$r = __$b195(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b196(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    "dnd-attach": function(__$ctx, __$ref) {
        if ($$elem === "input" && $$mods && $$mods["type"] === "image") {
            return {
                accept: "image/jpeg,image/png",
                type: "file"
            };
        }
        if (!$$elem && $$mods && $$mods["type"] === "image") {
            return {
                title: "Кликните или перетащите файл с изображением для отправки"
            };
        }
        if ($$elem === "input") {
            return {
                type: "file"
            };
        }
        if (!$$elem) {
            return {
                title: "Кликните или перетащите файл для отправки"
            };
        }
        return __$ref;
    },
    link: function(__$ctx, __$ref) {
        if (!$$elem) {
            var __$r = __$b201(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    logo: function(__$ctx, __$ref) {
        if (!$$elem && __$ctx.ctx.url) {
            return {
                href: __$ctx.ctx.url
            };
        }
        return __$ref;
    },
    page: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "js") {
            if (__$ctx.ctx.url) {
                return {
                    src: __$ctx.ctx.url
                };
            }
        } else if (__$t === "css") {
            if (__$ctx.ctx.url) {
                return {
                    rel: "stylesheet",
                    href: __$ctx.ctx.url
                };
            }
        } else if (__$t === "favicon") {
            return {
                rel: "shortcut icon",
                href: __$ctx.ctx.url
            };
        }
        return __$ref;
    },
    sitemap: function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
            };
        }
        return __$ref;
    },
    icon: function(__$ctx, __$ref) {
        if (!$$elem && __$ctx.ctx.url) {
            return {
                style: "background-image:url(" + __$ctx.ctx.url + ")"
            };
        }
        return __$ref;
    },
    radio: function(__$ctx, __$ref) {
        if ($$elem === "control") {
            var __$r = __$b208(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    menu: function(__$ctx, __$ref) {
        var __$t = $$elem;
        if (__$t === "group-title") {
            return {
                role: "presentation"
            };
        } else if (__$t === "group") {
            if (typeof __$ctx.ctx.title !== "undefined" && (__$ctx.__$a0 & 2097152) === 0) {
                var __$r = __$ctx.extend(function __$lb__$105() {
                    var __$r__$106;
                    var __$l0__$107 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 2097152;
                    __$r__$106 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$107;
                    return __$r__$106;
                }(), {
                    "aria-label": __$ctx.ctx.title
                });
                if (__$r !== __$ref) return __$r;
            }
            return {
                role: "group"
            };
        }
        if (!$$elem) {
            var __$r = __$b212(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        return __$ref;
    },
    "menu-item": function(__$ctx, __$ref) {
        if (!$$elem) {
            return {
                role: "menuitem"
            };
        }
        return __$ref;
    }
};

function __$b22(__$ctx, __$ref) {
    var __$r__$195;
    var __$l0__$196 = __$ctx._button;
    __$ctx._button = __$ctx.ctx;
    var __$r__$198;
    var __$l1__$199 = __$ctx.__$a1;
    __$ctx.__$a1 = __$ctx.__$a1 | 4;
    __$r__$198 = applyc(__$ctx, __$ref);
    __$ctx.__$a1 = __$l1__$199;
    __$r__$195 = __$r__$198;
    __$ctx._button = __$l0__$196;
    return;
}

function __$b23(__$ctx, __$ref) {
    __$ctx._.isShortTag = function() {
        return false;
    };
    var __$r__$13;
    var __$l0__$14 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 2;
    __$r__$13 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$14;
    return;
}

function __$b24(__$ctx, __$ref) {
    __$ctx._buf.push('<?xml version="1.0" encoding="UTF-8"?>');
    var __$r__$16;
    var __$l0__$17 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 4;
    __$r__$16 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$17;
    return;
}

function __$b25(__$ctx, __$ref) {
    var checkedOptions__$85 = __$ctx._checkedOptions, firstOption__$86 = __$ctx._firstOption;
    if (!checkedOptions__$85.length) {
        firstOption__$86.checked = true;
        checkedOptions__$85.push(firstOption__$86);
    }
    var __$r__$88;
    var __$l0__$89 = __$ctx._checkedOption;
    __$ctx._checkedOption = checkedOptions__$85[0];
    var __$r__$91;
    var __$l1__$92 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 131072;
    __$r__$91 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$92;
    __$r__$88 = __$r__$91;
    __$ctx._checkedOption = __$l0__$89;
    return;
}

function __$b26(__$ctx, __$ref) {
    var mods__$132 = $$mods;
    var __$r__$134;
    var __$l0__$135 = $$mode;
    $$mode = "";
    var __$l1__$136 = __$ctx.ctx;
    __$ctx.ctx = {
        block: "button",
        mix: {
            block: $$block,
            elem: $$elem
        },
        mods: {
            size: mods__$132.size,
            theme: mods__$132.theme,
            focused: mods__$132.focused,
            disabled: mods__$132.disabled,
            checked: mods__$132.mode !== "radio" && !!__$ctx._checkedOptions.length
        },
        id: __$ctx._select.id,
        textMaxWidth: __$ctx._select.textMaxWidth,
        content: [ function __$lb__$137() {
            var __$r__$138;
            var __$l3__$139 = $$mode;
            $$mode = "content";
            __$r__$138 = applyc(__$ctx, __$ref);
            $$mode = __$l3__$139;
            return __$r__$138;
        }(), {
            block: "icon",
            mix: {
                block: "select",
                elem: "tick"
            }
        } ]
    };
    var __$r__$140;
    var __$l2__$141 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 67108864;
    __$r__$140 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$141;
    __$r__$134 = __$r__$140;
    $$mode = __$l0__$135;
    __$ctx.ctx = __$l1__$136;
    return;
}

function __$b27(__$ctx, __$ref) {
    var mods__$122 = $$mods, optionToMenuItem__$123 = function(option) {
        var res__$124 = {
            block: "menu-item",
            mods: {
                checked: option.checked,
                disabled: option.disabled
            },
            val: option.val,
            js: {
                checkedText: option.checkedText
            },
            content: option.text
        };
        if (option.icon) {
            res__$124.js.text = option.text;
            res__$124.content = [ option.icon, res__$124.content ];
        }
        return res__$124;
    };
    var __$r__$126;
    var __$l0__$127 = $$mode;
    $$mode = "";
    var __$l1__$128 = __$ctx.ctx;
    __$ctx.ctx = {
        block: "menu",
        mix: {
            block: $$block,
            elem: $$elem
        },
        mods: {
            size: mods__$122.size,
            theme: mods__$122.theme,
            disabled: mods__$122.disabled,
            mode: mods__$122.mode
        },
        attrs: {
            tabindex: undefined
        },
        content: __$ctx._select.options.map(function(optionOrGroup) {
            return optionOrGroup.group ? {
                elem: "group",
                mods: {
                    "has-title": !!optionOrGroup.title
                },
                title: optionOrGroup.title,
                content: optionOrGroup.group.map(optionToMenuItem__$123)
            } : optionToMenuItem__$123(optionOrGroup);
        })
    };
    var __$r__$130;
    var __$l2__$131 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 33554432;
    __$r__$130 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$131;
    __$r__$126 = __$r__$130;
    $$mode = __$l0__$127;
    __$ctx.ctx = __$l1__$128;
    return;
}

function __$b28(__$ctx, __$ref) {
    if (!$$mods.mode) throw Error("Can't build select without mode modifier");
    var options__$147 = __$ctx.ctx.options, i__$148 = 0, j__$149, optionOrGroup__$150, option__$151, firstOption__$152, checkedOptions__$153 = [];
    while (optionOrGroup__$150 = options__$147[i__$148++]) {
        if (optionOrGroup__$150.group) {
            j__$149 = 0;
            while (option__$151 = optionOrGroup__$150.group[j__$149++]) {
                i__$148 === 1 && j__$149 === 1 && (firstOption__$152 = option__$151);
                option__$151.checked && checkedOptions__$153.push(option__$151);
            }
        } else {
            i__$148 === 1 && (firstOption__$152 = optionOrGroup__$150);
            optionOrGroup__$150.checked && checkedOptions__$153.push(optionOrGroup__$150);
        }
    }
    var __$r__$155;
    var __$l0__$156 = __$ctx._select;
    __$ctx._select = __$ctx.ctx;
    var __$l1__$157 = __$ctx._checkedOptions;
    __$ctx._checkedOptions = checkedOptions__$153;
    var __$l2__$158 = __$ctx._firstOption;
    __$ctx._firstOption = firstOption__$152;
    var __$r__$160;
    var __$l3__$161 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 268435456;
    __$r__$160 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l3__$161;
    __$r__$155 = __$r__$160;
    __$ctx._select = __$l0__$156;
    __$ctx._checkedOptions = __$l1__$157;
    __$ctx._firstOption = __$l2__$158;
    return;
}

function __$b29(__$ctx, __$ref) {
    $$mods["has-clear"] = false;
    var __$r__$29;
    var __$l0__$30 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 64;
    __$r__$29 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$30;
    return;
}

function __$b30(__$ctx, __$ref) {
    var __$r__$172;
    var __$l0__$173 = __$ctx._input;
    __$ctx._input = __$ctx.ctx;
    var __$r__$175;
    var __$l1__$176 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 536870912;
    __$r__$175 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$176;
    __$r__$172 = __$r__$175;
    __$ctx._input = __$l0__$173;
    return;
}

function __$b31(__$ctx, __$ref) {
    var ctx__$48 = __$ctx.ctx;
    typeof ctx__$48.url === "object" && (ctx__$48.url = __$ctx.reapply(ctx__$48.url));
    var __$r__$50;
    var __$l0__$51 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 2048;
    __$r__$50 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$51;
    return;
}

function __$b32(__$ctx, __$ref) {
    var url__$52 = __$ctx.ctx.url;
    var __$r__$54;
    var __$l0__$55 = $$mode;
    $$mode = "";
    var __$l1__$56 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$52 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$58;
    var __$l2__$59 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 4096;
    __$r__$58 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$59;
    __$r__$54 = __$r__$58;
    $$mode = __$l0__$55;
    __$ctx.ctx = __$l1__$56;
    return;
}

function __$b33(__$ctx, __$ref) {
    var ie__$60 = __$ctx.ctx.ie, hideRule__$61 = !ie__$60 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$60 === "!IE" ? [ ie__$60, "<!-->", "<!--" ] : [ ie__$60, "", "" ];
    var __$r__$63;
    var __$l0__$64 = $$mode;
    $$mode = "";
    var __$l3__$65 = __$ctx.ctx;
    var __$l1__$66 = __$l3__$65._ieCommented;
    __$l3__$65._ieCommented = true;
    var __$l2__$67 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$61[0] + "]>" + hideRule__$61[1], __$ctx.ctx, hideRule__$61[2] + "<![endif]-->" ];
    __$r__$63 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$64;
    __$l3__$65._ieCommented = __$l1__$66;
    __$ctx.ctx = __$l2__$67;
    return;
}

function __$b34(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$74 = __$ctx.ctx;
    var __$r__$76;
    var __$l0__$77 = $$mode;
    $$mode = "";
    var __$l1__$78 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$74.doctype || "<!DOCTYPE html>", {
        tag: "html",
        cls: "ua_js_no",
        content: [ {
            elem: "head",
            content: [ {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }, {
                tag: "title",
                content: ctx__$74.title
            }, {
                block: "ua"
            }, ctx__$74.head, ctx__$74.styles, ctx__$74.favicon ? {
                elem: "favicon",
                url: ctx__$74.favicon
            } : "" ]
        }, ctx__$74 ]
    } ];
    var __$r__$80;
    var __$l2__$81 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 32768;
    __$r__$80 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$81;
    __$r__$76 = __$r__$80;
    $$mode = __$l0__$77;
    __$ctx.ctx = __$l1__$78;
    __$ctx._defPageApplied = false;
    return;
}

function __$b35(__$ctx, __$ref) {
    var __$r__$117;
    var __$l0__$118 = __$ctx._menuMods;
    __$ctx._menuMods = {
        theme: $$mods.theme,
        disabled: $$mods.disabled
    };
    var __$r__$120;
    var __$l1__$121 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16777216;
    __$r__$120 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$121;
    __$r__$117 = __$r__$120;
    __$ctx._menuMods = __$l0__$118;
    delete __$ctx._menuTheme;
    return;
}

function __$b36(__$ctx, __$ref) {
    var mods__$111 = $$mods;
    mods__$111.theme = mods__$111.theme || __$ctx._menuMods.theme;
    mods__$111.disabled = mods__$111.disabled || __$ctx._menuMods.disabled;
    var __$r__$113;
    var __$l0__$114 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 8388608;
    __$r__$113 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$114;
    return;
}

function __$b37(__$ctx, __$ref) {
    var BEM_INTERNAL__$200 = __$ctx.BEM.INTERNAL, ctx__$201 = __$ctx.ctx, isBEM__$202, tag__$203, res__$204;
    var __$r__$206;
    var __$l0__$207 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$208 = $$block;
    var __$r__$210;
    var __$l1__$211 = $$mode;
    $$mode = "tag";
    __$r__$210 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$211;
    tag__$203 = __$r__$210;
    typeof tag__$203 !== "undefined" || (tag__$203 = ctx__$201.tag);
    typeof tag__$203 !== "undefined" || (tag__$203 = "div");
    if (tag__$203) {
        var jsParams__$212, js__$213;
        if (vBlock__$208 && ctx__$201.js !== false) {
            var __$r__$214;
            var __$l2__$215 = $$mode;
            $$mode = "js";
            __$r__$214 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$215;
            js__$213 = __$r__$214;
            js__$213 = js__$213 ? __$ctx.extend(ctx__$201.js, js__$213 === true ? {} : js__$213) : ctx__$201.js === true ? {} : ctx__$201.js;
            js__$213 && ((jsParams__$212 = {})[BEM_INTERNAL__$200.buildClass(vBlock__$208, ctx__$201.elem)] = js__$213);
        }
        __$ctx._str += "<" + tag__$203;
        var __$r__$216;
        var __$l3__$217 = $$mode;
        $$mode = "bem";
        __$r__$216 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$217;
        isBEM__$202 = __$r__$216;
        typeof isBEM__$202 !== "undefined" || (isBEM__$202 = typeof ctx__$201.bem !== "undefined" ? ctx__$201.bem : ctx__$201.block || ctx__$201.elem);
        var __$r__$219;
        var __$l4__$220 = $$mode;
        $$mode = "cls";
        __$r__$219 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$220;
        var cls__$218 = __$r__$219;
        cls__$218 || (cls__$218 = ctx__$201.cls);
        var addJSInitClass__$221 = ctx__$201.block && jsParams__$212 && !ctx__$201.elem;
        if (isBEM__$202 || cls__$218) {
            __$ctx._str += ' class="';
            if (isBEM__$202) {
                __$ctx._str += BEM_INTERNAL__$200.buildClasses(vBlock__$208, ctx__$201.elem, ctx__$201.elemMods || ctx__$201.mods);
                var __$r__$223;
                var __$l5__$224 = $$mode;
                $$mode = "mix";
                __$r__$223 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$224;
                var mix__$222 = __$r__$223;
                ctx__$201.mix && (mix__$222 = mix__$222 ? [].concat(mix__$222, ctx__$201.mix) : ctx__$201.mix);
                if (mix__$222) {
                    var visited__$225 = {}, visitedKey__$226 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$225[visitedKey__$226(vBlock__$208, $$elem)] = true;
                    __$ctx.isArray(mix__$222) || (mix__$222 = [ mix__$222 ]);
                    for (var i__$227 = 0; i__$227 < mix__$222.length; i__$227++) {
                        var mixItem__$228 = mix__$222[i__$227], hasItem__$229 = mixItem__$228.block || mixItem__$228.elem, mixBlock__$230 = mixItem__$228.block || mixItem__$228._block || $$block, mixElem__$231 = mixItem__$228.elem || mixItem__$228._elem || $$elem;
                        hasItem__$229 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$200[hasItem__$229 ? "buildClasses" : "buildModsClasses"](mixBlock__$230, mixItem__$228.elem || mixItem__$228._elem || (mixItem__$228.block ? undefined : $$elem), mixItem__$228.elemMods || mixItem__$228.mods);
                        if (mixItem__$228.js) {
                            (jsParams__$212 || (jsParams__$212 = {}))[BEM_INTERNAL__$200.buildClass(mixBlock__$230, mixItem__$228.elem)] = mixItem__$228.js === true ? {} : mixItem__$228.js;
                            addJSInitClass__$221 || (addJSInitClass__$221 = mixBlock__$230 && !mixItem__$228.elem);
                        }
                        if (hasItem__$229 && !visited__$225[visitedKey__$226(mixBlock__$230, mixElem__$231)]) {
                            visited__$225[visitedKey__$226(mixBlock__$230, mixElem__$231)] = true;
                            var __$r__$233;
                            var __$l6__$234 = $$mode;
                            $$mode = "mix";
                            var __$l7__$235 = $$block;
                            $$block = mixBlock__$230;
                            var __$l8__$236 = $$elem;
                            $$elem = mixElem__$231;
                            __$r__$233 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$234;
                            $$block = __$l7__$235;
                            $$elem = __$l8__$236;
                            var nestedMix__$232 = __$r__$233;
                            if (nestedMix__$232) {
                                for (var j__$237 = 0; j__$237 < nestedMix__$232.length; j__$237++) {
                                    var nestedItem__$238 = nestedMix__$232[j__$237];
                                    if (!nestedItem__$238.block && !nestedItem__$238.elem || !visited__$225[visitedKey__$226(nestedItem__$238.block, nestedItem__$238.elem)]) {
                                        nestedItem__$238._block = mixBlock__$230;
                                        nestedItem__$238._elem = mixElem__$231;
                                        mix__$222.splice(i__$227 + 1, 0, nestedItem__$238);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$218 && (__$ctx._str += isBEM__$202 ? " " + cls__$218 : cls__$218);
            __$ctx._str += addJSInitClass__$221 ? ' i-bem"' : '"';
        }
        if (isBEM__$202 && jsParams__$212) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$212)) + '"';
        }
        var __$r__$240;
        var __$l9__$241 = $$mode;
        $$mode = "attrs";
        __$r__$240 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$241;
        var attrs__$239 = __$r__$240;
        attrs__$239 = __$ctx.extend(attrs__$239, ctx__$201.attrs);
        if (attrs__$239) {
            var name__$242, attr__$243;
            for (name__$242 in attrs__$239) {
                attr__$243 = attrs__$239[name__$242];
                if (typeof attr__$243 === "undefined") continue;
                __$ctx._str += " " + name__$242 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$243) ? attr__$243 : __$ctx.reapply(attr__$243)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$203)) {
        __$ctx._str += "/>";
    } else {
        tag__$203 && (__$ctx._str += ">");
        var __$r__$245;
        var __$l10__$246 = $$mode;
        $$mode = "content";
        __$r__$245 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$246;
        var content__$244 = __$r__$245;
        if (content__$244 || content__$244 === 0) {
            isBEM__$202 = vBlock__$208 || $$elem;
            var __$r__$247;
            var __$l11__$248 = $$mode;
            $$mode = "";
            var __$l12__$249 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$250 = __$ctx.position;
            __$ctx.position = isBEM__$202 ? 1 : __$ctx.position;
            var __$l14__$251 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$202 ? 1 : __$ctx._listLength;
            var __$l15__$252 = __$ctx.ctx;
            __$ctx.ctx = content__$244;
            __$r__$247 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$248;
            __$ctx._notNewList = __$l12__$249;
            __$ctx.position = __$l13__$250;
            __$ctx._listLength = __$l14__$251;
            __$ctx.ctx = __$l15__$252;
        }
        tag__$203 && (__$ctx._str += "</" + tag__$203 + ">");
    }
    res__$204 = __$ctx._str;
    __$r__$206 = undefined;
    __$ctx._str = __$l0__$207;
    __$ctx._buf.push(res__$204);
    return;
}

function __$b47(__$ctx, __$ref) {
    var __$r__$254;
    var __$l0__$255 = $$mode;
    $$mode = "";
    var __$l1__$256 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$258;
    var __$l2__$259 = __$ctx.__$a1;
    __$ctx.__$a1 = __$ctx.__$a1 | 8;
    __$r__$258 = applyc(__$ctx, __$ref);
    __$ctx.__$a1 = __$l2__$259;
    __$r__$254 = __$r__$258;
    $$mode = __$l0__$255;
    __$ctx.ctx = __$l1__$256;
    return;
}

function __$b48(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$260 = __$ctx.ctx;
    if (ctx__$260 && ctx__$260 !== true || ctx__$260 === 0) {
        __$ctx._str += ctx__$260 + "";
    }
    return;
}

function __$b49(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b50(__$ctx, __$ref) {
    var ctx__$261 = __$ctx.ctx, len__$262 = ctx__$261.length, i__$263 = 0, prevPos__$264 = __$ctx.position, prevNotNewList__$265 = __$ctx._notNewList;
    if (prevNotNewList__$265) {
        __$ctx._listLength += len__$262 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$262;
    }
    __$ctx._notNewList = true;
    while (i__$263 < len__$262) (function __$lb__$266() {
        var __$r__$267;
        var __$l0__$268 = __$ctx.ctx;
        __$ctx.ctx = ctx__$261[i__$263++];
        __$r__$267 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$268;
        return __$r__$267;
    })();
    prevNotNewList__$265 || (__$ctx.position = prevPos__$264);
    return;
}

function __$b51(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$269 = __$ctx.ctx.block, vElem__$270 = __$ctx.ctx.elem, block__$271 = __$ctx._currBlock || $$block;
    var __$r__$273;
    var __$l0__$274 = $$mode;
    $$mode = "default";
    var __$l1__$275 = $$block;
    $$block = vBlock__$269 || (vElem__$270 ? block__$271 : undefined);
    var __$l2__$276 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$269 || vElem__$270 ? undefined : block__$271;
    var __$l3__$277 = $$elem;
    $$elem = vElem__$270;
    var __$l4__$278 = $$mods;
    $$mods = vBlock__$269 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$279 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$273 = undefined;
    $$mode = __$l0__$274;
    $$block = __$l1__$275;
    __$ctx._currBlock = __$l2__$276;
    $$elem = __$l3__$277;
    $$mods = __$l4__$278;
    $$elemMods = __$l5__$279;
    return;
}

function __$b54(__$ctx, __$ref) {
    var content__$3 = __$ctx.ctx.content, getOperatorByPhoneNumber__$4 = function() {
        var codeToModList__$5 = {
            life: /^\+380(63|93)/,
            mts: /^\+(380(66|95|99)|7978)/,
            kyivstar: /^\+380(67|68|98)/
        };
        return function(phoneNumber) {
            for (var key__$6 in codeToModList__$5) {
                if (codeToModList__$5.hasOwnProperty(key__$6)) {
                    if (codeToModList__$5[key__$6].test(phoneNumber)) {
                        return key__$6;
                    }
                }
            }
        };
    }(), modTypeVal__$7 = getOperatorByPhoneNumber__$4(content__$3), hint__$8 = content__$3.replace(/(\+)(380|7)(\d?\d\d)(\d{3})(\d{2})(\d{2})/, "$1$2 $3 $4 $5 $6") + " (" + {
        life: "Life:)",
        mts: "MTS",
        kyivstar: "Kyivstar"
    }[modTypeVal__$7] + ")";
    return [ {
        block: "link",
        mix: {
            block: "phone-number",
            elem: "text"
        },
        attrs: {
            title: hint__$8
        },
        url: "tel:" + content__$3,
        content: function(match, plus, countryCode, zone, number1, number2, number3) {
            return match && [ plus ? {
                block: "phone-number",
                elem: "plus",
                content: plus
            } : "", countryCode ? {
                block: "phone-number",
                elem: "country-code",
                content: countryCode
            } : "", zone ? {
                block: "phone-number",
                elem: "zone",
                content: zone
            } : "", number1 ? {
                block: "phone-number",
                elem: "number1",
                content: number1
            } : "", number2 ? {
                block: "phone-number",
                elem: "number2",
                content: number2
            } : "", number3 ? {
                block: "phone-number",
                elem: "number3",
                content: number3
            } : "" ];
        }.apply(__$ctx, content__$3.match(/(\+)(380|7)(\d?\d\d)(\d{3})(\d{2})(\d{2})/)) || content__$3
    }, {
        elem: "logo",
        elemMods: {
            type: modTypeVal__$7
        },
        attrs: {
            title: hint__$8
        }
    } ];
}

function __$b55(__$ctx, __$ref) {
    var content__$9 = __$ctx.ctx.content;
    return [ {
        block: "link",
        attrs: {
            title: "Кликните, чтобы написать письмо"
        },
        url: "mailto:" + content__$9,
        content: content__$9
    }, {
        elem: "logo"
    } ];
}

function __$b57(__$ctx, __$ref) {
    var ctx__$186 = __$ctx.ctx, content__$187 = [ ctx__$186.icon ];
    "text" in ctx__$186 && content__$187.push({
        elem: "text",
        content: ctx__$186.text
    });
    return content__$187;
}

function __$b58(__$ctx, __$ref) {
    var ctx__$10 = __$ctx.ctx, mods__$11 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: "check",
            checked: mods__$11.checked,
            disabled: mods__$11.disabled,
            theme: mods__$11.theme,
            size: mods__$11.size
        },
        title: ctx__$10.title,
        content: [ ctx__$10.icon, typeof ctx__$10.text !== "undefined" ? {
            elem: "text",
            content: ctx__$10.text
        } : "" ]
    }, {
        block: "checkbox",
        elem: "control",
        checked: mods__$11.checked,
        disabled: mods__$11.disabled,
        name: ctx__$10.name,
        val: ctx__$10.val
    } ];
}

function __$b59(__$ctx, __$ref) {
    var ctx__$179 = __$ctx.ctx, mods__$180 = $$mods;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: mods__$180.checked,
            disabled: mods__$180.disabled,
            name: ctx__$179.name,
            val: ctx__$179.val
        }
    }, ctx__$179.text ];
}

function __$b64(__$ctx, __$ref) {
    var res__$93 = __$ctx._checkedOptions.map(function(option) {
        return {
            elem: "control",
            val: option.val
        };
    });
    res__$93.push(function __$lb__$94() {
        var __$r__$95;
        var __$l0__$96 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 262144;
        __$r__$95 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$96;
        return __$r__$95;
    }());
    return res__$93;
}

function __$b65(__$ctx, __$ref) {
    var checkedOptions__$97 = __$ctx._checkedOptions;
    return [ {
        elem: "text",
        content: checkedOptions__$97.length === 1 ? checkedOptions__$97[0].text : checkedOptions__$97.reduce(function(res, option) {
            return res + (res ? ", " : "") + (option.checkedText || option.text);
        }, "") || __$ctx._select.text
    } ];
}

function __$b76(__$ctx, __$ref) {
    var ctx__$162 = __$ctx.ctx, mods__$163 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: mods__$163.mode === "radio-check" ? "check" : "radio",
            checked: mods__$163.checked,
            disabled: mods__$163.disabled,
            theme: mods__$163.theme,
            size: mods__$163.size
        },
        title: ctx__$162.title,
        content: [ ctx__$162.icon, typeof ctx__$162.text !== "undefined" ? {
            elem: "text",
            content: ctx__$162.text
        } : "" ]
    }, {
        block: "radio",
        elem: "control",
        checked: mods__$163.checked,
        disabled: mods__$163.disabled,
        name: ctx__$162.name,
        val: ctx__$162.val
    } ];
}

function __$b77(__$ctx, __$ref) {
    var ctx__$166 = __$ctx.ctx;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: $$mods.checked,
            disabled: $$mods.disabled,
            name: ctx__$166.name,
            val: ctx__$166.val
        }
    }, ctx__$166.text ];
}

function __$b79(__$ctx, __$ref) {
    var mods__$167 = $$mods, ctx__$168 = __$ctx.ctx;
    return (ctx__$168.options || []).map(function(option, i) {
        return [ !!i && !mods__$167.type && {
            tag: "br"
        }, {
            block: "radio",
            mods: {
                type: mods__$167.type,
                mode: mods__$167.mode,
                theme: mods__$167.theme,
                size: mods__$167.size,
                checked: option.checked,
                disabled: option.disabled || mods__$167.disabled
            },
            name: ctx__$168.name,
            val: option.val,
            text: option.text,
            title: option.title,
            icon: option.icon
        } ];
    });
}

function __$b80(__$ctx, __$ref) {
    var mods__$181 = $$mods, ctx__$182 = __$ctx.ctx;
    return (ctx__$182.options || []).map(function(option, i) {
        return [ !!i && !mods__$181.type && {
            tag: "br"
        }, {
            block: "checkbox",
            mods: {
                type: mods__$181.type,
                theme: mods__$181.theme,
                size: mods__$181.size,
                checked: option.checked,
                disabled: option.disabled || mods__$181.disabled
            },
            name: ctx__$182.name,
            val: option.val,
            text: option.text,
            title: option.title,
            icon: option.icon
        } ];
    });
}

function __$b164(__$ctx, __$ref) {
    var ctx__$146 = __$ctx.ctx;
    return {
        name: ctx__$146.name,
        optionsMaxHeight: ctx__$146.optionsMaxHeight
    };
}

function __$b175(__$ctx, __$ref) {
    var ctx__$101 = __$ctx.ctx;
    return {
        mainOffset: ctx__$101.mainOffset,
        secondaryOffset: ctx__$101.secondaryOffset,
        viewportOffset: ctx__$101.viewportOffset,
        directions: ctx__$101.directions,
        zIndexGroupLevel: ctx__$101.zIndexGroupLevel
    };
}

function __$b187(__$ctx, __$ref) {
    var ctx__$37 = __$ctx.ctx, attrs__$38 = {};
    ctx__$37.target && (attrs__$38.target = ctx__$37.target);
    $$mods.disabled ? attrs__$38["aria-disabled"] = true : attrs__$38.href = ctx__$37.url;
    return __$ctx.extend(function __$lb__$39() {
        var __$r__$40;
        var __$l0__$41 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 512;
        __$r__$40 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$41;
        return __$r__$40;
    }(), attrs__$38);
}

function __$b189(__$ctx, __$ref) {
    var ctx__$188 = __$ctx.ctx, attrs__$189 = {
        type: $$mods.type || "button",
        name: ctx__$188.name,
        value: ctx__$188.val
    };
    $$mods.disabled && (attrs__$189.disabled = "disabled");
    return __$ctx.extend(function __$lb__$190() {
        var __$r__$191;
        var __$l0__$192 = __$ctx.__$a1;
        __$ctx.__$a1 = __$ctx.__$a1 | 2;
        __$r__$191 = applyc(__$ctx, __$ref);
        __$ctx.__$a1 = __$l0__$192;
        return __$r__$191;
    }(), attrs__$189);
}

function __$b190(__$ctx, __$ref) {
    var ctx__$193 = __$ctx.ctx;
    return {
        role: "button",
        tabindex: ctx__$193.tabIndex,
        id: ctx__$193.id,
        title: ctx__$193.title
    };
}

function __$b191(__$ctx, __$ref) {
    var attrs__$177 = {
        type: "checkbox",
        autocomplete: "off"
    }, ctx__$178 = __$ctx.ctx;
    attrs__$177.name = ctx__$178.name;
    attrs__$177.value = ctx__$178.val;
    ctx__$178.checked && (attrs__$177.checked = "checked");
    ctx__$178.disabled && (attrs__$177.disabled = "disabled");
    return attrs__$177;
}

function __$b194(__$ctx, __$ref) {
    var val__$142 = __$ctx.ctx.val;
    return {
        type: "hidden",
        name: __$ctx._select.name,
        value: __$ctx.isSimple(val__$142) ? val__$142 : JSON.stringify(val__$142),
        disabled: $$mods.disabled ? "disabled" : undefined
    };
}

function __$b195(__$ctx, __$ref) {
    var __$r__$26;
    var __$l0__$27 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 32;
    __$r__$26 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$27;
    var attrs__$24 = __$r__$26;
    delete attrs__$24.value;
    return attrs__$24;
}

function __$b196(__$ctx, __$ref) {
    var input__$169 = __$ctx._input, attrs__$170 = {
        id: input__$169.id,
        name: input__$169.name,
        value: input__$169.val,
        maxlength: input__$169.maxLength,
        tabindex: input__$169.tabIndex,
        placeholder: input__$169.placeholder
    };
    input__$169.autocomplete === false && (attrs__$170.autocomplete = "off");
    $$mods.disabled && (attrs__$170.disabled = "disabled");
    return attrs__$170;
}

function __$b201(__$ctx, __$ref) {
    var ctx__$45 = __$ctx.ctx, attrs__$46 = {}, tabIndex__$47;
    if (!$$mods.disabled) {
        if (ctx__$45.url) {
            attrs__$46.href = ctx__$45.url;
            tabIndex__$47 = ctx__$45.tabIndex;
        } else {
            tabIndex__$47 = ctx__$45.tabIndex || 0;
        }
    }
    typeof tabIndex__$47 === "undefined" || (attrs__$46.tabindex = tabIndex__$47);
    ctx__$45.title && (attrs__$46.title = ctx__$45.title);
    ctx__$45.target && (attrs__$46.target = ctx__$45.target);
    return attrs__$46;
}

function __$b208(__$ctx, __$ref) {
    var ctx__$164 = __$ctx.ctx, attrs__$165 = {
        type: "radio",
        autocomplete: "off",
        name: ctx__$164.name,
        value: ctx__$164.val
    };
    ctx__$164.checked && (attrs__$165.checked = "checked");
    ctx__$164.disabled && (attrs__$165.disabled = "disabled");
    return attrs__$165;
}

function __$b212(__$ctx, __$ref) {
    var attrs__$115 = {
        role: "menu"
    };
    $$mods.disabled || (attrs__$115.tabindex = 0);
    return attrs__$115;
}

function __$g0(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "metrika") {
        if (!$$elem) {
            return false;
        }
    } else if (__$t === "realty") {
        if ($$elem === "tag") {
            return false;
        }
        if (!$$elem) {
            return false;
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "js") {
            return false;
        } else if (__$t === "link") {
            return false;
        } else if (__$t === "css") {
            return false;
        } else if (__$t === "head") {
            return false;
        } else if (__$t === "favicon") {
            return false;
        } else if (__$t === "meta") {
            return false;
        }
    } else if (__$t === "sitemap") {
        var __$t = $$elem;
        if (__$t === "priority") {
            return false;
        } else if (__$t === "changefreq") {
            return false;
        } else if (__$t === "lastmod") {
            return false;
        } else if (__$t === "loc") {
            return false;
        } else if (__$t === "url") {
            return false;
        }
        if (!$$elem) {
            return false;
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return false;
        }
    }
    return undefined;
    return __$ref;
}

function __$g1(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "button") {
        if (!$$elem && (__$ctx.__$a1 & 4) === 0) {
            var __$r = __$b22(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "realty") {
        if ($$elem === "tag" && (__$ctx.__$a0 & 2) === 0) {
            var __$r = __$b23(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
            var __$r = __$b24(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "select") {
        if (!$$elem && $$mods && $$mods["mode"] === "radio" && __$ctx._checkedOptions && (__$ctx.__$a0 & 131072) === 0) {
            var __$r = __$b25(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$t = $$elem;
        if (__$t === "button") {
            if ((__$ctx.__$a0 & 67108864) === 0) {
                var __$r = __$b26(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "menu") {
            if ((__$ctx.__$a0 & 33554432) === 0) {
                var __$r = __$b27(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        if (!$$elem && !__$ctx._select && (__$ctx.__$a0 & 268435456) === 0) {
            var __$r = __$b28(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "input") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "textarea" && (__$ctx.__$a0 & 64) === 0) {
                var __$r = __$b29(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            if ((__$ctx.__$a0 & 536870912) === 0) {
                var __$r = __$b30(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
    } else if (__$t === "link") {
        if (!$$elem && (__$ctx.__$a0 & 2048) === 0) {
            var __$r = __$b31(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "css") {
            var __$t = !__$ctx.ctx._ieCommented;
            if (__$t) {
                var __$t = __$ctx.ctx.hasOwnProperty("ie");
                if (__$t) {
                    if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 4096) === 0) {
                        var __$r = __$b32(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                    var __$r = __$b33(__$ctx, __$ref);
                    if (__$r !== __$ref) return __$r;
                }
            }
        }
        if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 32768) === 0) {
            var __$r = __$b34(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu") {
        if (!$$elem && (__$ctx.__$a0 & 16777216) === 0) {
            var __$r = __$b35(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu-item") {
        if (!$$elem && __$ctx._menuMods && (__$ctx.__$a0 & 8388608) === 0) {
            var __$r = __$b36(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    }
    var __$r = __$b37(__$ctx, __$ref);
    if (__$r !== __$ref) return __$r;
    return __$ref;
};
     return exports;
  }
  var defineAsGlobal = true;
  if(typeof exports === "object") {
    exports["BEMHTML"] = __bem_xjst({});
    defineAsGlobal = false;
  }
  if(typeof modules === "object") {
    modules.define("BEMHTML",
      function(provide) {
        provide(__bem_xjst({})) });
    defineAsGlobal = false;
  }
  defineAsGlobal && (g["BEMHTML"] = __bem_xjst({}));
})(this);