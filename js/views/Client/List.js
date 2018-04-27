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
                            m("button.uk-button uk-button-primary","Новый клиент")
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
                            Client.list.map(function(client){
                                return m("tr",[
                                    m("td",client.name),
                                    m("td",client.status),
                                    m("td",client.lastContact),
                                    
                                    m("td",client.note),
                                    m("td",client.contacts),
                                    m("td.uk-flex uk-flex-right",[
                                        m("div.uk-button-group",[
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