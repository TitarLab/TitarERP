define(['mithril','titar','models/Employee','models/Notification','libs/sortable'], function(n,t,Employee,Notification,Sortable){

    var EmployeeController = {
        init:{
            default:function(){
							EmployeeController.clearCurrent();
                EmployeeController.load.list();
            },
						new:function(){
							EmployeeController.init.default();
							EmployeeController.load.nextId();
						},
						current:function(id){
							EmployeeController.init.default();
							EmployeeController.load.current(id);
							Employee.list.forEach(function(item){
								if(item.id == id){
									Employee.current = item;

								}
							})


						}
        },
        load:{
            list:function(){
                m.request({
                    method: "POST",
                    url:"../api/api.php",
                    data:{model:"employee",action:"get"},
                    withCredentials:true,
                }).then(function(report){
                    if(report.code == 200){
                        Employee.list = report.result;
                    }else{

                    }
                });
            },
						current:function(id){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"employee",action:"getCurrent", id:id},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Employee.current = report.result
									}else{

									}
							});
						},
						nextId:function(){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"employee",action:"getNextId"},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Employee.current.id = report.result;
									}else{

									}
							});
						}
        },
				add:function(){
					m.request({
							method: "POST",
							url:"../api/api.php",
							data:{model:"employee",action:"add", employee:Employee.current},
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){
								m.route.set("/employee/list")
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
							}else{

							}
					});
				},
				save:function(){
					if(Employee.current != null){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"employee",action:"save", employee:Employee.current},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									m.route.set("/employee/view/"+Employee.current.id)
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
								data:{model:"employee",action:"remove", id:id},
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
				},
				clearCurrent:function(){
					Object.keys(Employee.current).forEach(function(item){
						Employee.current[item] = null;
					});
				}
    }

    return EmployeeController;
});
