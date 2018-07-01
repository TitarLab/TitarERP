define(['mithril','titar','controllers/Client','models/Client'], function(n,t,ClientController,Client){
    var ClientNewView = {
        oninit: function(vnode){
            ClientController.init.current(vnode.attrs.id);
        },
        view : function(){
            return m("div.uk-width-expand uk-flex  uk-flex-column",[
							m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
								m("h2.uk-margin-remove", Client.current.firstname + " " + Client.current.lastname),
								m("div.uk-flex uk-flex-right",[
									m("div.uk-button-group",[
										m("a.uk-button uk-button-default",{href:"#!/client/edit/"+Client.current.id},t.localisation.dictionary.EDIT)
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
												m("li.uk-nav-header",t.localisation.dictionary.PROJECTS),
												[{}].map(function(){
													if(Client.current.projectList != null){
														return Client.current.projectList.map(function(project){
															return m("li",[
																m('a',{href:"#!/project/view/"+project.id},project.name)
															])
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
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.FIRSTNAME),
														m('dd',Client.current.firstname)
													]),
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.LASTNAME),
														m('dd',Client.current.lastname)
													]),
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.EMAIL),
														m('dd',Client.current.email)
													]),
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.PHONE),
														m('dd',Client.current.phone)
													]),
												])
											]),
											m("div.uk-flex uk-flex-row uk-flex-wrap uk-margin",[
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.LAST_CONTACT),
														m('dd',Client.current.lastContact)
													]),
												]),
												m("div.uk-width-1-2 uk-padding-small uk-padding-remove-vertical",[
													m('dl.uk-description-list',[
														m('dt',t.localisation.dictionary.NOTE),
														m('dd',Client.current.note)
													]),
												])
											])
										])
									]),
									m("div.uk-flex uk-flex-column uk-padding-small",[
										m("h3",t.localisation.dictionary.COMMENTS),
										m('ul.uk-comment-list',[
											[{}].map(() => {
												if(Client.current.commentList != null){
													return Object.keys(Client.current.commentList).map((id) => {
														return m("li",[
															m("article.uk-comment uk-comment-primary",[
																m("header.uk-comment-header uk-grid-medium uk-flex-middle",[
																	m('div',[
																		m("h4.uk-comment-title uk-margin-remove",[
																			m("a",Client.current.commentList[id].firstname + " " + Client.current.commentList[id].lastname)
																		]),
																		m("ul.uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top",[
																			m('li',new Date(Client.current.commentList[id].dateCreated.date).toLocaleString()),
																			m("li",[
																				m("a",{onclick:()=>{ClientController.removeComment(id)},"uk-icon":"icon: trash"})
																			])
																		])
																	])
																]),
																m("div.uk-comment-body",[
																	m("p",Client.current.commentList[id].text)
																])
															])
														])
													})
												}
											}),
											m('div',[
												m("textarea.uk-textarea uk-margin-small-bottom",{oninput: m.withAttr("value",function(value){Client.current.commentNew = value;}), value:Client.current.commentNew,placeholder:t.localisation.dictionary.WRITE_A_COMMENT}),
													m("button.uk-button uk-button-primary",{onclick:()=> {ClientController.addComment();}},t.localisation.dictionary.SEND)
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
