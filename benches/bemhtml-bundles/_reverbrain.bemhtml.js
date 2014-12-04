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
        var __$t = $$block;
        if (__$t === "slide") {
            if (!$$elem && (__$ctx.__$a0 & 1) === 0) {
                return {
                    elem: "inner",
                    content: function __$lb__$0() {
                        var __$r__$1;
                        var __$l0__$2 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 1;
                        __$r__$1 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$2;
                        return __$r__$1;
                    }()
                };
            }
        } else if (__$t === "section") {
            if (!$$elem && (__$ctx.__$a0 & 8) === 0) {
                return {
                    elem: "inner",
                    content: function __$lb__$13() {
                        var __$r__$14;
                        var __$l0__$15 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 8;
                        __$r__$14 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$15;
                        return __$r__$14;
                    }()
                };
            }
        } else if (__$t === "page") {
            if (!$$elem && (__$ctx.__$a0 & 32) === 0) {
                return {
                    elem: "inner",
                    content: function __$lb__$32() {
                        var __$r__$33;
                        var __$l0__$34 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 32;
                        __$r__$33 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$34;
                        return __$r__$33;
                    }()
                };
            }
            if ($$elem === "head" && (__$ctx.__$a0 & 64) === 0) {
                return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                    tag: "meta",
                    attrs: {
                        "http-equiv": "X-UA-Compatible",
                        content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                    }
                }, function __$lb__$35() {
                    var __$r__$36;
                    var __$l0__$37 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 64;
                    __$r__$36 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$37;
                    return __$r__$36;
                }() ];
            }
            if (!$$elem && (__$ctx.__$a0 & 128) === 0) {
                return [ function __$lb__$38() {
                    var __$r__$39;
                    var __$l0__$40 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 128;
                    __$r__$39 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$40;
                    return __$r__$39;
                }(), __$ctx.ctx.scripts ];
            }
        } else if (__$t === "ua") {
            var __$t = !$$elem;
            if (__$t) {
                if ((__$ctx.__$a0 & 512) === 0) {
                    return [ function __$lb__$49() {
                        var __$r__$50;
                        var __$l0__$51 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 512;
                        __$r__$50 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$51;
                        return __$r__$50;
                    }(), "(function(d,n){", "d.documentElement.className+=", '" ua_svg_"+(d[n]&&d[n]("http://www.w3.org/2000/svg","svg").createSVGRect?"yes":"no");', '})(document,"createElementNS");' ];
                }
                return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
            }
        }
        return __$ctx.ctx.content;
    } else if (__$t === "attrs") {
        var __$t = $$block;
        if (__$t === "slide") {
            if (!$$elem) {
                return {
                    "data-anchor": __$ctx.ctx.mods.type
                };
            }
        } else if (__$t === "link") {
            if (!$$elem) {
                var __$r = __$b10(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "section") {
            if (!$$elem) {
                return {
                    "data-anchor": __$ctx.ctx.mods.type
                };
            }
        } else if (__$t === "page") {
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
        }
        return undefined;
    } else if (__$t === "js") {
        var __$t = $$block;
        if (__$t === "link") {
            var __$t = !$$elem;
            if (__$t) {
                if ($$mods && $$mods["disabled"] === true && (__$ctx.__$a0 & 2) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$3() {
                        var __$r__$4;
                        var __$l0__$5 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 2;
                        __$r__$4 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$5;
                        return __$r__$4;
                    }(), {
                        url: __$ctx.ctx.url
                    });
                    if (__$r !== __$ref) return __$r;
                }
                return true;
            }
        } else if (__$t === "page") {
            if (!$$elem) {
                return true;
            }
        }
        return undefined;
    } else if (__$t === "mix") {
        if ($$block === "link" && !$$elem) {
            return [ {
                elem: "control"
            } ];
        }
        return undefined;
    } else if (__$t === "tag") {
        var __$t = $$block;
        if (__$t === "link") {
            if (!$$elem) {
                return "a";
            }
        } else if (__$t === "heading") {
            if (!$$elem) {
                return "h" + __$ctx.ctx.mods.level || 2;
            }
        } else if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "link") {
                return "link";
            } else if (__$t === "js") {
                return "script";
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
        } else if (__$t === "ua") {
            if (!$$elem) {
                return "script";
            }
        }
        return undefined;
    } else if (__$t === "default") {
        var __$t = $$block;
        if (__$t === "link") {
            if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
                var __$r = __$b34(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "css") {
                var __$t = !__$ctx.ctx._ieCommented;
                if (__$t) {
                    var __$t = __$ctx.ctx.hasOwnProperty("ie");
                    if (__$t) {
                        if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 16) === 0) {
                            var __$r = __$b35(__$ctx, __$ref);
                            if (__$r !== __$ref) return __$r;
                        }
                        var __$r = __$b36(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                }
            }
            if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 256) === 0) {
                var __$r = __$b37(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        var __$r = __$b38(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "link") {
                return false;
            } else if (__$t === "js") {
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
        } else if (__$t === "ua") {
            if (!$$elem) {
                return false;
            }
        }
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 1024) === 0) {
            var __$r = __$b48(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b49(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b50(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b51(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b52(__$ctx, __$ref);
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
    }
});

function __$b10(__$ctx, __$ref) {
    var ctx__$6 = __$ctx.ctx, attrs__$7 = {}, tabIndex__$8;
    if (!$$mods.disabled) {
        if (ctx__$6.url) {
            attrs__$7.href = ctx__$6.url;
            tabIndex__$8 = ctx__$6.tabIndex;
        } else {
            tabIndex__$8 = ctx__$6.tabIndex || 0;
        }
    }
    typeof tabIndex__$8 === "undefined" || (attrs__$7.tabindex = tabIndex__$8);
    ctx__$6.title && (attrs__$7.title = ctx__$6.title);
    ctx__$6.target && (attrs__$7.target = ctx__$6.target);
    return attrs__$7;
}

function __$b34(__$ctx, __$ref) {
    var ctx__$9 = __$ctx.ctx;
    typeof ctx__$9.url === "object" && (ctx__$9.url = __$ctx.reapply(ctx__$9.url));
    var __$r__$11;
    var __$l0__$12 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 4;
    __$r__$11 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$12;
    return;
}

function __$b35(__$ctx, __$ref) {
    var url__$16 = __$ctx.ctx.url;
    var __$r__$18;
    var __$l0__$19 = $$mode;
    $$mode = "";
    var __$l1__$20 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$16 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$22;
    var __$l2__$23 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16;
    __$r__$22 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$23;
    __$r__$18 = __$r__$22;
    $$mode = __$l0__$19;
    __$ctx.ctx = __$l1__$20;
    return;
}

function __$b36(__$ctx, __$ref) {
    var ie__$24 = __$ctx.ctx.ie, hideRule__$25 = !ie__$24 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$24 === "!IE" ? [ ie__$24, "<!-->", "<!--" ] : [ ie__$24, "", "" ];
    var __$r__$27;
    var __$l0__$28 = $$mode;
    $$mode = "";
    var __$l3__$29 = __$ctx.ctx;
    var __$l1__$30 = __$l3__$29._ieCommented;
    __$l3__$29._ieCommented = true;
    var __$l2__$31 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$25[0] + "]>" + hideRule__$25[1], __$ctx.ctx, hideRule__$25[2] + "<![endif]-->" ];
    __$r__$27 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$28;
    __$l3__$29._ieCommented = __$l1__$30;
    __$ctx.ctx = __$l2__$31;
    return;
}

function __$b37(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$41 = __$ctx.ctx;
    var __$r__$43;
    var __$l0__$44 = $$mode;
    $$mode = "";
    var __$l1__$45 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$41.doctype || "<!DOCTYPE html>", {
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
                content: ctx__$41.title
            }, {
                block: "ua"
            }, ctx__$41.head, ctx__$41.styles, ctx__$41.favicon ? {
                elem: "favicon",
                url: ctx__$41.favicon
            } : "" ]
        }, ctx__$41 ]
    } ];
    var __$r__$47;
    var __$l2__$48 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 256;
    __$r__$47 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$48;
    __$r__$43 = __$r__$47;
    $$mode = __$l0__$44;
    __$ctx.ctx = __$l1__$45;
    __$ctx._defPageApplied = false;
    return;
}

function __$b38(__$ctx, __$ref) {
    var BEM_INTERNAL__$52 = __$ctx.BEM.INTERNAL, ctx__$53 = __$ctx.ctx, isBEM__$54, tag__$55, res__$56;
    var __$r__$58;
    var __$l0__$59 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$60 = $$block;
    var __$r__$62;
    var __$l1__$63 = $$mode;
    $$mode = "tag";
    __$r__$62 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$63;
    tag__$55 = __$r__$62;
    typeof tag__$55 !== "undefined" || (tag__$55 = ctx__$53.tag);
    typeof tag__$55 !== "undefined" || (tag__$55 = "div");
    if (tag__$55) {
        var jsParams__$64, js__$65;
        if (vBlock__$60 && ctx__$53.js !== false) {
            var __$r__$66;
            var __$l2__$67 = $$mode;
            $$mode = "js";
            __$r__$66 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$67;
            js__$65 = __$r__$66;
            js__$65 = js__$65 ? __$ctx.extend(ctx__$53.js, js__$65 === true ? {} : js__$65) : ctx__$53.js === true ? {} : ctx__$53.js;
            js__$65 && ((jsParams__$64 = {})[BEM_INTERNAL__$52.buildClass(vBlock__$60, ctx__$53.elem)] = js__$65);
        }
        __$ctx._str += "<" + tag__$55;
        var __$r__$68;
        var __$l3__$69 = $$mode;
        $$mode = "bem";
        __$r__$68 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$69;
        isBEM__$54 = __$r__$68;
        typeof isBEM__$54 !== "undefined" || (isBEM__$54 = typeof ctx__$53.bem !== "undefined" ? ctx__$53.bem : ctx__$53.block || ctx__$53.elem);
        var __$r__$71;
        var __$l4__$72 = $$mode;
        $$mode = "cls";
        __$r__$71 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$72;
        var cls__$70 = __$r__$71;
        cls__$70 || (cls__$70 = ctx__$53.cls);
        var addJSInitClass__$73 = ctx__$53.block && jsParams__$64 && !ctx__$53.elem;
        if (isBEM__$54 || cls__$70) {
            __$ctx._str += ' class="';
            if (isBEM__$54) {
                __$ctx._str += BEM_INTERNAL__$52.buildClasses(vBlock__$60, ctx__$53.elem, ctx__$53.elemMods || ctx__$53.mods);
                var __$r__$75;
                var __$l5__$76 = $$mode;
                $$mode = "mix";
                __$r__$75 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$76;
                var mix__$74 = __$r__$75;
                ctx__$53.mix && (mix__$74 = mix__$74 ? [].concat(mix__$74, ctx__$53.mix) : ctx__$53.mix);
                if (mix__$74) {
                    var visited__$77 = {}, visitedKey__$78 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$77[visitedKey__$78(vBlock__$60, $$elem)] = true;
                    __$ctx.isArray(mix__$74) || (mix__$74 = [ mix__$74 ]);
                    for (var i__$79 = 0; i__$79 < mix__$74.length; i__$79++) {
                        var mixItem__$80 = mix__$74[i__$79], hasItem__$81 = mixItem__$80.block || mixItem__$80.elem, mixBlock__$82 = mixItem__$80.block || mixItem__$80._block || $$block, mixElem__$83 = mixItem__$80.elem || mixItem__$80._elem || $$elem;
                        hasItem__$81 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$52[hasItem__$81 ? "buildClasses" : "buildModsClasses"](mixBlock__$82, mixItem__$80.elem || mixItem__$80._elem || (mixItem__$80.block ? undefined : $$elem), mixItem__$80.elemMods || mixItem__$80.mods);
                        if (mixItem__$80.js) {
                            (jsParams__$64 || (jsParams__$64 = {}))[BEM_INTERNAL__$52.buildClass(mixBlock__$82, mixItem__$80.elem)] = mixItem__$80.js === true ? {} : mixItem__$80.js;
                            addJSInitClass__$73 || (addJSInitClass__$73 = mixBlock__$82 && !mixItem__$80.elem);
                        }
                        if (hasItem__$81 && !visited__$77[visitedKey__$78(mixBlock__$82, mixElem__$83)]) {
                            visited__$77[visitedKey__$78(mixBlock__$82, mixElem__$83)] = true;
                            var __$r__$85;
                            var __$l6__$86 = $$mode;
                            $$mode = "mix";
                            var __$l7__$87 = $$block;
                            $$block = mixBlock__$82;
                            var __$l8__$88 = $$elem;
                            $$elem = mixElem__$83;
                            __$r__$85 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$86;
                            $$block = __$l7__$87;
                            $$elem = __$l8__$88;
                            var nestedMix__$84 = __$r__$85;
                            if (nestedMix__$84) {
                                for (var j__$89 = 0; j__$89 < nestedMix__$84.length; j__$89++) {
                                    var nestedItem__$90 = nestedMix__$84[j__$89];
                                    if (!nestedItem__$90.block && !nestedItem__$90.elem || !visited__$77[visitedKey__$78(nestedItem__$90.block, nestedItem__$90.elem)]) {
                                        nestedItem__$90._block = mixBlock__$82;
                                        nestedItem__$90._elem = mixElem__$83;
                                        mix__$74.splice(i__$79 + 1, 0, nestedItem__$90);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$70 && (__$ctx._str += isBEM__$54 ? " " + cls__$70 : cls__$70);
            __$ctx._str += addJSInitClass__$73 ? ' i-bem"' : '"';
        }
        if (isBEM__$54 && jsParams__$64) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$64)) + '"';
        }
        var __$r__$92;
        var __$l9__$93 = $$mode;
        $$mode = "attrs";
        __$r__$92 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$93;
        var attrs__$91 = __$r__$92;
        attrs__$91 = __$ctx.extend(attrs__$91, ctx__$53.attrs);
        if (attrs__$91) {
            var name__$94, attr__$95;
            for (name__$94 in attrs__$91) {
                attr__$95 = attrs__$91[name__$94];
                if (typeof attr__$95 === "undefined") continue;
                __$ctx._str += " " + name__$94 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$95) ? attr__$95 : __$ctx.reapply(attr__$95)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$55)) {
        __$ctx._str += "/>";
    } else {
        tag__$55 && (__$ctx._str += ">");
        var __$r__$97;
        var __$l10__$98 = $$mode;
        $$mode = "content";
        __$r__$97 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$98;
        var content__$96 = __$r__$97;
        if (content__$96 || content__$96 === 0) {
            isBEM__$54 = vBlock__$60 || $$elem;
            var __$r__$99;
            var __$l11__$100 = $$mode;
            $$mode = "";
            var __$l12__$101 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$102 = __$ctx.position;
            __$ctx.position = isBEM__$54 ? 1 : __$ctx.position;
            var __$l14__$103 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$54 ? 1 : __$ctx._listLength;
            var __$l15__$104 = __$ctx.ctx;
            __$ctx.ctx = content__$96;
            __$r__$99 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$100;
            __$ctx._notNewList = __$l12__$101;
            __$ctx.position = __$l13__$102;
            __$ctx._listLength = __$l14__$103;
            __$ctx.ctx = __$l15__$104;
        }
        tag__$55 && (__$ctx._str += "</" + tag__$55 + ">");
    }
    res__$56 = __$ctx._str;
    __$r__$58 = undefined;
    __$ctx._str = __$l0__$59;
    __$ctx._buf.push(res__$56);
    return;
}

function __$b48(__$ctx, __$ref) {
    var __$r__$106;
    var __$l0__$107 = $$mode;
    $$mode = "";
    var __$l1__$108 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$110;
    var __$l2__$111 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 1024;
    __$r__$110 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$111;
    __$r__$106 = __$r__$110;
    $$mode = __$l0__$107;
    __$ctx.ctx = __$l1__$108;
    return;
}

function __$b49(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$112 = __$ctx.ctx;
    if (ctx__$112 && ctx__$112 !== true || ctx__$112 === 0) {
        __$ctx._str += ctx__$112 + "";
    }
    return;
}

function __$b50(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b51(__$ctx, __$ref) {
    var ctx__$113 = __$ctx.ctx, len__$114 = ctx__$113.length, i__$115 = 0, prevPos__$116 = __$ctx.position, prevNotNewList__$117 = __$ctx._notNewList;
    if (prevNotNewList__$117) {
        __$ctx._listLength += len__$114 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$114;
    }
    __$ctx._notNewList = true;
    while (i__$115 < len__$114) (function __$lb__$118() {
        var __$r__$119;
        var __$l0__$120 = __$ctx.ctx;
        __$ctx.ctx = ctx__$113[i__$115++];
        __$r__$119 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$120;
        return __$r__$119;
    })();
    prevNotNewList__$117 || (__$ctx.position = prevPos__$116);
    return;
}

function __$b52(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$121 = __$ctx.ctx.block, vElem__$122 = __$ctx.ctx.elem, block__$123 = __$ctx._currBlock || $$block;
    var __$r__$125;
    var __$l0__$126 = $$mode;
    $$mode = "default";
    var __$l1__$127 = $$block;
    $$block = vBlock__$121 || (vElem__$122 ? block__$123 : undefined);
    var __$l2__$128 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$121 || vElem__$122 ? undefined : block__$123;
    var __$l3__$129 = $$elem;
    $$elem = vElem__$122;
    var __$l4__$130 = $$mods;
    $$mods = vBlock__$121 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$131 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$125 = undefined;
    $$mode = __$l0__$126;
    $$block = __$l1__$127;
    __$ctx._currBlock = __$l2__$128;
    $$elem = __$l3__$129;
    $$mods = __$l4__$130;
    $$elemMods = __$l5__$131;
    return;
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