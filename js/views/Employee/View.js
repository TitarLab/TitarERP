define(['mithril','titar','controllers/Employee','models/Employee'], function(n,t,EmployeeController,Employee){
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
										m("a.uk-button uk-button-default",{href:"#!/employee/edit/"+Employee.current.id},t.localisation.dictionary.EDIT)
									])
								])
							]),
							m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
								m("div.uk-width-1-6 t-border-right",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":"margin:uk-margin-medium-top"},[
										[{}].map(function(){
											let tempStyle;
											if(Employee.current.photo != null){
												tempStyle = "background-image:url("+Employee.current.photo+"); background-size:cover; background-position:center";
											}
											return m("div.uk-background-muted uk-inline uk-border-rounded uk-flex uk-flex-center uk-flex-middle",{style:"width:100%; padding-top: 100%;" + tempStyle},[
												[{}].map(function(){
													if((Employee.current.photo == null || Employee.current.photo.length == 0 )&& Employee.current.firstname != null && Employee.current.lastname != null){
														return m("span.uk-overlay uk-position-center",{style:"font-size:64px"},Employee.current.firstname.substr(0,1) + Employee.current.lastname.substr(0,1))
													}
												})
											])
										}),
										m("div",[
											m("ul.uk-list",[
												//m("li.uk-nav-header","Проекты"),
											])
										])
									])
								]),
								m("div.uk-width-expand",[
									m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":""},[
										m("div.uk-flex uk-flex-column",[
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.FIRSTNAME),
														m('dd',Employee.current.firstname)
													]),
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.LASTNAME),
														m('dd',Employee.current.lastname)
													]),
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.EMAIL),
														m('dd',Employee.current.email)
													]),
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.PHONE),
														m('dd',Employee.current.phone)
													]),
												])
											]),
										])
									]),
								])
							])
            ]);
        },
    }
    return EmployeeView;

});
