define(['mithril','titar','controllers/Client','models/Client'], function(n,t,ClientController,Client){
    var ClientEditView = {
        oninit: function(vnode){
            ClientController.init.current(vnode.attrs.id);
        },
        view : function(){
            return m("div.uk-width-expand uk-flex  uk-flex-column",[
							m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
								m("h2.uk-margin-remove", Client.current.firstname + " " + Client.current.lastname),
								m("div.uk-flex uk-flex-right",[
									m("div.uk-button-right",[
										m("a.uk-button uk-button-default",{href:"#!/client/view/"+Client.current.id},t.localisation.dictionary.BACK),
										m("button.uk-button uk-button-primary",{onclick:function(){ClientController.save();}},t.localisation.dictionary.SAVE)
									])
								])
							]),
							m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
								m("div.uk-width-1-6 t-border-right",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":"margin:uk-margin-medium-top"},[
										[{}].map(function(){
											let tempStyle;
											if(Client.current.photo != null){
												tempStyle = "background-image:url("+Client.current.photo+"); background-size:cover; background-position:center";
											}
											return m("div.uk-background-muted uk-inline uk-border-rounded uk-flex uk-flex-center uk-flex-middle",{style:"width:100%; padding-top: 100%;" + tempStyle},[
												[{}].map(function(){
													if((Client.current.photo == null || Client.current.photo.length == 0 )&& Client.current.firstname != null && Client.current.lastname != null){
														return m("span.uk-overlay uk-position-center",{style:"font-size:64px"},Client.current.firstname.substr(0,1) + Client.current.lastname.substr(0,1))
													}
												})
											])
										}),
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
													m("label",{for:"current-firstname"},t.localisation.dictionary.FIRSTNAME),
													m("input.uk-input",{id:"current-firstname", value:Client.current.firstname, placeholder:t.localisation.dictionary.FIRSTNAME, oninput: m.withAttr("value",function(value){Client.current.firstname = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-firstname"},t.localisation.dictionary.LASTNAME),
													m("input.uk-input",{id:"current-lastname", value:Client.current.lastname, placeholder:t.localisation.dictionary.LASTNAME, oninput: m.withAttr("value",function(value){Client.current.lastname = value;})})
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-email"},t.localisation.dictionary.EMAIL),
													m("input.uk-input",{id:"current-email", value:Client.current.email, placeholder:t.localisation.dictionary.EMAIL, oninput: m.withAttr("value",function(value){Client.current.email = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-phone"},t.localisation.dictionary.PHONE),
													m("input.uk-input",{id:"current-phone", value:Client.current.phone, placeholder:t.localisation.dictionary.PHONE, oninput: m.withAttr("value",function(value){Client.current.phone = value;})})
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-lastContact"},t.localisation.dictionary.LAST_CONTACT),
													m("input.uk-input",{id:"current-lastContact", value:Client.current.lastContact, type:"date", oninput: m.withAttr("value",function(value){Client.current.lastContact = value;})})
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m("label",{for:"current-note"},t.localisation.dictionary.NOTE),
													m("input.uk-input",{id:"current-note", value:Client.current.note, placeholder:t.localisation.dictionary.NOTE, oninput: m.withAttr("value",function(value){Client.current.note = value;})})
												])
											])
										])
									])
								])
							])
            ]);
        },
    }
    return ClientEditView;

});
