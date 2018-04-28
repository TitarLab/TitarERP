define(['mithril','controllers/Client','models/Client'], function(n,ClientController,Client){
    var ClientNewView = {
        oninit: function(){
            ClientController.init.new();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3","Новый клиент")
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("button.uk-button uk-button-primary",{onclick:function(){ClientController.add();}},"Добавить клиента")
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
									m("div.uk-card uk-card-default uk-width-1-2",[
										m("div.uk-card-header",[
											m("h3","Профиль")
										]),
										m("div.uk-card-body",[
											m("div.uk-form-stacked",[
												m("uk-margin",[
													m("label.uk-form-label","Имя"),
													m("input.uk-input",{placeholder:"Имя", oninput: m.withAttr("value",function(value){Client.current.name = value;}),value:Client.current.name})
												]),
												m("uk-margin",[
													m("label.uk-form-label","Статус"),
													m("select.uk-select",{oninput: m.withAttr("value",function(value){Client.current.status = value;})},[
														m("option","Новый клиент"),
														m("option","Обсуждение"),
														m("option","Проект"),
														m("option","Разработка"),
														m("option","Поддержка"),
														m("option","Окончен"),
													])
												]),
												m("uk-margin",[
													m("label.uk-form-label","Дата контакта"),
													m("input.uk-input",{type:"date", value:Client.current.lastContact, oninput: m.withAttr("value",function(value){Client.current.lastContact = value;})})
												]),
												m("uk-margin",[
													m("label.uk-form-label","Примечание"),
													m("input.uk-input",{placeholder:"Примечание", oninput: m.withAttr("value",function(value){Client.current.note = value;}),value:Client.current.note})
												]),
											])
										])
									])
                ])
            ]);
        },
    }
    return ClientNewView;

});
