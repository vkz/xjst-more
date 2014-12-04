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
        var __$r = __$g0(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "tag") {
        var __$r = __$g1(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "js") {
        var __$r = __$g2(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "mix") {
        var __$t = $$block;
        if (__$t === "action") {
            if ($$elem === "inner") {
                return {
                    block: "clearfix"
                };
            }
            if (!$$elem) {
                return "clearfix";
            }
        } else if (__$t === "carousel") {
            if ($$elem === "paginator") {
                return {
                    block: "clearfix"
                };
            }
        } else if (__$t === "button") {
            if (!$$elem) {
                return {
                    elem: "control"
                };
            }
        } else if (__$t === "first-screen") {
            if (!$$elem) {
                return {
                    block: "clearfix"
                };
            }
        } else if (__$t === "link") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "header") {
            if (!$$elem) {
                return {
                    block: "clearfix"
                };
            }
        }
        return undefined;
    } else if (__$t === "attrs") {
        var __$r = __$g3(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "default") {
        var __$r = __$g4(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "button") {
        if ($$block === "carousel" && $$elem === "paginator") {
            return {
                elem: "paginator-button"
            };
        }
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "page") {
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
        } else if (__$t === "ua") {
            if (!$$elem) {
                return false;
            }
        }
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 1048576) === 0) {
            var __$r = __$b90(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b91(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b92(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b93(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b94(__$ctx, __$ref);
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
        ctx["_input"] = undefined;
        ctx["_mode"] = undefined;
        ctx["_button"] = undefined;
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

function __$b8(__$ctx, __$ref) {
    var slides__$26 = [], items__$27 = __$ctx._itemsNumber;
    while (items__$27) {
        slides__$26.push(function __$lb__$28() {
            var __$r__$29;
            var __$l0__$30 = $$mode;
            $$mode = "button";
            __$r__$29 = applyc(__$ctx, __$ref);
            $$mode = __$l0__$30;
            return __$r__$29;
        }());
        items__$27--;
    }
    return slides__$26;
}

function __$b10(__$ctx, __$ref) {
    var ctx__$61 = __$ctx.ctx, content__$62 = [ ctx__$61.icon ];
    "text" in ctx__$61 && content__$62.push({
        elem: "text",
        content: ctx__$61.text
    });
    return content__$62;
}

function __$b19(__$ctx, __$ref) {
    var mods__$12 = __$ctx.ctx.mods, level__$13 = mods__$12 && mods__$12.level;
    return "h" + (level__$13 || 1);
}

function __$b61(__$ctx, __$ref) {
    var input__$17 = __$ctx._input, attrs__$18 = {
        id: input__$17.id,
        name: input__$17.name,
        value: input__$17.val,
        maxlength: input__$17.maxLength,
        tabindex: input__$17.tabIndex,
        placeholder: input__$17.placeholder
    };
    input__$17.autocomplete === false && (attrs__$18.autocomplete = "off");
    $$mods.disabled && (attrs__$18.disabled = "disabled");
    return attrs__$18;
}

function __$b62(__$ctx, __$ref) {
    var ctx__$25 = __$ctx.ctx;
    return {
        src: ctx__$25.url,
        alt: ctx__$25.alt,
        title: ctx__$25.title
    };
}

function __$b63(__$ctx, __$ref) {
    var ctx__$53 = __$ctx.ctx, attrs__$54 = {};
    ctx__$53.target && (attrs__$54.target = ctx__$53.target);
    $$mods.disabled ? attrs__$54["aria-disabled"] = true : attrs__$54.href = ctx__$53.url;
    return __$ctx.extend(function __$lb__$55() {
        var __$r__$56;
        var __$l0__$57 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 2048;
        __$r__$56 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$57;
        return __$r__$56;
    }(), attrs__$54);
}

function __$b65(__$ctx, __$ref) {
    var ctx__$63 = __$ctx.ctx, attrs__$64 = {
        type: $$mods.type || "button",
        name: ctx__$63.name,
        value: ctx__$63.val
    };
    $$mods.disabled && (attrs__$64.disabled = "disabled");
    return __$ctx.extend(function __$lb__$65() {
        var __$r__$66;
        var __$l0__$67 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 8192;
        __$r__$66 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$67;
        return __$r__$66;
    }(), attrs__$64);
}

function __$b66(__$ctx, __$ref) {
    var ctx__$68 = __$ctx.ctx;
    return {
        role: "button",
        tabindex: ctx__$68.tabIndex,
        id: ctx__$68.id,
        title: ctx__$68.title
    };
}

function __$b67(__$ctx, __$ref) {
    var ctx__$43 = __$ctx.ctx, attrs__$44 = {}, tabIndex__$45;
    if (!$$mods.disabled) {
        if (ctx__$43.url) {
            attrs__$44.href = ctx__$43.url;
            tabIndex__$45 = ctx__$43.tabIndex;
        } else {
            tabIndex__$45 = ctx__$43.tabIndex || 0;
        }
    }
    typeof tabIndex__$45 === "undefined" || (attrs__$44.tabindex = tabIndex__$45);
    ctx__$43.title && (attrs__$44.title = ctx__$43.title);
    ctx__$43.target && (attrs__$44.target = ctx__$43.target);
    return attrs__$44;
}

function __$b72(__$ctx, __$ref) {
    var __$r__$20;
    var __$l0__$21 = __$ctx._input;
    __$ctx._input = __$ctx.ctx;
    var __$r__$23;
    var __$l1__$24 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 32;
    __$r__$23 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$24;
    __$r__$20 = __$r__$23;
    __$ctx._input = __$l0__$21;
    return;
}

function __$b73(__$ctx, __$ref) {
    var _this__$31 = __$ctx, items__$32 = 0;
    function countItems__$33(content) {
        if (_this__$31.isSimple(content)) return;
        Object.keys(content).forEach(function(key) {
            key === "elem" && content[key] == "item" && items__$32++;
            countItems__$33(content[key]);
        });
        return items__$32;
    }
    __$ctx._itemsNumber = countItems__$33(__$ctx.ctx.content);
    var __$r__$35;
    var __$l0__$36 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 64;
    __$r__$35 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$36;
    return;
}

function __$b74(__$ctx, __$ref) {
    var __$r__$70;
    var __$l0__$71 = __$ctx._button;
    __$ctx._button = __$ctx.ctx;
    var __$r__$73;
    var __$l1__$74 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16384;
    __$r__$73 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$74;
    __$r__$70 = __$r__$73;
    __$ctx._button = __$l0__$71;
    return;
}

function __$b75(__$ctx, __$ref) {
    var ctx__$46 = __$ctx.ctx;
    typeof ctx__$46.url === "object" && (ctx__$46.url = __$ctx.reapply(ctx__$46.url));
    var __$r__$48;
    var __$l0__$49 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 512;
    __$r__$48 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$49;
    return;
}

function __$b76(__$ctx, __$ref) {
    var url__$78 = __$ctx.ctx.url;
    var __$r__$80;
    var __$l0__$81 = $$mode;
    $$mode = "";
    var __$l1__$82 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$78 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$84;
    var __$l2__$85 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 65536;
    __$r__$84 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$85;
    __$r__$80 = __$r__$84;
    $$mode = __$l0__$81;
    __$ctx.ctx = __$l1__$82;
    return;
}

function __$b77(__$ctx, __$ref) {
    var ie__$86 = __$ctx.ctx.ie, hideRule__$87 = !ie__$86 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$86 === "!IE" ? [ ie__$86, "<!-->", "<!--" ] : [ ie__$86, "", "" ];
    var __$r__$89;
    var __$l0__$90 = $$mode;
    $$mode = "";
    var __$l3__$91 = __$ctx.ctx;
    var __$l1__$92 = __$l3__$91._ieCommented;
    __$l3__$91._ieCommented = true;
    var __$l2__$93 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$87[0] + "]>" + hideRule__$87[1], __$ctx.ctx, hideRule__$87[2] + "<![endif]-->" ];
    __$r__$89 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$90;
    __$l3__$91._ieCommented = __$l1__$92;
    __$ctx.ctx = __$l2__$93;
    return;
}

function __$b78(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$100 = __$ctx.ctx;
    var __$r__$102;
    var __$l0__$103 = $$mode;
    $$mode = "";
    var __$l1__$104 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$100.doctype || "<!DOCTYPE html>", {
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
                content: ctx__$100.title
            }, {
                block: "ua"
            }, ctx__$100.head, ctx__$100.styles, ctx__$100.favicon ? {
                elem: "favicon",
                url: ctx__$100.favicon
            } : "" ]
        }, ctx__$100 ]
    } ];
    var __$r__$106;
    var __$l2__$107 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 524288;
    __$r__$106 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$107;
    __$r__$102 = __$r__$106;
    $$mode = __$l0__$103;
    __$ctx.ctx = __$l1__$104;
    __$ctx._defPageApplied = false;
    return;
}

function __$b79(__$ctx, __$ref) {
    var BEM_INTERNAL__$108 = __$ctx.BEM.INTERNAL, ctx__$109 = __$ctx.ctx, isBEM__$110, tag__$111, res__$112;
    var __$r__$114;
    var __$l0__$115 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$116 = $$block;
    var __$r__$118;
    var __$l1__$119 = $$mode;
    $$mode = "tag";
    __$r__$118 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$119;
    tag__$111 = __$r__$118;
    typeof tag__$111 !== "undefined" || (tag__$111 = ctx__$109.tag);
    typeof tag__$111 !== "undefined" || (tag__$111 = "div");
    if (tag__$111) {
        var jsParams__$120, js__$121;
        if (vBlock__$116 && ctx__$109.js !== false) {
            var __$r__$122;
            var __$l2__$123 = $$mode;
            $$mode = "js";
            __$r__$122 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$123;
            js__$121 = __$r__$122;
            js__$121 = js__$121 ? __$ctx.extend(ctx__$109.js, js__$121 === true ? {} : js__$121) : ctx__$109.js === true ? {} : ctx__$109.js;
            js__$121 && ((jsParams__$120 = {})[BEM_INTERNAL__$108.buildClass(vBlock__$116, ctx__$109.elem)] = js__$121);
        }
        __$ctx._str += "<" + tag__$111;
        var __$r__$124;
        var __$l3__$125 = $$mode;
        $$mode = "bem";
        __$r__$124 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$125;
        isBEM__$110 = __$r__$124;
        typeof isBEM__$110 !== "undefined" || (isBEM__$110 = typeof ctx__$109.bem !== "undefined" ? ctx__$109.bem : ctx__$109.block || ctx__$109.elem);
        var __$r__$127;
        var __$l4__$128 = $$mode;
        $$mode = "cls";
        __$r__$127 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$128;
        var cls__$126 = __$r__$127;
        cls__$126 || (cls__$126 = ctx__$109.cls);
        var addJSInitClass__$129 = ctx__$109.block && jsParams__$120 && !ctx__$109.elem;
        if (isBEM__$110 || cls__$126) {
            __$ctx._str += ' class="';
            if (isBEM__$110) {
                __$ctx._str += BEM_INTERNAL__$108.buildClasses(vBlock__$116, ctx__$109.elem, ctx__$109.elemMods || ctx__$109.mods);
                var __$r__$131;
                var __$l5__$132 = $$mode;
                $$mode = "mix";
                __$r__$131 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$132;
                var mix__$130 = __$r__$131;
                ctx__$109.mix && (mix__$130 = mix__$130 ? [].concat(mix__$130, ctx__$109.mix) : ctx__$109.mix);
                if (mix__$130) {
                    var visited__$133 = {}, visitedKey__$134 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$133[visitedKey__$134(vBlock__$116, $$elem)] = true;
                    __$ctx.isArray(mix__$130) || (mix__$130 = [ mix__$130 ]);
                    for (var i__$135 = 0; i__$135 < mix__$130.length; i__$135++) {
                        var mixItem__$136 = mix__$130[i__$135], hasItem__$137 = mixItem__$136.block || mixItem__$136.elem, mixBlock__$138 = mixItem__$136.block || mixItem__$136._block || $$block, mixElem__$139 = mixItem__$136.elem || mixItem__$136._elem || $$elem;
                        hasItem__$137 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$108[hasItem__$137 ? "buildClasses" : "buildModsClasses"](mixBlock__$138, mixItem__$136.elem || mixItem__$136._elem || (mixItem__$136.block ? undefined : $$elem), mixItem__$136.elemMods || mixItem__$136.mods);
                        if (mixItem__$136.js) {
                            (jsParams__$120 || (jsParams__$120 = {}))[BEM_INTERNAL__$108.buildClass(mixBlock__$138, mixItem__$136.elem)] = mixItem__$136.js === true ? {} : mixItem__$136.js;
                            addJSInitClass__$129 || (addJSInitClass__$129 = mixBlock__$138 && !mixItem__$136.elem);
                        }
                        if (hasItem__$137 && !visited__$133[visitedKey__$134(mixBlock__$138, mixElem__$139)]) {
                            visited__$133[visitedKey__$134(mixBlock__$138, mixElem__$139)] = true;
                            var __$r__$141;
                            var __$l6__$142 = $$mode;
                            $$mode = "mix";
                            var __$l7__$143 = $$block;
                            $$block = mixBlock__$138;
                            var __$l8__$144 = $$elem;
                            $$elem = mixElem__$139;
                            __$r__$141 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$142;
                            $$block = __$l7__$143;
                            $$elem = __$l8__$144;
                            var nestedMix__$140 = __$r__$141;
                            if (nestedMix__$140) {
                                for (var j__$145 = 0; j__$145 < nestedMix__$140.length; j__$145++) {
                                    var nestedItem__$146 = nestedMix__$140[j__$145];
                                    if (!nestedItem__$146.block && !nestedItem__$146.elem || !visited__$133[visitedKey__$134(nestedItem__$146.block, nestedItem__$146.elem)]) {
                                        nestedItem__$146._block = mixBlock__$138;
                                        nestedItem__$146._elem = mixElem__$139;
                                        mix__$130.splice(i__$135 + 1, 0, nestedItem__$146);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$126 && (__$ctx._str += isBEM__$110 ? " " + cls__$126 : cls__$126);
            __$ctx._str += addJSInitClass__$129 ? ' i-bem"' : '"';
        }
        if (isBEM__$110 && jsParams__$120) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$120)) + '"';
        }
        var __$r__$148;
        var __$l9__$149 = $$mode;
        $$mode = "attrs";
        __$r__$148 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$149;
        var attrs__$147 = __$r__$148;
        attrs__$147 = __$ctx.extend(attrs__$147, ctx__$109.attrs);
        if (attrs__$147) {
            var name__$150, attr__$151;
            for (name__$150 in attrs__$147) {
                attr__$151 = attrs__$147[name__$150];
                if (typeof attr__$151 === "undefined") continue;
                __$ctx._str += " " + name__$150 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$151) ? attr__$151 : __$ctx.reapply(attr__$151)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$111)) {
        __$ctx._str += "/>";
    } else {
        tag__$111 && (__$ctx._str += ">");
        var __$r__$153;
        var __$l10__$154 = $$mode;
        $$mode = "content";
        __$r__$153 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$154;
        var content__$152 = __$r__$153;
        if (content__$152 || content__$152 === 0) {
            isBEM__$110 = vBlock__$116 || $$elem;
            var __$r__$155;
            var __$l11__$156 = $$mode;
            $$mode = "";
            var __$l12__$157 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$158 = __$ctx.position;
            __$ctx.position = isBEM__$110 ? 1 : __$ctx.position;
            var __$l14__$159 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$110 ? 1 : __$ctx._listLength;
            var __$l15__$160 = __$ctx.ctx;
            __$ctx.ctx = content__$152;
            __$r__$155 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$156;
            __$ctx._notNewList = __$l12__$157;
            __$ctx.position = __$l13__$158;
            __$ctx._listLength = __$l14__$159;
            __$ctx.ctx = __$l15__$160;
        }
        tag__$111 && (__$ctx._str += "</" + tag__$111 + ">");
    }
    res__$112 = __$ctx._str;
    __$r__$114 = undefined;
    __$ctx._str = __$l0__$115;
    __$ctx._buf.push(res__$112);
    return;
}

function __$b90(__$ctx, __$ref) {
    var __$r__$162;
    var __$l0__$163 = $$mode;
    $$mode = "";
    var __$l1__$164 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$166;
    var __$l2__$167 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 1048576;
    __$r__$166 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$167;
    __$r__$162 = __$r__$166;
    $$mode = __$l0__$163;
    __$ctx.ctx = __$l1__$164;
    return;
}

function __$b91(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$168 = __$ctx.ctx;
    if (ctx__$168 && ctx__$168 !== true || ctx__$168 === 0) {
        __$ctx._str += ctx__$168 + "";
    }
    return;
}

function __$b92(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b93(__$ctx, __$ref) {
    var ctx__$169 = __$ctx.ctx, len__$170 = ctx__$169.length, i__$171 = 0, prevPos__$172 = __$ctx.position, prevNotNewList__$173 = __$ctx._notNewList;
    if (prevNotNewList__$173) {
        __$ctx._listLength += len__$170 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$170;
    }
    __$ctx._notNewList = true;
    while (i__$171 < len__$170) (function __$lb__$174() {
        var __$r__$175;
        var __$l0__$176 = __$ctx.ctx;
        __$ctx.ctx = ctx__$169[i__$171++];
        __$r__$175 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$176;
        return __$r__$175;
    })();
    prevNotNewList__$173 || (__$ctx.position = prevPos__$172);
    return;
}

function __$b94(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$177 = __$ctx.ctx.block, vElem__$178 = __$ctx.ctx.elem, block__$179 = __$ctx._currBlock || $$block;
    var __$r__$181;
    var __$l0__$182 = $$mode;
    $$mode = "default";
    var __$l1__$183 = $$block;
    $$block = vBlock__$177 || (vElem__$178 ? block__$179 : undefined);
    var __$l2__$184 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$177 || vElem__$178 ? undefined : block__$179;
    var __$l3__$185 = $$elem;
    $$elem = vElem__$178;
    var __$l4__$186 = $$mods;
    $$mods = vBlock__$177 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$187 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$181 = undefined;
    $$mode = __$l0__$182;
    $$block = __$l1__$183;
    __$ctx._currBlock = __$l2__$184;
    $$elem = __$l3__$185;
    $$mods = __$l4__$186;
    $$elemMods = __$l5__$187;
    return;
}

function __$g0(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "contacts") {
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
    } else if (__$t === "price") {
        if (!$$elem && (__$ctx.__$a0 & 2) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$3() {
                    var __$r__$4;
                    var __$l0__$5 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 2;
                    __$r__$4 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$5;
                    return __$r__$4;
                }()
            };
        }
    } else if (__$t === "features") {
        if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$6() {
                    var __$r__$7;
                    var __$l0__$8 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 4;
                    __$r__$7 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$8;
                    return __$r__$7;
                }()
            };
        }
    } else if (__$t === "portfolio") {
        if (!$$elem && (__$ctx.__$a0 & 8) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$9() {
                    var __$r__$10;
                    var __$l0__$11 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 8;
                    __$r__$10 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$11;
                    return __$r__$10;
                }()
            };
        }
    } else if (__$t === "action") {
        if (!$$elem && (__$ctx.__$a0 & 16) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$14() {
                    var __$r__$15;
                    var __$l0__$16 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 16;
                    __$r__$15 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$16;
                    return __$r__$15;
                }()
            };
        }
    } else if (__$t === "input") {
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
    } else if (__$t === "carousel") {
        if ($$elem === "paginator") {
            var __$r = __$b8(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            if (typeof __$ctx.ctx.content !== "undefined") {
                return __$ctx.ctx.content;
            }
            var __$r = __$b10(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "first-screen") {
        if (!$$elem && (__$ctx.__$a0 & 128) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$37() {
                    var __$r__$38;
                    var __$l0__$39 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 128;
                    __$r__$38 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$39;
                    return __$r__$38;
                }()
            };
        }
    } else if (__$t === "header") {
        if (!$$elem && (__$ctx.__$a0 & 32768) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$75() {
                    var __$r__$76;
                    var __$l0__$77 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 32768;
                    __$r__$76 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$77;
                    return __$r__$76;
                }()
            };
        }
    } else if (__$t === "page") {
        if ($$elem === "head" && (__$ctx.__$a0 & 131072) === 0) {
            return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            }, function __$lb__$94() {
                var __$r__$95;
                var __$l0__$96 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 131072;
                __$r__$95 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$96;
                return __$r__$95;
            }() ];
        }
        if (!$$elem && (__$ctx.__$a0 & 262144) === 0) {
            return [ function __$lb__$97() {
                var __$r__$98;
                var __$l0__$99 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 262144;
                __$r__$98 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$99;
                return __$r__$98;
            }(), __$ctx.ctx.scripts ];
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
        }
    }
    return __$ctx.ctx.content;
    return __$ref;
}

function __$g1(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "price") {
        if ($$elem === "old") {
            return "span";
        }
    } else if (__$t === "stage") {
        if (!$$elem) {
            return "li";
        }
    } else if (__$t === "heading") {
        if (!$$elem) {
            var __$r = __$b19(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "stages") {
        if ($$elem === "inner") {
            return "ol";
        }
    } else if (__$t === "description") {
        if ($$elem === "item") {
            return "span";
        }
    } else if (__$t === "timer") {
        if ($$elem === "item") {
            return "span";
        }
    } else if (__$t === "action") {
        if ($$elem === "old") {
            return "span";
        }
    } else if (__$t === "input") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "carousel") {
        if ($$elem === "img") {
            return "img";
        }
    } else if (__$t === "button") {
        if (!$$elem && $$mods && $$mods["type"] === "link") {
            return "a";
        }
        if ($$elem === "text") {
            return "span";
        }
        if (!$$elem) {
            return __$ctx.ctx.tag || "button";
        }
    } else if (__$t === "link") {
        if (!$$elem) {
            return "a";
        }
    } else if (__$t === "nav") {
        if ($$elem === "item") {
            return "li";
        }
        if (!$$elem) {
            return "ul";
        }
    } else if (__$t === "page") {
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
    } else if (__$t === "ua") {
        if (!$$elem) {
            return "script";
        }
    }
    return undefined;
    return __$ref;
}

function __$g2(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "timer") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "input") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "carousel") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            var __$t = $$mods;
            if (__$t) {
                if ($$mods && $$mods["type"] === "link" && $$mods["disabled"] === true && (__$ctx.__$a0 & 1024) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$50() {
                        var __$r__$51;
                        var __$l0__$52 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 1024;
                        __$r__$51 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$52;
                        return __$r__$51;
                    }(), {
                        url: __$ctx.ctx.url
                    });
                    if (__$r !== __$ref) return __$r;
                }
                if ($$mods["focused"] === true && (__$ctx.__$a0 & 4096) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$58() {
                        var __$r__$59;
                        var __$l0__$60 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 4096;
                        __$r__$59 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$60;
                        return __$r__$59;
                    }(), {
                        live: false
                    });
                    if (__$r !== __$ref) return __$r;
                }
            }
            return true;
        }
    } else if (__$t === "link") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["disabled"] === true && (__$ctx.__$a0 & 256) === 0) {
                var __$r = __$ctx.extend(function __$lb__$40() {
                    var __$r__$41;
                    var __$l0__$42 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 256;
                    __$r__$41 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$42;
                    return __$r__$41;
                }(), {
                    url: __$ctx.ctx.url
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
    }
    return undefined;
    return __$ref;
}

function __$g3(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "input") {
        if ($$elem === "control") {
            var __$r = __$b61(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "carousel") {
        if ($$elem === "img") {
            var __$r = __$b62(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "button") {
        if (!$$elem && $$mods && $$mods["type"] === "link" && (__$ctx.__$a0 & 2048) === 0) {
            var __$r = __$b63(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if ($$elem === "text" && typeof __$ctx._button.textMaxWidth === "number") {
            return {
                style: "max-width:" + __$ctx._button.textMaxWidth + "px"
            };
        }
        var __$t = !$$elem;
        if (__$t) {
            if ((!$$mods.type || $$mods.type === "submit") && (__$ctx.__$a0 & 8192) === 0) {
                var __$r = __$b65(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b66(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "link") {
        if (!$$elem) {
            var __$r = __$b67(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
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
    return __$ref;
}

function __$g4(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "input") {
        if (!$$elem && (__$ctx.__$a0 & 32) === 0) {
            var __$r = __$b72(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "carousel") {
        if (!$$elem && (__$ctx.__$a0 & 64) === 0) {
            var __$r = __$b73(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "button") {
        if (!$$elem && (__$ctx.__$a0 & 16384) === 0) {
            var __$r = __$b74(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "link") {
        if (!$$elem && (__$ctx.__$a0 & 512) === 0) {
            var __$r = __$b75(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "css") {
            var __$t = !__$ctx.ctx._ieCommented;
            if (__$t) {
                var __$t = __$ctx.ctx.hasOwnProperty("ie");
                if (__$t) {
                    if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 65536) === 0) {
                        var __$r = __$b76(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                    var __$r = __$b77(__$ctx, __$ref);
                    if (__$r !== __$ref) return __$r;
                }
            }
        }
        if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 524288) === 0) {
            var __$r = __$b78(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    }
    var __$r = __$b79(__$ctx, __$ref);
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