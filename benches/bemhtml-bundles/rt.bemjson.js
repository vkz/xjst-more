({
    "block": "page",
    "mods": {
        "category": "hotels"
    },
    "title": "Отели, гостиницы в Крыму / rest-trip — сервис для туриста в Крыму",
    "favicon": "/favicon.ico",
    "styles": [
        {
            "elem": "css",
            "url": "/static.css"
        }
    ],
    "scripts": {
        "elem": "js",
        "url": "/static.js"
    },
    "head": [
        "",
        {
            "elem": "meta",
            "attrs": {
                "property": "og:site_name",
                "content": "rest-trip — сервис для туриста в Крыму"
            }
        },
        {
            "elem": "meta",
            "attrs": {
                "property": "og:locale",
                "content": "ru_RU"
            }
        },
        {
            "elem": "meta",
            "attrs": {
                "property": "og:type",
                "content": "website"
            }
        },
        {
            "elem": "meta",
            "attrs": {
                "name": "viewport",
                "content": "width=920"
            }
        }
    ],
    "content": [
        {
            "block": "rt",
            "mods": {
                "view": "list"
            },
            "content": [
                {
                    "elem": "panel",
                    "elemMods": {
                        "pos": "first"
                    },
                    "content": [
                        {
                            "block": "logo",
                            "url": "/",
                            "mods": {}
                        },
                        {
                            "block": "service-name",
                            "mods": {},
                            "content": "Отели"
                        },
                        {
                            "block": "nav",
                            "mods": {},
                            "links": [
                                {
                                    "url": "/rent/",
                                    "title": "Жилье"
                                },
                                {
                                    "url": "/hotels/",
                                    "title": "Отели"
                                },
                                {
                                    "url": "/rooms/",
                                    "title": "Номера"
                                },
                                {
                                    "url": "/taxi/",
                                    "title": "Такси"
                                },
                                {
                                    "url": "/places/",
                                    "title": "Места"
                                },
                                {
                                    "url": "/excursions/",
                                    "title": "Экскурсии"
                                },
                                {
                                    "url": "/active/",
                                    "title": "Активный отдых"
                                },
                                "",
                                {
                                    "url": "/about/",
                                    "title": "О нас"
                                },
                                {
                                    "url": "/partners/",
                                    "title": "Партнерам"
                                },
                                {
                                    "url": "/contacts/",
                                    "title": "Контакты"
                                }
                            ],
                            "content": [
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/rent/",
                                            "content": "Жилье",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/rent/\",\"name\":\"Жилье\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": true
                                        },
                                        "content": "Отели"
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/hotels/\",\"name\":\"Отели\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/rooms/",
                                            "content": "Номера",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/rooms/\",\"name\":\"Номера\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/taxi/",
                                            "content": "Такси",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/taxi/\",\"name\":\"Такси\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/places/",
                                            "content": "Места",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/places/\",\"name\":\"Места\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/excursions/",
                                            "content": "Экскурсии",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/excursions/\",\"name\":\"Экскурсии\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/active/",
                                            "content": "Активный отдых",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/active/\",\"name\":\"Активный отдых\"}"
                                    }
                                ],
                                {
                                    "elem": "item",
                                    "elemMods": {
                                        "separator": true
                                    }
                                },
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/about/",
                                            "content": "О нас",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/about/\",\"name\":\"О нас\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/partners/",
                                            "content": "Партнерам",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/partners/\",\"name\":\"Партнерам\"}"
                                    }
                                ],
                                [
                                    {
                                        "elem": "item",
                                        "elemMods": {
                                            "active": false
                                        },
                                        "content": {
                                            "block": "link",
                                            "url": "/contacts/",
                                            "content": "Контакты",
                                            "mods": {}
                                        }
                                    },
                                    {
                                        "tag": "script",
                                        "attrs": {
                                            "type": "application/ld+json"
                                        },
                                        "content": "{\"@context\":\"http://schema.org/\",\"@type\":\"SiteNavigationElement\",\"url\":\"/contacts/\",\"name\":\"Контакты\"}"
                                    }
                                ]
                            ]
                        },
                        {
                            "block": "filters",
                            "mods": {
                                "set": "hotels"
                            },
                            "filterSets": {
                                "default": {
                                    "main": [
                                        "city",
                                        "typeOfHotel",
                                        "features"
                                    ]
                                }
                            },
                            "content": [
                                [
                                    {
                                        "block": "filters",
                                        "elem": "item",
                                        "elemMods": {
                                            "type": "city"
                                        },
                                        "mods": {},
                                        "content": [
                                            {
                                                "elem": "caption",
                                                "content": [
                                                    "Город",
                                                    {
                                                        "block": "icon",
                                                        "mods": {
                                                            "type": "reset"
                                                        },
                                                        "mix": {
                                                            "block": "filters",
                                                            "elem": "reset",
                                                            "js": {
                                                                "targetFilterName": "city"
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "block": "filters",
                                                "elem": "control",
                                                "elemMods": {
                                                    "type": "checkbox"
                                                },
                                                "content": [
                                                    {
                                                        "block": "checkbox-group",
                                                        "mods": {
                                                            "size": "m",
                                                            "theme": "islands"
                                                        },
                                                        "name": "city",
                                                        "options": [
                                                            {
                                                                "text": "Алупка",
                                                                "val": "alupka"
                                                            },
                                                            {
                                                                "text": "Алушта",
                                                                "val": "alushta"
                                                            },
                                                            {
                                                                "text": "Ялта",
                                                                "val": "yalta"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "filters",
                                        "elem": "item",
                                        "elemMods": {
                                            "type": "typeOfHotel"
                                        },
                                        "mods": {},
                                        "content": [
                                            {
                                                "elem": "caption",
                                                "content": [
                                                    "Тип отеля",
                                                    {
                                                        "block": "icon",
                                                        "mods": {
                                                            "type": "reset"
                                                        },
                                                        "mix": {
                                                            "block": "filters",
                                                            "elem": "reset",
                                                            "js": {
                                                                "targetFilterName": "typeOfHotel"
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "block": "filters",
                                                "elem": "control",
                                                "elemMods": {
                                                    "type": "checkbox"
                                                },
                                                "content": [
                                                    {
                                                        "block": "checkbox-group",
                                                        "mods": {
                                                            "size": "m",
                                                            "theme": "islands"
                                                        },
                                                        "name": "typeOfHotel",
                                                        "options": [
                                                            {
                                                                "text": "Отель",
                                                                "val": "hotel"
                                                            },
                                                            {
                                                                "text": "Мини-отель",
                                                                "val": "minihotel"
                                                            },
                                                            {
                                                                "text": "Мотель",
                                                                "val": "motel"
                                                            },
                                                            {
                                                                "text": "Гостевой дом",
                                                                "val": "guest-house"
                                                            },
                                                            {
                                                                "text": "Пансионат",
                                                                "val": "boarding-house"
                                                            },
                                                            {
                                                                "text": "Санаторий",
                                                                "val": "sanatorium"
                                                            },
                                                            {
                                                                "text": "Эллинг",
                                                                "val": "elling"
                                                            },
                                                            {
                                                                "text": "Туристическая база",
                                                                "val": "tourist-base"
                                                            },
                                                            {
                                                                "text": "Сруб",
                                                                "val": "log-house"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "filters",
                                        "elem": "item",
                                        "elemMods": {
                                            "type": "features"
                                        },
                                        "mods": {},
                                        "content": [
                                            {
                                                "elem": "caption",
                                                "content": [
                                                    "Удобства",
                                                    {
                                                        "block": "icon",
                                                        "mods": {
                                                            "type": "reset"
                                                        },
                                                        "mix": {
                                                            "block": "filters",
                                                            "elem": "reset",
                                                            "js": {
                                                                "targetFilterName": "features"
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "block": "filters",
                                                "elem": "control",
                                                "elemMods": {
                                                    "type": "checkbox"
                                                },
                                                "content": [
                                                    {
                                                        "block": "checkbox-group",
                                                        "mods": {
                                                            "size": "m",
                                                            "theme": "islands"
                                                        },
                                                        "name": "features",
                                                        "options": [
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    "Интернет"
                                                                ],
                                                                "val": "internet"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    "Парковка"
                                                                ],
                                                                "val": "parking"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    "Фитнес-центр"
                                                                ],
                                                                "val": "fitness"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    "Бассейн"
                                                                ],
                                                                "val": "pool"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    "Ресторан"
                                                                ],
                                                                "val": "restaurant"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "спа"
                                                                    },
                                                                    "Спа и оздоровление"
                                                                ],
                                                                "val": "spa"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "sauna",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "сауна"
                                                                    },
                                                                    "Сауна"
                                                                ],
                                                                "val": "sauna"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "brazier",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "мангал"
                                                                    },
                                                                    "Мангал"
                                                                ],
                                                                "val": "brazier"
                                                            },
                                                            {
                                                                "text": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "bathhouse",
                                                                            "color": "white"
                                                                        },
                                                                        "content": "баня"
                                                                    },
                                                                    "Баня"
                                                                ],
                                                                "val": "bathhouse"
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "mods": {}
                                            }
                                        ]
                                    }
                                ],
                                null
                            ]
                        }
                    ]
                },
                {
                    "elem": "panel",
                    "elemMods": {
                        "pos": "second"
                    },
                    "content": [
                        {
                            "block": "sort",
                            "mods": {
                                "set": "hotels"
                            },
                            "content": [
                                {
                                    "elem": "caption",
                                    "content": "Сортировать по: "
                                },
                                {
                                    "block": "radio-group",
                                    "mods": {
                                        "theme": "islands",
                                        "size": "s",
                                        "type": "button"
                                    },
                                    "name": "sortBy",
                                    "options": [
                                        {
                                            "val": "prices",
                                            "text": "цене",
                                            "checked": false
                                        },
                                        {
                                            "val": "dateOfUpdating",
                                            "text": "дате обновления",
                                            "checked": true
                                        }
                                    ]
                                },
                                {
                                    "block": "sort",
                                    "elem": "control",
                                    "elemMods": {
                                        "type": "order"
                                    },
                                    "mods": {},
                                    "content": {
                                        "block": "radio-group",
                                        "mods": {
                                            "theme": "islands",
                                            "size": "s",
                                            "type": "button"
                                        },
                                        "name": "sortOrder",
                                        "options": [
                                            {
                                                "val": "asc",
                                                "text": {
                                                    "block": "icon",
                                                    "mods": {
                                                        "type": "ascending"
                                                    },
                                                    "attrs": {
                                                        "title": "по возрастанию"
                                                    }
                                                },
                                                "checked": false
                                            },
                                            {
                                                "val": "desc",
                                                "text": {
                                                    "block": "icon",
                                                    "mods": {
                                                        "type": "descending"
                                                    },
                                                    "attrs": {
                                                        "title": "по убыванию"
                                                    }
                                                },
                                                "checked": true
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "block": "serp",
                            "js": {
                                "page": 1,
                                "totalFound": 59,
                                "totalPages": 6
                            },
                            "mods": {
                                "autoloading": true
                            },
                            "content": [
                                null,
                                [
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/baza-otdykha-evrika/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "801",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.67638,
                                                    "lon": 34.41005
                                                },
                                                "title": "База отдыха «Эврика»"
                                            },
                                            "elemMods": {
                                                "id": 801,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "custom": "Алушта",
                                                "point": {
                                                    "lat": 44.67638,
                                                    "lon": 34.41005
                                                }
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "dateOfCreating": "2014-11-29T14:21:01.664Z",
                                            "dateOfModifying": "2014-11-29T14:21:01.664Z",
                                            "dateOfUpdating": "2014-11-29T13:18:00.000Z",
                                            "description": "База отдыха \"Эврика\" — известный далеко за пределами Украины крымский курорт с высоким уровнем обслуживания, недорогим и различным по комфорту проживанием — расположена на самом берегу Черного моря, в живописном уголке Южного берега Крыма, восточнее Алушты.\r\n\r\nВечнозеленая растительность очищает и наполняет воздух целебными свойствами, чистое море, длинная полоса пляжей, живописные очертания горной гряды — все это делает \"Эврику\" отличным местом для полноценного отдыха, оздоровления, купания и развлечений. \r\n\r\nСобственный пляж и набережная более 500 метров, морской причал, спортивная площадка для игровых видов спорта, теннис, бильярд, дискотека, медпункт, магазин, кафе, бар, столовая: по заявкам катание на катерах, водные аттракционы, рыбалка, большой и малый конференц-залы, экскурсионное обслуживание, сауна, массаж, автостоянка.\r\n\r\nНа территории Базы отдыха работает столовая.\r\n",
                                            "features": [
                                                "internet",
                                                "parking",
                                                "restaurant",
                                                "sauna",
                                                "spa",
                                                "fitness"
                                            ],
                                            "id": 801,
                                            "images": [
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6df2_7301d86c_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6df2_7301d86c_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6df2_7301d86c_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df1_289b9c16_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df1_289b9c16_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df1_289b9c16_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df0_e95d5063_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df0_e95d5063_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6df0_e95d5063_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6dee_56cc99fa_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6dee_56cc99fa_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6dee_56cc99fa_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ded_9e661650_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ded_9e661650_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ded_9e661650_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6dea_c1688b95_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6dea_c1688b95_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6dea_c1688b95_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6de8_fee2b5bb_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6de8_fee2b5bb_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9090/254144581.6d/0_d6de8_fee2b5bb_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de7_9b46345e_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de7_9b46345e_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de7_9b46345e_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de3_f2e17c63_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de3_f2e17c63_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6de3_f2e17c63_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ddf_9b951fca_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ddf_9b951fca_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9814/254144581.6d/0_d6ddf_9b951fca_orig"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "slug": "baza-otdykha-evrika",
                                            "title": "База отдыха «Эврика»",
                                            "typeOfHotel": "tourist-base"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://img-fotki.yandex.ru/get/9809/254144581.6d/0_d6df2_7301d86c_orig"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "База отдыха «Эврика»"
                                                                },
                                                                "url": "/hotels/baza-otdykha-evrika/",
                                                                "content": "База отдыха «Эврика»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта. Туристическая база",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-801",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 801
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-801",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 801
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-801",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 801
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/baza-otdykha-evrika/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 801,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-801",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"База отдыха «Эврика»\"",
                                                                            "subject": "rest-trip: заказать \"База отдыха «Эврика»\"",
                                                                            "title": "Подать заявку на заказ (вариант 801)",
                                                                            "documentId": 801
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/krasivyj-trekhetazhnyj-dom-s-bassejnom-798/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "798",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.41713,
                                                    "lon": 34.03929
                                                },
                                                "title": "Красивый трехэтажный дом с бассейном"
                                            },
                                            "elemMods": {
                                                "id": 798,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "point": {
                                                    "lat": 44.41713,
                                                    "lon": 34.03929
                                                },
                                                "street": "ул. Нагорная"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-11-26T14:58:03.976Z",
                                            "dateOfModifying": "2014-11-29T12:12:47.101Z",
                                            "dateOfUpdating": "2014-11-25T12:28:00.000Z",
                                            "description": "Сдаются 8 номеров в трехэтажном доме. Два двухкомнатных номера и шесть однокомнатных.\r\n\r\nВокруг дома отличный ухоженный зеленый двор, с множеством деревьев и цветов. Большой красивый бассейн. Возле него можно отлично отдохнуть.\r\n\r\nНа первом этаже дома великолепная беседка. Можно пожарить шашлычок.\r\n\r\nДо центра минут десять пешком, до моря 20–25 минут. До парка минут десять пешком. Парковка авто возле дома\r\n\r\nВоспользуйтесь трансфером Симферополь– Алупка с ж/д вокзала и аэропорта. Приглашаем на очень интересные и познавательные экскурсии.\r\n",
                                            "features": [
                                                "balcony",
                                                "bathhouse",
                                                "hot-water",
                                                "parking"
                                            ],
                                            "id": 798,
                                            "images": [
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e47_96c01b4f_XL",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e47_96c01b4f_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e47_96c01b4f_XL"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e45_126e7693_XL",
                                                    "XL": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e45_126e7693_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e45_126e7693_XL"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e41_623c52db_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e41_623c52db_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e41_623c52db_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3e_aba1fcae_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3e_aba1fcae_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3e_aba1fcae_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3d_98699146_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3d_98699146_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3d_98699146_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e3b_be487e43_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e3b_be487e43_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9062/254144581.1d/0_d5e3b_be487e43_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3a_2a966302_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3a_2a966302_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e3a_2a966302_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e38_33ceddc2_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e38_33ceddc2_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e38_33ceddc2_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e37_fe03767a_orig",
                                                    "XL": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e37_fe03767a_orig",
                                                    "orig": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e37_fe03767a_orig"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "numberOfSuites": 8,
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "max": 2400,
                                                    "min": 1800,
                                                    "period": "day"
                                                }
                                            ],
                                            "slug": "krasivyj-trekhetazhnyj-dom-s-bassejnom-798",
                                            "title": "Красивый трехэтажный дом с бассейном",
                                            "typeOfHotel": "guest-house"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://img-fotki.yandex.ru/get/9828/254144581.1d/0_d5e47_96c01b4f_XL"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Красивый трехэтажный дом с бассейном"
                                                                },
                                                                "url": "/hotels/alushta/krasivyj-trekhetazhnyj-dom-s-bassejnom-798/",
                                                                "content": "Красивый трехэтажный дом с бассейном"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул. Нагорная. Гостевой дом",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-798",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 798
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-798",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 798
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-798",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 798
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/krasivyj-trekhetazhnyj-dom-s-bassejnom-798/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 798,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-798",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Красивый трехэтажный дом с бассейном\"",
                                                                            "subject": "rest-trip: заказать \"Красивый трехэтажный дом с бассейном\"",
                                                                            "title": "Подать заявку на заказ (вариант 798)",
                                                                            "documentId": 798
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/yalta/butik-otel-na-timiryazeva-729/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "729",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.49728,
                                                    "lon": 34.14699
                                                },
                                                "title": "Бутик-отель на Тимирязева"
                                            },
                                            "elemMods": {
                                                "id": 729,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Ялта",
                                                "house": "9",
                                                "point": {
                                                    "lat": 44.49728,
                                                    "lon": 34.14699
                                                },
                                                "street": "ул. Тимирязева"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "yalta",
                                            "dateOfCreating": "2014-10-31T17:05:35.225Z",
                                            "dateOfModifying": "2014-11-21T15:06:47.924Z",
                                            "dateOfUpdating": "2014-11-21T14:53:00.000Z",
                                            "description": "Бутик-Отель на Тимирязева расположен в спальном районе города Ялты, в 2 км от пляжа на черноморском побережье. Рядом с отелем расположен живописный парк. Пешая прогулка до стадиона “Авангард” займет 20 минут, а расстояние до водопада Учан-Су составляет 7 км, до знаменитого на весь Крым зоопарка «Сказка» — 2 км. На территории есть открытый бассейн, кафе, бар, бесплатная частная парковка, Wi-Fi. Кроме того, гости могут воспользоваться принадлежностями для барбекю и услугами прачечной.\r\n \r\nСтойка регистрации отеля работает круглосуточно.\r\n \r\nВ стоимость номера входит пропуск на пляж санатория «Черноморец». Работает трансфер отель-пляж-отель. Для отдыхающих, которые проживают в номерах категории люкс, предусмотрены гаражи и пропуска на пляж Отеля “Ялта-Интурист”",
                                            "features": [
                                                "hot-water",
                                                "internet",
                                                "brazier",
                                                "parking",
                                                "laundry",
                                                "restaurant"
                                            ],
                                            "id": 729,
                                            "images": [
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/15522/254144581.84/0_ea996_5db66253_M",
                                                    "orig": "http://img-fotki.yandex.ru/get/15522/254144581.84/0_ea996_5db66253_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/15565/254144581.84/0_ea99b_b7250b4_M",
                                                    "orig": "http://img-fotki.yandex.ru/get/15565/254144581.84/0_ea99b_b7250b4_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/16138/254144581.84/0_ea998_3d19e116_M",
                                                    "XL": "http://img-fotki.yandex.ru/get/16138/254144581.84/0_ea998_3d19e116_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/16138/254144581.84/0_ea998_3d19e116_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/15541/254144581.84/0_ea99c_9c630387_M",
                                                    "orig": "http://img-fotki.yandex.ru/get/15541/254144581.84/0_ea99c_9c630387_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/15480/254144581.84/0_ea997_86b136f6_M",
                                                    "orig": "http://img-fotki.yandex.ru/get/15480/254144581.84/0_ea997_86b136f6_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/17870/254144581.84/0_ea99a_3ef7d73c_M",
                                                    "XL": "http://img-fotki.yandex.ru/get/17870/254144581.84/0_ea99a_3ef7d73c_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/17870/254144581.84/0_ea99a_3ef7d73c_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/15524/254144581.84/0_ea99d_cde931e5_M",
                                                    "XL": "http://img-fotki.yandex.ru/get/15524/254144581.84/0_ea99d_cde931e5_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/15524/254144581.84/0_ea99d_cde931e5_orig"
                                                },
                                                {
                                                    "M": "http://img-fotki.yandex.ru/get/16145/254144581.84/0_ea999_27680c9_M",
                                                    "XL": "http://img-fotki.yandex.ru/get/16145/254144581.84/0_ea999_27680c9_XL",
                                                    "orig": "http://img-fotki.yandex.ru/get/16145/254144581.84/0_ea999_27680c9_orig"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "yalta-butik-otel-na-timiryazeva",
                                            "owners": [
                                                {
                                                    "sites": [
                                                        "http://hotel-yalta.su/"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 9600,
                                                    "period": "day",
                                                    "target": "vipSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 6800,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 4960,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 2800,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                }
                                            ],
                                            "slug": "butik-otel-na-timiryazeva-729",
                                            "title": "Бутик-отель на Тимирязева",
                                            "typeOfHotel": "minihotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://img-fotki.yandex.ru/get/15522/254144581.84/0_ea996_5db66253_M"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Бутик-отель на Тимирязева"
                                                                },
                                                                "url": "/hotels/yalta/butik-otel-na-timiryazeva-729/",
                                                                "content": "Бутик-отель на Тимирязева"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Ялта, ул. Тимирязева, 9. Мини-отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-729",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 729
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-729",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 729
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-729",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 729
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2800,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 4960,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "4 960",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 6800,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "6 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 9600,
                                                                            "period": "day",
                                                                            "target": "vipSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "9 600",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "vipSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/yalta/butik-otel-na-timiryazeva-729/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 729,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-729",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Бутик-отель на Тимирязева\"",
                                                                            "subject": "rest-trip: заказать \"Бутик-отель на Тимирязева\"",
                                                                            "title": "Подать заявку на заказ (вариант 729)",
                                                                            "documentId": 729
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/yalta/pansionat-imperial-726/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "726",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.48707,
                                                    "lon": 34.15607
                                                },
                                                "title": "Пансионат «Империал»"
                                            },
                                            "elemMods": {
                                                "id": 726,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Ялта",
                                                "house": "7/3",
                                                "point": {
                                                    "lat": 44.48707,
                                                    "lon": 34.15607
                                                },
                                                "street": "ул.Щербака"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "yalta",
                                            "dateOfCreating": "2014-10-31T16:48:46.011Z",
                                            "dateOfModifying": "2014-11-07T21:14:21.023Z",
                                            "dateOfUpdating": "2014-11-07T21:14:00.000Z",
                                            "description": "Пансионат «Империал 2011» открыт в 2011 году и расположен в историческом центре Ялты в парковой зоне на одной из старейших улиц города. Пансионат расположился в красивом старинном здании, реконструированном в 2011 году и на сегодняшний день он отвечает европейским стандартам.\r\n \r\nСвоим гостям пансионат предлагает комфортабельный отдых, высокий уровень сервиса, домашний уют и ценовую доступность. Кроме того, ежедневно предоставляется бесплатный трансфер до пляжа по расписанию. Для удобства отдыхающих во дворе пансионата оборудована частная парковка. На территории пансионата находится уютный ресторан, во дворе расположены два бассейна с прозрачной, чистой водой. Также, к услугам гостей — современный тренажерный зал, бильярдная комната, массажный и косметический кабинеты, терраса для загара.\r\n \r\nДля проведения семинаров, презентаций, тренингов, конференций и других корпоративных мероприятий пансионат предлагает оборудованный современной техникой конференц-зал, площадью 115 квадратных метров. Возможна организация кофе-брейков и бизнес-ланчей. На всей территории пансионата предоставляется бесплатный беспроводной доступ в интернет.\r\n \r\nЦена за номер включает:\r\n \r\n- проживание в номере выбранной категории;\r\n- Wi-Fi;\r\n- пользование мини-сейфом на стойке портье;\r\n- пользование бассейнами и шезлонгами ;\r\n- кинозал ;\r\n- тренажерный зал;\r\n- дети до 5 лет проживают бесплатно без предоставления места. Стоимость размещения на дополнительном месте – 200 грн.\r\n- туристический сбор.\r\n \r\nДополнительные услуги:\r\n \r\n- экскурсии;\r\n- пляж;\r\n- стоянка;\r\n- питание;\r\n- посещение SPA-комплекса (бассейн с подогреваемой водой, хамам, сауна);\r\n- бильярд;\r\n- массаж (по предварительной записи);\r\n- трансфер из/в Симферополь;\r\n- услуги прачечной;\r\n- конфернц-сервис.",
                                            "features": [
                                                "pool",
                                                "hot-water",
                                                "internet",
                                                "conferenceHall",
                                                "parking",
                                                "laundry",
                                                "restaurant",
                                                "satellite",
                                                "fitness"
                                            ],
                                            "id": 726,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/imperial-e1392970354909.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/10055749.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/4746851.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/4746724.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/4746638.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/4746597.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/02/8411996.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "pansionat-imperial",
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 1200,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 2400,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 1800,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                }
                                            ],
                                            "slug": "pansionat-imperial-726",
                                            "title": "Пансионат «Империал»",
                                            "typeOfHotel": "boarding-house"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/02/imperial-e1392970354909.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Пансионат «Империал»"
                                                                },
                                                                "url": "/hotels/yalta/pansionat-imperial-726/",
                                                                "content": "Пансионат «Империал»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Ялта, ул.Щербака, 7/3. Пансионат",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-726",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 726
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-726",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 726
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-726",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 726
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1200,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 200",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1800,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2400,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 400",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/yalta/pansionat-imperial-726/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 726,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-726",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Пансионат «Империал»\"",
                                                                            "subject": "rest-trip: заказать \"Пансионат «Империал»\"",
                                                                            "title": "Подать заявку на заказ (вариант 726)",
                                                                            "documentId": 726
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/yalta/otel-yalta-inturist-722/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "722",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.50292,
                                                    "lon": 34.1909
                                                },
                                                "title": "Отель  «Ялта-Интурист»"
                                            },
                                            "elemMods": {
                                                "id": 722,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Ялта",
                                                "house": "50",
                                                "point": {
                                                    "lat": 44.50292,
                                                    "lon": 34.1909
                                                },
                                                "street": "ул. Дражинского"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "yalta",
                                            "dateOfCreating": "2014-10-31T16:14:12.098Z",
                                            "dateOfModifying": "2014-11-07T21:14:09.547Z",
                                            "dateOfUpdating": "2014-11-07T21:14:00.000Z",
                                            "description": "Гостиничный комплекс «Ялта-Интурист» находится на побережье Ялты, в самом центре Массандровского парка. Является крупнейшим курортным центром Крыма. Мягкий климат, целебный горный воздух и море позволяют восстановить силы, наполняют энергией и здоровьем. Увлекательные экскурсии, феерические праздники для детей и взрослых, спортивные игры, вечеринки и дискотеки подарят массу впечатлений. Комплекс подходит также для проведения деловых мероприятий.\r\n \r\nНомерной фонд гостиницы составляет 1140 номеров различных категорий. Пляж отеля «Ялта-Интурист» славится своей чистотой и комфортом, а качество услуг подтверждено международным сертификатом экологии «BLUE Flag». Для детей на территории комплекса есть детский бассейн с инструктором, водные и спортивные аттракционы, детские площадки, прокат велосипедов и самокатов, а также работают аниматоры.\r\n \r\nЗдесь вы можете посетить олимпийский басейн с подогреваемой круглый год морской водой,центр грязеомоложения Сакской грязью, сауны и центр оздоровительного массажа, фитнесс-зал с тренажерами Life-fitness,из окон которого открывается панорамный вид на море и горы.\r\n \r\nДля любителей активного отдыха и спорта –современные спортивые площадки: футбол, волейбол, большой теннис, йога, настольный теннис.\r\n \r\nЕдинственный в Крыму сферический кинотеатр «Circularium», в котором Вы можете посмотреть художественные и познавательные фильмы. Вечерние анимационные представления в театре для детей и взрослых.\r\n \r\nВ уникальном контактном зоопарке «Планета обезьян» Вас ожидает увлекательное путешествие в мир редких, экзотических животных.\r\nВ стоимость номера включено:\r\nНДС,  местные налоги и сборы;\r\nразмещение в номере соответствующей категории;\r\nзавтрак «шведский стол»;\r\nежедневная уборка номеров;\r\nсмена постельного белья и полотенец 1 раз в 3 дня; в номерах категории «Люкс» – ежедневно;\r\nпредоставление гигиенических принадлежностей согласно категории номера;\r\nпользование гладильной комнатой;\r\nхранение багажа в камере хранения;\r\nпользование сейф-ячейками;\r\nмелкий ремонт одежды;\r\nвызов такси;\r\nвызов «скорой помощи»;\r\nутренняя побудка;\r\nWi-Fi интернет на всей территории Отеля;\r\nпросмотр 72 TV-каналов;\r\nдоставка корреспонденции;\r\nподнос багажа в номер;\r\nанимационные услуги для детей (с 01.06-30.09);\r\nпосещение фитнес-центра и бассейнов с 08:00 до 20:00;\r\nпосещение пляжа, пользование лежаком и тентом\r\nРасчетный час в Отеле 12:00 часов по местному времени.\r\nПри проживании менее суток, плата взимается за сутки независимо от времени заезда и выезда.",
                                            "features": [
                                                "pool",
                                                "hot-water",
                                                "internet",
                                                "conferenceHall",
                                                "furniture",
                                                "parking",
                                                "restaurant",
                                                "sauna",
                                                "lockBox",
                                                "spa",
                                                "satellite",
                                                "telephone",
                                                "fitness"
                                            ],
                                            "id": 722,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/81-1024x668.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/82-1024x679.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/83.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/84-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/85.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/93.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/94.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/95.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/91.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/911.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/16.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "numberOfSuites": 1140,
                                            "oldSlug": "otel-yalta-inturist-gostinitsyi-yalta",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "booking@hotel-yalta.com"
                                                    ],
                                                    "sites": [
                                                        "http://hotel-yalta.com/"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 8400,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 4800,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 3000,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                }
                                            ],
                                            "slug": "otel-yalta-inturist-722",
                                            "title": "Отель  «Ялта-Интурист»",
                                            "typeOfHotel": "boarding-house"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/04/81-1024x668.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Отель  «Ялта-Интурист»"
                                                                },
                                                                "url": "/hotels/yalta/otel-yalta-inturist-722/",
                                                                "content": "Отель  «Ялта-Интурист»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Ялта, ул. Дражинского, 50. Пансионат",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-722",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 722
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-722",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 722
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-722",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 722
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 3000,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "3 000",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 4800,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "4 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 8400,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "8 400",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/yalta/otel-yalta-inturist-722/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 722,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-722",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Отель  «Ялта-Интурист»\"",
                                                                            "subject": "rest-trip: заказать \"Отель  «Ялта-Интурист»\"",
                                                                            "title": "Подать заявку на заказ (вариант 722)",
                                                                            "documentId": 722
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/kurortnyj-kompleks-golden-zolotoj-kolos-720/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "720",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.68265,
                                                    "lon": 34.41322
                                                },
                                                "title": "Курортный комплекс «Голден» («Золотой колос»)"
                                            },
                                            "elemMods": {
                                                "id": 720,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "house": "9",
                                                "point": {
                                                    "lat": 44.68265,
                                                    "lon": 34.41322
                                                },
                                                "street": "ул. Красноармейская"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-10-30T15:59:28.622Z",
                                            "dateOfModifying": "2014-11-07T21:13:58.104Z",
                                            "dateOfUpdating": "2014-11-07T21:13:00.000Z",
                                            "description": "Курортный комплекс «Голден» («Золотой колос») подходит как для оздоровительного, так и для семейного отдыха с детьми. Ни один отель в Крыму не отличается настолько удачным расположением в местности с целебным климатом, в сочетании с комфортными условиями для семейного отдыха и доступными ценами на проживание по системе «всё включено».\r\n \r\nВ комплексе «Голден» («Золотой колос»)» Вы можете выбрать уютные номера различных ценовых категорий. Номерной фонд комплекса состоит из 1-, 2-, 3-местных номеров, среди которых есть и «стандарты» и «люксы». Гости, страдающие бронхиальной астмой, а также повышенной чувствительностью верхних дыхательных путей могут остановиться в специально оборудованных «гипоаллергенных» номерах. Далеко не все отели Крыма могут предоставить подобные условия для проживания. В отеле могут разместиться до 488 человек одновременно.\r\n \r\nВ ресторане курортного комплекса гости могут попробовать вкусные и полезные блюда европейкой кухни, мастерски приготовленные поварами из местных экологически чистых продуктов. Курортный комплекс «Голден» («Золотой колос»)» предлагает питание по системе «шведский стол», но в стоимость отдыха уже включено трехразовое питание, а не только завтрак, в отличие от большинства отелей Крыма. Кроме того, вместе с нашим лечащим врачом вы можете индивидуально выбрать блюда по диетам. Вряд ли другой отель в Алуште сможет предложить Вам такие возможности полезного и сбалансированного меню. А ещё к Вашим услугам специально оборудованный зал для гостей с детьми, где Вы без труда сможете найти блюда, которые подойдут Вашему любимому малышу.\r\n \r\nОтели Алушты всегда привлекали туристов своим расположением возле моря и живописным побережьем. В курортном комплексе «Голден» («Золотой колос») к Вашим услугам собственный мелкогалечный пляж. Всего за несколько минут автобус, принадлежащий отелю доставит Вас к морю. Уютный пляж оборудованном навесами, шезлонгами, раздевалками и детскими бассейнами. Гостеприимные работники выдадут Вам полотенца, предложат услуги расслабляющего массажа, а у любителей активного отдыха будет возможность покататься на скоростном гидроцикле.\r\n \r\nИнфраструктура и сервис\r\n3 современных корпуса с комфортными номерами.\r\nСобственная парковая территория.\r\nОборудованный пляж\r\nОткрытый и закрытый плавательные бассейны с подогревом.\r\nЦентр восстановления здоровья.\r\nСпортивные площадки для активного отдыха.\r\nТренажерный зал.\r\nЦентр раннего развития детей.\r\nДетская и взрослая анимация.\r\nКонференц-залы.\r\nЭкскурсионное бюро.\r\nОхраняемая автостоянка.\r\nДля удобства гостей курортный комплекс “Золотой Колос” работает по системе “все включено”, которая очень выгодна тем, что в стоимость проживания входит всё необходимое для полноценного семейного отдыха:\r\n \r\nпроживание в номере соответствующей категории;\r\nпрограмма восстановления здоровья или SPA-программа, выбранная с врачом*;\r\nтрехразовое питание по системе “шведская линия” в ресторане “Золотой Колос”;\r\nбезалкогольные напитки собственного изготовления в баре “СССР” и в баре у бассейна “Куба” **;\r\nпользование открытым** и крытым бассейнами, тренажерным залом; посещение сауны и римской термы;\r\nбесплатный WI-FI во всех общественных зонах;\r\nуслуги детской комнаты;\r\nанимация для взрослых и детей;\r\nпешеходные экскурсии по городу;\r\nдоставка на пляж**,\r\nшезлонги и полотенца на пляже** и у бассейна**;\r\nпользование ячейкой сейфа; автопарковка.\r\nПримечание: * — для гостей, забронировавших номер на срок более 4 дней;\r\n** — только в теплый сезон, сезон и высокий сезон. Дети до 7 лет отдыхают в курортном комплексе “Золотой Колос” БЕСПЛАТНО (без предоставления программы укрепления здоровья).\r\n \r\nИщите лучший отель Крыма? Приезжайте в «Голден» («Золотой колос»)»! Крым прекрасен и жарким летом, и в межсезонье, поэтому наши двери открыты для Вас в любое время года. Мы гарантируем каждому нашему гостю самый теплый прием и максимальное внимание.",
                                            "features": [
                                                "pool",
                                                "hot-water",
                                                "internet",
                                                "conditioner",
                                                "conferenceHall",
                                                "furniture",
                                                "parking",
                                                "laundry",
                                                "restaurant",
                                                "lockBox",
                                                "spa",
                                                "satellite",
                                                "fitness"
                                            ],
                                            "id": 720,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_3.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_2-2.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_1.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_5.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_6.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_4.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_7.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "kurortnyiy-kompleks-golden-zolotoy-kolos",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "resort@goldenkolos.com"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 1600,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 2400,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 4000,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                }
                                            ],
                                            "slug": "kurortnyj-kompleks-golden-zolotoj-kolos-720",
                                            "title": "Курортный комплекс «Голден» («Золотой колос»)",
                                            "typeOfHotel": "hotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/04/gk_3.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Курортный комплекс «Голден» («Золотой колос»)"
                                                                },
                                                                "url": "/hotels/alushta/kurortnyj-kompleks-golden-zolotoj-kolos-720/",
                                                                "content": "Курортный комплекс «Голден» («Золотой колос»)"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул. Красноармейская, 9. Отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-720",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 720
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-720",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 720
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-720",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 720
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1600,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 600",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2400,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 400",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 4000,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "4 000",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/kurortnyj-kompleks-golden-zolotoj-kolos-720/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 720,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-720",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Курортный комплекс «Голден» («Золотой колос»)\"",
                                                                            "subject": "rest-trip: заказать \"Курортный комплекс «Голден» («Золотой колос»)\"",
                                                                            "title": "Подать заявку на заказ (вариант 720)",
                                                                            "documentId": 720
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/gostinica-yuzhnyj-bereg-718/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "718",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.67536,
                                                    "lon": 34.4114
                                                },
                                                "title": "Гостиница «Южный берег»"
                                            },
                                            "elemMods": {
                                                "id": 718,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "house": "12",
                                                "point": {
                                                    "lat": 44.67536,
                                                    "lon": 34.4114
                                                },
                                                "street": "ул. 15 Апреля"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-10-30T13:24:18.854Z",
                                            "dateOfModifying": "2014-11-17T15:07:44.289Z",
                                            "dateOfUpdating": "2014-11-07T21:13:00.000Z",
                                            "description": "Гостиница «Южный берег» расположена в центре Алушты всего в 300 метрах от моря. Находится гостиница в благоприятном месте возле православного храма рядом кафе, супермаркет, центральный рынок, парк.\r\n \r\nК Вашим услугам различные категории номеров с балконами и шикарным видом на море и горы. Все номера находятся на втором этаже.\r\n \r\nВ номерах есть: холодильники, кондиционеры, телевизоры. Санузлы оборудованы унитазом, душевой кабинкой, умывальником. Горячая и холодная вода подается круглосуточно. Электрочайник, фен, утюг, гладильная доска выдаются по требованию гостей.\r\n \r\nДополнительные услуги:\r\nСейфы\r\nстирка белья\r\nчай\r\nкофе",
                                            "features": [
                                                "balcony",
                                                "hot-water",
                                                "internet",
                                                "conditioner",
                                                "laundry",
                                                "restaurant"
                                            ],
                                            "id": 718,
                                            "images": [
                                                {
                                                    "orig": "http://alushta.krym.ru/uploads/yjbereg/1.jpg"
                                                },
                                                {
                                                    "orig": "http://alushta.krym.ru/uploads/yjbereg/2.jpg"
                                                },
                                                {
                                                    "orig": "http://alushta.krym.ru/uploads/12(15).jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "gostinitsa-yuzhnyiy-bereg",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "ugbereg@yandex.ru"
                                                    ],
                                                    "phones": [
                                                        "+79787502656"
                                                    ],
                                                    "sites": [
                                                        "http://yuzhniy-bereg.krym.ru/"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 1200,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 2800,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 2800,
                                                    "period": "day",
                                                    "target": "vipSuite"
                                                }
                                            ],
                                            "slug": "gostinica-yuzhnyj-bereg-718",
                                            "title": "Гостиница «Южный берег»",
                                            "typeOfHotel": "minihotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://alushta.krym.ru/uploads/yjbereg/1.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Гостиница «Южный берег»"
                                                                },
                                                                "url": "/hotels/alushta/gostinica-yuzhnyj-bereg-718/",
                                                                "content": "Гостиница «Южный берег»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул. 15 Апреля, 12. Мини-отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-718",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 718
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-718",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 718
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-718",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 718
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1200,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 200",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2800,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2800,
                                                                            "period": "day",
                                                                            "target": "vipSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "vipSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/gostinica-yuzhnyj-bereg-718/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 718,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-718",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Гостиница «Южный берег»\"",
                                                                            "subject": "rest-trip: заказать \"Гостиница «Южный берег»\"",
                                                                            "title": "Подать заявку на заказ (вариант 718)",
                                                                            "documentId": 718
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/gostinica-la-bonne-maison-717/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "717",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.67763,
                                                    "lon": 34.40731
                                                },
                                                "title": "Гостиница «La Bonne Maison»"
                                            },
                                            "elemMods": {
                                                "id": 717,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "house": "7А",
                                                "point": {
                                                    "lat": 44.67763,
                                                    "lon": 34.40731
                                                },
                                                "street": "ул. Пуцатова"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-10-30T12:26:26.159Z",
                                            "dateOfModifying": "2014-11-07T21:13:32.378Z",
                                            "dateOfUpdating": "2014-11-07T21:13:00.000Z",
                                            "description": "«La Bonne Maison», занимает особое место среди лучших отелей Крыма. Четыре этажа гостиницы, расположенной на склоне горы, представляют живописный вид на город, за которым бесконечной синей гладью раскинулось теплое море южного берега Крыма.\r\n \r\nНа сегодняшний день, семейный отдых в Крыму, в первую очередь, подразумевает комфорт. Дизайн и наполнение интерьера гостиничных комнат «Бон Мезона», полностью соответствует восприятию Крыма, отдыха в Алуште и не оставляют равнодушным даже самого требовательного гостя. Каждый номер не похож на другой. Здесь: авторский дизайн, классическая лепка в убранстве, “прованская” белая мебель и, конечно же, чудесные виды со всех балконов и балкончиков отеля.\r\n \r\nОтдельного внимания заслуживает сад гостиницы. Неповторимый ландшафтный дизайн, где, растения, привезенные со всех уголков Италии и солнечной Франции, соседствуют с вечнозелеными местными деревьями. Террасы с фонтанами, уютные беседки с диванчиками, где можно, уединившись среди соцветия южной зелени и сладкого запаха роз, в полной мере насладиться отдыхом в Алуште. А два больших бассейна, с кристально чистой водой, смогут заменить пляж тем, кому не хочется покидать пределов гостиницы.\r\n \r\nОтдых в Крыму с детьми, как и семейный отдых на море, является, наверняка, обязательным мероприятием любой семьи. Солнце и свежий морской воздух так нужны детям. Именно поэтому в гостинице «La Bonne Maison» оборудована чудесная детская площадка, которая не позволит скучать детям.\r\n \r\nТеплый и радушный прием, великолепные блюда от шеф-повара и комфортабельные номера, барбекю вечеринки и послеобеденная дремота в тени экзотических растений, черное море за окном и бескрайний океан положительных эмоций в душе – подтверждают название гостиницы «La Bonne Maison» (с фран. «хороший дом»).\r\n \r\nВ стоимость номера входит:\r\n• Завтрак (2 чел.);\r\n• Пользование территорией и двумя бассейнами, которые находятся на ней;\r\n• Трансферт на пляж;\r\n• Посещение пляжа;\r\n• Бесплатное проживание детей возрастом до 3-х лет;\r\n• Стоянка для автомобиля;\r\n• Стоимость дополнительного места + 25% от стоимости номера;\r\n• Обязательна предоплата за ДВОЕ суток!\r\n• В случае выезда из номера досрочно и уменьшения оговоренных ранее сроков проживания в гостинице будут применяться штрафные санкции в размере стоимости двух суток.",
                                            "features": [
                                                "balcony",
                                                "pool",
                                                "hot-water",
                                                "shower",
                                                "internet",
                                                "kitchen",
                                                "restaurant",
                                                "sauna",
                                                "spa",
                                                "satellite"
                                            ],
                                            "id": 717,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all1.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all92.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all94.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all95.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all96.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all97.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all2.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all3.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all4.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all6.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all7.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all8.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all83.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all9.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all82.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/04/all91.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "gostinitsyi/gostinitsa-la-bonne-maison",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "bonmezon.post@mail.ru",
                                                        "bonmezon@yandex.ua"
                                                    ],
                                                    "sites": [
                                                        "http://www.bonmezon.ru"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 2800,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 3200,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 6400,
                                                    "period": "day",
                                                    "target": "luxurySuite"
                                                }
                                            ],
                                            "slug": "gostinica-la-bonne-maison-717",
                                            "title": "Гостиница «La Bonne Maison»",
                                            "typeOfHotel": "hotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/04/all1.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Гостиница «La Bonne Maison»"
                                                                },
                                                                "url": "/hotels/alushta/gostinica-la-bonne-maison-717/",
                                                                "content": "Гостиница «La Bonne Maison»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул. Пуцатова, 7А. Отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-717",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 717
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-717",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 717
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-717",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 717
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2800,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 3200,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "3 200",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 6400,
                                                                            "period": "day",
                                                                            "target": "luxurySuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "6 400",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "luxurySuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/gostinica-la-bonne-maison-717/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 717,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-717",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Гостиница «La Bonne Maison»\"",
                                                                            "subject": "rest-trip: заказать \"Гостиница «La Bonne Maison»\"",
                                                                            "title": "Подать заявку на заказ (вариант 717)",
                                                                            "documentId": 717
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/villa-annigora-716/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "716",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.65188,
                                                    "lon": 34.40184
                                                },
                                                "title": "Вилла «Аннигора»"
                                            },
                                            "elemMods": {
                                                "id": 716,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "house": "24",
                                                "point": {
                                                    "lat": 44.65188,
                                                    "lon": 34.40184
                                                },
                                                "street": "ул.Набережная"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-10-30T12:04:41.732Z",
                                            "dateOfModifying": "2014-11-17T15:07:24.983Z",
                                            "dateOfUpdating": "2014-11-07T21:12:00.000Z",
                                            "description": "В вилле Алушты “Аннигора” Вас ожидают уютные 2-, 3-, 4-местные номера класса “Полулюкс”, “Комфорт” и “Стандарт. Все номера оснащены кондиционерами, телевизорами со спутниковым телевидением, холодильниками. Также имеется Wi-Fi доступ в Интернет.\r\n \r\nВ санузлах: душ, туалет, умывальник, средства личной гигиены, полотенца. Номера уютного отеля Алушты имеют панорамные окна и балконы с великолепным видом на море и гору Кастель. В номерах есть возможность предоставления дополнительного места. Уборка в номере и смена постельного белья осуществляются по просьбе отдыхающих.\r\n\r\nНа территории виллы к Вашим услугам будет предоставлена кухня для самостоятельного приготовления пищи, оснащённая всем необходимым инвентарем, терраса с мангалом, с которой открывается восхитительный вид на море и виноградники.\r\n \r\nЕсть бесплатная стоянка при наличии свободных мест, детская и летняя площадки с фонтаном. Расстояние до моря 300м.",
                                            "features": [
                                                "balcony",
                                                "hot-water",
                                                "shower",
                                                "conditioner",
                                                "kitchen",
                                                "brazier",
                                                "furniture",
                                                "parking",
                                                "satellite",
                                                "fridge"
                                            ],
                                            "id": 716,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/f_1.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/f_2.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/kuhnya_1.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/kuhnya_3.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/ter_1.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/hall_4.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/hall_5.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/55_vid_balcon_plux.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "annetka_1973@mail.ru"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 2800,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 1600,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                }
                                            ],
                                            "slug": "villa-annigora-716",
                                            "title": "Вилла «Аннигора»",
                                            "typeOfHotel": "minihotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/05/f_1.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Вилла «Аннигора»"
                                                                },
                                                                "url": "/hotels/alushta/villa-annigora-716/",
                                                                "content": "Вилла «Аннигора»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул.Набережная, 24. Мини-отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-716",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 716
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-716",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 716
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-716",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 716
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1600,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 600",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 2800,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "2 800",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/villa-annigora-716/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 716,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-716",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Вилла «Аннигора»\"",
                                                                            "subject": "rest-trip: заказать \"Вилла «Аннигора»\"",
                                                                            "title": "Подать заявку на заказ (вариант 716)",
                                                                            "documentId": 716
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    },
                                    {
                                        "block": "snippet",
                                        "js": {
                                            "href": "/hotels/alushta/villa-beliv-715/"
                                        },
                                        "mods": {
                                            "type": "hotels",
                                            "expandable": true
                                        },
                                        "mix": {
                                            "block": "serp",
                                            "elem": "item",
                                            "js": {
                                                "id": "715",
                                                "category": "hotels",
                                                "point": {
                                                    "lat": 44.67638,
                                                    "lon": 34.41005
                                                },
                                                "title": "Вилла «Белив»"
                                            },
                                            "elemMods": {
                                                "id": 715,
                                                "clickable": true,
                                                "scrollOnClick": true
                                            }
                                        },
                                        "data": {
                                            "address": {
                                                "city": "Алушта",
                                                "district": "Профессорский уголок",
                                                "house": "42",
                                                "point": {
                                                    "lat": 44.67638,
                                                    "lon": 34.41005
                                                },
                                                "street": "ул. Слуцкого"
                                            },
                                            "categories": [
                                                "hotels"
                                            ],
                                            "city": "alushta",
                                            "dateOfCreating": "2014-10-30T11:52:50.868Z",
                                            "dateOfModifying": "2014-11-07T21:12:43.201Z",
                                            "dateOfUpdating": "2014-11-07T21:12:00.000Z",
                                            "description": "Вилла «Белив» — современное четырёхэтажное здание с оригинальной архитектурой, расположенное в тихом и уютном месте Алушты в «Профессорском уголке», у подножия горы «Кастель», вдали от городской суеты но всего в 650 метрах от моря, что создаёт прекрасные условия для отдыха.\r\n \r\nКомфортабельные номера обладают всем необходимым для отдыха: мебелью (двуспальная кровать, две прикроватные тумбочки, шкаф), бытовой техникой, ЖК телевизоры, спутниковым ТВ, Индивидуальной системой кондиционирования, большие санузлы с итальянской сантехникой; Автономное тепло- и водоснабжение.\r\n \r\nИнфраструктура:\r\nПрачечная *\r\nПарковка\r\nДоставка продуктов *\r\nМангал\r\nОхраняемая территория\r\nWi-fi\r\nДетский уголок\r\nПлощадка для барбекю\r\n \r\nРазвлечения:\r\nРыбалка *\r\nДайвинг *\r\nБатут\r\nПинг-понг\r\nБадминтон\r\nМини гольф\r\nШахматы\r\nНарды\r\nШашки\r\nДартс\r\nБольшой теннис *\r\nПешеходные экскурсии по горному Крыму *\r\nКараоке\r\nВолейбол *\r\n \r\nЗвёздочками помечены услуги, которые НЕ входят в стоимость проживания.",
                                            "features": [
                                                "balcony",
                                                "hot-water",
                                                "internet",
                                                "conditioner",
                                                "kitchen",
                                                "brazier",
                                                "parking",
                                                "laundry",
                                                "restaurant"
                                            ],
                                            "id": 715,
                                            "images": [
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/25.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/30-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/37-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/39-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/40-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/vil1-1024x682.jpg"
                                                },
                                                {
                                                    "orig": "http://old.rest-trip.com/wp-content/uploads/2014/05/22.jpg"
                                                }
                                            ],
                                            "lastEditor": "pan-misha@tadatuta.com",
                                            "oldSlug": "villa-beliv-gostinitsyi",
                                            "owners": [
                                                {
                                                    "emails": [
                                                        "villa.beliv@gmail.com"
                                                    ],
                                                    "phones": [
                                                        "+79788425350"
                                                    ],
                                                    "sites": [
                                                        "http://www.villa-beliv.com/"
                                                    ]
                                                }
                                            ],
                                            "prices": [
                                                {
                                                    "currency": "RUR",
                                                    "min": 1400,
                                                    "period": "day",
                                                    "target": "standartSuite"
                                                },
                                                {
                                                    "currency": "RUR",
                                                    "min": 1600,
                                                    "period": "day",
                                                    "target": "juniorSuite"
                                                }
                                            ],
                                            "slug": "villa-beliv-715",
                                            "title": "Вилла «Белив»",
                                            "typeOfHotel": "minihotel"
                                        },
                                        "content": [
                                            {
                                                "block": "snippet",
                                                "elem": "pending",
                                                "mods": {},
                                                "content": {
                                                    "block": "spin",
                                                    "mods": {
                                                        "progress": true,
                                                        "size": "xl",
                                                        "theme": "islands"
                                                    }
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "preview",
                                                "mix": {
                                                    "block": "snippet",
                                                    "elem": "left"
                                                },
                                                "mods": {},
                                                "content": {
                                                    "elem": "thumb",
                                                    "url": "http://old.rest-trip.com/wp-content/uploads/2014/05/25.jpg"
                                                }
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "center",
                                                "content": [
                                                    {
                                                        "content": [
                                                            {
                                                                "block": "link",
                                                                "mix": {
                                                                    "block": "snippet",
                                                                    "elem": "title",
                                                                    "elemMods": {
                                                                        "link": true,
                                                                        "row-count": 3
                                                                    }
                                                                },
                                                                "attrs": {
                                                                    "title": "Вилла «Белив»"
                                                                },
                                                                "url": "/hotels/alushta/villa-beliv-715/",
                                                                "content": "Вилла «Белив»"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "info",
                                                                "content": "Алушта, ул. Слуцкого, 42. Мини-отель",
                                                                "mods": {}
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "center"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "features",
                                                                "features": [
                                                                    "internet",
                                                                    "parking",
                                                                    "fitness",
                                                                    "pool",
                                                                    "restaurant",
                                                                    "spa"
                                                                ],
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "internet",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "интернет"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "parking",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "парковка"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "fitness",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "тренажерный зал"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "pool",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "бассейн"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "restaurant",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": true
                                                                            }
                                                                        },
                                                                        "content": "ресторан"
                                                                    },
                                                                    {
                                                                        "block": "feature",
                                                                        "mods": {
                                                                            "type": "spa",
                                                                            "full": false
                                                                        },
                                                                        "mix": {
                                                                            "block": "snippet",
                                                                            "elem": "feature",
                                                                            "elemMods": {
                                                                                "exist": false
                                                                            }
                                                                        },
                                                                        "content": "спа"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "compare",
                                                                "elemMods": {
                                                                    "size": "s"
                                                                },
                                                                "mods": {},
                                                                "content": [
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareAdd-715",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 715
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareAdd",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Добавить к сравнению"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands",
                                                                            "type": "link"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compare-715",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 715
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compare",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "open-document"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Сравнить"
                                                                    },
                                                                    {
                                                                        "block": "button",
                                                                        "mods": {
                                                                            "size": "s",
                                                                            "theme": "islands"
                                                                        },
                                                                        "mix": [
                                                                            {
                                                                                "block": "action-button",
                                                                                "js": {
                                                                                    "id": "action-button_action_compareDelete-715",
                                                                                    "category": "hotels",
                                                                                    "live": false,
                                                                                    "targetId": 715
                                                                                },
                                                                                "mods": {
                                                                                    "action": "compareDelete",
                                                                                    "hidden": true
                                                                                }
                                                                            }
                                                                        ],
                                                                        "icon": [
                                                                            {
                                                                                "block": "spin-icon",
                                                                                "mods": {
                                                                                    "size": "xs"
                                                                                },
                                                                                "content": {
                                                                                    "block": "icon",
                                                                                    "content": {
                                                                                        "block": "spin",
                                                                                        "mods": {
                                                                                            "progress": true,
                                                                                            "size": "xs",
                                                                                            "theme": "islands"
                                                                                        }
                                                                                    },
                                                                                    "mods": {}
                                                                                }
                                                                            },
                                                                            {
                                                                                "block": "icon",
                                                                                "mods": {
                                                                                    "type": "cancel"
                                                                                }
                                                                            }
                                                                        ],
                                                                        "text": "Убрать из сравнения"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "mix": {
                                                            "block": "snippet",
                                                            "elem": "prices"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "стандарт",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1400,
                                                                            "period": "day",
                                                                            "target": "standartSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 400",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "standartSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "полулюкс",
                                                                        "mods": {}
                                                                    },
                                                                    {
                                                                        "block": "price",
                                                                        "mods": {
                                                                            "currency": "RUR"
                                                                        },
                                                                        "price": {
                                                                            "currency": "RUR",
                                                                            "min": 1600,
                                                                            "period": "day",
                                                                            "target": "juniorSuite"
                                                                        },
                                                                        "content": [
                                                                            [
                                                                                {
                                                                                    "block": "price",
                                                                                    "elem": "value",
                                                                                    "content": "1 600",
                                                                                    "mods": {}
                                                                                }
                                                                            ],
                                                                            null,
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "currency",
                                                                                "elemMods": {
                                                                                    "type": "RUR"
                                                                                },
                                                                                "mods": {}
                                                                            },
                                                                            {
                                                                                "block": "price",
                                                                                "elem": "ware",
                                                                                "content": [
                                                                                    [
                                                                                        "за ",
                                                                                        "juniorSuite"
                                                                                    ],
                                                                                    " в сутки"
                                                                                ],
                                                                                "mods": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "люкс",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "price",
                                                                "content": [
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "price-caption",
                                                                        "content": "vip",
                                                                        "mods": {}
                                                                    },
                                                                    "—"
                                                                ],
                                                                "mods": {}
                                                            }
                                                        ],
                                                        "mods": {}
                                                    },
                                                    {
                                                        "block": "snippet",
                                                        "elem": "grid-row",
                                                        "elemMods": {
                                                            "alignItems": "baseline"
                                                        },
                                                        "content": [
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "type": "link"
                                                                },
                                                                "url": "/hotels/alushta/villa-beliv-715/rooms/",
                                                                "text": "Посмотреть номера"
                                                            },
                                                            {
                                                                "block": "snippet",
                                                                "elem": "variant",
                                                                "mods": {},
                                                                "content": [
                                                                    "вариант ",
                                                                    {
                                                                        "block": "snippet",
                                                                        "elem": "variant-value",
                                                                        "content": 715,
                                                                        "mods": {}
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "block": "button",
                                                                "mods": {
                                                                    "size": "m",
                                                                    "theme": "islands",
                                                                    "view": "action"
                                                                },
                                                                "mix": [
                                                                    {
                                                                        "block": "action-button",
                                                                        "js": {
                                                                            "id": "action-button_action_sendmail-715",
                                                                            "content": "Заполните пожалуйста форму ниже, чтобы заказать \"Вилла «Белив»\"",
                                                                            "subject": "rest-trip: заказать \"Вилла «Белив»\"",
                                                                            "title": "Подать заявку на заказ (вариант 715)",
                                                                            "documentId": 715
                                                                        },
                                                                        "mods": {
                                                                            "action": "sendmail"
                                                                        }
                                                                    }
                                                                ],
                                                                "icon": [
                                                                    {
                                                                        "block": "spin-icon",
                                                                        "mods": {
                                                                            "size": "xs"
                                                                        },
                                                                        "content": {
                                                                            "block": "icon",
                                                                            "content": {
                                                                                "block": "spin",
                                                                                "mods": {
                                                                                    "progress": true,
                                                                                    "size": "xs",
                                                                                    "theme": "islands"
                                                                                }
                                                                            },
                                                                            "mods": {}
                                                                        }
                                                                    }
                                                                ],
                                                                "text": "Заказать"
                                                            }
                                                        ],
                                                        "mods": {}
                                                    }
                                                ],
                                                "mods": {}
                                            },
                                            {
                                                "block": "snippet",
                                                "elem": "label",
                                                "elemMods": {
                                                    "hotels": true
                                                },
                                                "mods": {}
                                            }
                                        ]
                                    }
                                ],
                                {
                                    "block": "button",
                                    "mods": {
                                        "size": "l",
                                        "theme": "islands",
                                        "type": "link"
                                    },
                                    "mix": {
                                        "block": "serp",
                                        "elem": "more",
                                        "elemMods": {
                                            "direction": "next"
                                        }
                                    },
                                    "url": "/hotels/?p=2",
                                    "text": "Показать еще (осталось: 49)"
                                },
                                null
                            ]
                        }
                    ]
                },
                {
                    "elem": "panel",
                    "elemMods": {
                        "pos": "third"
                    },
                    "content": {
                        "block": "map",
                        "mods": {
                            "view": "list"
                        }
                    }
                }
            ]
        },
        {
            "block": "metrika",
            "mods": {}
        }
    ]
})
