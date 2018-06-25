define(['mithril','titar','controllers/Project','models/Project'], function(n,t,ProjectController,Project){
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
                            // m("div.uk-search uk-search-default",[
                            //     m("span",{"uk-search-icon":""}),
                            //     m("input.uk-search-input",{type:"search", placeholder:t.localisation.dictionary.SEARCH})
                            // ]),
                            m("a.uk-button uk-button-primary",{href:"#!/project/new"},t.localisation.dictionary.PROJECT_NEW)
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
                    m("table.uk-table uk-table-striped",[
                        m("thead",[
                            m("tr",[
                                m("th",t.localisation.dictionary.NAME),
                                m("th",t.localisation.dictionary.SITE),
                                m("th",t.localisation.dictionary.CLIENT),
                                m("th.uk-flex uk-flex-right",t.localisation.dictionary.MANAGE),
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
																			[{}].map(() => {
																				console.log(project);
																				if(project.clientId != null && project.clientId > 0){
																					return m("a",{href:"#!/client/view/"+project.clientId},project.firstname + " " + project.lastname)
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
												  m('li',[
													  m('a',{href:"#!/project/view/"+project.id+"/task/list"},t.localisation.dictionary.TASKS)
												  ]),
												  m("li.uk-nav-divider"),
												  m("li",[
													  m("a",{onclick:function(){ProjectController.remove(project.id);Project.list.splice(i,1);}},t.localisation.dictionary.PROJECT_DELETE)
												  ])
                                              ])
                                            ]),
                                            m("a.uk-button uk-button-default",{href:"#!/project/edit/"+project.id},t.localisation.dictionary.EDIT)
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
