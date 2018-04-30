define(['mithril','controllers/Project','models/Project'], function(n,ProjectController,Project){
    var ProjectListView = {
        oninit: function(){
            ProjectController.init.default();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3","Проекты")
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("div.uk-search uk-search-default",[
                                m("span",{"uk-search-icon":""}),
                                m("input.uk-search-input",{type:"search", placeholder:"Поиск"})
                            ]),
                            m("a.uk-button uk-button-primary",{href:"#!/project/new"},"Новый проект")
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
                    m("table.uk-table uk-table-striped",[
                        m("thead",[
                            m("tr",[
                                m("th","Название"),
                                m("th","Сайт"),
                                m("th","Клиент"),
                                m("th.uk-flex uk-flex-right","Управление"),
                            ])
                        ]),
                        m("tbody",[
                            Project.list.map(function(project,i){
                                return m("tr",[
                                    m("td",[
																			m("a",{href:"#!/project/view/"+project.id},project.name)
																		]),
																		m("td",[
																			m("a",{href:project.url},project.url)
																		]),
																		m("td",[
																			m("a",{href:"#!/client/view/"+project.client_id},project.firstname + " " + project.lastname)
																		]),
                                    m("td.uk-flex uk-flex-right",[
                                        m("div.uk-button-group",[
                                            m("button.uk-button uk-button-default",{},[
                                                m("span",{"uk-icon":"icon:more"})
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
    return ProjectListView;

});
