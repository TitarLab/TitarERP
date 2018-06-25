define(['mithril','titar','controllers/Employee','models/Employee'], function(n,t,EmployeeController,Employee){
    var EmployeeListView = {
        oninit: function(){
            EmployeeController.init.default();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3","Работники")
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            // m("div.uk-search uk-search-default",[
                            //     m("span",{"uk-search-icon":""}),
                            //     m("input.uk-search-input",{type:"search", placeholder:"Поиск"})
                            // ]),
                            m("a.uk-button uk-button-primary",{href:"#!/employee/new"},"Новый работник")
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
                    m("table.uk-table uk-table-striped",[
                        m("thead",[
                            m("tr",[
                                m("th","Имя"),
                                m("th.uk-flex uk-flex-right","Управление"),
                            ])
                        ]),
                        m("tbody",[
                            Employee.list.map(function(employee,i){
                                return m("tr",[
                                    m("td",[
																			m("a",{href:"#!/employee/view/"+employee.id},employee.firstname + " " + employee.lastname)
																		]),
                                    m("td.uk-flex uk-flex-right",[
                                        m("div.uk-button-group",[
                                            m("button.uk-button uk-button-default",{},[
                                                m("span",{"uk-icon":"icon:more"})
                                            ]),
											m("div",{"uk-dropdown":""},[
                                              m("ul.uk-nav uk-dropdown-nav",[
												m("li.uk-nav-divider"),
												m("li",[
													m("a",{onclick:function(){EmployeeController.remove(employee.id);Employee.list.splice(i,1);}},t.localisation.dictionary.EMPLOYEE_DELETE)
												])
                                              ])
                                            ]),
                                            m("a.uk-button uk-button-default",{href:"#!/employee/edit/"+employee.id},"Редактировать")
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
    return EmployeeListView;

});
