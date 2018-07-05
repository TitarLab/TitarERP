define(['mithril',"titar",'controllers/Client','models/Client'], function(n,t,ClientController,Client){
    var ClientNewView = {
        oninit: function(){
            ClientController.init.new();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3",t.localisation.dictionary.CLIENT_NEW)
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("button.uk-button uk-button-primary",{onclick:function(){ClientController.add();}},t.localisation.dictionary.ADD)
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
									m("div.uk-card uk-card-default uk-width-1-1",[
										m("div.uk-card-header",[
											m("h3",t.localisation.dictionary.PROFILE)
										]),
										m("div.uk-card-body uk-flex ",[
											m("div.uk-width-1-5 uk-flex uk-flex-column uk-margin-small-right",[
												[{}].map(function(){
													let tempStyle;
													if(Client.current.photo != null){
														tempStyle = "background-image:url("+Client.current.photo+"); background-size:cover; background-position:center";
													}
													return m("div.uk-background-muted uk-inline uk-border-rounded uk-flex uk-flex-center uk-flex-middle",{style:"width:100%; max-width:256px;height: 256px; max-height:256px;" + tempStyle},[
														[{}].map(function(){
															if((Client.current.photo == null || Client.current.photo.length == 0 ) && Client.current.file == null && Client.current.firstname != null && Client.current.lastname != null){
																return m("span.uk-overlay uk-position-center",{style:"font-size:64px"},Client.current.firstname.substr(0,1) + Client.current.lastname.substr(0,1))
															}else{
																return m("img#test",{style:"width:100%;",file:Client.current.file});
															}
														})
													])
												}),
												m("div",[

												])

											]),
											m("div.uk-width-expand",[
												m("div.uk-form-stacked",[
													m("div.uk-margin",[
														m("label.uk-form-label",t.localisation.dictionary.FIRSTNAME),
														m("input.uk-input",{placeholder:t.localisation.dictionary.FIRSTNAME, oninput: m.withAttr("value",function(value){Client.current.firstname = value;}),value:Client.current.firstname})
													]),
													m("div.uk-margin",[
														m("label.uk-form-label",t.localisation.dictionary.LASTNAME),
														m("input.uk-input",{placeholder:t.localisation.dictionary.LASTNAME, oninput: m.withAttr("value",function(value){Client.current.lastname = value;}),value:Client.current.lastname})
													]),
													m("div.uk-margin",[
														m("label.uk-form-label",t.localisation.dictionary.EMAIL),
														m("input.uk-input",{placeholder:t.localisation.dictionary.EMAIL, oninput: m.withAttr("value",function(value){Client.current.email = value;}),value:Client.current.email})
													]),
													m("div.uk-margin",[
														m("label.uk-form-label",t.localisation.dictionary.PHONE),
														m("input.uk-input",{placeholder:t.localisation.dictionary.PHONE, oninput: m.withAttr("value",function(value){Client.current.phone = value;}),value:Client.current.phone})
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
														m("label.uk-form-label",t.localisation.dictionary.LAST_CONTACT),
														m("input.uk-input",{type:"date", value:Client.current.lastContact, oninput: m.withAttr("value",function(value){Client.current.lastContact = value;})})
													]),
													m("div.uk-margin",[
														m("label.uk-form-label",t.localisation.dictionary.NOTE),
														m("input.uk-input",{placeholder:t.localisation.dictionary.NOTE, oninput: m.withAttr("value",function(value){Client.current.note = value;}),value:Client.current.note})
													]),
													m("div.uk-margin js-upload",{"uk-form-custom":""},[
														m("label.uk-form-label",t.localisation.dictionary.PHOTO),
														m("input",{type:'file', multiple:'', onchange:()=>{ClientController.setThumbnail(event,'test')}}),
														m("button.uk-button uk-button-default", "Загрузить")
													]),
												])
											]),

										])
									]),
									// m("div.uk-card uk-card-default uk-width-1-2 uk-margin-small-left",[
									// 	m("div.uk-card-header",[
									// 		m("h3","Контакты")
									// 	]),
									// 	m("div.uk-card-body",[
									// 		m("button.uk-button uk-button-default","Добавить контакт"),
									// 		m("div",{"uk-dropdown":""},[
									// 			m("ul.uk-nav uk-dropdown-nav",[
									// 				m("li.uk-nav-header","Социальные сети"),
									// 				m("li",[
									// 					m('ul.uk-nav uk-iconnav',[
									// 						m("li",[
									// 							m("a",{onclick:function(){ClientController.addContact("Telegram");}},[
									// 								m("span",{"uk-icon":"icon:t-telegram;ratio:0"})
									// 							])
									// 						]),
									// 						m("li",[
									// 							m("a",{onclick:function(){ClientController.addContact("Instagram");}},[
									// 								m("span",{"uk-icon":"icon:t-instagram;ratio:0"})
									// 							])
									// 						]),
									// 						m("li",[
									// 							m("a",{onclick:function(){ClientController.addContact("Facebook");}},[
									// 								m("span",{"uk-icon":"icon:t-facebook;ratio:0"})
									// 							])
									// 						]),
									// 						m("li",[
									// 							m("a",{onclick:function(){ClientController.addContact("VK");}},[
									// 								m("span",{"uk-icon":"icon:t-vk;ratio:0"})
									// 							])
									// 						]),
									// 					]),
									// 				]),
													// m("li.uk-nav-header","Контакты"),
													// m("li",[
													// 	m("ul.uk-nav uk-iconnav",[
													// 		m("li",[
													// 			m("a",{onclick:function(){ClientController.addContact("Телефон");}},[
													// 				m("span",{"uk-icon":"icon:t-phone;ratio:0"})
													// 			])
													// 		]),
													// 		m("li",[
													// 			m("a",{onclick:function(){ClientController.addContact("Email");}},[
													// 				m("span",{"uk-icon":"icon:t-mail;ratio:0"})
													// 			])
													// 		]),
													// 	])
													// ])
									//
									//
									// 			])
									// 		]),
									// 		m("div.uk-form-skacked uk-margin",[
									// 			[{}].map(function(){
									// 				if(Client.current != null && Client.current.contacts != null && Client.current.contacts.length > 0){
									// 					return Client.current.contacts.map(function(contact, i){
									// 						return m("div.uk-margin",[
									// 							m("label.uk-form-label",{for:"contact-"+i},contact.name),
									// 							m("input.uk-input",{placeholder:contact.name, id:"contact-"+i,value:contact.value, oninput: m.withAttr("value",function(value){contact.value = value;})})
									// 						])
									// 					});
									// 				}
									// 			})
									//
									// 		])
									// 	])
									// ])
                ])
            ]);
        },
    }
    return ClientNewView;

});
