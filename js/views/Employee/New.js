define(['mithril','controllers/Employee','models/Employee'], function(n,EmployeeController,Employee){
    var EmployeeNewView = {
        oninit: function(){
            EmployeeController.init.new();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3","Новый работник")
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("button.uk-button uk-button-primary",{onclick:function(){EmployeeController.add();}},"Добавить работника")
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
									m("div.uk-card uk-card-default uk-width-1-1",[
										m("div.uk-card-header",[
											m("h3","Профиль")
										]),
										m("div.uk-card-body",[
											m("div.uk-form-stacked",[
												m("div.uk-margin",[
													m("label.uk-form-label","Имя"),
													m("input.uk-input",{placeholder:"Имя", oninput: m.withAttr("value",function(value){Employee.current.firstname = value;}),value:Employee.current.firstname})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label","Фамилия"),
													m("input.uk-input",{placeholder:"Фамилия", oninput: m.withAttr("value",function(value){Employee.current.lastname = value;}),value:Employee.current.lastname})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label","Почта"),
													m("input.uk-input",{placeholder:"Почта", oninput: m.withAttr("value",function(value){Employee.current.email = value;}),value:Employee.current.email})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label","Телефон"),
													m("input.uk-input",{placeholder:"Телефон", oninput: m.withAttr("value",function(value){Employee.current.phone = value;}),value:Employee.current.phone})
												]),
											])
										])
									]),
                ])
            ]);
        },
    }
    return EmployeeNewView;

});
