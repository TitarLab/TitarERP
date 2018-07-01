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
                    method: "GET",
                    url:"../api/employee/list",
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
									method: "get",
									url:"../api/employee/"+id,
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
									method: "get",
									url:"../api/employee/next/id",
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
							url:"../api/employee/add",
							data:Employee.current,
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){
								m.route.set("/employee/list")
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
							}else{
								UIkit.notification(report.info,{status:'danger'});
							}
					});
				},
				save:function(){
					if(Employee.current != null){
						m.request({
								method: "POST",
								url:"../api/employee/"+Employee.current.id+"/save",
								data:Employee.current,
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									m.route.set("/employee/view/"+Employee.current.id)
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{
									UIkit.notification(report.info,{status:'danger'});
								}
						});
					}

				},
				remove:function(id){
					if(id != null){
						m.request({
								method: "delete",
								url:"../api/employee/"+id+"/remove",
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}

				},
				clearCurrent:function(){
					Object.keys(Employee.current).forEach(function(item){
						Employee.current[item] = null;
					});
				},
				search:function(value){
					m.request({
							method: "POST",
							url:"../api/employee/search",
							data:{value:value},
							withCredentials:true,

					}).then(function(report){
							if(report.code == 200){
								Employee.searchList = report.result;
							}else{

							}
					});
				},
    }

    return EmployeeController;
});
