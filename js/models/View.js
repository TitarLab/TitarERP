define(['mithril','controllers/Employee','models/Employee'], function(n,EmployeeController,Employee){
    var EmployeeView = {
        oninit: function(vnode){
            EmployeeController.init.current(vnode.attrs.id);
        },
        view : function(){
            return m("div.uk-width-expand uk-flex  uk-flex-column",[
							m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
								m("h2.uk-margin-remove", Employee.current.firstname + " " + Employee.current.lastname),
								m("div.uk-flex uk-flex-right",[
									m("div.uk-button-right",[
										m("button.uk-button uk-button-primary",{onclick:function(){EmployeeController.save();}},"Сохранить")
									])
								])
							]),
							m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
								m("div.uk-width-1-6 t-border-right",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":"margin:uk-margin-medium-top"},[
										m("div",[
											m("img.uk-border-rounded",{src:Employee.current.photo, alt:Employee.current.firstname + " " + Employee.current.lastname})
										]),
										m("div",[
											m("ul.uk-list",[
												m("li.uk-nav-header","Проекты"),
											])
										])
									])
								]),
								m("div.uk-width-expand",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":""},[
										m("div.uk-flex uk-flex-column",[
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-firstname"},"Имя"),
													m("input.uk-input",{id:"current-firstname", value:Employee.current.firstname, placeholder:"Имя", oninput: m.withAttr("value",function(value){Employee.current.firstname = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-firstname"},"Фамилия"),
													m("input.uk-input",{id:"current-lastname", value:Employee.current.lastname, placeholder:"Фамилия", oninput: m.withAttr("value",function(value){Employee.current.lastname = value;})})
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-email"},"Почта"),
													m("input.uk-input",{id:"current-email", value:Employee.current.email, placeholder:"Почта", oninput: m.withAttr("value",function(value){Employee.current.email = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-phone"},"Телефон"),
													m("input.uk-input",{id:"current-phone", value:Employee.current.phone, placeholder:"Телефон", oninput: m.withAttr("value",function(value){Employee.current.phone = value;})})
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-lastContact"},"Последний контакт"),
													m("input.uk-input",{id:"current-lastContact", value:Employee.current.lastContact, type:"date", oninput: m.withAttr("value",function(value){Employee.current.lastContact = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-note"},"Примечение"),
													m("input.uk-input",{id:"current-note", value:Employee.current.note, placeholder:"Примечение", oninput: m.withAttr("value",function(value){Employee.current.note = value;})})
												])
											])
										])
									])
								])
							])
            ]);
        },
    }
    return EmployeeView;

});
