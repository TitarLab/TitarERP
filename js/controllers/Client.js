define(['mithril','titar','models/Client','models/Notification','libs/sortable'], function(n,t,Client,Notification,Sortable){

    var ClientController = {
        init:{
            default:function(){
                ClientController.load.list();
            },
						new:function(){
							ClientController.init.default();
							ClientController.load.nextId();
						},
						current:function(id){
							ClientController.load.current(id);
							ClientController.init.default();
						}
        },
        load:{
            list:function(){
                m.request({
                    method: "POST",
                    url:"../api/api.php",
                    data:{model:"client",action:"get"},
                    withCredentials:true,
                }).then(function(report){
                    if(report.code == 200){
                        Client.list = report.result;
												if(Client.list != null){
													Client.list.forEach(function(client){
														if(client.contacts != null && client.contacts != ""){
															client.contacts = JSON.parse(client.contacts);
														}

													});
												}

                    }else{

                    }
                });
            },
						current:function(id){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"client",action:"getCurrent", id:id},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Client.current = report.result
											if(Client.current.contacts != null && Client.current.contacts != ""){
												Client.current.contacts = JSON.parse(Client.current.contacts);
											}

									}else{

									}
							});
						},
						nextId:function(){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"client",action:"getNextId"},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Client.current.id = report.result;
									}else{

									}
							});
						}
        },
				add:function(){
					m.request({
							method: "POST",
							url:"../api/api.php",
							data:{model:"client",action:"add", client:Client.current},
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
							}else{

							}
					});
				},
				save:function(){
					if(Client.current != null){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"client",action:"save", client:Client.current},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}

				},
				remove:function(id){
					if(id != null){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"client",action:"remove", id:id},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}

				},
				addContact:function(name){
					let contact = {
						name:name,
						value:""
					};
					Client.current.contacts.push(contact);
				}
    }

    return ClientController;
});
