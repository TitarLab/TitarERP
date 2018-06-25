define(['mithril','titar','controllers/Employee','models/Employee'], function(n,t,EmployeeController,Employee){
    var EmployeeNewView = {
        oninit: function(){
            EmployeeController.init.new();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3",t.localisation.dictionary.EMPLOYEE_NEW)
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("button.uk-button uk-button-primary",{onclick:function(){EmployeeController.add();}},t.localisation.dictionary.ADD)
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
									m("div.uk-card uk-card-default uk-width-1-1",[
										m("div.uk-card-header",[
											m("h3",t.localisation.dictionary.PROFILE)
										]),
										m("div.uk-card-body",[
											m("div.uk-form-stacked",[
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.FIRSTNAME),
													m("input.uk-input",{placeholder:t.localisation.dictionary.FIRSTNAME, oninput: m.withAttr("value",function(value){Employee.current.firstname = value;}),value:Employee.current.firstname})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.LASTNAME),
													m("input.uk-input",{placeholder:t.localisation.dictionary.LASTNAME, oninput: m.withAttr("value",function(value){Employee.current.lastname = value;}),value:Employee.current.lastname})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.EMAIL),
													m("input.uk-input",{placeholder:t.localisation.dictionary.EMAIL, oninput: m.withAttr("value",function(value){Employee.current.email = value;}),value:Employee.current.email})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.PHONE),
													m("input.uk-input",{placeholder:t.localisation.dictionary.PHONE, oninput: m.withAttr("value",function(value){Employee.current.phone = value;}),value:Employee.current.phone})
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
