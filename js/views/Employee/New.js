define(['mithril','controllers/Client','models/Client'], function(n,ClientController,Client){
    var EmployeeNewView = {
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
												m("div.uk-margin",[
													m("label.uk-form-label","Имя"),
													m("input.uk-input",{placeholder:"Имя", oninput: m.withAttr("value",function(value){Client.current.firstname = value;}),value:Client.current.firstname})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label","Фамилия"),
													m("input.uk-input",{placeholder:"Фамилия", oninput: m.withAttr("value",function(value){Client.current.lastname = value;}),value:Client.current.lastname})
												]),
												m("div.uk-margin",[
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
												m("div.uk-margin",[
													m("label.uk-form-label","Дата контакта"),
													m("input.uk-input",{type:"date", value:Client.current.lastContact, oninput: m.withAttr("value",function(value){Client.current.lastContact = value;})})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label","Примечание"),
													m("input.uk-input",{placeholder:"Примечание", oninput: m.withAttr("value",function(value){Client.current.note = value;}),value:Client.current.note})
												]),
											])
										])
									]),
									m("div.uk-card uk-card-default uk-width-1-2 uk-margin-small-left",[
										m("div.uk-card-header",[
											m("h3","Контакты")
										]),
										m("div.uk-card-body",[
											m("button.uk-button uk-button-default","Добавить контакт"),
											m("div",{"uk-dropdown":""},[
												m("ul.uk-nav uk-dropdown-nav",[
													m("li.uk-nav-header","Социальные сети"),
													m("li",[
														m('ul.uk-nav uk-iconnav',[
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("Telegram");}},[
																	m("span",{"uk-icon":"icon:t-telegram;ratio:0"})
																])
															]),
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("Instagram");}},[
																	m("span",{"uk-icon":"icon:t-instagram;ratio:0"})
																])
															]),
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("Facebook");}},[
																	m("span",{"uk-icon":"icon:t-facebook;ratio:0"})
																])
															]),
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("VK");}},[
																	m("span",{"uk-icon":"icon:t-vk;ratio:0"})
																])
															]),
														]),
													]),
													m("li.uk-nav-header","Контакты"),
													m("li",[
														m("ul.uk-nav uk-iconnav",[
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("Телефон");}},[
																	m("span",{"uk-icon":"icon:t-phone;ratio:0"})
																])
															]),
															m("li",[
																m("a",{onclick:function(){ClientController.addContact("Email");}},[
																	m("span",{"uk-icon":"icon:t-mail;ratio:0"})
																])
															]),
														])
													])


												])
											]),
											m("div.uk-form-skacked uk-margin",[
												[{}].map(function(){
													if(Client.current != null && Client.current.contacts != null && Client.current.contacts.length > 0){
														return Client.current.contacts.map(function(contact, i){
															return m("div.uk-margin",[
																m("label.uk-form-label",{for:"contact-"+i},contact.name),
																m("input.uk-input",{placeholder:contact.name, id:"contact-"+i,value:contact.value, oninput: m.withAttr("value",function(value){contact.value = value;})})
															])
														});
													}
												})

											])
										])
									])
                ])
            ]);
        },
    }
    return EmployeeNewView;

});
