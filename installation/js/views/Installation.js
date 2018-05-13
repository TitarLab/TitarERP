define(['mithril','controllers/Installation','models/Installation'], function(n,InstallationController,Installation){
    var InstallationView = {
        oninit: function(vnode){
        },
        view : function(){
					return [
						m("div.uk-flex uk-flex-center uk-flex-middle  uk-flex-column",{"uk-height-viewport":"expand: true"},[
							m("div.uk-card uk-card-default uk-width-1-2",[
								m("div.uk-card-header uk-background-primary uk-light",[
									m("h4","Конфигурация базы данных")
								]),
								m("div.uk-card-body",[
									m("div.uk-form-stacked",[
										m("div.uk-margin",[
											m("label","Тип базы данных *"),
											m("div.uk-form-controls",[
												m("select.uk-select",{oninput: m.withAttr("value",function(value){Installation.type = value;})},[
													m("option","MySQL")
												])
											])
										]),
										m("div.uk-margin",[
											m("label","Имя сервера базы данных *"),
											m("div.uk-form-controls",[
												m("input.uk-input",{value:Installation.host, oninput: m.withAttr("value",function(value){Installation.host = value;})})
											])
										]),
										m("div.uk-margin",[
											m("label","Имя пользователя *"),
											m("div.uk-form-controls",[
												m("input.uk-input",{value:Installation.login, oninput: m.withAttr("value",function(value){Installation.login = value;})})
											])
										]),
										m("div.uk-margin",[
											m("label","Пароль"),
											m("div.uk-form-controls",[
												m("input.uk-input",{type:"password",value:Installation.password, oninput: m.withAttr("value",function(value){Installation.password = value;})})
											])
										]),
										m("div.uk-margin",[
											m("label","Имя базы данных *"),
											m("div.uk-form-controls",[
												m("input.uk-input",{type:"text",value:Installation.database, oninput: m.withAttr("value",function(value){Installation.database = value;})})
											])
										]),
										m("div.uk-margin",[
											m("label","Префикс таблиц"),
											m("div.uk-form-controls",[
												m("input.uk-input",{type:"text",value:Installation.prefix, oninput: m.withAttr("value",function(value){Installation.prefix = value;})})
											])
										]),
										m("div.uk-margin",[
											m("button.uk-button uk-button-primary uk-width-1-1",{onclick:function(){InstallationController.process();}},"Далее")
										]),
									])
								])
							])
						])
					]
        },
    }
    return InstallationView;

});
