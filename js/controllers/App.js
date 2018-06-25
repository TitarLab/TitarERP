define(['mithril','titar','controllers/Auth','views/Layout',
'views/Client/List','views/Client/New', 'views/Client/View', 'views/Client/Edit',
'views/Employee/List','views/Employee/New', 'views/Employee/View', 'views/Employee/Edit',
'views/Project/List','views/Project/New', 'views/Project/View', 'views/Project/TaskList', 'views/Project/Edit',
'views/Task/My/List',
'views/App/Login',
'models/Menu'
], function(n, t, AuthController, Layout,
ClientList, ClientNew, ClientView, ClientEdit,
EmployeeList, EmployeeNew, EmployeeView, EmployeeEdit,
ProjectList, ProjectNew, ProjectView, ProjectTaskList, ProjectEdit,
TaskMyListView,
LoginView,
Menu){

    var App = {
        init:function(){

        },
        start:function(){
			if(document.cookie.match("language")){
				App.setLanguage(t.getCookie("language"));
			}else{
				App.setLanguage("en-GB");
			}
            if(AuthController.checkStatus() == false){
                m.mount(document.body,LoginView);
            }else{
                App.init();
                App.normalStart();
                //test();
           }
        },
		setLanguage(language){
			m.request({
					method: "POST",
					url:"../localisation/"+language+".json",
					data:{},
					withCredentials:true,
			}).then(function(report){
				t.localisation.dictionary = report;
				t.localisation.currentLanguage = t.localisation.list[language];
				Menu.reload();
				document.cookie = "language="+language+"; path=/; expires=" + new Date(new Date().getTime() + 60 * 10000000).toUTCString();
			});
		},
        normalStart:function(){
            m.mount(document.body,Layout);
            m.route(t.getById('content'), "/client/list", {
                "/client/list": ClientList,
                "/client/new": ClientNew,
                "/client/view/:id": ClientView,
                "/client/edit/:id": ClientEdit,
				"/employee/list": EmployeeList,
                "/employee/new": EmployeeNew,
                "/employee/view/:id": EmployeeView,
                "/employee/edit/:id": EmployeeEdit,
				"/project/list": ProjectList,
                "/project/new": ProjectNew,
                "/project/view/:id": ProjectView,
                "/project/view/:id/task/list": ProjectTaskList,
                "/project/edit/:id": ProjectEdit,
				"/task/my": TaskMyListView,
            });
        }
    }

    return App;
});
