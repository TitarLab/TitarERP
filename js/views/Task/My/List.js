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
                                [{}].map(function(){
																	if(Task.list != null && Task.list[0] != null){
																		return m("span.uk-badge",Task.list[0].length)
																	}
																})
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	[{}].map(function(){
																		if(Task.list != null && Task.list[0] != null){
																			return Task.list[0].map(function(item){
																				return [
		                                                                          m("li",[
		                                                                                m("div.uk-card uk-card-default",[
		                                                                                    m("div.uk-card-body",[
		                                                                                       m("h4.uk-margin-remove",item.name),
		                                                                                       m("h5.uk-margin-remove",item.project),
		                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:clock"}),
		                                                                                               m("span.uk-margin-small-left",item.deadline)
		                                                                                           ]),
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:star"})
		                                                                                           ])
		                                                                                       ])
		                                                                                    ])
		                                                                                ])
		                                                                            ])

																				];
																			})
																		}
																	})

																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","В процессе"),
																[{}].map(function(){
																	if(Task.list != null && Task.list[1] != null){
																		return m("span.uk-badge",Task.list[1].length)
																	}
																})
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	[{}].map(function(){
																		if(Task.list != null && Task.list[1] != null){
																			return Task.list[1].map(function(item){
																				return [
		                                                                          m("li",[
		                                                                                m("div.uk-card uk-card-default",[
		                                                                                    m("div.uk-card-body",[
		                                                                                       m("h4.uk-margin-remove",item.name),
		                                                                                       m("h5.uk-margin-remove",item.project),
		                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:clock"}),
		                                                                                               m("span.uk-margin-small-left",item.deadline)
		                                                                                           ]),
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:star"})
		                                                                                           ])
		                                                                                       ])
		                                                                                    ])
		                                                                                ])
		                                                                            ])

																				];
																			})
																		}
																	})
																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Тестирование"),
																[{}].map(function(){
																	if(Task.list != null && Task.list[2] != null){
																		return m("span.uk-badge",Task.list[2].length)
																	}
																})
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	[{}].map(function(){
																		if(Task.list != null && Task.list[2] != null){
																			return Task.list[2].map(function(item){
																				return [
		                                                                          m("li",[
		                                                                                m("div.uk-card uk-card-default",[
		                                                                                    m("div.uk-card-body",[
		                                                                                       m("h4.uk-margin-remove",item.name),
		                                                                                       m("h5.uk-margin-remove",item.project),
		                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:clock"}),
		                                                                                               m("span.uk-margin-small-left",item.deadline)
		                                                                                           ]),
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:star"})
		                                                                                           ])
		                                                                                       ])
		                                                                                    ])
		                                                                                ])
		                                                                            ])

																				];
																			})
																		}
																	})
																])
                            ])
                        ]),
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Готово"),
																[{}].map(function(){
																	if(Task.list != null && Task.list[3] != null){
																		return m("span.uk-badge",Task.list[3].length)
																	}
																})
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"},[
																	[{}].map(function(){
																		if(Task.list != null && Task.list[3] != null){
																			return Task.list[3].map(function(item){
																				return [
		                                                                          m("li",[
		                                                                                m("div.uk-card uk-card-default",[
		                                                                                    m("div.uk-card-body",[
		                                                                                       m("h4.uk-margin-remove",item.name),
		                                                                                       m("h5.uk-margin-remove",item.project),
		                                                                                       m("div.uk-flex uk-margin-small-top uk-flex-column",[
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:clock"}),
		                                                                                               m("span.uk-margin-small-left",item.deadline)
		                                                                                           ]),
		                                                                                           m("div.uk-flex uk-flex-middle",[
		                                                                                               m("span",{"uk-icon":"icon:star"})
		                                                                                           ])
		                                                                                       ])
		                                                                                    ])
		                                                                                ])
		                                                                            ])

																				];
																			})
																		}
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
