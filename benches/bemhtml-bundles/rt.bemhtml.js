
/* begin: ../../libs/bem-core/common.blocks/i-bem/i-bem.bemtree */
/* global oninit, Vow */

oninit(function(exports, context) {

var undef,
    BEM_ = {},
    toString = Object.prototype.toString,
    isArray = Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    },
    buildEscape = (function() {
        var ts = { '"' : '&quot;', '&' : '&amp;', '<' : '&lt;', '>' : '&gt;' },
            f = function(t) { return ts[t] || t; };
        return function(r) {
            r = new RegExp(r, 'g');
            return function(s) { return ('' + s).replace(r, f); };
        };
    })();

context.BEMContext = BEMContext;

function BEMContext(context, apply_) {
    this.ctx = context;
    this.apply = apply_;
    this._buf = {};
    this.__queue = [];
    this._ = this;

    // Stub out fields that will be used later
    this._mode = '';
    this.block = undef;
    this.elem = undef;
    this.mods = undef;
    this.elemMods = undef;
}

BEMContext.prototype.isArray = isArray;

BEMContext.prototype.isSimple = function isSimple(obj) {
    var t = typeof obj;
    return t === 'string' || t === 'number' || t === 'boolean';
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
        } else return (obj[expando] = get());
    };
})();

BEMContext.prototype.xmlEscape = buildEscape('[&<>]');
BEMContext.prototype.attrEscape = buildEscape('["&<>]');

BEMContext.prototype.generateId = function generateId() {
    return this.identify(this.ctx);
};

BEMContext.prototype.doAsync = function doAsync(fn) {
    var mode  = this._mode,
        ctx   = this.ctx,
        block = this.block,
        elem  = this.elem,
        mods  = this.mods,
        elemMods = this.elemMods,
        promise = Vow.invoke(fn);

    this.__queue.push(promise);

    promise.always(function() {
        this._mode = mode;
        this.ctx   = ctx;
        this.block = block;
        this.elem  = elem;
        this.mods  = mods;
        this.elemMods = elemMods;
    }.bind(this));

    return promise;
};

// Wrap xjst's apply and export our own
var oldApply = exports.apply;
exports.apply = BEMContext.applyAsync = function BEMContext_applyAsync(context) {
    var ctx = new BEMContext(context || this, oldApply);
    ctx._buf = ctx.apply();
    return Vow
        .allResolved(ctx.__queue)
        .always(function() {
            return ctx._buf;
        });
};

});

match(this._mode === '')(

    match()(function() {
        this.ctx || (this.ctx = {});

        var vBlock = this.ctx.block,
            vElem = this.ctx.elem,
            block = this._currBlock || this.block;

        return apply('default', {
            block : vBlock || (vElem ? block : undefined),
            _currBlock : (vBlock || vElem) ? undefined : block,
            elem  : vElem,
            mods : vBlock? this.ctx.mods || (this.ctx.mods = {}) : this.mods,
            elemMods : this.ctx.elemMods || {}
        });
    }),

    match(function() { return this.isArray(this.ctx); })(function() {
        var ctx = this.ctx,
            len = ctx.length,
            i = 0,
            buf = [];

        while(i < len)
            buf.push(apply({ ctx : ctx[i++] }));

        return buf;
    }),

    match(function() { return !this.ctx; })(),

    match(function() { return this.isSimple(this.ctx); })(function() {
        var ctx = this.ctx;
        if(ctx && ctx !== true || ctx === 0) {
            return ctx;
        }
    })

);

def()(function() {
    var content = apply('content');
    if(content || content === 0) {
        this.ctx.content = apply('', { ctx : content });
    }
    return this.ctx;
});

content()(function() {
    return this.ctx.content;
});

/* end: ../../libs/bem-core/common.blocks/i-bem/i-bem.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/filters.bemtree */
block('filters').content()(function() {
    // наборы фильтров для каждой категории и типа недвижимости
    var filtersSets = this.ctx.filterSets || {};

    /**
     * Возвращает bemjson чекбокса
     * @param {String} filterName Имя фильтра
     * @param {Array<Array<Object>>} checkboxGroups Массив групп с данными чекбоксов
     * @param {Boolean} checkbox.checked
     * @param {String} checkbox.text
     * @param {String} checkbox.value
     * @returns {Bemjson}
     */
    this.getCheckboxGroup = function(filterName, checkboxGroups) {
        return {
            block : 'filters',
            elem : 'control',
            elemMods : {
                type : 'checkbox'
            },
            content : checkboxGroups.map(function(checkboxes) {
                return {
                    block : 'checkbox-group',
                    mods : {
                        size : 'm',
                        theme : 'islands'
                    },
                    name : filterName,
                    options : checkboxes
                };
            })
        };
    };
    /**
     * Возвращает bemjson поля ввода
     * @param {String} filterName Имя фильтра
     * @param {String} filterValue Значение фильтра
     * @param {String} hint Текст плейсхолдера
     * @returns {Bemjson}
     */
    this.getInput = function(filterName, filterValue, hint) {
        return {
            block : 'filters',
            elem : 'control',
            elemMods : {
                type : 'input'
            },
            content : {
                block : 'input',
                name : filterName,
                mods : { 'has-clear' : true, theme : 'islands', size : 'm' },
                placeholder : hint,
                val : filterValue
            }
        };
    };
    /**
     * Возвращает bemjson переключателя
     * @param {String} filterName Имя фильтра
     * @param {Array} radioGroups Массив данных переключателей
     * @param {Boolean} radioGroups.checked
     * @param {String} radioGroups.text
     * @param {String} radioGroups.value
     * @returns {Bemjson}
     */
    this.getRadioGroup = function(filterName, radioGroups) {
        return {
            block : 'filters',
            elem : 'control',
            elemMods : {
                type : 'radio'
            },
            content : radioGroups.map(function(radioGroup) {
                return {
                    block : 'radio-group',
                    mods : { theme : 'islands', size : 'm' },
                    name : filterName,
                    options : radioGroup
                };
            })
        };
    };
    this.getRadioButtonGroup = function(filterName, radioGroup) {
        return {
            block : 'filters',
            elem : 'control',
            elemMods : {
                type : 'radio'
            },
            content : {
                block : 'radio-group',
                mods : { size : 'm', theme : 'islands', type : 'button' },
                name : filterName,
                options : radioGroup
            }
        };
    };
    /**
     * Возвращает bemjson выпадающего списка
     * @param {String} filterName Имя фильтра
     * @param {Array} options Массив данных опций
     * @param {Boolean} options.checked
     * @param {String} options.text
     * @param {String} options.value
     * @param {Object} [params] Дополнительные параметры селекта
     * @param {Boolean} [params.multiple] Множественный выбор
     * @param {Number} [params.size] Размер/количество отображаемых строк
     * @returns {Bemjson}
     */
    this.getSelect = function(filterName, options, params) {
        return {
            block : 'filters',
            elem : 'control',
            elemMods : { type : 'select' },
            content : {
                block : 'select',
                mods : { mode : params && params.multiple ? 'check' : 'radio', theme : 'islands', size : 'm' },
                name : filterName,
                textMaxWidth : 170,
                options : options
            }
        };
    };

    // TODO: конфигурирование зависимостей в фильтрах
    var nestedKeys = []/*.concat(query.typeOfRent && query.typeOfRent.split(',') || [])*/;

    return (function recursion(filtersSet, nestedKeys, defaultSet) {
        var nestedFilterSet = filtersSet[nestedKeys.shift()];

        if(nestedFilterSet) return recursion(nestedFilterSet, nestedKeys, nestedFilterSet.default || defaultSet);

        return [
            (filtersSet.main || (defaultSet && defaultSet.main) || []).map(function(filterName) {
                return filterName ? { block : 'filters', elem : 'item', elemMods : { type : filterName } } : '';
            }),
            filtersSet.additional || (defaultSet && defaultSet.additional) ? [
                {
                    block : 'button',
                    mods : { size : 'm', theme : 'islands' },
                    mix : { block : 'filters', elem : 'advancedSearch' },
                    text : 'расширенный поиск'
                },
                {
                    block : 'popup',
                    js : { directions : ['right-top', 'right-center', 'right-bottom'] },
                    mods : { target : 'anchor', theme : 'islands' },
                    mix : [
                        { block : 'filters', js : true },
                        { block : 'filters', elem : 'advancedSearchPopup' }
                    ],
                    content : (filtersSet.additional || filtersSet.default.additional).map(function(filterName) {
                        return filterName ? { block : 'filters', elem : 'item', elemMods : { type : filterName } } : '';
                    })
                }
            ] : ''
        ];
    }(filtersSets, nestedKeys, filtersSets.default));
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/filters.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/__reset/filters__reset.bemtree */
block('filters').elem('reset').def()(function() {
    return applyCtx({
        block : 'icon',
        mods : { type : 'reset' },
        mix : { block : 'filters', elem : 'reset', js : { targetFilterName : this.ctx.targetFilterName } }
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/__reset/filters__reset.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_category.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'category').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        values = model.types.categories.values,
        settings = {
            caption : model.types.categories.caption,
            values : ['', 'none'].concat(Object.keys(values).sort(function(a, b) {
                return values[a] > values[b] ? 1 : -1;
            })),
            view : ['', 'none'].concat(Object.keys(values)).reduce(function(prev, key) {
                prev[key] = key === '' ? 'Все' : key === 'none' ? 'Без категории' : values[key];
                return prev;
            }, {})
        },
        filterQuery = query[filterName] !== undefined ? query[filterName] :
            route[filterName] !== undefined ? route[filterName] : '';

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        this.getSelect(filterName, settings.values.map(function(filterValue) {
            return {
                checked : filterQuery === String(filterValue),
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }))
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_category.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_hiddenDocument.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'hiddenDocument').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : 'Только скрытые документы',
            values : Object.keys(model.types.hiddenDocument.values),
            view : model.types.hiddenDocument.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_hiddenDocument.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/declension/declension.bemtree */
/* global declension */
block('declension').def()(function() {
    return declension(this.ctx.number, this.ctx.target, this.ctx.case);
});

// TODO: тесты
/*
 console.log([.1, 1, 1.5, 2, 5, 19, 20, 21, 22, 25].map(function(v) {
 var col = Array(20).join(' '),
 row = '';

 ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'prepositional'].forEach(function(c) {
 var vv = (v + ' ' + get(v, 'second', c)),
 cc = ({
 nominative : 'Кто? Что?',
 genitive : 'Кого? Чего?',
 dative : 'Кому? Чему?',
 accusative : 'Кого? Что?',
 instrumental : 'Кем? Чем?',
 prepositional : 'О ком? О чем?'
 })[c];

 row = (row || cc + col.substr(cc.length)) + vv + col.substr(vv.length);
 })

 return row;
 }).join('\n'));
*/

/* end: ../../libs/additional-bem-components/common.blocks/declension/declension.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/form/form.bemtree */
block('form').content()([
    {
        elem : 'inner',
        content : [
            {
                block : 'paranja',
                mods : { local : true },
                mix : { block : 'form', elem : 'paranja' },
                content : { block : 'spin', mods : { progress : true, size : 'xl', theme : 'islands' } }
            }
        ]
    }
]);

/* end: ../../libs/rest-trip-core/common.blocks/form/form.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/sitemap/sitemap.bemtree */
block('sitemap').content()(function() {
    return this.ctx.urls.map(function(url) {
        return {
            elem : 'url',
            content : typeof url === 'string' ? { elem : 'loc', content : url } : Object.keys(url).map(function(key) {
                return { elem : key, content : url[key] };
            })
        };
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/sitemap/sitemap.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/root/root.bemtree */
/* global router */
block('root').def()(function() {
    var ctx = this.ctx;
    this._route = ctx._route;
    this._query = ctx._query;
    this._view = ctx._view;
    this._data = ctx._data;
    this._totalNumber = ctx._totalNumber;
    this._pagesNumber = ctx._pagesNumber;
    this._user = ctx._user;

    if (ctx._block) return applyCtx(ctx._block);

    return applyCtx({
        block : 'page',
        mods : { category : this._route.category },
        title: this.ctx.title,
        favicon: '/favicon.ico',
        styles: [
            { elem: 'css', url : '/static.css' }
            // {
            //     elem: 'css',
            //     url: '//fonts.googleapis.com/css?family=Open+Sans:400,300&subset=latin,cyrillic'
            // }
        ],
        scripts: { elem: 'js', url: '/static.js' },
        head: [
            this._data && this._data.length === 1 ? [
                {
                    elem: 'meta',
                    attrs: {
                        name: 'description',
                        // TODO: delete html tags
                        content: this._data[0].seo && this._data[0].seo.description ||
                            this._data[0].shortDesc || this._data[0].description
                    }
                },
                {
                    elem: 'meta',
                    attrs: {
                        property: 'og:title',
                        content: this._data[0].seo && this._data[0].seo.title || this._data[0].title
                    }
                },
                {
                    elem: 'meta',
                    attrs: {
                        property: 'og:image',
                        content: this._data[0].images && this._data[0].images.length ?
                            (this._data[0].images[0].M || this._data[0].images[0].orig) :
                            '/logo.svg'
                    }
                },
                {
                    elem: 'meta',
                    attrs: { property: 'og:url', content: router.build(this._data[0], this._route.parent) }
                }
            ] : '',
            {
                elem: 'meta',
                // TODO: !
                attrs: { property: 'og:site_name', content: this.ctx.siteName }
            },
            { elem: 'meta', attrs: { property: 'og:locale', content: 'ru_RU' } },
            { elem: 'meta', attrs: { property: 'og:type', content: 'website' } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=920' } }
        ]
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/root/root.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/page/page.bemtree */
block('page').content()(function() {
    return [
        { block : 'rt', mods : { view : this._view } },
        ['copy', 'edit', 'new'].indexOf(this._route.action) === -1 ? { block : 'metrika' } : ''
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/page/page.bemtree */


/* begin: ../../common.blocks/service-name/service-name.bemtree */
block('service-name').content()(function(){
    // TODO: think about some common place for it
    // TODO: use i18n later
    var category2serviceName = {
        active : 'Активный отдых',
        excursions : 'Экскурсии',
        hotels : 'Отели',
        places : 'Места',
        rent : 'Жилье',
        rooms : 'Номера',
        taxi : 'Такси'
    };

    return category2serviceName[this._route.category];
});

/* end: ../../common.blocks/service-name/service-name.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/nav/nav.bemtree */
block('nav').content()(function() {
    return (this.ctx.links || []).map(function(item) {
        var route = this._route,
            url = item.url,
            isCategory = url === '/' + route.category + '/',
            isPage = url === '/' + route.slug + '/',
            isCurrent = isCategory || isPage;

        return !!item ? [
            {
                elem : 'item',
                elemMods : { active : isCurrent },
                content : isPage || !route.parent && (isCategory && !route.slug &&
                    ['edit', 'compare'].indexOf(route.action) === -1 ) ?
                    item.title : {
                    block : 'link',
                    url : item.url,
                    content : item.title
                }
            },
            {
                tag : 'script',
                attrs : { type : 'application/ld+json' },
                content : JSON.stringify({
                    '@context' : 'http://schema.org/',
                    '@type' : 'SiteNavigationElement',
                    url : item.url,
                    name : item.title
                })
            }
        ] : { elem : 'item', elemMods : { separator : true } };
    }, this);
});

/* end: ../../libs/rest-trip-core/common.blocks/nav/nav.bemtree */


/* begin: ../../common.blocks/nav/nav.bemtree */
block('nav').content()(function() {
    this.ctx.links = [
        {
            url : '/rent/',
            title : 'Жилье'
        },
        {
            url : '/hotels/',
            title : 'Отели'
        },
        {
            url : '/rooms/',
            title : 'Номера'
        },
        {
            url : '/taxi/',
            title : 'Такси'
        },
        {
            url : '/places/',
            title : 'Места'
        },
        {
            url : '/excursions/',
            title : 'Экскурсии'
        },
        {
            url : '/active/',
            title : 'Активный отдых'
        },
        '',
        {
            url : '/about/',
            title : 'О нас'
        },
        {
            url : '/partners/',
            title : 'Партнерам'
        },
        {
            url : '/contacts/',
            title : 'Контакты'
        }
    ];

    return applyNext();
});

/* end: ../../common.blocks/nav/nav.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/content/content.bemtree */
block('content').content()(function() {
    var data = this._data[0];

    if(!data) return [
        {
            tag : 'h1',
            content : [
                '4',
                { tag : 'span', content : '0' },
                '4'
            ]
        },
        [
            'Bad trip, похоже такого на нашем сайте не бывает.',
            'Вы оказались на не существующей странице.',
            'Чтобы исправить ситуацию, попробуйте:'
        ].join('<br>'),
        {
            tag : 'ul',
            content : [
                'Ввеcти верный адрес страницы',
                { block : 'link', url : '/', content : 'Перейти на Главную' },
                [
                    'Если вы уверены, что страница по этому адресу должна быть — ',
                    { block : 'link', url : '/contacts', content : 'напишите нам' },
                    ', мы обязательно разберемся.'
                ]
            ].map(function(value) { return { tag : 'li', content : value }; })
        },
        'Надеемся, вы найдете то, что искали!'
    ];

    // TODO: 500

    return data.content ? {
        block : 'content',
        elem : 'text',
        content : data.content
    } : {
        block : 'snippet',
        mods: {
            type : this._route.category || data.categories && data.categories[0],
            expanded : true
        },
        data: data
    };
});

/* end: ../../libs/rest-trip-core/common.blocks/content/content.bemtree */


/* begin: ../../common.blocks/rt/_view/rt_view_list.bemtree */
block('rt').mod('view', 'list').content()(function() {
    return [
        {
            elem : 'panel',
            elemMods : { pos : 'first' },
            content : [
                { block : 'logo', url : '/' },
                { block : 'service-name' },
                { block : 'nav' },
                {
                    block : 'filters',
                    mods : { set : this._route.action === 'edit' ? 'edit-serp' : this._route.category }
                }
            ]
        },
        {
            elem : 'panel',
            elemMods : { pos : 'second' },
            content : [
                this._route.category !== 'places' && this._route.category !== 'taxi' && {
                    block : 'sort',
                    mods : { set : this._route.action || this._route.category }
                } || '',
                {
                    block : 'serp',
                    js : { page : this._query.p, totalFound : this._totalNumber, totalPages : this._pagesNumber },
                    mods : { autoloading : true, type : this._route.action && 'edit' || undefined }
                }
            ]
        },
        {
            elem : 'panel',
            elemMods : { pos : 'third' },
            content : {
                block : 'map',
                mods : { view : 'list' }
            }
        }
    ];
});

/* end: ../../common.blocks/rt/_view/rt_view_list.bemtree */


/* begin: ../../admin.blocks/serp/serp.bemtree */
block('serp').mod('type', 'edit').content()(function() {
    return [
        { block : 'serp', elem : 'more', elemMods : { direction : 'prev' } },

        this._data.length === 0 ? { block : 'serp', elem : 'empty' } :
            this._data.map(function(document) {
                var type = this._route.category || document.categories && document.categories[0];

                return {
                    block : 'snippet',
                    mods : {
                        type : 'edit',
                        hidden : !!document.hiddenDocument
                    },
                    mix : [
                        {
                            block : 'serp',
                            elem : 'item',
                            js : {
                                id : String(document.id),
                                category : document.categories && document.categories[0],
                                point : document.address && document.address.point,
                                title : document.title,
                                type : document['typeOf' + ({
                                    active : 'Active',
                                    excursions : 'Excursions',
                                    hotels : 'Hotels',
                                    places : 'Places',
                                    rent : 'Rent',
                                    rooms : 'Rooms'
                                })[type]]
                            },
                            elemMods : { id : document.id, clickable : true, scrollOnClick : true }
                        },
                        {
                            block : 'api-listener',
                            js : { targetId : document.id },
                            mods : {
                                deleteById : true,
                                hideById : true,
                                showById : true
                            }
                        }
                    ],
                    data : document
                };
            }, this),

        { block : 'serp', elem : 'more', elemMods : { direction : 'next' } }
    ];
});

/* end: ../../admin.blocks/serp/serp.bemtree */


/* begin: ../../site.blocks/serp/serp.bemtree */
/* global router, util */
block('serp').content()(function() {
    return [
        { block : 'serp', elem : 'more', elemMods : { direction : 'prev' } },

        this._data.length === 0 ? { block : 'serp', elem : 'empty' } :
            this._data.map(function(document) {
                var type = this._route.category || document.categories && document.categories[0],
                    isExpandable = ['active', 'excursions', 'places', 'taxi'].indexOf(this._route.category) === -1;

                return {
                    block : 'snippet',
                    js : isExpandable ? { href : router.build(document) } : undefined,
                    mods : {
                        type : type,
                        expandable : isExpandable || undefined
                    },
                    mix : {
                        block : 'serp',
                        elem : 'item',
                        js : {
                            id : String(document.id),
                            category : document.categories && document.categories[0],
                            point : !util.presence('excursions', document.categories) && document.address &&
                                document.address.point,
                            routes : document.routes,
                            title : document.title,
                            type : document['typeOf' + ({
                                active : 'Active',
                                excursions : 'Excursions',
                                hotels : 'Hotels',
                                places : 'Places',
                                rent : 'Rent',
                                rooms : 'Rooms'
                            })[type]]
                        },
                        elemMods : {
                            id : document.id,
                            clickable : isExpandable || !!(document.address && document.address.point) ||
                                !!document.routes,
                            scrollOnClick : true
                        }
                    },
                    data : document
                };
            }, this),

        { block : 'serp', elem : 'more', elemMods : { direction : 'next' } },

        this._route && this._route.category === 'taxi' && this._route.action !== 'edit' ?
            { block : 'taxi-price-list' } :
            ''
    ];
});

/* end: ../../site.blocks/serp/serp.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/serp/__empty/serp__empty.bemtree */
block('serp').elem('empty').content()(function() {
    return 'По вашему запросу ничего не нашлось';
});

/* end: ../../libs/rest-trip-core/common.blocks/serp/__empty/serp__empty.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/serp/__more/serp__more.bemtree */
/* global constants */
block('serp').elem('more').def()(function() {
    var isPrev = this.elemMods && this.elemMods.direction === 'prev',
        pageNumber = this._query.p === '' ? 1 : +this._query.p || 0,
        itemsPerPage = this._query.num === '' ? constants.itemsPerPage : +this._query.num || constants.itemsPerPage;

    return applyCtx((isPrev ? (pageNumber > 1 && pageNumber <= +this._pagesNumber) :
        (+this._pagesNumber > pageNumber && pageNumber > 0)) ? {
        block : 'button',
        mods : { size : 'l', theme : 'islands', type : 'link' },
        mix : { block : 'serp', elem : 'more', elemMods : this.elemMods },
        url : '/' + [this._route.category, this._route.action].filter(function(value) {
            return value !== undefined;
        }).join('/') + '/?p=' + (pageNumber + (isPrev ? -1 : 1)),
        text : 'Показать ' + (isPrev ? 'предыдущие' : 'еще') + ' (осталось: ' +
            (isPrev ? ((pageNumber - 1) * itemsPerPage) :
            (this._totalNumber - pageNumber * itemsPerPage)) + ')'
    } : '');
});

/* end: ../../libs/rest-trip-core/common.blocks/serp/__more/serp__more.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/snippet.bemtree */
block('snippet')(
    mode('descriptionsGallery')(function() {
        var document = this._data;

        return (document.descriptions || [document.description]).map(function(description, index, array) {
            return [
                (array.length === 1 || index === 1) && document.images ? {
                    block : 'snippet', elem : 'gallery', images : document.images
                } : '',
                description ? { block : 'snippet', elem : 'description', content : description } : ''
            ];
        });
    }),
    mode('fullAddress')(function() {
        var document = this._data;

        return document.address.custom || [
            document.address.city,
            document.address.district,
            document.address.street,
            document.address.house,
            document.address.flat
        ].filter(function(v) { return !!v; }).join(', ');
    }),
    mode('way')(function() {
        var document = this._data;

        return document.address && document.address.way ? [
            { tag : 'h3', content : 'Как добраться:' },
            { block : 'snippet', elem : 'description', content : document.address.way }
        ] : '';
    }),
    mode('contacts')(function() {
        var document = this._data;

        return document.owners ? [
            { tag : 'h3', content : 'Контактная информация:' },
            document.owners.map(function(owner) {
                return { block : 'visiting-card', mods : { microdata : 'person' }, data : owner };
            })
        ] : '';
    }),
    mode('sendmailBtn')(function() {
        var document = this._data,
            isReserve = this._route.category === 'rent',
            size = this._sendmailBtnSize || 'm';

        return {
            block : 'action-button',
            js : {
                id : 'action-button_action_sendmail-' + document.id,
                content : isReserve ?
                    'Заполните пожалуйста форму ниже, чтобы забронировать "' + document.title + '"' :
                    'Заполните пожалуйста форму ниже, чтобы заказать "' + document.title + '"',
                subject : isReserve ?
                    'rest-trip: забронировать "' + document.title + '"' :
                    'rest-trip: заказать "' + document.title + '"',
                title : isReserve ?
                    'Подать заявку на бронирование (вариант ' + document.id + ')' :
                    'Подать заявку на заказ (вариант ' + document.id + ')',
                documentId : document.id
            },
            mods : {
                action : 'sendmail',
                size : size,
                view : 'action'
            },
            content : isReserve ? 'Забронировать' : 'Заказать'
        };
    }),
    mode('labels')(function() {
        return this._data.categories && (Array.isArray(this._data.categories) && this._data.categories ||
            [this._data.categories]).map(function(category) {
                var types = this._data[({
                    active : 'typeOfActive',
                    excursions : 'typeOfExcursions',
                    hotels : 'typeOfHotels',
                    places : 'typeOfPlaces',
                    rent : 'typeOfRent',
                    rooms : 'typeOfRoom'
                })[category]] || true;

                return (Array.isArray(types) ? types : [types]).map(function(type) {
                    return {
                        block : 'snippet', elem : 'label',
                        elemMods : (function(o) { return (o[category] = type) && o; }({}))
                    };
                });
            }, this);
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/snippet/snippet.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/_type/snippet_type_edit.bemtree */
/* global model, router */
block('snippet').mod('type', 'edit')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data;

        if(!this._data) return;

        var document = this._data,
            route = this._route,
            actionHideButtonId = 'action-button_action_hide-' + document.id,
            actionDeleteButtonId = 'action-button_action_delete-' + document.id,
            actionShowButtonId = 'action-button_action_show-' + document.id;

        return [
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                    document.categories ? {
                        block : 'snippet', elem : 'info',
                        content : model.types.categories.caption + ': ' + document.categories.map(function(value) {
                            return model.types.categories.values && model.types.categories.values[value] || value;
                        }).join(', ')
                    } : '',
                    document.dateOfModifying ? {
                        block : 'snippet', elem : 'info',
                        content : [
                            model.types.dateOfModifying.caption + ': ',
                            { block : 'date', mods : { diff : true }, content : document.dateOfModifying }
                        ]
                    } : '',
                    {
                        block : 'snippet',
                        elem : 'grid-row',
                        content : [
                            { block : 'snippet', elem : 'variant' },
                            [].concat(document.categories).indexOf('hotels') > -1 ? {
                                block : 'button',
                                mods : { theme : 'islands', size : 'm', type : 'link' },
                                url : router.build({
                                    categories : ['rooms'],
                                    city : document.city,
                                    hotels : document.slug
                                }, 'hotels', 'edit'),
                                text : 'Номера'
                            } : '',
                            {
                                block : 'button',
                                mods : { theme : 'islands', size : 'm', type : 'link' },
                                attrs : { title : 'Перейти на страницу' },
                                url : router.build(document, route.parent),
                                icon : { block : 'icon', mods : { type : 'open-document' } }
                            },
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands', type : 'link' },
                                attrs : { title : 'Редактировать' },
                                url : '/edit/' + document.id,
                                icon : { block : 'icon', mods : { type : 'edit' } }
                            },
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands', type : 'link' },
                                attrs : { title : 'Копировать' },
                                url : '/copy/' + document.id,
                                icon : { block : 'icon', mods : { type : 'copy' } }
                            },
                            {
                                block : 'action-button',
                                js : { id : actionHideButtonId, targetId : document.id, live : false },
                                mods : { action : 'hide', hidden : !!document.hiddenDocument || undefined, size : 'm' },
                                attrs : { title : 'Скрыть' },
                                icon : { block : 'icon', mods : { type : 'hide' } }
                            },
                            {
                                block : 'action-button',
                                js : { id : actionShowButtonId, targetId : document.id, live : false },
                                mods : { action : 'show', hidden : !document.hiddenDocument || undefined, size : 'm' },
                                attrs : { title : 'Показать' },
                                icon : { block : 'icon', mods : { type : 'show' } }
                            },
                            {
                                block : 'action-button',
                                js : {
                                    id : actionDeleteButtonId,
                                    targetId : document.id,
                                    targetTitle : document.title
                                },
                                mods : { action : 'delete', size : 'm', view : 'action' },
                                attrs : { title : 'Удалить' },
                                icon : { block : 'icon', mods : { type : 'delete' } }
                            }
                        ]
                    }
                ]
            },
            apply('labels')
        ];
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/snippet/_type/snippet_type_edit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__preview/snippet__preview.bemtree */
block('snippet').elem('preview')(
    content()(function() {
        var item = this._data;

        return item.images && item.images.length > 0 ? {
            elem : 'thumb',
            url : item.images[0].M || item.images[0].orig
        } : {
            elem : 'thumb',
            elemMods : {
                default : !item.images ? true : undefined
            }
        };
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__preview/snippet__preview.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__variant/snippet__variant.bemtree */
block('snippet').elem('variant')(
    content()(function() {
        return [
            'вариант ',
            { block : 'snippet', elem : 'variant-value', content : this._data.id }
        ];
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__variant/snippet__variant.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__title/snippet__title.bemtree */
/* global router */
block('snippet').elem('title').def()(function() {
    return this.ctx.elemMods && this.ctx.elemMods.link ? {
        block : 'link',
        mix : { block : 'snippet', elem : 'title', elemMods : this.ctx.elemMods },
        attrs : { title : this._data.title },
        url : router.build(this._data),
        content : this.ctx.content ? applyCtx(this.ctx.content) : this._data.title
    } : {
        block : 'snippet',
        elem : 'title',
        elemMods : this.ctx.elemMods,
        attrs : { title : this._data.title },
        content : this.ctx.content ? applyCtx(this.ctx.content) : this._data.title
    };
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__title/snippet__title.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/action-button/action-button.bemtree */
block('action-button').def()(function() {
    /*
     * Ожидаемый контекст блока:
     * id - для связывания нескольких DOM нод в один бэм-блок
     * icon - иконка(и) кнопки
     * content - текст кнопки
     * модификаторы:
     *   size, view, type - прокидываются в модификаторы кнопки
     *   hidden - прокидывается в модификаторы блока
     * attrs - аттрибуты блока
     * mix - миксы кнопки
     * */

    var ctx = this.ctx,
        bemjson = {
            block : 'button',
            mods : { size : ctx.mods.size, theme : 'islands', type : ctx.mods.type, view : ctx.mods.view },
            mix : [{
                block : 'action-button',
                js : ctx.js,
                mods : { action : ctx.mods.action, hidden : ctx.mods.hidden }
            }].concat(ctx.mix || []),
            attrs : this.ctx.attrs,
            icon : [applyCtx({
                block : 'spin-icon',
                mods : {
                    size : (function() {
                        var sizes = ['xs', 's', 'm', 'l', 'xl'];

                        // спиннер меньше кнопки на 2 размера
                        return sizes[sizes.indexOf(ctx.mods.size) - 2] || sizes[0];
                    }())
                }
            })].concat(this.ctx.icon || [])
        };

    ['content', 'url'].forEach(function(key) {
        if(key in ctx) bemjson[({
            content : 'text'
        })[key] || key] = ctx[key];
    });

    return applyCtx(bemjson);
});

/* end: ../../libs/rest-trip-core/common.blocks/action-button/action-button.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/spin-icon/spin-icon.bemtree */
block('spin-icon').content()(function() {
    return {
        block : 'icon',
        content : {
            block : 'spin',
            mods : {
                progress : true,
                size : this.ctx.mods && this.ctx.mods.size || 'xs',
                theme : 'islands'
            }
        }
    };
});

/* end: ../../libs/rest-trip-core/common.blocks/spin-icon/spin-icon.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/date/date.bemtree */
block('date').content()(function() {
    /**
     * @type {String} value UTC time
     */
    var value = this.ctx.content;

    return value;
});

/* end: ../../libs/additional-bem-components/common.blocks/date/date.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/date/_diff/date_diff.bemtree */
block('date').mod('diff', true).content()(function() {
    /**
     * @type {String} value UTC time
     */
    var value = this.ctx.content,
        seconds = Math.floor((Date.now() - Date.parse(value)) / 1000);

    return [
        (seconds > 60 ? {
            block : 'time',
            time : { value : seconds, unit : 'second' },
            case : 'accusative',
            precision : this.ctx.diffLength
        } : 'меньше минуты'),
        ' назад'
    ];
});

/* end: ../../libs/additional-bem-components/common.blocks/date/_diff/date_diff.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/time/time.bemtree */
/* global util */
block('time').content()(function() {
    var ctx = this.ctx,
        /**
         * Если не объект - то значение принимается за время в секундах
         * @type {Number|String|Object}
         * @param {String} time.value Время
         * @param {String} time.unit Единицы измерения времени
         */
        time = typeof ctx.time === 'object' ? ctx.time : { value : ctx.time, unit : 'second' },
        /**
         * Допустимая погрешность для представления в более удобочитаемом виде, например:
         * при inaccuracy = 30 и time.value = 100 выведется 1 минута 30 секунд
         * @type {Number} Кол-во секунд
         */
        inaccuracy = ctx.inaccuracy,
        /**
         * Кол-во выводимых "разрядов"(год, месяц, ...), 0 - не обрезать время
         * @type {Number} [precision=2]
         */
        precision = ctx.precision >= 0 ? ctx.precision : 2,
        seconds = util.roundTo(Math.floor(({
            second : 1,
            minute : 60,
            hour : 3600,
            day : 86400,
            week : 604800,
            month : 18144000,
            halfYear : 108864000,
            year : 217728000
        })[time.unit] * time.value), inaccuracy || 1),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        weeks = Math.floor(days / 7),
        months = Math.floor(days / 30),
        years = Math.floor(months / 12),
        /**
         * Возвращает человекочитаемое представление времени
         * @param {Number} number Время
         * @param {Number} unit Единица измерения времени
         */
        getHumanTime = function(number, unit) {
            return number ?
                number + ' ' + applyCtx({
                    block : 'declension',
                    number : number,
                    target : unit,
                    case : ctx.case || 'nominative'
                }) :
                '';
        };

    return [
        getHumanTime(years, 'year'),
        getHumanTime(months % 12, 'month'),
        months === 0 && getHumanTime(weeks, 'week'),
        getHumanTime(days % 30, 'day'),
        getHumanTime(hours % 24, 'hour'),
        getHumanTime(minutes % 60, 'minute'),
        getHumanTime(seconds % 60, 'second')
    ].filter(function(v) { return !!v; })
        .slice(0, precision || undefined)
        .join(' ');
});

/* end: ../../libs/additional-bem-components/common.blocks/time/time.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/_set/filters_set_edit.bemtree */
block('filters').mod('set', 'edit').match(!this.filterSets)(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'dataTypes'
            ]
        }
    };

    return applyNext();
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/_set/filters_set_edit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_dataTypes.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'dataTypes').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        document = this._data[0] || {},

        /**
         * Массив моделей, к которым относится документ
         * @type {Array<Object>}
         */
        documentModels = [].concat(document.categories || 'default').map(function(category) {
            return model.models[category];
        }).filter(function(v) { return !!v; }),

        /**
         * Модель документа, составленная из массива моделей к которым он относится
         * @type {Object}
         */
        mergedDocumentModels = documentModels.reduce(function(prev, model) {
            Object.keys(model.fields || {}).forEach(function(key) {
                prev.fields[key] = model.fields[key];
            });

            return prev;
        }, { fields : {} }),

        /**
         * Расширенная нетипизированными полями документа объединенная модель
         * @type {Object}
         */
        documentModel = Object.keys(document)
            .concat(Object.keys(mergedDocumentModels.fields))
            .reduce(function(prev, fieldName) {
                prev.fields[fieldName] = mergedDocumentModels.fields[fieldName] || {};

                return prev;
            }, { fields : {} }),

        settings = (function() {
            var fieldSet = Object.keys(documentModel.fields)
                // выводить только projectTypes и неопределенные типы данных
                // (например, id - basicType, его нельзя редактировать, поэтому нет смысла выводить)
                .filter(function(fieldName) {
                    return !documentModel.fields[fieldName].type ||
                        model.projectTypes[documentModel.fields[fieldName].type];
                })
                // сортировка по названиям типов
                .sort(function(a, b) {
                    var getType = function(fieldName) {
                            return model.projectTypes[documentModel.fields[fieldName].type];
                        },
                        aType = getType(a),
                        bType = getType(b);

                    return !aType ? 1 : !bType ? -1 : aType.caption > bType.caption ? 1 : -1;
                });

            return {
                caption : 'Тип данных',
                values : fieldSet,
                view : fieldSet.reduce(function(prev, fieldName) {
                    prev[fieldName] = prev[fieldName] ||
                        (model.projectTypes[documentModel.fields[fieldName].type] &&
                            model.projectTypes[documentModel.fields[fieldName].type].caption) || fieldName;

                    return prev;
                }, {})
            };
        }());

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            var isChecked = Object.keys(documentModel.fields).indexOf(filterValue) > -1;

            return {
                checked : query[filterName] !== undefined ?
                    (Array.isArray(query[filterName]) ?
                        query[filterName] :
                        [query[filterName]]).indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    // выводить данный фильтр только для группы администраторов
    if(!this._user || this._user.group !== 'admin') {
        this.elemMods.hidden = true;
    }

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        {
            tag : 'select',
            attrs : {
                name : filterName,
                multiple : 'multiple',
                size : 20
            },
            content : checkboxGroups[0].map(function(value) {
                return {
                    tag : 'option',
                    content : value.text,
                    attrs : {
                        value : value.val,
                        selected : value.checked || undefined
                    }
                };
            })
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_dataTypes.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/_set/filters_set_edit-serp.bemtree */
block('filters').mod('set', 'edit-serp').match(!this.ctx.filterSets)(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'category',
                'hiddenDocument'
            ]
        }
    };

    return applyNext();
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/_set/filters_set_edit-serp.bemtree */


/* begin: ../../admin.blocks/filters/_set/filters_set_edit-serp.bemtree */
block('filters').mod('set', 'edit-serp')(function() {
    this.ctx.js = {
        watch : {
            category : ['rooms']
        }
    };
    this.ctx.filterSets = {
        default : {
            main : [
                'category',
                // для серпа всех номеров добавить фильтр по отелям
                (this._query.category !== undefined ?
                    this._query.category === 'rooms' :
                    this._route.category === 'rooms' && !(this._route.parent && this._route[this._route.parent])) ?
                        'hotels' :
                        '',
                'hiddenDocument'
            ].filter(function(v) { return v; })
        }
    };

    return applyNext();
});

/* end: ../../admin.blocks/filters/_set/filters_set_edit-serp.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_hotels.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'hotels').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        view = Object.keys(model.types.hotels.values).reduce(function(prev, key) {
            return (prev[key] = model.types.hotels.values[key]) && prev;
        }, { '' : 'Любой' }),
        settings = {
            caption : 'Отель',
            values : Object.keys(view),
            view : view
        },
        filterQuery = query[filterName] !== undefined ? query[filterName] :
            route[filterName] !== undefined ? route[filterName] : '';

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        this.getSelect(filterName, settings.values.map(function(filterValue) {
            return {
                checked : filterQuery === String(filterValue),
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }))
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/filters/__item/_type/filters__item_type_hotels.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/sort/_set/sort_set_edit.bemtree */
/* global router */
block('sort').mod('set', 'edit').content()(function() {
    var route = this._route,
        query = this._query,
        routeObject = {
            categories : [route.category || query.category],
            city : route.city || query.city
        };

    routeObject[route.parent] = route[route.parent];

    return [
        {
            block : 'button',
            mods : { theme : 'islands', size : 's', type : 'link', view : 'action' },
            url : router.build(routeObject, route.parent, 'new'),
            icon : { block : 'icon', mods : { type : 'new-document' } },
            text: 'Новый документ'
        },

        {
            block : 'radio-group',
            mods : { theme : 'islands', size : 's', type : 'button' },
            name : 'sortBy',
            options : ['id', 'dateOfModifying'].map(function(value) {
                return {
                    val : value,
                    text : ({
                        id : 'ID',
                        dateOfModifying : 'дате изменения'
                    })[value],
                    checked : value === query.sortBy
                };
            })
        },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/sort/_set/sort_set_edit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/sort/__control/_type/sort__control_type_order.bemtree */
block('sort').elem('control').elemMod('type', 'order').content()(function() {
    return {
        block : 'radio-group',
        mods : { theme : 'islands', size : 's', type : 'button' },
        name : 'sortOrder',
        options : ['asc', 'desc'].map(function(value) {
            return {
                val : value,
                text : {
                    block : 'icon',
                    mods : { type : ({
                        asc : 'ascending',
                        desc : 'descending'
                    })[value] },
                    attrs : { title : ({
                        asc : 'по возрастанию',
                        desc : 'по убыванию'
                    })[value] }
                },
                checked : value === this._query.sortOrder
            };
        }, this)
    };
});

/* end: ../../libs/rest-trip-core/common.blocks/sort/__control/_type/sort__control_type_order.bemtree */


/* begin: ../../common.blocks/rt/_view/rt_view_single.bemtree */
/* global data */
block('rt').mod('view', 'single').content()(function() {
    var route = this._route,
        isEditPage = ['copy', 'edit', 'new'].indexOf(route.action) > -1,
        isMap = this._data && this._data.length && route.city && route.city === route.slug && !isEditPage;

    return [
        {
            elem : 'panel',
            elemMods : { pos: 'first' },
            content: [
                { block : 'logo', url : '/' },
                { block: 'service-name' },
                { block : 'nav' },
                this._data && this._data.length && isEditPage ? {
                    block : 'filters',
                    mods : { set : isEditPage ? 'edit' : undefined }
                } : undefined
            ]
        },
        {
            elem : 'panel',
            elemMods : { pos: isMap ? 'second' : undefined },
            content : {
                block: 'content',
                mods : {
                    page : this._data && this._data.length ?
                        (isEditPage && 'edit') || (route.action === 'compare' && 'compare') || route.slug :
                        '404'
                }
            }
        },
        isMap ? {
            elem : 'panel',
            elemMods : { pos: 'third' },
            content : {
                block : 'map',
                js : {
                    objects : ['active', 'excursions', 'places'].reduce(function(prev, category) {
                        var documents = (function recursion(results) {
                            var page = data.get({
                                route : { category : category, city : route.city },
                                query : { json : true, num : 100, p : results.length + 1 }
                            });

                            results.push(page.data);

                            if(page.totalPages > results.length) recursion(results);

                            return results.reduce(function(prev, value) { return prev.concat(value); }, []);
                        }([]));

                        return prev.concat(documents.reduce(function(prev, document) {
                            if(!document.address || !document.address.point) return prev;

                            return prev.concat({
                                id : String(document.id),
                                category : category,
                                point : document.address && document.address.point,
                                routes : document.routes,
                                title : document.title,
                                type : document[({
                                    active : 'typeOfActive',
                                    excursions : 'typeOfExcursions',
                                    hotels : 'typeOfHotel',
                                    places : 'typeOfPlaces',
                                    rent : 'typeOfRent'
                                })[category]] || ''
                            });
                        }, []));
                    }, [])
                },
                mods : { view : 'city' }
            }
        } : ''
    ];
});

/* end: ../../common.blocks/rt/_view/rt_view_single.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/content/_page/content_page_edit.bemtree */
block('content').mod('page', 'edit').content()(function() {
    return { block : 'edit-form', data : this._data[0] };
});

/* end: ../../libs/rest-trip-core/common.blocks/content/_page/content_page_edit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/edit-form/edit-form.bemtree */
/* global model */
block('edit-form').content()(function() {
    this._data = this.ctx.data || {};

    var document = this._data;

    /**
     * Группировка полей
     * @type {Object}
     */
    this._groups = this.ctx.groups || [];

    /**
     * Массив моделей, к которым относится документ
     * @type {Array<Object>}
     */
    var documentModels = [].concat(document.categories || 'default').map(function(category) {
        return model.models[category];
    }).filter(function(v) { return !!v; });

    /**
     * Модель документа, составленная из массива моделей к которым он относится
     * @type {Object}
     */
    // TODO: recursive objects.extend
    var mergedDocumentModels = documentModels.reduce(function(prev, model) {
        Object.keys(model.fields || {}).forEach(function(key) {
            prev.fields[key] = model.fields[key];
        });

        return prev;
    });

    /**
     * Расширенная нетипизированными полями документа объединенная модель
     * @type {Object}
     */
    var documentModel = Object.keys(document)
        .concat(Object.keys(mergedDocumentModels.fields))
        .reduce(function(prev, fieldName) {
            prev.fields[fieldName] = mergedDocumentModels.fields[fieldName] || {};

            return prev;
        }, { fields : {} });

    // TODO: сортировать в группах не по типам, а по полям документа?
    /**
     * Отсортированный массив типов модели
     * @type {Array<String>}
     */
    var groupFieldsOrder = this._groups.reduce(function(prev, group) {
        return prev.concat(group.items || []);
    }, []);

    /**
     * Набор всех выводимых в админке полей
     * @type {Array}
     */
    var fieldsSet = Object.keys(documentModel.fields)
        // выводить только projectTypes и неопределенные типы данных
        // (например, id - basicType, его нельзя редактировать, поэтому нет смысла выводить)
        .filter(function(fieldName) {
            return !documentModel.fields[fieldName].type || model.projectTypes[documentModel.fields[fieldName].type];
        })
        // сортировка по названиям типов
        .sort(function(a, b) {
            var getType = function(fieldName) { return model.projectTypes[documentModel.fields[fieldName].type]; },
                aType = getType(a),
                bType = getType(b);

            return !aType ? 1 : !bType ? -1 : aType.caption > bType.caption ? 1 : -1;
        })
        // сортировка полей по группам
        .sort(function(a, b) {
            var getTypeName = function(fieldName) { return documentModel.fields[fieldName].type; },
                aIndex = groupFieldsOrder.indexOf(getTypeName(a)),
                bIndex = groupFieldsOrder.indexOf(getTypeName(b));

            return aIndex < 0 ? 1 : bIndex < 0 ? -1 : aIndex - bIndex;
        });

    return [
        { elem : 'controls-panel' },
        {
            block : 'edit-form',
            elem : 'inner',
            content : {
                block : 'form',
                elem : 'inner',
                attrs : { action : ['copy', 'new'].indexOf(this._route.action) > -1 ? '/new' : '/' + document.id },
                content : [
                    {
                        block : 'paranja',
                        mods : { local : true },
                        mix : { block : 'form', elem : 'paranja' },
                        content : { block : 'spin', mods : { progress : true, size : 'xl', theme : 'islands' } }
                    },
                    // html форма не поддерживает PUT запросы, юзаем express-овский middleware 'methodOverride'
                    {
                        tag : 'input',
                        attrs : { type : 'hidden', name : '_method', value : 'put' }
                    },

                    fieldsSet.map(function(fieldName) {
                        return {
                            block : 'edit-form',
                            elem : 'field',
                            elemMods : {
                                group : (function(groups) {
                                    var itemGroup;

                                    return groups.some(function(group, index) {
                                        if(group.items.indexOf(documentModel.fields[fieldName].type) > -1) {
                                            itemGroup = index;
                                            return true;
                                        }
                                    }) ? itemGroup : undefined;
                                }(this._groups)),
                                hidden : true,
                                type : fieldName
                            },
                            content : {
                                elem : 'group',
                                caption : documentModel.fields[fieldName].type ? undefined : fieldName,
                                data : document[fieldName],
                                dataTypeName : documentModel.fields[fieldName].type || 'undefined',
                                name : !documentModel.fields[fieldName].type ? [fieldName] : undefined
                            }
                        };
                    }, this)
                ]
            }
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/edit-form/edit-form.bemtree */


/* begin: ../../admin.blocks/edit-form/edit-form.bemtree */
block('edit-form').content()(function() {
    this.ctx.groups = [
        {
            caption : 'Основное',
            items : [
                'title', 'categories', 'typeOfActive', 'typeOfActiveTravel', 'typeOfExcursions', 
                'typeOfExcursionsTransport', 'typeOfHotel', 'typeOfPlaces', 'typeOfRent', 'typeOfRoom', 'hotels', 
                'address', 'city', 'departurePlace', 'routes', 'dateOfUpdating', 'citySnippets'
            ]
        },
        {
            caption : 'Контакты',
            items : ['owners']
        },
        {
            caption : 'Контент',
            items : ['content', 'shortDesc', 'description', 'descriptions']
        },
        {
            caption : 'Характеристики',
            items : [
                'areaOfAll', 'areaOfKitchen', 'areaOfLiving', 'duration', 'numberOfFloors', 'numberOfRooms',
                'numberOfSeats', 'numberOfSuites', 'features', 'floor', 'berths', 'typeOfDistrict', 'viewFromWindow'
            ]
        },
        {
            caption : 'Деньги',
            items : [
                'price', 'prices'
            ]
        },
        {
            caption : 'Фото',
            items : ['images']
        },
        {
            caption : 'SEO',
            items : ['slug', 'oldSlug', 'seo']
        },
        {
            caption : 'Внутреннее',
            items : ['hiddenDocument', 'hiddenNotes', 'id']
        }
    ];

    return applyNext();
});

/* end: ../../admin.blocks/edit-form/edit-form.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/edit-form/__controls-panel/edit-form__controls-panel.bemtree */
block('edit-form').elem('controls-panel').content()(function() {
    return [
        {
            block : 'form',
            elem : 'control',
            elemMods : { type : 'submit', view : 'action' },
            attrs : { title : 'Сохранить (Ctrl + Shift + S)' },
            icon : { block : 'icon', mods : { type : 'save' } },
            content : 'Сохранить'
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'link' },
            url : '/' + this._data.id,
            icon : { block : 'icon', mods : { type : 'open-document' } },
            text: 'Перейти на страницу'
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'link' },
            url : '/new',
            icon : { block : 'icon', mods : { type : 'new-document' } },
            text: 'Создать новый документ'
        },
        {
            block : 'button',
            mods : { theme : 'islands', size : 'm', type : 'link' },
            url : '/copy/' + this._data.id,
            icon : { block : 'icon', mods : { type : 'copy' } },
            text: 'Создать копию документа'
        },
        {
            block : 'action-button',
            js : {
                id : 'action-button_action_delete' + this._data.id,
                targetId : this._data.id,
                targetTitle : this._data.title
            },
            mods : { action : 'delete', size : 'm', view : 'action' },
            attrs : { title : 'Удалить' },
            icon : { block : 'icon', mods : { type : 'delete' } },
            content : 'Удалить'
        },
        this._groups.length ? { elem : 'nav' } : ''
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/edit-form/__controls-panel/edit-form__controls-panel.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/form/__control/_type/form__control_type_submit.bemtree */
block('form').elem('control').elemMod('type', 'submit').def()(function() {
    return applyCtx({
        block : 'button',
        type : 'submit',
        mods : {
            size : this.ctx.elemMods.size || 'm',
            theme : 'islands',
            type : 'submit',
            view : this.ctx.elemMods.view
        },
        mix : [{
            block : 'form',
            elem : 'control',
            elemMods : { type : 'submit' }
        }].concat(this.ctx.mix || []),
        attrs : this.ctx.attrs,
        icon : [applyCtx({ block : 'spin-icon' })].concat(this.ctx.icon || []),
        text : this.ctx.content
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/form/__control/_type/form__control_type_submit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/edit-form/__nav/edit-form__nav.bemtree */
block('edit-form').elem('nav').content()(function() {
    return Array.isArray(this._groups) && this._groups.map(function(group, index) {
        return {
            block: 'button',
            mods: { size : 'm', theme : 'islands' },
            mix : { block : 'edit-form', elem : 'nav-item', js : { targetGroup : index } },
            text : group.caption
        };
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/edit-form/__nav/edit-form__nav.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/dnd-attach/dnd-attach.bemtree */
block('dnd-attach').content()(function() {
    var fileName = this.ctx.fileName && this.ctx.fileName.toLowerCase().split('.');

    return [
        { elem : 'input' },
        {
            elem : 'preview',
            elemMods : { empty : this.ctx.uri ? undefined : true },
            content : {
                elem : 'img-wrapper',
                content : {
                    elem : 'img',
                    attrs : {
                        src : this.ctx.uri || undefined
                    }
                }
            }
        },
        {
            elem : 'info',
            content : [
                { elem : 'icon', 'file-extension' : fileName && fileName[1] },
                { elem : 'name', content : fileName && fileName[0] },
                { elem : 'clear' }
            ]
        }
    ];
});

/* end: ../../libs/additional-bem-components/common.blocks/dnd-attach/dnd-attach.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/dnd-attach/__clear/dnd-attach__clear.bemtree */
block('dnd-attach').elem('clear').def()(function() {
    return applyCtx({
        block : 'button',
        mods : { theme : 'islands', size : 'm' },
        mix : { block : 'dnd-attach', elem : 'clear' },
        attrs : { title : 'Сбросить' },
        icon : { block : 'icon', mods : { type : 'cancel' } }
    });
});

/* end: ../../libs/additional-bem-components/common.blocks/dnd-attach/__clear/dnd-attach__clear.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/dnd-attach/__icon/dnd-attach__icon.bemtree */
block('dnd-attach').elem('icon').def()(function() {
    return applyCtx({
        block : 'icon',
        mods : { 'file-extension' : this.ctx['file-extension'] },
        mix : { block : 'dnd-attach', elem : 'icon' }
    });
});

/* end: ../../libs/additional-bem-components/common.blocks/dnd-attach/__icon/dnd-attach__icon.bemtree */


/* begin: ../../libs/additional-bem-components/common.blocks/dnd-attach/__name/dnd-attach__name.bemtree */
block('dnd-attach').elem('name').attrs()(function() { return { title : this.ctx.content }; });

/* end: ../../libs/additional-bem-components/common.blocks/dnd-attach/__name/dnd-attach__name.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/edit-form/__group/edit-form__group.bemtree */
// TODO: bug: нужно уметь доставть текст для values наследуемого типа, см. boolean

/* global model */
block('edit-form').elem('group').content()(function() {
    var _ctx = this.ctx,
        _dataTypeName = _ctx.dataTypeName,
        data = this._data;

    // TODO: допилить до полной универсальности, вынести в util и использовать везде
    /**
     * Возвращает bemjson контрола(селект/чекбоксы или переключатели) по типу из модели
     * @description В зависимости от парметра isMultiple строится checkbox-group или radio-group,
     * если опций в контроле больше 5, то строится multiselect/select соответственно
     * @param typeName
     * @param {String} name Аттрибут name контрола
     * @param {Array<String>} values Массив значений дочерних элементов
     * @param {String|Array} value Выбранные значения контрола
     * @param {Boolean} isMultiple Флаг, определяющий воззможность выбирать несколько значений контрола
     * @param {Number} [minSelectItems=5] минимально кол-во опций для построения селекта
     * @returns {Bemjson}
     */
    var getControl = function(typeName, name, values, value, isMultiple, minSelectItems) {
        var isCheckbox = values.length === 1,
            isSelect = minSelectItems || values.length > 5;

        return {
            block : 'edit-form',
            elem : 'control',
            elemMods : {
                type : isSelect ? 'select' : isMultiple || isCheckbox ? 'checkbox' : 'radio'
            },
            content : {
                block : isSelect ? 'select' : isMultiple || isCheckbox ? 'checkbox-group' : 'radio-group',
                mods : {
                    size : 'm',
                    mode : isSelect ? isMultiple ? 'check' : 'radio-check' : undefined,
                    type : isSelect || isCheckbox ? undefined : 'button',
                    theme : 'islands'
                },
                name : name,
                text : isSelect && '—' || undefined,
                options : values
                    .concat([].concat(value).filter(function(v) {
                        return v !== undefined && !util.presence(String(v), values);
                    }))
                    .map(function(val) {
                        return {
                            checked : isMultiple ?
                                value !== undefined && String(value).indexOf(val) > -1 :
                                value !== undefined && val === String(value),
                            text : (model.types[typeName] && model.types[typeName].values &&
                                model.types[typeName].values[val]) || val,
                            val : val
                        };
                    })
            }
        };
    };

    /**
     * Возвращает bemjson контрола по типу данных
     * @param {String} documentFieldTypeName Тип данных
     * @param {String} documentFieldData Данные конкретного типа
     * @returns {Object} Возвращает Bemjson
     */
    var getControlByType = function(documentFieldTypeName, documentFieldData) {
        /**
         * Рекурсивный обход модели
         * @param {Object} params
         * @param {String} params.targetType Целевой тип данных, для которых пытаемся построить соответствующий контрол
         * @param {*} params.value Данные контрола
         * @param {Array} params.nameTokens Массив токенов, составляющих имя контрола, например: ['images', 0, 'orig']
         * @param {Array} params.values
         * @param {String} params.caption
         * @param {String} params.hint
         * @returns {Object} Возвращает Bemjson
         */
        return (function recursion(params) {
            var targetTypeName = params.targetTypeName,
                targetCurrentTypeName = params.targetCurrentTypeName,
                value = params.value,
                nameTokens = params.nameTokens,
                values = params.values,
                caption = params.caption,
                hint = params.hint,
                isArrayGroup = model.types[targetTypeName] && model.types[targetTypeName].type === 'array',
                isArrayGroupItem = params.parentTypeName && model.types[params.parentTypeName] &&
                    model.types[params.parentTypeName].type === 'array';

            // Значение аттрибута name контрола
            var name = nameTokens.join('-'),
                targetType = model.types[targetTypeName],
                group = {
                    block : 'edit-form',
                    elem : 'group',
                    elemMods : {
                        array : isArrayGroup || undefined
                    },
                    attrs : {
                        draggable : isArrayGroupItem || undefined
                    },
                    mix : [
                        {
                            block : 'edit-form-control',
                            js : targetCurrentTypeName === 'slug' ? { prefix : data.id } :
                                targetCurrentTypeName === 'images' ? {
                                    name : nameTokens.concat(value && value.length || 0),
                                    dataTypeName : targetType.of
                                } : true,
                            mods : { type : targetCurrentTypeName }
                        },
                        (targetCurrentTypeName === 'image' ||
                            isArrayGroup || isArrayGroupItem ? { block : 'dnd-drop', js : true } : ''),
                        (isArrayGroup ? { block : 'dnd-sort', js : true } : ''),
                        (isArrayGroupItem ? { block : 'dnd-sort', elem : 'item' } : '')
                    ],
                    content : [
                        (!isNaN(+nameTokens[nameTokens.length - 1]) ? [
                            {
                                block : 'button',
                                mods : { theme : 'islands', size : 'm' },
                                mix : { block : 'edit-form', elem : 'control', elemMods : { type : 'move-down' } },
                                icon : { block : 'icon', mods : { type : 'arrow-down' } }
                            },
                            {
                                block : 'button',
                                mods : { theme : 'islands', size : 'm' },
                                mix : { block : 'edit-form', elem : 'control', elemMods : { type : 'move-up' } },
                                icon : { block : 'icon', mods : { type : 'arrow-up' } }
                            },
                            {
                                block : 'button',
                                mods : { theme : 'islands', size : 'm', view : 'action' },
                                mix : { block : 'edit-form', elem : 'control', elemMods : { type : 'delete' } },
                                icon : { block : 'icon', mods : { type : 'delete' } }
                            }
                        ] : ''),
                        {
                            elem : 'caption',
                            content : [
                                caption || targetType && targetType.caption,
                                {
                                    block : 'edit-form',
                                    elem : 'control',
                                    elemMods : { type : 'reset' },
                                    attrs : { title : 'Сбросить значение' },
                                    content : { block : 'icon', mods : { type : 'reset' } }
                                }
                            ]
                        },
                        { elem : 'value' }
                    ]
                },
                groupValue = group.content[2];

            switch (targetTypeName) {
                // Базовые шаблоны контролов
                case 'boolean' : {
                    groupValue.content = getControl(targetCurrentTypeName, name,
                        (values || Object.keys(targetType.values)), value);

                    return group;
                }
                case 'datetime' : {
                    groupValue.content = values ? getControl(targetCurrentTypeName, name, values, value) : {
                        block : 'edit-form',
                        elem : 'control',
                        elemMods : {
                            type : 'input'
                        },
                        content : {
                            tag : 'input',
                            attrs : {
                                name : name,
                                type : 'datetime-local',
                                value : value && value.replace(/T(\d+:\d+)(?::\d+)?(?:\..+)?Z$/, 'T$1')
                            }
                        }
                    };

                    return group;
                }
                case 'number' :
                case 'string' :
                case 'text' :
                case 'markdown' :
                case 'undefined' : {
                    // TODO: вынести отсюда проверку для berthType, продумать про автоматическое преобразование
                    // группы контролов в селект
                    groupValue.content = values ? getControl(targetCurrentTypeName, name, values, value, undefined,
                        targetCurrentTypeName === 'berthType' ? 1 : undefined) : {
                        block : 'edit-form',
                        elem : 'control',
                        elemMods : {
                            type : 'input'
                        },
                        content : {
                            block : 'input',
                            mods : {
                                'has-clear' : true,
                                size : 'm',
                                theme : 'islands',
                                type : ['markdown', 'text', 'undefined'].indexOf(targetTypeName) > -1 ?
                                    'textarea' : undefined
                            },
                            mix : { block : 'edit-form', elem : 'control', elemMods : { type : 'input' } },
                            attrs : { title : hint || targetType.hint },
                            name : name,
                            placeholder : hint || targetType.hint,
                            val : typeof value === 'object' ?
                                JSON.stringify(value, null, 4) :
                                value
                        }
                    };

                    return group;
                }

                // Переопределенные шаблоны контролов

                case 'coordinates' : {
                    groupValue.content = [
                        {
                            block : 'input',
                            mods : { 'has-clear' : true, size : 'm', theme : 'islands' },
                            placeholder : 'Адрес для геокодирования: Симферополь, ул. Фрунзе'
                        }
                    ].concat(Object.keys(targetType.fields).map(function(key) {
                        return recursion({
                            targetTypeName : targetType.fields[key].type,
                            targetCurrentTypeName : targetType.fields[key].type,
                            parentTypeName : targetTypeName,
                            value : value && value[key],
                            nameTokens : nameTokens.concat(key),
                            values : targetType.fields[key].values && Object.keys(targetType.fields[key].values),
                            caption : targetType.fields[key].caption,
                            hint : targetType.fields[key].hint
                        });
                    })).concat([
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands' },
                                icon : [
                                    applyCtx({ block : 'spin-icon', mods : { size : 'xs' } }),
                                    { block : 'icon', mods : { type : 'geocode' } }
                                ],
                                text : 'Геокодировать'
                            },
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands' },
                                icon : { block : 'icon', mods : { type : 'map' } },
                                text : 'Открыть карту'
                            }
                        ]);

                    return group;
                }
                case 'dateOfUpdating' : {
                    groupValue.content = [
                        {
                            block : 'edit-form',
                            elem : 'control',
                            elemMods : {
                                type : 'input'
                            },
                            content : {
                                tag : 'input',
                                attrs : {
                                    name : name,
                                    type : 'datetime-local',
                                    value : value && value.replace(/T(\d+:\d+)(?::\d+)?(?:\..+)?Z$/, 'T$1')
                                }
                            }
                        },
                        {
                            block: 'button',
                            mods: { size : 'm', theme : 'islands' },
                            text : 'Установить текущее время'
                        }
                    ];

                    return group;
                }
                // TODO: protect id, нужно вырезать id на стороне сервера или игнорировать на стороне БД
                case 'id' : {
                    groupValue.content = {
                        tag : 'input',
                        attrs : {
                            name : name,
                            value : value,
                            readOnly : true
                        }
                    };

                    return group;
                }
                case 'image' : {
                    groupValue.content = [
                        {
                            block : 'edit-form-control',
                            elem : 'col',
                            elemMods : {
                                num : '1'
                            },
                            content : {
                                block : 'dnd-attach',
                                js : { name : nameTokens.concat('file').join('-') },
                                mods : { type : 'image' },
                                uri : value && (value.M || value.orig)
                            }
                        },
                        {
                            block : 'edit-form-control',
                            elem : 'col',
                            elemMods : {
                                num : '2'
                            },
                            content : Object.keys(model.types.image.fields).map(function(key) {
                                return {
                                    block : 'edit-form',
                                    elem : 'group',
                                    caption : model.types.image.fields[key].caption,
                                    dataTypeName : model.types.image.fields[key].type,
                                    data : value && value[key],
                                    name : nameTokens.concat(key),
                                    parentTypeName : params.parentTypeName
                                };
                            })
                        }
                    ];

                    return group;
                }
                case 'route' : {
                    groupValue.content = [
                        {
                            block : 'button',
                            mods : { size : 'm', theme : 'islands' },
                            mix : { block : 'edit-form-control', elem : 'button', elemMods : { type : 'showMap' } },
                            icon : { block : 'icon', mods : { type : 'route' } },
                            text : 'Открыть карту'
                        },
                        Object.keys(model.types.route.fields).map(function(key) {
                            return {
                                block : 'edit-form',
                                elem : 'group',
                                caption : model.types.route.fields[key].caption,
                                dataTypeName : model.types.route.fields[key].type,
                                data : value && value[key],
                                name : nameTokens.concat(key),
                                parentTypeName : params.parentTypeName
                            };
                        })
                    ];

                    return group;
                }

                default : {
                    // кастомные вьюшки для структур данных(array, hash)
                    if(targetType && targetType.type === 'array') {
                        value = value || [];

                        groupValue.content = (values || targetType.values) ?
                            getControl(targetCurrentTypeName, name,
                                (values || Object.keys(targetType.values)), value, true) :
                            [
                                {
                                    block : 'button',
                                    mods : { theme : 'islands', size : 'm', view : 'action' },
                                    mix : [
                                        {
                                            block : 'edit-form',
                                            elem : 'control',
                                            elemMods : { type : 'add' },
                                            js : {
                                                name : nameTokens.concat(value.length),
                                                dataTypeName : targetType.of
                                            }
                                        }
                                    ],
                                    icon : {
                                        block : 'icon',
                                        mods : { type : 'add' }
                                    },
                                    text : 'Добавить' +
                                        (model.types[targetType.of] ? ' ' +
                                            applyCtx({
                                                block : 'declension',
                                                target : (model.types[targetType.of].caption ||
                                                    targetType.of).toLowerCase(),
                                                case : 'accusative'
                                            }) : '')
                                },
                                {
                                    tag : 'input',
                                    attrs : { name : nameTokens.join('-'), type : 'hidden' }
                                },
                                value.map(function(value, index) {
                                    return recursion({
                                        targetTypeName : targetType.of,
                                        targetCurrentTypeName : targetType.of,
                                        parentTypeName : targetTypeName,
                                        value : value,
                                        nameTokens : nameTokens.concat(index),
                                        values : targetType && targetType.values && Object.keys(targetType.values)
                                    });
                                })
                            ];

                        return group;
                    }
                    if(targetType && targetType.type === 'hash') {
                        group.elemMods = { hash : true };
                        // TODO: теряются неописанные в модели поля
                        groupValue.content = Object.keys(targetType.fields).map(function(key) {
                            return recursion({
                                targetTypeName : targetType.fields[key].type,
                                targetCurrentTypeName : targetType.fields[key].type,
                                parentTypeName : targetTypeName,
                                value : value && value[key],
                                nameTokens : nameTokens.concat(key),
                                values : targetType.fields[key].values && Object.keys(targetType.fields[key].values),
                                caption : targetType.fields[key].caption,
                                hint : targetType.fields[key].hint
                            });
                        });

                        return group;
                    }

                    // поиск ближайшего ancestor-типа с описанной выше вьюшкой
                    return recursion({
                        targetTypeName : targetType && targetType.type || 'text',
                        targetCurrentTypeName : targetCurrentTypeName,
                        parentTypeName : targetTypeName,
                        value : value,
                        nameTokens : nameTokens,
                        values : values || (targetType && targetType.values && Object.keys(targetType.values)),
                        caption : caption || (targetType ? targetType.caption : targetTypeName),
                        hint : hint || targetType && targetType.hint
                    });
                }
            }
        }({
            caption : _ctx.caption,
            hint : _ctx.hint,
            targetTypeName : documentFieldTypeName,
            targetCurrentTypeName : documentFieldTypeName,
            parentTypeName : _ctx.parentTypeName,
            value : documentFieldData,
            // передача имени контрола в контексте используется для получения bemjson контрола через XHR
            nameTokens : Array.isArray(_ctx.name) && _ctx.name.length ? _ctx.name : [documentFieldTypeName],
            values : _ctx.values || model.types[documentFieldTypeName] && model.types[documentFieldTypeName].values &&
                Object.keys(model.types[documentFieldTypeName].values)
        }));
    };

    return _ctx.content || getControlByType(_dataTypeName, _ctx.data);
});

/* end: ../../libs/rest-trip-core/common.blocks/edit-form/__group/edit-form__group.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/root/_edit/root_edit.bemtree */
block('root').mod('edit', true).def()(function() {
    var ctx = this.ctx;
    this._route = ctx._route;
    this._query = ctx._query;
    this._view = ctx._view;
    this._data = ctx._data;
    this._totalNumber = ctx._totalNumber;
    this._pagesNumber = ctx._pagesNumber;
    this._user = ctx._user;

    if (ctx._block) return applyCtx(ctx._block);

    return applyCtx({
        block : 'page',
        title: this.ctx.title,
        favicon: '/favicon.ico',
        styles: { elem: 'css', url : '/admin.css' },
        scripts: { elem: 'js', url: '/admin.js' }
    });
});

/* end: ../../libs/rest-trip-core/common.blocks/root/_edit/root_edit.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/realty/realty.bemtree */
/* global data */
block('realty')(
    content()(function() {
        var getBemjson = function(data) {
            if(typeof data !== 'object' || data === null) return String(data);

            return Object.keys(data).map(function(key) {
                if(Array.isArray(data[key])) return data[key].map(function(value) {
                    return { elem : 'tag', tag : key, content : getBemjson(value) };
                });

                return { elem : 'tag', tag : key, content : getBemjson(data[key]) };
            });
        };

        return [
            { elem : 'tag', tag : 'generation-date', content : this.ctx['generation-date'] },
            this.ctx.offers.map(function(offer) {
                var id = offer.id,
                    clearedData = util.clear(offer);

                delete clearedData.id;

                return clearedData ? {
                    elem : 'tag',
                    tag : 'offer',
                    attrs : { 'internal-id' : id },
                    content : getBemjson(clearedData)
                } : '';
            })
        ];
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/realty/realty.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_active.bemtree */
/* global model, router */
block('snippet').mod('type', 'active')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        block : 'snippet', elem : 'grid-row',
                        content : [
                            {
                                content : [
                                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                                    apply('typeValues')
                                ]
                            },
                            {
                                block : 'snippet',
                                elem : 'price',
                                content : (document.prices || []).filter(function(price) {
                                    return price.period && !price.target;
                                }).map(function(price) { return { block : 'price', price : price }; })
                            }
                        ]
                    },
                    document.shortDesc ? {
                        block : 'snippet',
                        elem : 'shortDesc',
                        content : document.shortDesc
                    } : '',
                    {
                        block : 'snippet', elem : 'grid-row',
                        elemMods : { alignItems : 'baseline' },
                        content : [
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands', type : 'link' },
                                url : router.build(document),
                                text : 'Подробнее'
                            },
                            { block : 'snippet', elem : 'variant' },
                            apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                block : 'snippet', elem : 'grid-row',
                content : [
                    {
                        content : [
                            { block : 'snippet', elem : 'title', elemMods : { h1 : true, 'row-count' : 3 } },
                            apply('typeValues')
                        ]
                    },
                    {
                        block : 'snippet',
                        elem : 'price',
                        content : (document.prices || []).map(function(price) {
                            return { block : 'price', mods : { oneline : true }, price : price };
                        })
                    }
                ]
            },
            {
                block : 'snippet', elem : 'grid-row',
                elemMods : { alignItems : 'baseline' },
                content : [
                    document.address ? { block : 'snippet', elem : 'info', content : apply('fullAddress') } : '',
                    { block : 'snippet', elem : 'variant' },
                    apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                ]
            },
            apply('descriptionsGallery'),
            apply('way'),
            {
                block : 'snippet', elem : 'grid-row',
                content : apply('sendmailBtn', { _sendmailBtnSize : 'xl' })
            },

            {
                tag : 'script',
                attrs : { type : 'application/ld+json' },
                content : JSON.stringify({
                    '@context' : 'http://schema.org',
                    '@type' : 'Place',
                    address : document.address ? {
                        '@type' : 'PostalAddress',
                        addressCountry : 'RU',
                        addressRegion : 'Крым',
                        streetAddress : document.address.custom || [
                            document.address.city,
                            document.address.street,
                            document.address.house
                        ].filter(function(v) { return !!v; }).join(', ')
                    } : {},
                    geo : document.address && document.address.point ? {
                        '@type' : 'GeoCoordinates',
                        latitude : document.address.point.lat,
                        longitude : document.address.point.lon
                    } : {},
                    name : document.title,
                    photo : document.images && document.images.map(function(image) { return image.orig; }),
                    review : document.shortDesc
                })
            }
        ];
    }),

    mode('typeValues')(function() {
        var document = this._data,
            type = 'typeOfActive',
            typeVal = this._data[type];

        return [{
            block : 'snippet', elem : 'info',
            content : []
                .concat(document.typeOfActiveTravel ?
                    (Array.isArray(document.typeOfActiveTravel) ?
                        document.typeOfActiveTravel :
                        [document.typeOfActiveTravel]).map(function(travelType) {
                            return model.types.typeOfActiveTravel.values[travelType] || travelType;
                        }) :
                    [])
                .concat((Array.isArray(typeVal) ? typeVal : typeVal ? [typeVal] : []).map(function(val) {
                    return model.types[type].values[val] || val;
                })).join(', ')
        }].filter(function(block) { return !!block.content; });
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_active.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__description/snippet__description.bemtree */
block('snippet').elem('description')(
    content()(function() {
        var content = (this.ctx.content || this._data.description || '');

        return typeof content === 'string' ? content.replace(/\n/g, '<br>') : content;
    })
);

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__description/snippet__description.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__gallery/snippet__gallery.bemtree */
block('snippet').elem('gallery').content()(function() {
    var images = this.ctx.images;

    return images && images.length > 0 ? {
        block : 'fotorama',
        js : {
            nav : 'thumbs',
            allowfullscreen : true,
            width : '100%',
            maxheight : '500px',
            thumbwidth : 128,
            thumbheight : 128
        },
        content : images.map(function(thumb) {
            return {
                tag : 'img',
                attrs : {
                    src : thumb.XL || thumb.orig,
                    'data-thumb' : thumb.M || thumb.orig
                }
            };
        })
    } : '';
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__gallery/snippet__gallery.bemtree */


/* begin: ../../libs/rest-trip-components/common.blocks/visiting-card/visiting-card.bemtree */
block('visiting-card').content()(function() {
    var _ctx = this.ctx,
        _data = _ctx.data;

    if(!_ctx.data) return;

    return [
        {
            elem : 'image',
            elemMods : _data.image === undefined ? { default : true } : {},
            attrs : _data.image !== undefined ? { src : _data.image.orig } : {}
        },
        {
            elem : 'inner',
            content : [
                ['name', 'post'].filter(function(key) {
                    return _data[key] !== undefined;
                }).map(function(key) {
                        return { elem : key, content : _data[key] };
                    }),
                {
                    elem : 'contacts',
                    content : ['phones', 'emails', 'sites'].filter(function(key) {
                        return Array.isArray(_data[key]);
                    }).map(function(key) {
                            return _data[key].map(function(value) {
                                return {
                                    block : 'visiting-card',
                                    elem : 'contact',
                                    content : {
                                        block : ({
                                            emails : 'email',
                                            phones : 'phone-number',
                                            sites : 'link'
                                        })[key],
                                        url : key === 'sites' ? value : undefined,
                                        content : value
                                    }
                                };
                            });
                        })
                }
            ]
        },

        // микроразметка, синтаксис - JSON-LD, словарь - schema.org
        _ctx.mods && _ctx.mods.microdata ? {
            tag : 'script',
            attrs : { type : 'application/ld+json' },
            content : JSON.stringify({
                '@context' : 'http://schema.org',
                '@type': ({
                    person : 'Person',
                    organization : 'Organization'
                })[_ctx.mods && _ctx.mods.microdata] || 'Person',
                image : _data.image && (_data.image.M || _data.image.orig),
                name : _data.name,
                jobTitle : _data.post,
                telephone : _data.phones,
                email : _data.emails
            })
        } : ''
    ];
});

/* end: ../../libs/rest-trip-components/common.blocks/visiting-card/visiting-card.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/form/_type/form_type_sendmail.bemtree */
block('form').mod('type', 'sendmail').content()(function() {
    return [
        {
            elem : 'inner',
            content : [
                {
                    block : 'paranja',
                    mods : { local : true },
                    mix : { block : 'form', elem : 'paranja' },
                    content : { block : 'spin', mods : { progress : true, size : 'xl', theme : 'islands' } }
                },
                {
                    tag : 'input',
                    attrs : {
                        name : 'subject',
                        type : 'hidden',
                        value : this.ctx.subject
                    }
                },
                {
                    block : 'input',
                    name : 'name',
                    mods : { theme : 'islands', size : 'm', 'has-clear' : true },
                    placeholder : 'Ваше имя',
                    mix : [
                        {
                            block : 'form',
                            elem : 'control',
                            elemMods : {
                                type : 'input'
                            }
                        }
                    ]
                },
                {
                    block : 'input',
                    name : 'email',
                    mods : { theme : 'islands', size : 'm', 'has-clear' : true },
                    placeholder : 'Ваше e-mail',
                    mix : [
                        {
                            block : 'form',
                            elem : 'control',
                            elemMods : {
                                type : 'input'
                            }
                        }
                    ]
                },
                {
                    block : 'input',
                    name : 'phone',
                    mods : { theme : 'islands', size : 'm', 'has-clear' : true },
                    placeholder : 'Номер телефона',
                    mix : [
                        {
                            block : 'form',
                            elem : 'control',
                            elemMods : {
                                type : 'input'
                            }
                        }
                    ]
                },
                {
                    block : 'input',
                    name : 'message',
                    mods : { theme : 'islands', size : 'm', type : 'textarea', 'has-clear' : true },
                    placeholder : 'Сообщение',
                    mix : [
                        {
                            block : 'form',
                            elem : 'control',
                            elemMods : {
                                type : 'textarea'
                            }
                        }
                    ]
                }
                // TODO: some kind of captcha
            ]
        },
        {
            elem : 'control',
            elemMods : { type : 'submit' },
            content : 'Отправить'
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/form/_type/form_type_sendmail.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/price/price.bemtree */
/* global model, util */
block('price').content()(function() {
    if(!this.ctx.price) return;

    /**
     * Данные
     * @type {Object}
     * @param {Number} price.min - минимальная цена
     * @param {Number} price.max - максимальная цена
     * @param {String} price.currency - валюта(значение используется в качестве значения модификатора элемента currency)
     * @param {String} price.period - за какой период (в месяц/неделю/...)
     * @param {String} price.target - за какой товар/услугу (за билет/спальное место/...)
     * @param {Number} price.count - количество товаров/услуг (за 2 билета)
     */
    var price = this.ctx.price,
        /**
         * Допустимая погрешность для представления в более удобочитаемом виде, например:
         * при inaccuracy = 25 и price.min = 60 выведется 50
         * @type {Number}
         */
        inaccuracy = this.ctx.inaccuracy,
        currency = price.currency,
        count = price.count,
        period = price.period && model.types.period.values[price.period],
        target = price.target && model.types.good.values[price.target],
        getViewPrice = function(value) {
            return util.formatNumber(inaccuracy ? util.roundTo(value, inaccuracy) : value);
        };

    // обязательные данные: хотя бы одна цена и валюта
    if((isNaN(price.min) && isNaN(price.max)) || !price.currency) return;

    return [
        !isNaN(+price.min) ? [
            { block : 'price', elem : 'value', content : getViewPrice(price.min) }
        ].concat(!isNaN(+price.max) ? ' - ' : []) : '',
        !isNaN(+price.max) ? { block : 'price', elem : 'value', content : getViewPrice(price.max) } : '',
        { block : 'price', elem : 'currency', elemMods : { type : currency } },
        period || target ? {
            block : 'price',
            elem : 'ware',
            content : [
                target ? [
                    'за ' + (count ? count + ' ' : ''),
                    applyCtx({ block : 'declension', number : count || 1, target : price.target, case : 'accusative' })
                ] : '',
                period ? ' ' + period : ''
            ]
        } : ''
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/price/price.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_excursions.bemtree */
/* global model, router */
block('snippet').mod('type', 'excursions')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        block : 'snippet', elem : 'grid-row',
                        content : [
                            {
                                content : [
                                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                                    apply('typeValues')
                                        .concat([
                                            {
                                                block : 'snippet', elem : 'info',
                                                content : apply('duration')
                                            },
                                            {
                                                block : 'snippet', elem : 'info',
                                                content : document.city ?
                                                    'город отправления: ' + model.types.city.values[document.city] :
                                                    ''
                                            }
                                        ])
                                        .filter(function(block) { return !!block.content; })
                                ]
                            },
                            {
                                block : 'snippet',
                                elem : 'price',
                                content : (document.prices || [])
                                    // выводить цены "за взрослого" и "за ребенка"
                                    .filter(function(price) {
                                        return ['adult', 'child'].indexOf(price.target) > -1;
                                    })
                                    // отсортировать цены, "за взрослого" - сверху
                                    .sort(function(a, b) {
                                        return a.target !== b.target ? ({
                                            adult : -1,
                                            child : 1
                                        })[a.target] : 0;
                                    })
                                    .map(function(price) { return { block : 'price', price : price }; })
                            }
                        ]
                    },
                    document.shortDesc ? {
                        block : 'snippet',
                        elem : 'shortDesc',
                        content : document.shortDesc
                    } : '',
                    {
                        block : 'snippet', elem : 'grid-row',
                        elemMods : { alignItems : 'baseline' },
                        content : [
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands', type : 'link' },
                                url : router.build(document),
                                text : 'Подробнее'
                            },
                            { block : 'snippet', elem : 'variant' },
                            apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                block : 'snippet', elem : 'grid-row',
                content : [
                    {
                        content : [
                            { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                            apply('typeValues')
                        ]
                    },
                    {
                        block : 'snippet',
                        elem : 'price',
                        content : (document.prices || []).map(function(price) {
                            return { block : 'price', mods : { oneline : true }, price : price };
                        })
                    }
                ]
            },
            {
                block : 'snippet', elem : 'grid-row',
                elemMods : { alignItems : 'baseline' },
                content : [
                    {
                        block : 'snippet', elem : 'info',
                        content : [
                            document.city ?
                                'Город отправления: ' + model.types.city.values[document.city] :
                                '',
                            apply('duration')
                        ].join('. ')
                    },
                    { block : 'snippet', elem : 'variant' },
                    apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                ]
            },
            document.routes ? {
                block : 'snippet', elem : 'description',
                content : (document.routes || []).map(function(route) {
                    return {
                        tag : 'dl',
                        content : {
                            tag : 'dt',
                            content : [
                                'Маршрут: ',
                                (route.points || []).map(function(point) {
                                    return point.title;
                                }).filter(function(v) { return !!v; }).join(' — ')
                            ]
                        }
                    };
                })
            } : '',
            document.images ? { block : 'snippet', elem : 'gallery', images : document.images } : '',
            document.routes ? {
                block : 'snippet', elem : 'description',
                content : (document.routes || []).map(function(route) {
                    return {
                        tag : 'dl',
                        content : (route.points || []).map(function(point) {
                            return [
                                { tag : 'dt', content : point.title },
                                point.description ? {
                                    tag : 'dd', content : point.description.replace(/\n/g, '<br>')
                                } : ''
                            ];
                        })
                    };
                })
            } : '',
            (document.descriptions || [document.description]).map(function(description) {
                return { block : 'snippet', elem : 'description', content : description };
            }),
            {
                block : 'snippet', elem : 'grid-row',
                content : apply('sendmailBtn', { _sendmailBtnSize : 'xl' })
            },

            {
                tag : 'script',
                attrs : { type : 'application/ld+json' },
                content : JSON.stringify({
                    '@context' : 'http://schema.org',
                    '@type' : 'Place',
                    address : document.address ? {
                        '@type' : 'PostalAddress',
                        addressCountry : 'RU',
                        addressRegion : 'Крым',
                        streetAddress : document.address.custom || [
                            document.address.city,
                            document.address.street,
                            document.address.house
                        ].filter(function(v) { return !!v; }).join(', ')
                    } : {},
                    geo : document.address && document.address.point ? {
                        '@type' : 'GeoCoordinates',
                        latitude : document.address.point.lat,
                        longitude : document.address.point.lon
                    } : {},
                    name : document.title,
                    photo : document.images && document.images.map(function(image) { return image.orig; }),
                    review : document.shortDesc
                })
            }
        ];
    }),

    mode('typeValues')(function() {
        var data = this._data;

        return [{
            block : 'snippet', elem : 'info',
            content : ['typeOfExcursions', 'typeOfExcursionsTransport'].reduce(function(prev, type) {
                var typeVal = data[type];

                return prev.concat((Array.isArray(typeVal) ? typeVal : typeVal ? [typeVal] : []).map(function(val) {
                    return model.types[type].values[val] || val;
                }));
            }, []).join(', ')
        }].filter(function(block) { return !!block.content; });
    }),
    mode('duration')(function() {
        var document = this._data;

        return document.duration && document.duration.unit && (document.duration.min || document.duration.max) ?
            'Длительность: ' +
                [].concat(document.duration.min || []).concat(document.duration.max || []).join(' - ') + ' ' +
                applyCtx({
                    block : 'declension',
                    number : +(document.duration.max || document.duration.min),
                    target : document.duration.unit,
                    case : 'accusative'
                }) :
            '';
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_excursions.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_hotels.bemtree */
/* global model, router */
block('snippet').mod('type', 'hotels')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'pending' },
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        content : [
                            { block : 'snippet', elem : 'title', elemMods : { link : true, 'row-count' : 3 } },
                            apply('info')
                        ]
                    },
                    {
                        block : 'snippet', elem : 'grid-row', elemMods : { alignItems : 'center' },
                        content : [
                            {
                                block : 'snippet', elem : 'features',
                                features : ['internet', 'parking', 'fitness', 'pool', 'restaurant', 'spa']
                            },
                            { block : 'snippet', elem : 'compare', elemMods : { size : 's' } }
                        ]
                    },
                    apply('prices'),
                    {
                        block : 'snippet', elem : 'grid-row', elemMods : { alignItems : 'baseline' },
                        content : [
                            {
                                block: 'button',
                                mods: { size : 'm', theme : 'islands', type : 'link' },
                                url : router.build(document) + 'rooms/',
                                text : 'Посмотреть номера'
                            },
                            { block : 'snippet', elem : 'variant' },
                            apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                block : 'snippet', elem : 'grid-row',
                content : [
                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                    {
                        block: 'button',
                        mods: { size : 'm', theme : 'islands', type : 'link' },
                        url : router.build(document) + 'rooms/',
                        text : 'Посмотреть номера'
                    }
                ]
            },
            apply('info'),
            apply('prices'),
            (document.descriptions || [document.description])
                .map(function(description, index, arr) {
                    return [
                        description && arr.length > 1 ?
                        { block : 'snippet', elem : 'description', content : description } : '',
                        index === 0 ? [
                            document.images ? { block : 'snippet', elem : 'gallery', images : document.images } : '',
                            { block : 'snippet', elem : 'compare' },
                            {
                                block : 'snippet-specs',
                                mods : { expanded : this._isExpanded, table : true },
                                item : document,
                                category : this.ctx.mods.type
                            }
                        ] : '',
                        description && arr.length === 1 ?
                        { block : 'snippet', elem : 'description', content : description } : ''
                    ];
                }, this),
            {
                block : 'snippet', elem : 'grid-row',
                content : apply('sendmailBtn', { _sendmailBtnSize : 'xl' })
            }
        ];
    }),

    mode('info')(function() {
        var document = this._data,
            typeOfHotel = document.typeOfHotel;

        return {
            block : 'snippet', elem : 'info',
            content : [
                document.address && (function(a) {
                    return a.custom || [a.city, a.street, a.house].filter(function(v) {
                        return !!v;
                    }).join(', ');
                }(document.address)),
                typeOfHotel ? model.types.typeOfHotel.values[typeOfHotel] : typeOfHotel
            ].filter(function(v) { return !!v; }).join('. ')
        };
    }),
    mode('prices')(function() {
        var document = this._data;

        return {
            block : 'snippet', elem : 'grid-row',
            mix : { block : 'snippet', elem : 'prices' },
            content : ['standartSuite', 'juniorSuite', 'luxurySuite', 'vipSuite']
                .map(function(suiteType, index) {
                    var price = (document.prices || []).filter(function(price) {
                        return price.target === suiteType;
                    })[0];

                    // выводим только минимальные цены
                    price && delete price.max;

                    return {
                        block : 'snippet', elem : 'price',
                        content : [
                            {
                                block : 'snippet', elem : 'price-caption',
                                content : ['стандарт', 'полулюкс', 'люкс', 'vip'][index]
                            },
                            price ? {
                                block : 'price', mods : { currency : 'RUR' },
                                price : price
                            } : '—'
                        ]
                    };
                })
        };
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_hotels.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__compare/snippet__compare.bemtree */
block('snippet').elem('compare').content()(function() {
    var documentId = this._data.id,
        documentCategory = this._route.category,
        actionCompareButtonId = 'action-button_action_compare-' + documentId,
        actionCompareAddButtonId = 'action-button_action_compareAdd-' + documentId,
        actionCompareDeleteButtonId = 'action-button_action_compareDelete-' + documentId,
        size = this.ctx.elemMods && this.ctx.elemMods.size || 'm';

    return [
        {
            block : 'action-button',
            js : { id : actionCompareAddButtonId, category : documentCategory, live : false, targetId : documentId },
            mods : { action : 'compareAdd', hidden : true, size : size },
            content : 'Добавить к сравнению'
        },
        {
            block : 'action-button',
            js : { id : actionCompareButtonId, category : documentCategory, live : false, targetId : documentId },
            mods : { action : 'compare', hidden : true, size : size, type : 'link' },
            icon : { block : 'icon', mods : { type : 'open-document' } },
            content : 'Сравнить'
        },
        {
            block : 'action-button',
            js : { id : actionCompareDeleteButtonId, category : documentCategory, live : false, targetId : documentId },
            mods : { action : 'compareDelete', hidden : true, size : size },
            icon : { block : 'icon', mods : { type : 'cancel' } },
            content : 'Убрать из сравнения'
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__compare/snippet__compare.bemtree */


/* begin: ../../site.blocks/snippet/__features/snippet__features.bemtree */
block('snippet').elem('features')(
    content()(function() {
        var document = this._data;

        return this.ctx.features && this.ctx.features.map(function(feature) {
            return {
                block : 'feature',
                mods : { type : feature, full : this._isExpanded },
                mix : {
                    block : 'snippet', elem : 'feature',
                    elemMods : { exist : document.features && document.features.indexOf(feature) > -1 }
                }
            };
        }, this);
    })
);

/* end: ../../site.blocks/snippet/__features/snippet__features.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_balcony.bemtree */
block('feature').mod('type', 'balcony').content()('балкон (веранда)');

/* end: ../../common.blocks/feature/_type/feature_type_balcony.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_bathhouse.bemtree */
block('feature').mod('type', 'bathhouse').content()('баня');

/* end: ../../common.blocks/feature/_type/feature_type_bathhouse.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_bathtub.bemtree */
block('feature').mod('type', 'bathtub').content()('ванна');

/* end: ../../common.blocks/feature/_type/feature_type_bathtub.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_boiler.bemtree */
block('feature').mod('type', 'boiler').content()('котёл');

/* end: ../../common.blocks/feature/_type/feature_type_boiler.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_brazier.bemtree */
block('feature').mod('type', 'brazier').content()('мангал');

/* end: ../../common.blocks/feature/_type/feature_type_brazier.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_conditioner.bemtree */
block('feature').mod('type', 'conditioner').content()('кондиционер');

/* end: ../../common.blocks/feature/_type/feature_type_conditioner.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_fitness.bemtree */
block('feature').mod('type', 'fitness').content()('тренажерный зал');

/* end: ../../common.blocks/feature/_type/feature_type_fitness.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_fridge.bemtree */
block('feature').mod('type', 'fridge').content()('холодильник');

/* end: ../../common.blocks/feature/_type/feature_type_fridge.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_furniture.bemtree */
block('feature').mod('type', 'furniture').content()('мебель');

/* end: ../../common.blocks/feature/_type/feature_type_furniture.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_garage.bemtree */
block('feature').mod('type', 'garage').content()('гараж');

/* end: ../../common.blocks/feature/_type/feature_type_garage.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_hairdryer.bemtree */
block('feature').mod('type', 'hairdryer').content()('фен');

/* end: ../../common.blocks/feature/_type/feature_type_hairdryer.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_hot-water.bemtree */
block('feature').mod('type', 'hot-water').content()('горячая вода');

/* end: ../../common.blocks/feature/_type/feature_type_hot-water.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_internet.bemtree */
block('feature').mod('type', 'internet').content()('интернет');

/* end: ../../common.blocks/feature/_type/feature_type_internet.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_iron.bemtree */
block('feature').mod('type', 'iron').content()('утюг');

/* end: ../../common.blocks/feature/_type/feature_type_iron.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_microwave.bemtree */
block('feature').mod('type', 'microwave').content()('микроволновая печь');

/* end: ../../common.blocks/feature/_type/feature_type_microwave.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_parking.bemtree */
block('feature').mod('type', 'parking').content()('парковка');

/* end: ../../common.blocks/feature/_type/feature_type_parking.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_pool.bemtree */
block('feature').mod('type', 'pool').content()('бассейн');

/* end: ../../common.blocks/feature/_type/feature_type_pool.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_restaurant.bemtree */
block('feature').mod('type', 'restaurant').content()('ресторан');

/* end: ../../common.blocks/feature/_type/feature_type_restaurant.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_satellite.bemtree */
block('feature').mod('type', 'satellite').content()('спутниковое TV');

/* end: ../../common.blocks/feature/_type/feature_type_satellite.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_sauna.bemtree */
block('feature').mod('type', 'sauna').content()('сауна');

/* end: ../../common.blocks/feature/_type/feature_type_sauna.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_shower.bemtree */
block('feature').mod('type', 'shower').content()('душевая кабина');

/* end: ../../common.blocks/feature/_type/feature_type_shower.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_spa.bemtree */
block('feature').mod('type', 'spa').content()('спа');

/* end: ../../common.blocks/feature/_type/feature_type_spa.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_telephone.bemtree */
block('feature').mod('type', 'telephone').content()('телефон');

/* end: ../../common.blocks/feature/_type/feature_type_telephone.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_tv.bemtree */
block('feature').mod('type', 'tv').content()('телевизор');

/* end: ../../common.blocks/feature/_type/feature_type_tv.bemtree */


/* begin: ../../common.blocks/feature/_type/feature_type_washing-machine.bemtree */
block('feature').mod('type', 'washing-machine').content()('стиральная машина');

/* end: ../../common.blocks/feature/_type/feature_type_washing-machine.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet/__pending/snippet__pending.bemtree */
block('snippet').elem('pending').content()({
    block : 'spin',
    mods : { progress : true, size : 'xl', theme : 'islands' }
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet/__pending/snippet__pending.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet-specs/snippet-specs.bemtree */
/* global model */
block('snippet-specs').content()(function() {
    var document = this.ctx.item,
        /**
         * Массив характеристик
         * @type {Array<Object|String>} Массив строк(имя поля в документе) и(или) объектов(расширенное описание);
         * пустая строка превращается в разделитель;
         * структура объекта:
         * {
             * caption : optional{String}, - кастомный заголовок
             * name : required{String}, - имя поля в документе
             * values : optional{Array<String>}, - массив значений поля(например, хочется выводить не все features)
             * get : optional{Function} - функция для создания values из сложных данных,
             * в качестве аргумента примнимает данные документа
             * }
         */
            specs = this.ctx.specs || [];

    specs = specs.map(function(param) {
        var spec = typeof param === 'object' ? param : { name : param },
            type = model.types[spec.name],
            typeName = spec.name;

        spec.caption = spec.caption || type && type.caption;

        if(!spec.get && (type.type !== 'array' || !type.values)) return (spec.values = document[typeName]) && spec;

        spec.values = spec.get ?
            spec.get(document) :
            spec.values ||
                (document[typeName] && type.values && Object.keys(type.values).filter(function(key) {
                    return document[typeName].indexOf(key) > -1;
                })) || document[typeName];

        return spec;
    });

    // не выводить характеристики без значений
    specs = specs.filter(function(spec) { return spec === '' || spec && spec.values !== undefined; });

    return specs
        .map(function(spec) {
            if(spec === '') return { elem : 'item', elemMods : { separator : true } };

            return {
                elem : 'item',
                caption : spec.caption,
                value : Array.isArray(spec.values) ?
                    spec.values.map(function(val) {
                        return model.types[spec.name].values[val];
                    }).join(', ') :
                    spec.values
            };
        }, this);
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet-specs/snippet-specs.bemtree */


/* begin: ../../site.blocks/snippet-specs/snippet-specs.bemtree */
/* global model */
block('snippet-specs').content()(function() {
    var numberOfRooms = { caption : 'комнат', name : 'numberOfRooms' },
        numberOfSeats = { caption : 'мест', name : 'numberOfSeats' },
        berths = {
            caption : 'Спальные&nbsp;места',
            name : 'berths',
            get : function(document) {
                return document.berths ?
                    document.berths.map(function(berth) {
                        return model.types.berthType.values[berth.type] + ': ' + (berth.count || 1);
                    }).join('<br>') :
                    undefined;
            }
        };

    this.ctx.specs = ({
        hotels : {
            full : ['numberOfFloors', 'numberOfSuites', numberOfSeats, 'features'],
            short : ['numberOfSuites', numberOfSeats]
        },
        rent : {
            full : ['areaOfAll', 'areaOfKitchen', 'areaOfLiving', 'floor', 'numberOfFloors', numberOfRooms,
                numberOfSeats, berths, 'features', 'viewFromWindow'],
            short : [numberOfRooms, numberOfSeats]
        },
        rooms : {
            full : [numberOfRooms, numberOfSeats, berths, 'features', 'viewFromWindow'],
            short : [numberOfRooms, numberOfSeats]
        }
    })[this.ctx.category][this.ctx.mods.expanded ? 'full' : 'short'];

    return applyNext();
});

/* end: ../../site.blocks/snippet-specs/snippet-specs.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/snippet-specs/__item/snippet-specs__item.bemtree */
block('snippet-specs').elem('item').content()(function() {
    return [
        {
            elem : 'caption',
            content : this.ctx.caption
        },
        {
            elem : 'value',
            content : this.ctx.value
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/snippet-specs/__item/snippet-specs__item.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_places.bemtree */
/* global model, router */
block('snippet').mod('type', 'places')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        content : [
                            { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                            apply('typeValues')
                        ]
                    },
                    document.shortDesc ? {
                        block : 'snippet',
                        elem : 'shortDesc',
                        content : document.shortDesc
                    } : '',
                    {
                        block : 'snippet', elem : 'grid-row',
                        elemMods : { alignItems : 'baseline' },
                        content : [
                            {
                                block : 'button',
                                mods : { size : 'm', theme : 'islands', type : 'link' },
                                url : router.build(document),
                                text : 'Подробнее'
                            },
                            { block : 'snippet', elem : 'variant' }
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                content : [
                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                    apply('typeValues')
                ]
            },
            {
                block : 'snippet', elem : 'grid-row',
                elemMods : { alignItems : 'baseline' },
                content : [
                    apply('address'),
                    { block : 'snippet', elem : 'variant' }
                ]
            },
            apply('descriptionsGallery'),

            {
                tag : 'script',
                attrs : { type : 'application/ld+json' },
                content : JSON.stringify({
                    '@context' : 'http://schema.org',
                    '@type' : 'Place',
                    address : document.address ? {
                        '@type' : 'PostalAddress',
                        addressCountry : 'RU',
                        addressRegion : 'Крым',
                        streetAddress : document.address.custom || [
                            document.address.city,
                            document.address.street,
                            document.address.house
                        ].filter(function(v) { return !!v; }).join(', ')
                    } : {},
                    geo : document.address && document.address.point ? {
                        '@type' : 'GeoCoordinates',
                        latitude : document.address.point.lat,
                        longitude : document.address.point.lon
                    } : {},
                    name : document.title,
                    photo : document.images && document.images.map(function(image) { return image.orig; }),
                    review : document.shortDesc
                })
            }
        ];
    }),

    mode('typeValues')(function() {
        var type = 'typeOfPlaces',
            typeVal = this._data[type];

        return [{
            block : 'snippet', elem : 'info',
            content : [].concat((Array.isArray(typeVal) ? typeVal : typeVal ? [typeVal] : []).map(function(val) {
                return model.types[type].values[val] || val;
            })).join(', ')
        }].filter(function(block) { return !!block.content; });
    }),

    mode('address')(function() {
        var document = this._data;

        return document.address ? {
            block : 'snippet', elem : 'info',
            content : document.address.custom || [
                document.address.city,
                document.address.district,
                document.address.street,
                document.address.house
            ].filter(function(value) { return !!value; }).join(', ')
        } : '';
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_places.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_rent.bemtree */
/* global model */
block('snippet').mod('type', 'rent')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'pending' },
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        content : [
                            apply('prices'),
                            { block : 'snippet', elem : 'title', elemMods : { link : true, 'row-count' : 3 } },
                            apply('info')
                        ]
                    },
                    {
                        block : 'snippet', elem : 'grid-row', elemMods : { alignItems : 'center' },
                        content : [
                            {
                                block : 'snippet',
                                elem : 'features',
                                features : ['conditioner', 'internet', 'tv', 'parking', 'washing-machine', 'hot-water']
                            },
                            {
                                block : 'snippet-specs',
                                mods : { expanded : this._isExpanded, list : true },
                                item : document,
                                category : this.ctx.mods.type
                            }
                        ]
                    },
                    {
                        block : 'snippet', elem : 'grid-row',
                        content : [
                            { block : 'snippet', elem : 'compare' },
                            { block : 'snippet', elem : 'variant' },
                            apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                block : 'snippet', elem : 'grid-row',
                content : [
                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                    apply('prices')
                ]
            },
            {
                block : 'snippet', elem : 'grid-row',
                elemMods : { alignItems : 'baseline' },
                content : [
                    apply('info'),
                    { block : 'snippet', elem : 'variant' },
                    apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                ]
            },
            (document.descriptions || [document.description]).map(function(description, index, arr) {
                return [
                    arr.length > 1 ? { block : 'snippet', elem : 'description', content : description } : '',
                    index === 0 ? [
                        { block : 'snippet', elem : 'gallery', images : document.images },
                        { block : 'snippet', elem : 'compare' },
                        {
                            block : 'snippet-specs',
                            mods : { expanded : this._isExpanded, table : true },
                            item : document,
                            category : this.ctx.mods.type
                        }
                    ] : '',
                    arr.length === 1 ? { block : 'snippet', elem : 'description', content : description } : ''
                ];
            }, this),
            {
                block : 'snippet', elem : 'grid-row',
                content : apply('sendmailBtn', { _sendmailBtnSize : 'xl' })
            },

            {
                tag : 'script',
                attrs : { type : 'application/ld+json' },
                content : JSON.stringify({
                    '@context' : 'http://schema.org',
                    '@type' : 'Place',
                    address : document.address ? {
                        '@type' : 'PostalAddress',
                        addressCountry : 'RU',
                        addressRegion : 'Крым',
                        streetAddress : document.address.custom || [
                            document.address.city,
                            document.address.street,
                            document.address.house
                        ].filter(function(v) { return !!v; }).join(', ')
                    } : {},
                    geo : document.address && document.address.point ? {
                        '@type' : 'GeoCoordinates',
                        latitude : document.address.point.lat,
                        longitude : document.address.point.lon
                    } : {},
                    name : document.title,
                    photo : document.images && document.images.map(function(image) { return image.orig; }),
                    review : document.shortDesc
                })
            }
        ];
    }),

    mode('info')(function() {
        var document = this._data;

        return {
            block : 'snippet', elem : 'info',
            content : [model.types.typeOfRent.values[document.typeOfRent]].concat([
                    model.types.city.values[document.city],
                    (model.types.typeOfDistrict.values[document.typeOfDistrict] || '').toLowerCase()
                ].filter(function(v) { return !!v; }).join(', '))
                .filter(function(v) { return !!v; }).join('. ')
        };
    }),
    mode('prices')(function() {
        var document = this._data;

        return document.prices ? {
            block : 'snippet',
            elem : 'price',
            content : document.prices.map(function(price) {
                return (!this._query.rentPeriod ||
                    (this._query.rentPeriod && price.period === this._query.rentPeriod)) &&
                {
                    block : 'price',
                    mods : { currency : 'RUR', oneline : this._isExpanded || undefined },
                    price : price };
            }, this).filter(function(v) { return !!v; })
        } : '';
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_rent.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_rooms.bemtree */
/* global model */
block('snippet').mod('type', 'rooms')(
    content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            { block : 'snippet', elem : 'pending' },
            { block : 'snippet', elem : 'preview', mix : { block : 'snippet', elem : 'left' } },
            {
                block : 'snippet',
                elem : 'center',
                content : [
                    {
                        content : [
                            apply('prices'),
                            { block : 'snippet', elem : 'title', elemMods : { link : true, 'row-count' : 3 } },
                            apply('info')
                        ]
                    },
                    {
                        block : 'snippet', elem : 'grid-row', elemMods : { alignItems : 'center' },
                        content : [
                            {
                                block : 'snippet',
                                elem : 'features',
                                features : ['conditioner', 'internet', 'tv', 'parking', 'washing-machine', 'hot-water']
                            },
                            {
                                block : 'snippet-specs',
                                mods : { expanded : this._isExpanded, list : true },
                                item : document,
                                category : this.ctx.mods.type
                            }
                        ]
                    },
                    {
                        block : 'snippet', elem : 'grid-row',
                        content : [
                            { block : 'snippet', elem : 'compare' },
                            { block : 'snippet', elem : 'variant' },
                            apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                        ]
                    }
                ]
            },
            apply('labels')[0][0]
        ];
    }),

    mod('expanded', true).content()(function() {
        this._isExpanded = !!this.ctx.mods.expanded;
        this._data = this.ctx.data || this._data && this._data[0];

        if(!this._data) return;

        var document = this._data;

        return [
            {
                block : 'snippet', elem : 'grid-row',
                content : [
                    { block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 } },
                    apply('prices')
                ]
            },
            {
                block : 'snippet', elem : 'grid-row',
                elemMods : { alignItems : 'baseline' },
                content : [
                    apply('info'),
                    { block : 'snippet', elem : 'variant' },
                    apply('sendmailBtn', { _sendmailBtnSize : 'm' })
                ]
            },
            (document.descriptions || [document.description]).map(function(description, index, arr) {
                return [
                    arr.length > 1 ? { block : 'snippet', elem : 'description', content : description } : '',
                    index === 0 ? [
                        { block : 'snippet', elem : 'gallery', images : document.images },
                        { block : 'snippet', elem : 'compare' },
                        {
                            block : 'snippet-specs',
                            mods : { expanded : this._isExpanded, table : true },
                            item : document,
                            category : this.ctx.mods.type
                        }
                    ] : '',
                    arr.length === 1 ? { block : 'snippet', elem : 'description', content : description } : ''
                ];
            }, this),
            {
                block : 'snippet', elem : 'grid-row',
                content : apply('sendmailBtn', { _sendmailBtnSize : 'xl' })
            }
        ];
    }),

    mode('info')(function() {
        var document = this._data;

        return {
            block : 'snippet', elem : 'info',
            content : [model.types.typeOfRent.values[document.typeOfRent]]
                .concat(document.address && [document.address.city, document.address.street])
                .filter(function(v) { return !!v; }).join(', ')
        };
    }),
    mode('prices')(function() {
        var document = this._data;

        return document.prices ? {
            block : 'snippet', elem : 'price',
            content : document.prices.map(function(price) {
                return {
                    block : 'price',
                    mods : { currency : 'RUR', oneline : this._isExpanded || undefined },
                    price : price
                };
            }, this)
        } : '';
    })
);

/* end: ../../site.blocks/snippet/_type/snippet_type_rooms.bemtree */


/* begin: ../../site.blocks/snippet/_type/snippet_type_taxi.bemtree */
/* global util */
block('snippet').mod('type', 'taxi').content()(function() {
    this._isExpanded = !!this.ctx.mods.expanded;
    this._data = this.ctx.data || this._data && this._data[0];

    if(!this._data) return;

    var document = this._data,
        route = document.routes && document.routes[0];

    return [
        {
            block : 'snippet',
            elem : 'center',
            content : [
                {
                    block : 'snippet', elem : 'grid-row',
                    content : [
                        {
                            block : 'snippet', elem : 'title', elemMods : { 'row-count' : 3 },
                            content : (function(title) {
                                return title.length === 2 ? [
                                    title[0],
                                    '-',
                                    { tag : 'strong', content : title[1] }
                                ] : title[0];
                            }(document.title.split('—')))
                        },
                        route ? {
                            block : 'snippet', elem : 'info',
                            content : [
                                route.length && (util.roundTo(route.length, 5) + ' км'),
                                route.time && route.time.min && route.time.unit && ({
                                    block : 'time',
                                    time : { value : route.time.min, unit : route.time.unit },
                                    inaccuracy : 600
                                })
                            ].filter(function(v) { return v; }).reduce(function(prev, value, index) {
                                    return prev.concat(index > 0 ? ', ' : '').concat(value);
                                }, [])
                        } : ''
                    ]
                },
                {
                    block : 'snippet', elem : 'grid-row',
                    mix : { block : 'snippet', elem : 'prices' },
                    content : ['standartTaxi', 'juniorTaxi', 'luxuryTaxi', 'vipTaxi']
                        .map(function(suiteType, index) {
                            var price = (document.prices || []).filter(function(price) {
                                return price.target === suiteType;
                            })[0];

                            return {
                                block : 'snippet', elem : 'price',
                                content : [
                                    {
                                        block : 'snippet', elem : 'price-caption',
                                        content : [
                                            'легковой',
                                            'c кондиционером',
                                            'микроавтобус',
                                            'автобус или VIP'
                                        ][index]
                                    },
                                    price ? {
                                        block : 'price', mods : { currency : 'RUR' },
                                        price : (function() { return (price.min = Math.round(price.min)) && price; }()),
                                        inaccuracy : 50
                                    } : '—'
                                ]
                            };
                        })
                        .concat({
                            block : 'action-button',
                            js : {
                                id : 'action-button_action_reserve-taxi-' + document.id,
                                content : 'Заполните пожалуйста форму ниже, чтобы заказать такси "' +
                                    document.title + '"',
                                subject : 'rest-trip: заказ такси "' + document.title + '"',
                                title : 'Подать заявку на заказ (вариант ' + document.id + ')',
                                documentId : document.id
                            },
                            mods : { action : 'reserve-taxi', size : 'm', view : 'action' },
                            content : 'Заказать'
                        })
                }
            ]
        },
        apply('labels')[0][0]
    ];
});

/* end: ../../site.blocks/snippet/_type/snippet_type_taxi.bemtree */


/* begin: ../../site.blocks/taxi-price-list/taxi-price-list.bemtree */
/* global util */
block('taxi-price-list').content()(function() {
    var _this = this;

    this.price = [
        { vehicle: 'Легковой автомобиль Волга, Daewoo', price: 4 * 3, idle: 30 * 3, dayRent: 600 * 3 },
        { vehicle: 'Легковой автомобиль c кондиционером не VIP класса', price: 4.5 * 3, idle: 30 * 3,
            dayRent: 800 * 3 },
        { vehicle: 'Микроавтобус Мерседес спринтер до 18 человек', price: 10 * 3, idle: 60 * 3, dayRent: 1100 * 3 },
        { vehicle: 'Автобус Эталон, Богдан до 27 человек, автомобили VIP-класса', price: 12 * 3,
            idle: [80 * 3, 100 * 3].join('-'), dayRent: 1400 * 3 }
    ];

    this.cities = [
//        { name: 'Алушта', distance: 45 },
        { name: 'Армянск', distance: 145 },
        { name: 'Бахчисарай', distance: 35 },
        { name: 'Белогорск', distance: 47 },
        { name: 'Ботанический сад', distance: 75 },
        { name: 'Гвардейское', distance: 30 },
//        { name: 'Гурзуф', distance: 70 },
        { name: 'Джанкой', distance: 95 },
        { name: 'Евпатория', distance: 70 },
        { name: 'Керчь', distance: 220 },
        { name: 'Кировское', distance: 120 },
        { name: 'Коктебель', distance: 125 },
        { name: 'Красноперекопск', distance: 130 },
        { name: 'Ленино', distance: 175 },
//        { name: 'Ливадия', distance: 90 },
        { name: 'Мирный', distance: 100 },
        { name: 'Мисхор', distance: 95 },
        { name: 'Нижнегорск', distance: 95 },
//        { name: 'Партенит', distance: 65 },
        { name: 'Первомайское', distance: 105 },
        { name: 'Песчаное', distance: 55 },
        { name: 'Раздольное', distance: 125 },
        { name: 'Саки', distance: 55 },
        { name: 'Севастополь', distance: 80 },
//        { name: 'Симеиз', distance: 120 },
        { name: 'Старый Крым', distance: 90 },
        { name: 'Судак', distance: 110 },
        { name: 'Феодосия', distance: 110 },
//        { name: 'Форос', distance: 110 },
        { name: 'Черноморское', distance: 140 },
        { name: 'Щелкино', distance: 180 }
//        { name: 'Ялта', distance: 85 }
    ];

    this.cities = this.cities.sort(function(a, b) {
        return a.name > b.name ? 1 : -1;
    });

    return {
        tag: 'table',
        content: [
            {
                tag: 'tr',
                content: [
                    (['Город назначения', 'Расстояние в километрах'].concat(this.price)).map(function(value) {
                        return {
                            tag: 'th',
                            content: value.vehicle || value
                        };
                    })
                ]
            },
            {
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: 'стоимость за 1&nbsp;км (руб.)'
                    },
                    {
                        tag: 'td',
                        content: ''
                    },
                    this.price.map(function(vehicle) {
                        return {
                            tag: 'td',
                            content: vehicle.price
                        };
                    })
                ]
            },
            this.cities.map(function(city) {
                return {
                    tag: 'tr',
                    content: [
                        {
                            tag: 'td',
                            content: city.name
                        },
                        {
                            tag: 'td',
                            content: util.roundTo(city.distance, 5)
                        },
                        _this.price.map(function(vehicle) {
                            return {
                                tag: 'td',
                                content: util.roundTo(city.distance * vehicle.price, 50)
                            };
                        })
                    ]
                };
            }),
            {
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: 'Простой транспорта за 1&nbsp;час'
                    },
                    {
                        tag: 'td',
                        content: ''
                    },
                    this.price.map(function(vehicle) {
                        return {
                            tag: 'td',
                            content: vehicle.idle
                        };
                    })
                ]
            },
            {
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: 'День работы с пробегом до 200&nbsp;км'
                    },
                    {
                        tag: 'td',
                        content: ''
                    },
                    this.price.map(function(vehicle) {
                        return {
                            tag: 'td',
                            content: vehicle.dayRent
                        };
                    })
                ]
            }
        ]
    };
});

/* end: ../../site.blocks/taxi-price-list/taxi-price-list.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_active.bemtree */
block('filters').mod('set', 'active')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'priceHourlyMax',
                'typeOfActiveTravel',
                'typeOfActive'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_active.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_priceHourlyMax.bemtree */
block('filters').elem('item').elemMod('type', 'priceHourlyMax').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = {
            '' : 'Любая',
            100 : '100',
            300 : '300',
            500 : '500'
        },
        isRadioBox = Object.keys(values).indexOf(query[filterName] || '') > -1,
        settings = isRadioBox ? {
            caption : 'Цена в час до (руб.)',
            values : Object.keys(values).sort(function(a,b) { return Number(a) - Number(b); }),
            view : values
        } : {
            caption : 'Цена в час до (руб.)'
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '', '1000')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_priceHourlyMax.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfActiveTravel.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfActiveTravel').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfActiveTravel.caption,
            values : Object.keys(model.types.typeOfActiveTravel.values),
            view : model.types.typeOfActiveTravel.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfActiveTravel.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfActive.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfActive').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfActive.caption,
            values : Object.keys(model.types.typeOfActive.values),
            view : model.types.typeOfActive.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfActive.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_excursions.bemtree */
block('filters').mod('set', 'excursions')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'pricePerExcursionMax',
                'duration',
                'departureCity',
                'typeOfExcursions',
                'typeOfExcursionsTransport'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_excursions.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_pricePerExcursionMax.bemtree */
block('filters').elem('item').elemMod('type', 'pricePerExcursionMax').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = {
            '' : 'Любая',
            500 : '500',
            2000 : '2000',
            5000 : '5000'
        },
        isRadioBox = Object.keys(values).indexOf(query[filterName] || '') > -1,
        settings = isRadioBox ? {
            caption : 'Цена до (руб.)',
            values : Object.keys(values).sort(function(a,b) { return Number(a) - Number(b); }),
            view : values
        } : {
            caption : 'Цена до (руб.)'
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '', '1000')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_pricePerExcursionMax.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_duration.bemtree */
block('filters').elem('item').elemMod('type', 'duration').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        settings = {
            caption : 'Длительность до (час)'
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        this.getInput(filterName, query[filterName] || '', '10')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_duration.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_departureCity.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'departureCity').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : 'Город отправления',
            values : Object.keys(model.types.city.values),
            view : model.types.city.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_departureCity.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfExcursions.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfExcursions').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfExcursions.caption,
            values : Object.keys(model.types.typeOfExcursions.values),
            view : model.types.typeOfExcursions.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfExcursions.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfExcursionsTransport.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfExcursionsTransport').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfExcursionsTransport.caption,
            values : Object.keys(model.types.typeOfExcursionsTransport.values),
            view : model.types.typeOfExcursionsTransport.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfExcursionsTransport.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_hotels.bemtree */
block('filters').mod('set', 'hotels')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'city',
                'typeOfHotel',
                'features'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_hotels.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_city.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'city').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.city.caption,
            values : Object.keys(model.types.city.values),
            view : model.types.city.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_city.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfHotel.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfHotel').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfHotel.caption,
            values : Object.keys(model.types.typeOfHotel.values),
            view : model.types.typeOfHotel.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfHotel.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_features.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'features').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.features.caption,
            values : (function() {
                switch(route.category) {
                    case 'hotels':
                        return ['internet', 'parking', 'fitness', 'pool', 'restaurant', 'spa', 'sauna',
                            'brazier', 'bathhouse'];
                    case 'rent':
                        return ['conditioner', 'internet', 'tv', 'parking', 'washing-machine', 'hot-water',
                            'fridge', 'bathtub', 'shower', 'balcony', 'brazier', 'garage'];
                    case 'rooms':
                        return ['conditioner', 'internet', 'tv', 'balcony', 'fridge', 'bathtub', 'shower',
                            'hairdryer'];
                    default:
                        return Object.keys(model.types.features.values);
                }
            }()),
            view : model.types.features.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : [
                    filterName === 'features' ? applyCtx({
                        block : 'feature',
                        mods : {
                            type : filterValue,
                            color : 'white'
                        }
                    }) : '',
                    settings.view[filterValue] || filterValue
                ],
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_features.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_places.bemtree */
block('filters').mod('set', 'places')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'typeOfPlaces'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_places.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfPlaces.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfPlaces').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfPlaces.caption,
            values : [
                'mountain', 'waterfall-source', 'reserve', 'park', 'promontory', 'bay', 'canyon', 'mud-bath', 'beach',
                '*separator*', 'church-monastery', 'palace', 'museum',
                'memorial', '*separator*',
                'supermarket', 'cafe', 'restaurant', 'dolphinarium', 'manufacture',  'railway-station', 'cinema',
                'services'
            ],
            view : model.types.typeOfPlaces.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfPlaces.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_rent.bemtree */
block('filters').mod('set', 'rent')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'rentPeriod',
                'city',
                'priceMax',
                'numberOfRooms',
                'numberOfSeats',
                'typeOfRent',
                'features'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_rent.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_rentPeriod.bemtree */
block('filters').elem('item').elemMod('type', 'rentPeriod').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = {
            day : 'Посуточно',
            month : 'Помесячно'
        },
        isRadioBox = [''].concat(Object.keys(values)).indexOf(query[filterName] || '') > -1,
        settings = {
            caption : 'Период аренды',
            values : Object.keys(values),
            view : Object.keys(values).reduce(function(prev, key) {
                prev[key] = values[key];
                return prev;
            }, {})
        };

    return [
        { elem : 'caption', content : settings.caption },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '', '')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_rentPeriod.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_priceMax.bemtree */
block('filters').elem('item').elemMod('type', 'priceMax').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = {
            '' : 'Любая',
            500 : '500',
            2000 : '2000',
            5000 : '5000'
        },
        isRadioBox = Object.keys(values).indexOf(query[filterName] || '') > -1,
        settings = isRadioBox ? {
            caption : 'Цена до (руб.)',
            values : Object.keys(values).sort(function(a,b) { return Number(a) - Number(b); }),
            view : values
        } : {
            caption : 'Цена до (руб.)'
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '', '1000')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_priceMax.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_numberOfRooms.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'numberOfRooms').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = {
            1 : 1,
            2 : 2,
            '3+' : '3+'
        },
        isRadioBox = [''].concat(Object.keys(values)).indexOf(query[filterName] || '') > -1,
        settings = {
            caption : model.types.numberOfRooms.caption,
            values : [''].concat(Object.keys(values)),
            view : [''].concat(Object.keys(values)).reduce(function(prev, key) {
                prev[key] = key === '' ? 'Любое' : values[key];
                return prev;
            }, {})
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_numberOfRooms.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_numberOfSeats.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'numberOfSeats').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reduce(function(prev, key) {
            return (prev[key] = key === '' ? 'Любое' : key) && prev;
        }, {}),
        isSelect = Object.keys(values).indexOf(query[filterName] || '') > -1,
        settings = isSelect ? {
            caption : model.types.numberOfSeats.caption,
            currentValue : query.numberOfSeats || '',
            values : Object.keys(values).sort(function(a, b) { return a === '' ? -1 : +a - +b; }),
            view : values
        } : {
            caption : model.types.numberOfSeats.caption,
            currentValue : query[filterName] || ''
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isSelect ?
            this.getSelect(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : filterValue === settings.currentValue,
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, settings.currentValue, '100')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_numberOfSeats.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfRent.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfRent').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfRent.caption,
            values : Object.keys(model.types.typeOfRent.values),
            view : model.types.typeOfRent.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfRent.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_rooms.bemtree */
block('filters').mod('set', 'rooms')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'typeOfRoom',
                'priceMax',
                'features'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_rooms.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfRoom.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'typeOfRoom').content()(function() {
    var route = this._route,
        query = this._query,
        filterName = this.ctx.elemMods.type,
        checkboxGroups = [[]],
        settings = {
            caption : model.types.typeOfRoom.caption,
            values : Object.keys(model.types.typeOfRoom.values),
            view : model.types.typeOfRoom.values
        };

    settings.values.forEach(function(filterValue) {
        if(filterValue === '*separator*') {
            checkboxGroups.push([]);
        } else {
            checkboxGroups[checkboxGroups.length - 1].push(filterValue);
        }
    });

    checkboxGroups = checkboxGroups.map(function(filterValues) {
        return filterValues.map(function(filterValue) {
            // также чекать фильтр в зависимости от значения в роуте, например: /rent/alupka
            var isChecked = route[filterName] && route[filterName].indexOf(filterValue) > -1;

            return {
                checked : query[filterName] ?
                    (Array.isArray(query[filterName]) ? query[filterName] : [query[filterName]])
                        .indexOf(filterValue) > -1 :
                    isChecked,
                text : settings.view[filterValue] || filterValue,
                val : filterValue
            };
        }, this);
    }, this);

    return [
        {
            elem : 'caption',
            content : [
                settings.caption,
                { block : 'filters', elem : 'reset', targetFilterName : filterName }
            ]
        },
        this.getCheckboxGroup(filterName, checkboxGroups)
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_typeOfRoom.bemtree */


/* begin: ../../site.blocks/filters/_set/filters_set_taxi.bemtree */
block('filters').mod('set', 'taxi')(function() {
    this.ctx.filterSets = {
        default : {
            main : [
                'departurePlace'
            ]
        }
    };

    return applyNext();
});

/* end: ../../site.blocks/filters/_set/filters_set_taxi.bemtree */


/* begin: ../../site.blocks/filters/__item/_type/filters__item_type_departurePlace.bemtree */
/* global model */
block('filters').elem('item').elemMod('type', 'departurePlace').content()(function() {
    var query = this._query,
        filterName = this.ctx.elemMods.type,
        values = model.types.departurePlace.values,
        isRadioBox = [''].concat(Object.keys(values)).indexOf(query[filterName] || '') > -1,
        settings = {
            caption : model.types.departurePlace.caption,
            values : Object.keys(values),
            view : Object.keys(values).reduce(function(prev, key) {
                prev[key] = values[key];
                return prev;
            }, {})
        };

    return [
        {
            elem : 'caption',
            content : settings.caption
        },
        isRadioBox ?
            this.getRadioButtonGroup(filterName, settings.values.map(function(filterValue) {
                return {
                    checked : query[filterName] !== undefined ?
                        query[filterName] === String(filterValue) :
                        filterValue === '',
                    text : settings.view[filterValue] || filterValue,
                    val : filterValue
                };
            })) : this.getInput(filterName, query[filterName] || '', '')
    ];
});

/* end: ../../site.blocks/filters/__item/_type/filters__item_type_departurePlace.bemtree */


/* begin: ../../site.blocks/sort/_set/sort_set_active.bemtree */
block('sort').mod('set', 'active').content()(function() {
    var query = this._query;

    return [
        { elem : 'caption', content : 'Сортировать по: ' },
        {
            block : 'radio-group',
            mods : { theme : 'islands', size : 's', type : 'button' },
            name : 'sortBy',
            options : ['priceHourly', 'dateOfUpdating'].map(function(value) {
                return {
                    val : value,
                    text : ({
                        dateOfUpdating : 'дате обновления',
                        priceHourly : 'цене'
                    })[value],
                    checked : value === query.sortBy
                };
            })
        },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../site.blocks/sort/_set/sort_set_active.bemtree */


/* begin: ../../site.blocks/sort/_set/sort_set_excursions.bemtree */
block('sort').mod('set', 'excursions').content()(function() {
    var query = this._query;

    return [
        { elem : 'caption', content : 'Сортировать по: ' },
        {
            block : 'radio-group',
            mods : { theme : 'islands', size : 's', type : 'button' },
            name : 'sortBy',
            options : ['priceExcursions', 'durationMin', 'dateOfUpdating'].map(function(value) {
                return {
                    val : value,
                    text : ({
                        dateOfUpdating : 'дате обновления',
                        durationMin : 'длительности',
                        priceExcursions : 'цене'
                    })[value],
                    checked : value === query.sortBy
                };
            })
        },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../site.blocks/sort/_set/sort_set_excursions.bemtree */


/* begin: ../../site.blocks/sort/_set/sort_set_hotels.bemtree */
block('sort').mod('set', 'hotels').content()(function() {
    var query = this._query;

    return [
        { elem : 'caption', content : 'Сортировать по: ' },
        {
            block : 'radio-group',
            mods : { theme : 'islands', size : 's', type : 'button' },
            name : 'sortBy',
            options : ['prices', 'dateOfUpdating'].map(function(value) {
                return {
                    val : value,
                    text : ({
                        dateOfUpdating : 'дате обновления',
                        prices : 'цене'
                    })[value],
                    checked : value === query.sortBy
                };
            })
        },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../site.blocks/sort/_set/sort_set_hotels.bemtree */


/* begin: ../../site.blocks/sort/_set/sort_set_rent.bemtree */
block('sort').mod('set', 'rent').content()(function() {
    var query = this._query;

    return [
        { elem : 'caption', content : 'Сортировать по: ' },
        {
            block : 'radio-group',
            mods : { theme : 'islands', size : 's', type : 'button' },
            name : 'sortBy',
            options : ['priceRent', 'dateOfUpdating'].map(function(value) {
                return {
                    val : value,
                    text : ({
                        dateOfUpdating : 'дате обновления',
                        priceRent : 'цене'
                    })[value],
                    checked : value === query.sortBy
                };
            })
        },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../site.blocks/sort/_set/sort_set_rent.bemtree */


/* begin: ../../site.blocks/sort/_set/sort_set_rooms.bemtree */
block('sort').mod('set', 'rooms').content()(function() {
    return [
        { elem : 'caption', content : 'Сортировать по цене' },

        { block : 'sort', elem : 'control', elemMods : { type : 'order' } }
    ];
});

/* end: ../../site.blocks/sort/_set/sort_set_rooms.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/content/_page/content_page_compare.bemtree */
block('content').mod('page', 'compare').content()(function() {
    return {
        block : 'compare',
        mods : {
            diff : !!this._query.diffOnly || undefined,
            empty : (!Array.isArray(this._query.id) || this._query.id.length < 2 || this._data.length < 2) || undefined
        }
    };
});

/* end: ../../libs/rest-trip-core/common.blocks/content/_page/content_page_compare.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/compare/compare.bemtree */
/* global model, router */
block('compare').content()(function() {
    var data = this._data,
        compareParams = this.ctx.compareParams || [],
        diffCompareParams;

    // фильтрация отсутствующих во всех сравниваемых документах парамеров
    compareParams = compareParams.filter(function(paramName) {
        return data.reduce(function(prev, document) {
            return prev ? prev : document[paramName.name || paramName] !== undefined;
        }, false);
    });

    // Формирование массивов из значений используемых в документах
    compareParams = compareParams.map(function(param) {
        var paramName = param.name || param;

        if(model.types[paramName].type !== 'array' || !model.types[paramName].values) return param;

        param = typeof param === 'object' ? param : { name : param };

        param.values = data.reduce(function(prev, document) {
            var docValues = [].concat(document[paramName]).filter(function(v) { return !!v; });

            return prev.concat(docValues.filter(function(paramValue) {
                return prev.indexOf(paramValue) === -1;
            }));
        }, []);

        // Сортировка значений по порядку в модели
        param.values.sort(function(a, b) {
            return model.types[paramName].values[a] > model.types[paramName].values[b];
        });

        return param;
    });

    // массив имен параметров с одинаковыми значчениями во всех документах
    diffCompareParams = compareParams.filter(function(param) {
        var paramName = param.name || param;

        return Object.keys(data.reduce(function(prev, document) {
            prev[param.values || param.get ?
                JSON.stringify(document[paramName]) :
                String(document[paramName])] = paramName;

            return prev;
        }, {})).length === 1;
    });

    compareParams = ['images', 'title', 'delete'].concat(compareParams);

    return [
        { elem : 'message' }
    ].concat(!this.ctx.mods || !this.ctx.mods.empty ? [
            { elem : 'diff' },
            {
                elem : 'inner',
                content : {
                    elem : 'table',
                    content : compareParams.map(function(param) {
                        var paramName = param.name || param;

                        return {
                            block : 'compare',
                            elem : 'row',
                            elemMods : {
                                header : ['title', 'images', 'delete'].indexOf(param) > -1,
                                noDiff : diffCompareParams.indexOf(param) > -1
                            },
                            content : [
                                {
                                    block : 'compare',
                                    elem : 'cell',
                                    content : ['title', 'images', 'delete'].indexOf(paramName) > -1 ? '' :
                                        param.caption || model.projectTypes[paramName] &&
                                            model.projectTypes[paramName].caption || paramName
                                }
                            ].concat(data.map(function(document, colIndex) {
                                    return {
                                        block : 'compare',
                                        elem : 'cell',
                                        elemMods : { col : colIndex + 1 },
                                        content : [
                                            paramName === 'images' && document[paramName] !== undefined &&
                                                (document[paramName][0].orig || document[paramName][0].M) ?
                                                ({
                                                    block : 'link',
                                                    url : router.build(document),
                                                    content : {
                                                        tag : 'img',
                                                        attrs : {
                                                            alt : document[paramName][0].alt,
                                                            src : document[paramName][0].M ||
                                                                document[paramName][0].orig,
                                                            title : document[paramName][0].title
                                                        }
                                                    }
                                                }) : paramName === 'delete' ?
                                                ({
                                                    block : 'compare',
                                                    elem : 'delete-wrapper',
                                                    content : {
                                                        block : 'action-button',
                                                        js : {
                                                            id : 'action-button_action_compareDelete-' + document.id,
                                                            category : this._route.category,
                                                            live : false,
                                                            targetId : document.id
                                                        },
                                                        mods : { action : 'compareDelete', hidden : true, size : 's' },
                                                        mix : { block : 'compare', elem : 'delete' },
                                                        content : 'Убрать из сравнения'
                                                    }
                                                }) :
                                                typeof param === 'object' ?
                                                    param.values ?
                                                        param.values.map(function(value) {
                                                            return document[paramName] &&
                                                                document[paramName].indexOf(value) > -1 ?
                                                                model.types[paramName].values[value] :
                                                                '-';
                                                        }).join('<br>') :
                                                        param.get ?
                                                            param.get(document) || '—' :
                                                            document[param.name] || '—' :
                                                    (paramName === 'title' ? {
                                                        block : 'link',
                                                        url : router.build(document),
                                                        content : document[paramName]
                                                    } : (model.types[paramName].values ?
                                                        model.types[paramName].values[document[paramName]] :
                                                        document[paramName]) || '—')
                                        ]
                                    };
                                }, this))
                        };
                    }, this)
                }
            }
        ] : []);
});

/* end: ../../libs/rest-trip-core/common.blocks/compare/compare.bemtree */


/* begin: ../../site.blocks/compare/compare.bemtree */
/* global model */
block('compare').content()(function() {
    var getFullAddress = function(document) {
            var addr = document.address;

            return addr && (addr.custom || [
                addr.city, addr.district, addr.street, addr.house, addr.flat
            ].filter(function(v) { return v; }).join(', '));
        },
        getPrice = function(document, filter) {
            var values = document.prices && document.prices.filter(filter).map(function(price) {
                return applyCtx({
                    block : 'price', mods : { currency : 'RUR', oneline : true }, price : price
                });
            });

            return values && values.length ? values : undefined;
        };

    /**
     * Набор параметров для сравнения
     * @type {Array}
     */
    this.ctx.compareParams = ({
        hotels : [
        /**
         * {String|Object} param Описание параметра
         * {String} [param.caption] Переопредедление заголовка поля
         * {String} param.name Поле в модели/документе
         * {Function} [param.get] Функция для вывода более сложных значений
         */
            { caption : 'Цена за номер стандарт', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.target === 'standartSuite';
                });
            } },
            { caption : 'Цена за полулюкс', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.target === 'juniorSuite';
                });
            } },
            { caption : 'Цена за люкс', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.target === 'luxurySuite';
                });
            } },
            { caption : 'Цена за vip', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.target === 'vipSuite';
                });
            } },
            { caption : 'этажей', name : 'numberOfFloors' },
            { caption : 'комнат', name : 'numberOfRooms' },
            { caption : 'мест', name : 'numberOfSeats' },
            'features',
            'typeOfHotel',
            { name : 'address', get : getFullAddress }
        ],
        rent : [
            { caption : 'Цена в сутки', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.period === 'day';
                });
            } },
            { caption : 'Цена в месяц', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.period === 'month';
                });
            } },
            'areaOfAll',
            'areaOfKitchen',
            'areaOfLiving',
            'floor',
            { caption : 'этажей', name : 'numberOfFloors' },
            { caption : 'комнат', name : 'numberOfRooms' },
            { caption : 'мест', name : 'numberOfSeats' },
            'features',
            'typeOfDistrict',
            'typeOfRent',
            'viewFromWindow',
            { name : 'address', get : function(document) {
                var addr = document.address;

                return addr ?
                    [addr.city, addr.street].filter(function(v) { return !!v; }).join(', ') :
                    undefined;
            } }
        ],
        rooms : [
            { caption : 'Цена в сутки', name : 'prices', get : function(document) {
                return getPrice(document, function(price) {
                    return (price.min || price.max) && price.period === 'day';
                });
            } },
            'areaOfAll',
            'areaOfKitchen',
            'areaOfLiving',
            'floor',
            { caption : 'комнат', name : 'numberOfRooms' },
            { caption : 'мест', name : 'numberOfSeats' },
            { caption : 'спальные места', name : 'berths', get : function(document) {
                return document.berths && document.berths.map(function(berth) {
                    return model.types.berthType.values[berth.type] + ': ' + (berth.count || 1);
                }).join('<br>');
            } },
            'features',
            'typeOfRoom',
            'viewFromWindow',
            'hotels',
            { name : 'address', get : getFullAddress }
        ]
    })[this._route.category || this._data[0] && this._data[0].categories && this._data[0].categories[0]];

    return applyNext();
});

/* end: ../../site.blocks/compare/compare.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/compare/__diff/compare__diff.bemtree */
block('compare').elem('diff').content()(function() {
    return [
        {
            block : 'radio-group',
            mods : { size : 'm', theme : 'islands', type : 'button' },
            options : ['all', 'diff'].map(function(val) {
                return {
                    checked : !!this._query.diffOnly ? val === 'diff' : val === 'all',
                    text : ({
                        all : 'Все параметры',
                        diff : 'только отличия'
                    })[val] || val,
                    val : val
                };
            }, this)
        },
        {
            block : 'action-button',
            js : { category : this._route.category, live : false },
            mods : { action : 'compareClear', hidden : true, size : 'm' },
            mix : { block : 'compare', elem : 'deleteAll' },
            content : 'Очистить список сравнения'
        }
    ];
});

/* end: ../../libs/rest-trip-core/common.blocks/compare/__diff/compare__diff.bemtree */


/* begin: ../../libs/rest-trip-core/common.blocks/compare/__message/compare__message.bemtree */
block('compare').elem('message').content()('Выбрано недостаточно объектов для сравнения (требуется 2 и более)');

/* end: ../../libs/rest-trip-core/common.blocks/compare/__message/compare__message.bemtree */


/* begin: ../../site.blocks/content/_page/content_page_contacts.bemtree */
block('content').mod('page', 'contacts').content()(function() {
    var document = this._data && this._data[0];

    return [
        {
            tag: 'h1',
            content: document && document.title
        },
        {
            block: 'contacts',
            content: [
                {
                    elem: 'col',
                    elemMods : { num : 1 },
                    content: document && Array.isArray(document.owners) &&
                        document.owners.map(function(contact) {
                            return {
                                block : 'visiting-card',
                                mods : { microdata : 'person' },
                                data : contact
                            };
                        })
                },
                {
                    elem: 'col',
                    elemMods : { num : 2 },
                    content: [
                        {
                            content : [
                                'Напишите нам на email: ',
                                {
                                    block : 'link',
                                    url : 'mailto:info@rest-trip.com',
                                    content : 'info@rest-trip.com'
                                },
                                { tag : 'br' },
                                'или заполните контактную форму.'
                            ]
                        },
                        { tag : 'br' },
                        { content : 'Мы обязательно свяжемся с вами в течении дня и ответим на ваши вопросы.' },
                        { tag : 'br' },
                        {
                            block : 'form',
                            js : { name : 'feedback' },
                            mods : { saveable : true, type : 'sendmail' },
                            subject : 'rest-trip обратная связь'
                        }
                    ]
                }
            ]
        }
    ];
});

/* end: ../../site.blocks/content/_page/content_page_contacts.bemtree */


/* begin: ../../site.blocks/content/_page/content_page_index.bemtree */
block('content').mod('page', 'index').content()(function() {
    return [
        {
            elem : 'text',
            content : this._data && this._data[0] && this._data[0].content
        },
        this._data[0] && Array.isArray(this._data[0].citySnippets) && this._data[0].citySnippets.map(function(snippet) {
            return {
                block: 'promo-snippet',
                url: snippet.uri,
                src: snippet.image && (snippet.image.M || snippet.image.XL || snippet.image.orig),
                title: snippet.title,
                faq: snippet.faq
            };
        })
    ];
});

/* end: ../../site.blocks/content/_page/content_page_index.bemtree */


/* begin: ../../site.blocks/content/_page/content_page_partners.bemtree */
/* jshint maxlen:100500 */
block('content').mod('page', 'partners').content()(function() {
    var document = this._data && this._data[0];

    return [
        {
            tag : 'h1',
            content : document && document.title
        },
        {
            block : 'contacts',
            content : [
                {
                    elem : 'col',
                    elemMods : { num : 1 },
                    content : {
                        block : 'content',
                        elem : 'text',
                        content : document && document.content
                    }
                },
                {
                    elem : 'col',
                    elemMods : { num : 2 },
                    content : {
                        block : 'form',
                        js : { name : 'feedback' },
                        mods : { saveable : true, type : 'sendmail' },
                        subject : 'rest-trip партнерам'
                    }
                }
            ]
        }
    ];
});

/* end: ../../site.blocks/content/_page/content_page_partners.bemtree */
