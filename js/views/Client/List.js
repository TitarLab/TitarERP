define(['mithril','controllers/Client','models/Client'], function(n,ClientController,Client){
    var ClientListView = {
        oninit: function(){
            ClientController.init.default();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3","Клиенты")
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("div.uk-search uk-search-default",[
                                m("span",{"uk-search-icon":""}),
                                m("input.uk-search-input",{type:"search", placeholder:"Поиск"})
                            ]),
                            m("a.uk-button uk-button-primary",{href:"#!/client/new"},"Новый клиент")
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
                    m("table.uk-table uk-table-striped",[
                        m("thead",[
                            m("tr",[
                                m("th","Имя"),
                                m("th","Статус"),
                                m("th","Последний контакт"),

                                m("th","Примечение"),
                                m("th","Контакты"),
                                m("th.uk-flex uk-flex-right","Управление"),
                            ])
                        ]),
                        m("tbody",[
                            Client.list.map(function(client,i){
                                return m("tr",[
                                    m("td",[
																			m("a",{href:"#!/client/view/"+client.id},client.firstname + " " + client.lastname)
																		]),
                                    m("td",client.status),
                                    m("td",new Date(client.lastContact).toLocaleDateString("ru-RU")),
                                    m("td",client.note),
																		m("td",[
																			[{}].map(function(){
																				if(client.contacts != null && typeof client.contacts == "object"){
																					return client.contacts.map(function(contact){
																						return m("span",contact.name+":"+contact.value+" ");
																					});
																				}

																			})

																		]),
                                    m("td.uk-flex uk-flex-right",[
                                        m("div.uk-button-group",[
                                            m("button.uk-button uk-button-default",{},[
                                                m("span",{"uk-icon":"icon:more"})
                                            ]),
                                            m("div",{"uk-dropdown":""},[
                                              m("ul.uk-nav uk-dropdown-nav",[
                                                m("li.uk-nav-header","Обновить дату последнего контакта"),
                                                m("li",[
                                                  m("a","Сегодня")
                                                ]),
                                                m("li",[
                                                  m("a","Вчера")
                                                ]),
                                                m("li",[
                                                  m("div.uk-button-group",[
                                                    m("input.uk-input",{type:"date"}),
                                                    m("button.uk-button uk-button-default",[
                                                      m("span",{"uk-icon":"icon:check"})
                                                    ])
                                                  ])

                                                ]),
																								m("li.uk-nav-divider"),
																								m("li",[
																									m("a",{onclick:function(){ClientController.remove(client.id);Client.list.splice(i,1);}},"Удалить клиента")
																								])
                                              ])
                                            ]),
                                            m("button.uk-button uk-button-default",{},"Редактировать")
                                        ])
                                    ]),
                                ])
                            })
                        ])
                    ])
                ])
            ]);
        },
    }
    return ClientListView;

});
