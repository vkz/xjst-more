({
    block: 'page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        // { elem: 'css', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' },
        // { elem: 'css', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css' },
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [
        { elem: 'js', url: '_index.js' }
        // ,
        // { elem: 'js', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js' }
    ],
    mods: { theme: 'islands' },
    content: [
        {
            block: 'nadejda',
            content: [
                {
                    block: 'row',
                    content: [
                        {
                            cls: 'col-md-4',
                            content: [
                                {
                                    block: 'logo',
                                    content: 'ЛОГОТИП'
                                },
                                {
                                    block: 'nav',
                                    content: [
                                        {
                                            elem: 'item',
                                            content: {
                                                block: 'link',
                                                url: '#useful',
                                                content: 'Полезная информация'
                                            }
                                        },
                                        {
                                            elem: 'item',
                                            content: {
                                                block: 'link',
                                                url: '#contacts',
                                                content: 'Контакты'
                                            }
                                        }
                                    ]
                                },
                                {
                                    block: 'filters',
                                    content: [
                                        {
                                            block: 'radio-group',
                                            name: 'type',
                                            mods: {
                                                theme: 'islands',
                                                type: 'button',
                                                size: 'm'
                                            },
                                            mix: { block: 'filters', elem: 'type' },
                                            options: [
                                                { val: 'flats', text: 'Квартиры', checked: true },
                                                { val: 'homes', text: 'Дома'},
                                                { val: 'lands', text: 'Участки'},
                                                { val: 'commercial', text: 'Коммерческая'}
                                                //, { val: 'investment', text: 'Инвестиционные проекты'}
                                            ]
                                        },
                                        {
                                            block: 'filter',
                                            mods: { type: 'flats' },
                                            content: [
                                                {
                                                    elem: 'row',
                                                    content: [
                                                        'Комнат ',
                                                        [1, 2, 3, 4, '5+'].map(function(n) {
                                                            return {
                                                                block: 'checkbox',
                                                                mods: {
                                                                    theme: 'islands',
                                                                    size: 'm',
                                                                    type: 'button'
                                                                },
                                                                // TODO: уточнить название микса
                                                                mix: { block: 'filter', elem: 'button' },
                                                                val: n,
                                                                name: 'rooms',
                                                                text: n
                                                            };
                                                        })
                                                    ]
                                                },
                                                {
                                                    elem: 'row',
                                                    content: [
                                                        'Площадь ',
                                                        [100, 150, 200, '250+'].map(function(n) {
                                                            return {
                                                                block: 'checkbox',
                                                                mods: {
                                                                    theme: 'islands',
                                                                    size: 'm',
                                                                    type: 'button'
                                                                },
                                                                // TODO: уточнить название микса
                                                                mix: { block: 'filter', elem: 'button' },
                                                                val: n,
                                                                name: 'area',
                                                                text: n
                                                            };
                                                        }),
                                                        ' м', { tag: 'sup', content: 2 }
                                                    ]
                                                },
                                                {
                                                    elem: 'row',
                                                    content: [
                                                        ['под отделку', 'с ремонтом', 'без ремонта'].map(function(n) {
                                                            return {
                                                                block: 'checkbox',
                                                                mods: {
                                                                    theme: 'islands',
                                                                    size: 'm',
                                                                    type: 'button'
                                                                },
                                                                // TODO: уточнить название микса
                                                                mix: { block: 'filter', elem: 'button' },
                                                                val: n,
                                                                name: 'state',
                                                                text: n
                                                            };
                                                        })
                                                    ]
                                                },
                                                {
                                                    elem: 'row',
                                                    content: [
                                                        'Этажность ',
                                                        [1, 2, 3, 5, '10+'].map(function(n) {
                                                            return {
                                                                block: 'checkbox',
                                                                mods: {
                                                                    theme: 'islands',
                                                                    size: 'm',
                                                                    type: 'button'
                                                                },
                                                                // TODO: уточнить название микса
                                                                mix: { block: 'filter', elem: 'button' },
                                                                val: n,
                                                                name: 'state',
                                                                text: n
                                                            };
                                                        })
                                                    ]
                                                },
                                                {
                                                    elem: 'row',
                                                    content: [
                                                        'Цена ',
                                                        ['50т', '100т', '300т', '800т', '2млн+'].map(function(n) {
                                                            return {
                                                                block: 'checkbox',
                                                                mods: {
                                                                    theme: 'islands',
                                                                    size: 'm',
                                                                    type: 'button'
                                                                },
                                                                // TODO: уточнить название микса
                                                                mix: { block: 'filter', elem: 'button' },
                                                                val: n,
                                                                name: 'state',
                                                                text: n
                                                            };
                                                        })
                                                    ]
                                                },
                                                {
                                                    elem: 'row',
                                                    content: {
                                                        block: 'checkbox',
                                                        mods: {
                                                            theme: 'islands',
                                                            size: 'm',
                                                            type: 'button'
                                                        },
                                                        // TODO: уточнить название микса
                                                        mix: { block: 'filter', elem: 'button' },
                                                        val: 'new',
                                                        name: 'state',
                                                        text: 'новострой'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'footer',
                                    content: [
                                        {
                                            content: [
                                                '+380 95 881 2868',
                                                { tag: 'br' },
                                                '+380 97 752 1670'
                                            ]
                                        },
                                        {
                                            content: {
                                                block: 'link',
                                                url: 'mailto:nadejda.yalta@gmail.com',
                                                content: 'nadejda.yalta@gmail.com'
                                            }
                                        },
                                        {
                                            content: 'Адрес офиса: Крым, г.&nbsp;Ялта, ул.&nbsp;Ф.&nbsp;Рузвельта, гост.&nbsp;«Бристоль», офис&nbsp;201'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            block: 'content',
                            cls: 'col-md-8',
                            content: [
                                [
                                    {
                                        title: 'Срочная продажа квартиры, в элитном районе Ялты!',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1265280747%D0%B2%D0%B8%D0%BB%D0%BB%D0%B0.JPG&w=222&h=222',
                                        content: 'С рабочей поездкой побывал в спальных районах города и.о. мэра Ялты Сергей Карнаух. Он проконтролировал деятельность Управления жилищно-коммунального хозяйства, представители которого заняты текущим ремонтом жилфонда и благоустройством придомовых территорий...'
                                    },
                                    {
                                        title: 'Дом в районе Массандры',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1265281504DSC_0302.jpg&w=222&h=222',
                                        content: '16 апреля Ялта традиционно отметила годовщину освобождения города от немецко-фашистских захватчиков. В этом году праздничные мероприятия, посвященные юбилейной дате, начались с торжественного митинга в чаше у Вечного огня на мемориале Холм Славы...'
                                    },
                                    {
                                        title: 'Гостиница в центре Гурзуфа',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1299234987IMG_0090.JPG&w=222&h=222',
                                        content: 'Парламент Крыма единогласно поддержал новую Конституцию Республики    11 апреля 2014 года на внеочередном пленарном заседании Государственного Совета Республики Крым принята Конституция Республики Крым. Самый главный для полуострова и всех крымчан документ единогласно поддержали 88 депутатов...'
                                    },
                                    {
                                        title: 'Элитная квартира в районе стадиона «Авангард». «Аэробуд»',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1303131099_DSC0193.JPG&w=222&h=222',
                                        content: 'В Кореизской библиотеке-музее состоялась встреча с Г.Г. Филатовой, ученым секретарем Алупкинского дворца - музея, заслуженным работником культуры Крыма, лауреатом премии АР Крым за серию научно-художественных изданий об Алупкинском дворцово-парко...'
                                    },
                                    {
                                        title: 'Продаётся мини гостиница в р-не п. Курпаты (готовый бизнес), инфроструктура VIP отеля «Пальмира Палас»',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1311240456IMGP5702.JPG&w=222&h=222',
                                        content: '16 апреля в Кореизе у памятника погибшим воинам состоялся митинг, посвященный 70-летию освобождения Кореиза от немецко-фашистских захватчиков....'
                                    },
                                    {
                                        title: 'Квартира в Гурзуфе VIP',
                                        url: '#',
                                        thumb: 'http://nadejda.biz.ua/wp-content/plugins/fresh-page/thirdparty/phpthumb/phpThumb.php?src=http://nadejda.biz.ua/wp-content/files_flutter/1305709687IMG_0424.jpg&w=222&h=222',
                                        content: '16 апреля – дата, которую каждый ялтинец знает с детства - день освобождения Ялты от немецко-фашистских захватчиков. В ночь на 16 апреля 1944 года наш город был полностью освобожден от оккупантов. Ежегодно в этот день в каждом уголке Ялты проходят п...'
                                    }
                                ].map(function(newsItem) {
                                    return {
                                        block: 'article',
                                        content: [
                                            {
                                                elem: 'title',
                                                content: {
                                                    block: 'link',
                                                    url: newsItem.url,
                                                    content: [
                                                        newsItem.thumb ? {
                                                            block: 'image',
                                                            url: newsItem.thumb,
                                                            mix: {
                                                                block: 'article',
                                                                elem: 'thumb'
                                                            }
                                                        } : '',
                                                        newsItem.title
                                                    ]
                                                }
                                            },
                                            {
                                                elem: 'content',
                                                content: newsItem.content
                                            }
                                        ]
                                    };
                                })
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})
