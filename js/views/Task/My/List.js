define(['mithril','controllers/Task','models/Task'], function(n,TaskController,Task){
    var TaskMyListView = {
        oninit: function(){
            TaskController.init.default();
        },
        view : function(){
            return[
                m("div.uk-flex uk-flex-column uk-width-expand",[
                    m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
                        m("h3.uk-margin-remove","Мои задачи"),
                        m("div.uk-flex uk-flex-right",[
                            m("div.uk-button-group",[
                                m("div.uk-search uk-search-default",[
                                    m("span",{"uk-search-icon":""}),
                                    m("input.uk-search-input",{"type":"search", "placeholder":"Поиск..."})
                                ])
                            ])
                        ])

                    ]),
                    m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Новые"),
                                m("span.uk-badge",list[0].length())
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	Task.list.map(function(item){
																		return [
                                                                            m("li",[
                                                                                m("div.uk-card uk-card-default",[
                                                                                    m("div.uk-card-body",[
                                                                                       m("h4.uk-margin-remove",item[0].name),
                                                                                       m("h5.uk-margin-remove",item[0].project),
                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:clock"}),
                                                                                               m("span.uk-margin-small-left",item[0].deadline)
                                                                                           ]),
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:star"})
                                                                                           ])
                                                                                       ])
                                                                                    ])
                                                                                ])
                                                                            ])
                                                                                
																		];
																	})
																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","В процессе"),
                                m("span.uk-badge",list[1].length())
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	Task.list.map(function(item){
																		return [
                                                                            m("li",[
                                                                                m("div.uk-card uk-card-default",[
                                                                                    m("div.uk-card-body",[
                                                                                       m("h4.uk-margin-remove",item[1].name),
                                                                                       m("h5.uk-margin-remove",item[1].project),
                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:clock"}),
                                                                                               m("span.uk-margin-small-left",item[1].deadline)
                                                                                           ]),
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:star"})
                                                                                           ])
                                                                                       ])
                                                                                    ])
                                                                                ])
                                                                            ])
                                                                                
																		];
																	})
																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Тестирование"),
                                m("span.uk-badge",Task.list[2].length())
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	Task.list.map(function(item){
																		return [
                                                                            m("li",[
                                                                                m("div.uk-card uk-card-default",[
                                                                                    m("div.uk-card-body",[
                                                                                       m("h4.uk-margin-remove",item[2].name),
                                                                                       m("h5.uk-margin-remove",item[2].project),
                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:clock"}),
                                                                                               m("span.uk-margin-small-left",item[2].deadline)
                                                                                           ]),
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:star"})
                                                                                           ])
                                                                                       ])
                                                                                    ])
                                                                                ])
                                                                            ])
                                                                                
																		];
																	})
																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Готово"),
                                m("span.uk-badge",list[3].length())
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	Task.list.map(function(item){
																		return [
                                                                            m("li",[
                                                                                m("div.uk-card uk-card-default",[
                                                                                    m("div.uk-card-body",[
                                                                                       m("h4.uk-margin-remove",item[3].name),
                                                                                       m("h5.uk-margin-remove",item[3].project),
                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:clock"}),
                                                                                               m("span.uk-margin-small-left",item[3].deadline)
                                                                                           ]),
                                                                                           m("div.uk-flex uk-flex-middle",[
                                                                                               m("span",{"ul-icon":"icon:star"})
                                                                                           ])
                                                                                       ])
                                                                                    ])
                                                                                ])
                                                                            ])
                                                                                
																		];
																	})
																])
                            ])
                        ])
                    ])
                ]),

            ]

        },
    }
    return TaskMyListView;

});
