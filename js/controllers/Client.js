define(['mithril','titar','models/Client','models/Notification','libs/sortable'], function(n,t,Client,Notification,Sortable){

    var ClientController = {
        init:{
            default:function(){
                ClientController.load.list();
            },
						new:function(){
							ClientController.init.default();
							ClientController.load.nextId();
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

							}else{

							}
					});
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
									
								}else{

								}
						});
					}

				},
    }

    return ClientController;
});
