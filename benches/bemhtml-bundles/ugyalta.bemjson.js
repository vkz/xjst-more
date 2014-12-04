({
    block: 'page',
    title: 'Южная газета',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' },
        { elem: 'css', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css' },
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [
        { elem: 'js', url: '_index.js' }
        // ,
        // { elem: 'js', url: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js' }
    ],
    content: [
        {
            block: 'header',
            content: [
                {
                    block: 'nav',
                    mods: { type: 'main' },
                    content: [
                        {
                            title: 'Главная'
                        },
                        {
                            title: 'Выпуски',
                            url: '#vypuski'
                        },
                        {
                            title: 'Новости',
                            url: '#новости'
                        },
                        {
                            title: 'О газете',
                            url: '#о-газете'
                        },
                        {
                            title: 'Объявления',
                            url: '#Объявления'
                        },
                        {
                            title: 'Реклама',
                            url: '#Реклама'
                        },
                        {
                            title: 'Опросы',
                            url: '#опросы'
                        },
                        {
                            title: 'Фоторепортажи',
                            url: '#фото'
                        },
                        {
                            title: 'Форум',
                            url: '#форум'
                        }
                    ].map(function(item) {
                        return [item.url ? {
                            block: 'link',
                            url: item.url,
                            mix: { block: 'nav', elem: 'item' },
                            content: item.title
                        } : {
                            elem: 'item',
                            elemMods: { state: 'current' },
                            content: item.title
                        },' '];
                    })
                },
                {
                    block: 'logo',
                    content: ' '
                },
                {
                    block: 'slogan',
                    content: 'информационно-рекламный еженедельник Крымского полуострова'
                },
                {
                    block: 'nav',
                    mods: { type: 'topics' },
                    content: [
                        {
                            title: 'Политика',
                            url: '#politica'
                        },
                        {
                            title: 'Экономика',
                            url: '#экономика'
                        },
                        {
                            title: 'Общество',
                            url: '#новости'
                        },
                        {
                            title: 'Культура',
                            url: '#Культура'
                        },
                        {
                            title: 'Спорт',
                            url: '#спорт'
                        }
                    ].map(function(item) {
                        return [item.url ? {
                            block: 'link',
                            url: item.url,
                            mix: { block: 'nav', elem: 'item' },
                            content: item.title
                        } : {
                            elem: 'item',
                            content: item.title
                        }, ' '];
                    })
                },
                {
                    block: 'nav',
                    mods: { type: 'geography' },
                    content: [
                        {
                            title: 'Мир',
                            url: '#world'
                        },
                        {
                            title: 'Россия',
                            url: '#russia'
                        },
                        {
                            title: 'Крым',
                            url: '#crimea'
                        },
                        {
                            title: 'Ялта',
                            url: '#yalta'
                        },
                        {
                            title: 'Алушта',
                            url: '#alushta'
                        },
                        {
                            title: 'Гурзуф',
                            url: '#alushta'
                        },
                        {
                            title: 'Массандра',
                            url: '#alushta'
                        },
                        {
                            title: 'Ливадия',
                            url: '#alushta'
                        },
                        {
                            title: 'Гаспра',
                            url: '#alushta'
                        },
                        {
                            title: 'Кореиз',
                            url: '#alushta'
                        },
                        {
                            title: 'Симеиз',
                            url: '#alushta'
                        },
                        {
                            title: 'Алупка',
                            url: '#alushta'
                        },
                        {
                            title: 'Форос',
                            url: '#alushta'
                        }
                    ].map(function(item) {
                        return [item.url ? {
                            block: 'link',
                            url: item.url,
                            mix: { block: 'nav', elem: 'item' },
                            content: item.title
                        } : {
                            elem: 'item',
                            content: item.title
                        }, ' '];
                    })
                }
            ]
        },
        {
            block: 'content',
            content: [
                {
                    block: 'row',
                    content: [
                        {
                            cls: 'col-md-8',
                            content: [
                                [
                                    {
                                        title: 'Сергей Карнаух: «Чиновники обязаны работать для людей»',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/big/1397793597.jpg',
                                        content: 'С рабочей поездкой побывал в спальных районах города и.о. мэра Ялты Сергей Карнаух. Он проконтролировал деятельность Управления жилищно-коммунального хозяйства, представители которого заняты текущим ремонтом жилфонда и благоустройством придомовых территорий...'
                                    },
                                    {
                                        title: '1944 – 2014: ялтинцы говорят «нет» фашизму, как и 70 лет назад!',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/small/1397793627.jpg',
                                        content: '16 апреля Ялта традиционно отметила годовщину освобождения города от немецко-фашистских захватчиков. В этом году праздничные мероприятия, посвященные юбилейной дате, начались с торжественного митинга в чаше у Вечного огня на мемориале Холм Славы...'
                                    },
                                    {
                                        title: 'Парламент Крыма единогласно поддержал новую Конституцию Республики',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/small/1397793749.jpg',
                                        content: 'Парламент Крыма единогласно поддержал новую Конституцию Республики    11 апреля 2014 года на внеочередном пленарном заседании Государственного Совета Республики Крым принята Конституция Республики Крым. Самый главный для полуострова и всех крымчан документ единогласно поддержали 88 депутатов...'
                                    },
                                    {
                                        title: '«Забытые образы Кореиза»',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/small/1397794436.jpg',
                                        content: 'В Кореизской библиотеке-музее состоялась встреча с Г.Г. Филатовой, ученым секретарем Алупкинского дворца - музея, заслуженным работником культуры Крыма, лауреатом премии АР Крым за серию научно-художественных изданий об Алупкинском дворцово-парко...'
                                    },
                                    {
                                        title: 'Память жива',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/small/1397794478.jpg',
                                        content: '16 апреля в Кореизе у памятника погибшим воинам состоялся митинг, посвященный 70-летию освобождения Кореиза от немецко-фашистских захватчиков....'
                                    },
                                    {
                                        title: 'Слава героям-освободителям!',
                                        url: '#',
                                        thumb: 'http://ugyalta.com/iphoto/small/1397794524.jpg',
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
                        },
                        {
                            cls: 'col-md-3 col-md-offset-1',
                            content: [
                                {
                                    block: 'board',
                                    content: [
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'item',
                                                    content: 'Мопед не мой, я просто разместил объяву'
                                                },
                                                {
                                                    elem: 'item',
                                                    content: 'Мопед не мой, я просто разместил объяву'
                                                },
                                                {
                                                    elem: 'item',
                                                    content: 'Мопед не мой, я просто разместил объяву'
                                                },
                                                {
                                                    block: 'dropdown',
                                                    mods: { switcher: 'button', theme : 'normal', size: 'm' },
                                                    switcher: 'Подать объявление',
                                                    popup: {
                                                        block: 'form',
                                                        content: [
                                                            {
                                                                block: 'input',
                                                                mods: {
                                                                    theme: 'normal',
                                                                    size: 'm'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'title',
                                                    content: 'Работа в Ялте'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        'предлагаю',
                                                        'ищу'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'title',
                                                    content: 'Недвижимость'
                                                },
                                                {
                                                    elem: 'subtitle',
                                                    content: 'продам'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        '1 ком. квартиры',
                                                        '2 ком. квартиры',
                                                        '3 ком. и более квартиры',
                                                        'дома',
                                                        'земельные участки',
                                                        'гаражи',
                                                        'коммерческая недвижимость'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                },
                                                {
                                                    elem: 'subtitle',
                                                    content: 'куплю'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        '1 ком. квартиры',
                                                        '2 ком. квартиры',
                                                        '3 ком. и более квартиры',
                                                        'дома',
                                                        'земельные участки',
                                                        'гаражи',
                                                        'коммерческая недвижимость'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'title',
                                                    content: 'Услуги'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        'строительные',
                                                        'медицинские',
                                                        'учебные',
                                                        'разное'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'title',
                                                    content: 'Аренда'
                                                },
                                                {
                                                    elem: 'subtitle',
                                                    content: 'сдам'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        '1 ком. квартиры',
                                                        '2 ком. квартиры',
                                                        '3 ком. и более квартиры',
                                                        'дома',
                                                        'земельные участки',
                                                        'гаражи',
                                                        'коммерческая недвижимость'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                },
                                                {
                                                    elem: 'subtitle',
                                                    content: 'сниму'
                                                },
                                                {
                                                    block: 'list',
                                                    content: [
                                                        '1 ком. квартиры',
                                                        '2 ком. квартиры',
                                                        '3 ком. и более квартиры',
                                                        'дома',
                                                        'земельные участки',
                                                        'гаражи',
                                                        'коммерческая недвижимость'
                                                    ].map(function(item) {
                                                        return {
                                                            elem: 'item',
                                                            content: {
                                                                block: 'link',
                                                                url: '#' + item,
                                                                content: item
                                                            }
                                                        };
                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            elem: 'section',
                                            content: [
                                                {
                                                    elem: 'title',
                                                    content: {
                                                        block: 'link',
                                                        url: '#change',
                                                        content: 'Обмен'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer',
            content: {
                block: 'row',
                content: [
                    {
                        cls: 'col-md-3',
                        content: [
                            'Отели',
                            'Мини-гостиницы',
                            'Санатории',
                            'Пансионаты'
                        ].map(function(item) {
                            return [
                                {
                                    block: 'link',
                                    url: '#' + item,
                                    content: item
                                },
                                { tag: 'br' }
                            ];
                        })
                    },
                    {
                        cls: 'col-md-3',
                        content: [
                            'Кафе',
                            'Столовые',
                            'Рестораны',
                            'Бары'
                        ].map(function(item) {
                            return [
                                {
                                    block: 'link',
                                    url: '#' + item,
                                    content: item
                                },
                                { tag: 'br' }
                            ];
                        })
                    },
                    {
                        cls: 'col-md-3',
                        content: [
                            'Концерты',
                            'Спектакли',
                            'Фильмы',
                            'Фестивали'
                        ].map(function(item) {
                            return [
                                {
                                    block: 'link',
                                    url: '#' + item,
                                    content: item
                                },
                                { tag: 'br' }
                            ];
                        })
                    },
                    {
                        cls: 'col-md-3',
                        content: [
                            'Сфера услуг',
                            'Развлечения',
                            'Красота и здоровье',
                            'Для детей и родителей'
                        ].map(function(item) {
                            return [
                                {
                                    block: 'link',
                                    url: '#' + item,
                                    content: item
                                },
                                { tag: 'br' }
                            ];
                        })
                    }
                ]
            }
        }
    ]
})
