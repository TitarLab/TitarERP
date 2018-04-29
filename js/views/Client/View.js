define(['mithril','controllers/Client','models/Client'], function(n,ClientController,Client){
    var ClientNewView = {
        oninit: function(vnode){
            ClientController.init.current(vnode.attrs.id);
        },
        view : function(){
            return m("div.uk-width-expand uk-flex  uk-flex-column",[
							m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
								m("h2.uk-margin-remove", Client.current.firstname + " " + Client.current.lastname),
								m("div.uk-flex uk-flex-right",[
									m("div.uk-button-right",[
										m("button.uk-button uk-button-primary",{onclick:function(){alert(Client.current.firstname)}},"Сохранить")
									])
								])
							]),
							m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
								m("div.uk-width-1-6 t-border-right",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":"margin:uk-margin-medium-top"},[
										m("div",[
											m("img.uk-border-rounded",{src:Client.current.photo, alt:Client.current.firstname + " " + Client.current.lastname})
										]),
										m("div",[
											m("ul.uk-list",[
												m("li.uk-nav-header","Проекты"),
												[{}].map(function(){
													if(Client.current.projects != null){
														return Client.current.projects.map(function(project){
															return m("li",project.name)
														})
													}
												})

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
													m("input.uk-input",{id:"current-firstname", value:Client.current.firstname, placeholder:"Имя"})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-firstname"},"Фамилия"),
													m("input.uk-input",{id:"current-lastname", value:Client.current.lastname, placeholder:"Фамилия"})
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-email"},"Почта"),
													m("input.uk-input",{id:"current-email", value:Client.current.email, placeholder:"Почта"})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-phone"},"Телефон"),
													m("input.uk-input",{id:"current-phone", value:Client.current.phone, placeholder:"Телефон"})
												])
											])
										])
									])
								])
							])
            ]);
        },
    }
    return ClientNewView;

});
