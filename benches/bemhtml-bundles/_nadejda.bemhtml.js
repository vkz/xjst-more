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
    if (__$t === "attrs") {
        var __$r = __$g0(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "tag") {
        var __$r = __$g1(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "mix") {
        var __$t = $$block;
        if (__$t === "article") {
            if (!$$elem) {
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
        } else if (__$t === "radio-group") {
            if (!$$elem) {
                return [ {
                    block: "control-group"
                } ];
            }
        } else if (__$t === "link") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "nadejda") {
            if (!$$elem) {
                return {
                    block: "container"
                };
            }
        }
        return undefined;
    } else if (__$t === "content") {
        var __$r = __$g2(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "js") {
        var __$t = $$block;
        if (__$t === "button") {
            var __$t = !$$elem;
            if (__$t) {
                if ($$mods && $$mods["focused"] === true && (__$ctx.__$a0 & 1) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$9() {
                        var __$r__$10;
                        var __$l0__$11 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 1;
                        __$r__$10 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$11;
                        return __$r__$10;
                    }(), {
                        live: false
                    });
                    if (__$r !== __$ref) return __$r;
                }
                return true;
            }
        } else if (__$t === "checkbox") {
            if (!$$elem) {
                return true;
            }
        } else if (__$t === "radio") {
            if (!$$elem) {
                return true;
            }
        } else if (__$t === "radio-group") {
            if (!$$elem) {
                return true;
            }
        } else if (__$t === "link") {
            var __$t = !$$elem;
            if (__$t) {
                if ($$mods && $$mods["disabled"] === true && (__$ctx.__$a0 & 8) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$31() {
                        var __$r__$32;
                        var __$l0__$33 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 8;
                        __$r__$32 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$33;
                        return __$r__$32;
                    }(), {
                        url: __$ctx.ctx.url
                    });
                    if (__$r !== __$ref) return __$r;
                }
                return true;
            }
        }
        return undefined;
    } else if (__$t === "default") {
        var __$t = $$block;
        if (__$t === "button") {
            if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
                var __$r = __$b65(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "link") {
            if (!$$elem && (__$ctx.__$a0 & 16) === 0) {
                var __$r = __$b66(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "css") {
                var __$t = !__$ctx.ctx._ieCommented;
                if (__$t) {
                    var __$t = __$ctx.ctx.hasOwnProperty("ie");
                    if (__$t) {
                        if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 64) === 0) {
                            var __$r = __$b67(__$ctx, __$ref);
                            if (__$r !== __$ref) return __$r;
                        }
                        var __$r = __$b68(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                }
            }
            if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 512) === 0) {
                var __$r = __$b69(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        var __$r = __$b70(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "ua") {
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
        }
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 1024) === 0) {
            var __$r = __$b80(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b81(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b82(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b83(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b84(__$ctx, __$ref);
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
        ctx["_button"] = undefined;
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

function __$b1(__$ctx, __$ref) {
    var ctx__$0 = __$ctx.ctx;
    return {
        src: ctx__$0.url,
        width: ctx__$0.width,
        height: ctx__$0.height,
        alt: ctx__$0.alt,
        title: ctx__$0.title
    };
}

function __$b3(__$ctx, __$ref) {
    var ctx__$14 = __$ctx.ctx, attrs__$15 = {
        type: $$mods.type || "button",
        name: ctx__$14.name,
        value: ctx__$14.val
    };
    $$mods.disabled && (attrs__$15.disabled = "disabled");
    return __$ctx.extend(function __$lb__$16() {
        var __$r__$17;
        var __$l0__$18 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 2;
        __$r__$17 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$18;
        return __$r__$17;
    }(), attrs__$15);
}

function __$b4(__$ctx, __$ref) {
    var ctx__$19 = __$ctx.ctx;
    return {
        role: "button",
        tabindex: ctx__$19.tabIndex,
        id: ctx__$19.id,
        title: ctx__$19.title
    };
}

function __$b5(__$ctx, __$ref) {
    var attrs__$3 = {
        type: "checkbox",
        autocomplete: "off"
    }, ctx__$4 = __$ctx.ctx;
    attrs__$3.name = ctx__$4.name;
    attrs__$3.value = ctx__$4.val;
    ctx__$4.checked && (attrs__$3.checked = "checked");
    ctx__$4.disabled && (attrs__$3.disabled = "disabled");
    return attrs__$3;
}

function __$b6(__$ctx, __$ref) {
    var ctx__$26 = __$ctx.ctx, attrs__$27 = {
        type: "radio",
        autocomplete: "off",
        name: ctx__$26.name,
        value: ctx__$26.val
    };
    ctx__$26.checked && (attrs__$27.checked = "checked");
    ctx__$26.disabled && (attrs__$27.disabled = "disabled");
    return attrs__$27;
}

function __$b7(__$ctx, __$ref) {
    var ctx__$34 = __$ctx.ctx, attrs__$35 = {}, tabIndex__$36;
    if (!$$mods.disabled) {
        if (ctx__$34.url) {
            attrs__$35.href = ctx__$34.url;
            tabIndex__$36 = ctx__$34.tabIndex;
        } else {
            tabIndex__$36 = ctx__$34.tabIndex || 0;
        }
    }
    typeof tabIndex__$36 === "undefined" || (attrs__$35.tabindex = tabIndex__$36);
    ctx__$34.title && (attrs__$35.title = ctx__$34.title);
    ctx__$34.target && (attrs__$35.target = ctx__$34.target);
    return attrs__$35;
}

function __$b46(__$ctx, __$ref) {
    var ctx__$12 = __$ctx.ctx, content__$13 = [ ctx__$12.icon ];
    "text" in ctx__$12 && content__$13.push({
        elem: "text",
        content: ctx__$12.text
    });
    return content__$13;
}

function __$b47(__$ctx, __$ref) {
    var ctx__$1 = __$ctx.ctx, mods__$2 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: "check",
            checked: mods__$2.checked,
            disabled: mods__$2.disabled,
            theme: mods__$2.theme,
            size: mods__$2.size
        },
        title: ctx__$1.title,
        content: [ ctx__$1.icon, typeof ctx__$1.text !== "undefined" ? {
            elem: "text",
            content: ctx__$1.text
        } : "" ]
    }, {
        block: "checkbox",
        elem: "control",
        checked: mods__$2.checked,
        disabled: mods__$2.disabled,
        name: ctx__$1.name,
        val: ctx__$1.val
    } ];
}

function __$b48(__$ctx, __$ref) {
    var ctx__$5 = __$ctx.ctx, mods__$6 = $$mods;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: mods__$6.checked,
            disabled: mods__$6.disabled,
            name: ctx__$5.name,
            val: ctx__$5.val
        }
    }, ctx__$5.text ];
}

function __$b49(__$ctx, __$ref) {
    var ctx__$7 = __$ctx.ctx, mods__$8 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: mods__$8.mode === "radio-check" ? "check" : "radio",
            checked: mods__$8.checked,
            disabled: mods__$8.disabled,
            theme: mods__$8.theme,
            size: mods__$8.size
        },
        title: ctx__$7.title,
        content: [ ctx__$7.icon, typeof ctx__$7.text !== "undefined" ? {
            elem: "text",
            content: ctx__$7.text
        } : "" ]
    }, {
        block: "radio",
        elem: "control",
        checked: mods__$8.checked,
        disabled: mods__$8.disabled,
        name: ctx__$7.name,
        val: ctx__$7.val
    } ];
}

function __$b50(__$ctx, __$ref) {
    var ctx__$28 = __$ctx.ctx;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: $$mods.checked,
            disabled: $$mods.disabled,
            name: ctx__$28.name,
            val: ctx__$28.val
        }
    }, ctx__$28.text ];
}

function __$b51(__$ctx, __$ref) {
    var mods__$29 = $$mods, ctx__$30 = __$ctx.ctx;
    return (ctx__$30.options || []).map(function(option, i) {
        return [ !!i && !mods__$29.type && {
            tag: "br"
        }, {
            block: "radio",
            mods: {
                type: mods__$29.type,
                mode: mods__$29.mode,
                theme: mods__$29.theme,
                size: mods__$29.size,
                checked: option.checked,
                disabled: option.disabled || mods__$29.disabled
            },
            name: ctx__$30.name,
            val: option.val,
            text: option.text,
            title: option.title,
            icon: option.icon
        } ];
    });
}

function __$b65(__$ctx, __$ref) {
    var __$r__$21;
    var __$l0__$22 = __$ctx._button;
    __$ctx._button = __$ctx.ctx;
    var __$r__$24;
    var __$l1__$25 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 4;
    __$r__$24 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$25;
    __$r__$21 = __$r__$24;
    __$ctx._button = __$l0__$22;
    return;
}

function __$b66(__$ctx, __$ref) {
    var ctx__$37 = __$ctx.ctx;
    typeof ctx__$37.url === "object" && (ctx__$37.url = __$ctx.reapply(ctx__$37.url));
    var __$r__$39;
    var __$l0__$40 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16;
    __$r__$39 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$40;
    return;
}

function __$b67(__$ctx, __$ref) {
    var url__$44 = __$ctx.ctx.url;
    var __$r__$46;
    var __$l0__$47 = $$mode;
    $$mode = "";
    var __$l1__$48 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$44 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$50;
    var __$l2__$51 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 64;
    __$r__$50 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$51;
    __$r__$46 = __$r__$50;
    $$mode = __$l0__$47;
    __$ctx.ctx = __$l1__$48;
    return;
}

function __$b68(__$ctx, __$ref) {
    var ie__$52 = __$ctx.ctx.ie, hideRule__$53 = !ie__$52 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$52 === "!IE" ? [ ie__$52, "<!-->", "<!--" ] : [ ie__$52, "", "" ];
    var __$r__$55;
    var __$l0__$56 = $$mode;
    $$mode = "";
    var __$l3__$57 = __$ctx.ctx;
    var __$l1__$58 = __$l3__$57._ieCommented;
    __$l3__$57._ieCommented = true;
    var __$l2__$59 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$53[0] + "]>" + hideRule__$53[1], __$ctx.ctx, hideRule__$53[2] + "<![endif]-->" ];
    __$r__$55 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$56;
    __$l3__$57._ieCommented = __$l1__$58;
    __$ctx.ctx = __$l2__$59;
    return;
}

function __$b69(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$66 = __$ctx.ctx;
    var __$r__$68;
    var __$l0__$69 = $$mode;
    $$mode = "";
    var __$l1__$70 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$66.doctype || "<!DOCTYPE html>", {
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
                content: ctx__$66.title
            }, {
                block: "ua"
            }, ctx__$66.head, ctx__$66.styles, ctx__$66.favicon ? {
                elem: "favicon",
                url: ctx__$66.favicon
            } : "" ]
        }, ctx__$66 ]
    } ];
    var __$r__$72;
    var __$l2__$73 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 512;
    __$r__$72 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$73;
    __$r__$68 = __$r__$72;
    $$mode = __$l0__$69;
    __$ctx.ctx = __$l1__$70;
    __$ctx._defPageApplied = false;
    return;
}

function __$b70(__$ctx, __$ref) {
    var BEM_INTERNAL__$74 = __$ctx.BEM.INTERNAL, ctx__$75 = __$ctx.ctx, isBEM__$76, tag__$77, res__$78;
    var __$r__$80;
    var __$l0__$81 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$82 = $$block;
    var __$r__$84;
    var __$l1__$85 = $$mode;
    $$mode = "tag";
    __$r__$84 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$85;
    tag__$77 = __$r__$84;
    typeof tag__$77 !== "undefined" || (tag__$77 = ctx__$75.tag);
    typeof tag__$77 !== "undefined" || (tag__$77 = "div");
    if (tag__$77) {
        var jsParams__$86, js__$87;
        if (vBlock__$82 && ctx__$75.js !== false) {
            var __$r__$88;
            var __$l2__$89 = $$mode;
            $$mode = "js";
            __$r__$88 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$89;
            js__$87 = __$r__$88;
            js__$87 = js__$87 ? __$ctx.extend(ctx__$75.js, js__$87 === true ? {} : js__$87) : ctx__$75.js === true ? {} : ctx__$75.js;
            js__$87 && ((jsParams__$86 = {})[BEM_INTERNAL__$74.buildClass(vBlock__$82, ctx__$75.elem)] = js__$87);
        }
        __$ctx._str += "<" + tag__$77;
        var __$r__$90;
        var __$l3__$91 = $$mode;
        $$mode = "bem";
        __$r__$90 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$91;
        isBEM__$76 = __$r__$90;
        typeof isBEM__$76 !== "undefined" || (isBEM__$76 = typeof ctx__$75.bem !== "undefined" ? ctx__$75.bem : ctx__$75.block || ctx__$75.elem);
        var __$r__$93;
        var __$l4__$94 = $$mode;
        $$mode = "cls";
        __$r__$93 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$94;
        var cls__$92 = __$r__$93;
        cls__$92 || (cls__$92 = ctx__$75.cls);
        var addJSInitClass__$95 = ctx__$75.block && jsParams__$86 && !ctx__$75.elem;
        if (isBEM__$76 || cls__$92) {
            __$ctx._str += ' class="';
            if (isBEM__$76) {
                __$ctx._str += BEM_INTERNAL__$74.buildClasses(vBlock__$82, ctx__$75.elem, ctx__$75.elemMods || ctx__$75.mods);
                var __$r__$97;
                var __$l5__$98 = $$mode;
                $$mode = "mix";
                __$r__$97 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$98;
                var mix__$96 = __$r__$97;
                ctx__$75.mix && (mix__$96 = mix__$96 ? [].concat(mix__$96, ctx__$75.mix) : ctx__$75.mix);
                if (mix__$96) {
                    var visited__$99 = {}, visitedKey__$100 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$99[visitedKey__$100(vBlock__$82, $$elem)] = true;
                    __$ctx.isArray(mix__$96) || (mix__$96 = [ mix__$96 ]);
                    for (var i__$101 = 0; i__$101 < mix__$96.length; i__$101++) {
                        var mixItem__$102 = mix__$96[i__$101], hasItem__$103 = mixItem__$102.block || mixItem__$102.elem, mixBlock__$104 = mixItem__$102.block || mixItem__$102._block || $$block, mixElem__$105 = mixItem__$102.elem || mixItem__$102._elem || $$elem;
                        hasItem__$103 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$74[hasItem__$103 ? "buildClasses" : "buildModsClasses"](mixBlock__$104, mixItem__$102.elem || mixItem__$102._elem || (mixItem__$102.block ? undefined : $$elem), mixItem__$102.elemMods || mixItem__$102.mods);
                        if (mixItem__$102.js) {
                            (jsParams__$86 || (jsParams__$86 = {}))[BEM_INTERNAL__$74.buildClass(mixBlock__$104, mixItem__$102.elem)] = mixItem__$102.js === true ? {} : mixItem__$102.js;
                            addJSInitClass__$95 || (addJSInitClass__$95 = mixBlock__$104 && !mixItem__$102.elem);
                        }
                        if (hasItem__$103 && !visited__$99[visitedKey__$100(mixBlock__$104, mixElem__$105)]) {
                            visited__$99[visitedKey__$100(mixBlock__$104, mixElem__$105)] = true;
                            var __$r__$107;
                            var __$l6__$108 = $$mode;
                            $$mode = "mix";
                            var __$l7__$109 = $$block;
                            $$block = mixBlock__$104;
                            var __$l8__$110 = $$elem;
                            $$elem = mixElem__$105;
                            __$r__$107 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$108;
                            $$block = __$l7__$109;
                            $$elem = __$l8__$110;
                            var nestedMix__$106 = __$r__$107;
                            if (nestedMix__$106) {
                                for (var j__$111 = 0; j__$111 < nestedMix__$106.length; j__$111++) {
                                    var nestedItem__$112 = nestedMix__$106[j__$111];
                                    if (!nestedItem__$112.block && !nestedItem__$112.elem || !visited__$99[visitedKey__$100(nestedItem__$112.block, nestedItem__$112.elem)]) {
                                        nestedItem__$112._block = mixBlock__$104;
                                        nestedItem__$112._elem = mixElem__$105;
                                        mix__$96.splice(i__$101 + 1, 0, nestedItem__$112);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$92 && (__$ctx._str += isBEM__$76 ? " " + cls__$92 : cls__$92);
            __$ctx._str += addJSInitClass__$95 ? ' i-bem"' : '"';
        }
        if (isBEM__$76 && jsParams__$86) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$86)) + '"';
        }
        var __$r__$114;
        var __$l9__$115 = $$mode;
        $$mode = "attrs";
        __$r__$114 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$115;
        var attrs__$113 = __$r__$114;
        attrs__$113 = __$ctx.extend(attrs__$113, ctx__$75.attrs);
        if (attrs__$113) {
            var name__$116, attr__$117;
            for (name__$116 in attrs__$113) {
                attr__$117 = attrs__$113[name__$116];
                if (typeof attr__$117 === "undefined") continue;
                __$ctx._str += " " + name__$116 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$117) ? attr__$117 : __$ctx.reapply(attr__$117)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$77)) {
        __$ctx._str += "/>";
    } else {
        tag__$77 && (__$ctx._str += ">");
        var __$r__$119;
        var __$l10__$120 = $$mode;
        $$mode = "content";
        __$r__$119 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$120;
        var content__$118 = __$r__$119;
        if (content__$118 || content__$118 === 0) {
            isBEM__$76 = vBlock__$82 || $$elem;
            var __$r__$121;
            var __$l11__$122 = $$mode;
            $$mode = "";
            var __$l12__$123 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$124 = __$ctx.position;
            __$ctx.position = isBEM__$76 ? 1 : __$ctx.position;
            var __$l14__$125 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$76 ? 1 : __$ctx._listLength;
            var __$l15__$126 = __$ctx.ctx;
            __$ctx.ctx = content__$118;
            __$r__$121 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$122;
            __$ctx._notNewList = __$l12__$123;
            __$ctx.position = __$l13__$124;
            __$ctx._listLength = __$l14__$125;
            __$ctx.ctx = __$l15__$126;
        }
        tag__$77 && (__$ctx._str += "</" + tag__$77 + ">");
    }
    res__$78 = __$ctx._str;
    __$r__$80 = undefined;
    __$ctx._str = __$l0__$81;
    __$ctx._buf.push(res__$78);
    return;
}

function __$b80(__$ctx, __$ref) {
    var __$r__$128;
    var __$l0__$129 = $$mode;
    $$mode = "";
    var __$l1__$130 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$132;
    var __$l2__$133 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 1024;
    __$r__$132 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$133;
    __$r__$128 = __$r__$132;
    $$mode = __$l0__$129;
    __$ctx.ctx = __$l1__$130;
    return;
}

function __$b81(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$134 = __$ctx.ctx;
    if (ctx__$134 && ctx__$134 !== true || ctx__$134 === 0) {
        __$ctx._str += ctx__$134 + "";
    }
    return;
}

function __$b82(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b83(__$ctx, __$ref) {
    var ctx__$135 = __$ctx.ctx, len__$136 = ctx__$135.length, i__$137 = 0, prevPos__$138 = __$ctx.position, prevNotNewList__$139 = __$ctx._notNewList;
    if (prevNotNewList__$139) {
        __$ctx._listLength += len__$136 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$136;
    }
    __$ctx._notNewList = true;
    while (i__$137 < len__$136) (function __$lb__$140() {
        var __$r__$141;
        var __$l0__$142 = __$ctx.ctx;
        __$ctx.ctx = ctx__$135[i__$137++];
        __$r__$141 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$142;
        return __$r__$141;
    })();
    prevNotNewList__$139 || (__$ctx.position = prevPos__$138);
    return;
}

function __$b84(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$143 = __$ctx.ctx.block, vElem__$144 = __$ctx.ctx.elem, block__$145 = __$ctx._currBlock || $$block;
    var __$r__$147;
    var __$l0__$148 = $$mode;
    $$mode = "default";
    var __$l1__$149 = $$block;
    $$block = vBlock__$143 || (vElem__$144 ? block__$145 : undefined);
    var __$l2__$150 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$143 || vElem__$144 ? undefined : block__$145;
    var __$l3__$151 = $$elem;
    $$elem = vElem__$144;
    var __$l4__$152 = $$mods;
    $$mods = vBlock__$143 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$153 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$147 = undefined;
    $$mode = __$l0__$148;
    $$block = __$l1__$149;
    __$ctx._currBlock = __$l2__$150;
    $$elem = __$l3__$151;
    $$mods = __$l4__$152;
    $$elemMods = __$l5__$153;
    return;
}

function __$g0(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "image") {
        if (!$$elem) {
            var __$r = __$b1(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "button") {
        if ($$elem === "text" && typeof __$ctx._button.textMaxWidth === "number") {
            return {
                style: "max-width:" + __$ctx._button.textMaxWidth + "px"
            };
        }
        var __$t = !$$elem;
        if (__$t) {
            if ((!$$mods.type || $$mods.type === "submit") && (__$ctx.__$a0 & 2) === 0) {
                var __$r = __$b3(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b4(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "checkbox") {
        if ($$elem === "control") {
            var __$r = __$b5(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio") {
        if ($$elem === "control") {
            var __$r = __$b6(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "link") {
        if (!$$elem) {
            var __$r = __$b7(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "logo") {
        if (!$$elem) {
            return {
                src: "../../common.blocks/logo/logo.png"
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
    return __$ref;
}

function __$g1(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "image") {
        if (!$$elem) {
            return "img";
        }
    } else if (__$t === "article") {
        if ($$elem === "title") {
            return "h2";
        }
    } else if (__$t === "button") {
        if ($$elem === "text") {
            return "span";
        }
        if (!$$elem) {
            return __$ctx.ctx.tag || "button";
        }
    } else if (__$t === "checkbox") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
    } else if (__$t === "radio") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
    } else if (__$t === "radio-group") {
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "filters") {
        if (!$$elem) {
            return "form";
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
    } else if (__$t === "logo") {
        if (!$$elem) {
            return "img";
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return "script";
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
    }
    return undefined;
    return __$ref;
}

function __$g2(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            if (typeof __$ctx.ctx.content !== "undefined") {
                return __$ctx.ctx.content;
            }
            var __$r = __$b46(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "checkbox") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b47(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b48(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b49(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b50(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio-group") {
        if (!$$elem) {
            var __$r = __$b51(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "ua") {
        var __$t = !$$elem;
        if (__$t) {
            if ((__$ctx.__$a0 & 32) === 0) {
                return [ function __$lb__$41() {
                    var __$r__$42;
                    var __$l0__$43 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 32;
                    __$r__$42 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$43;
                    return __$r__$42;
                }(), "(function(d,n){", "d.documentElement.className+=", '" ua_svg_"+(d[n]&&d[n]("http://www.w3.org/2000/svg","svg").createSVGRect?"yes":"no");', '})(document,"createElementNS");' ];
            }
            return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
        }
    } else if (__$t === "page") {
        if ($$elem === "head" && (__$ctx.__$a0 & 128) === 0) {
            return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            }, function __$lb__$60() {
                var __$r__$61;
                var __$l0__$62 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 128;
                __$r__$61 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$62;
                return __$r__$61;
            }() ];
        }
        if (!$$elem && (__$ctx.__$a0 & 256) === 0) {
            return [ function __$lb__$63() {
                var __$r__$64;
                var __$l0__$65 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 256;
                __$r__$64 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$65;
                return __$r__$64;
            }(), __$ctx.ctx.scripts ];
        }
    }
    return __$ctx.ctx.content;
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