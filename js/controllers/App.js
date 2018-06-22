define(['mithril','titar','controllers/Auth','views/Layout',
'views/Client/List','views/Client/New', 'views/Client/View',
'views/Employee/List','views/Employee/New', 'views/Employee/View',
'views/Project/List','views/Project/New', 'views/Project/View', 'views/Project/TaskList', 'views/Project/Edit',
'views/Task/My/List',
'views/App/Login'
], function(n, t, AuthController, Layout,
ClientList, ClientNew, ClientView,
EmployeeList, EmployeeNew, EmployeeView,
ProjectList, ProjectNew, ProjectView, ProjectTaskList, ProjectEdit,
TaskMyListView,
LoginView){

    var App = {
        init:function(){

        },
        start:function(){
            if(AuthController.checkStatus() == false){
                m.mount(document.body,LoginView);
            }else{
                App.init();
                App.normalStart();
				App.setLanguage("ru-RU");
				App.setLanguage("en-GB");
				App.setLanguage("pl-PL");
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
			});
		},
        normalStart:function(){
            m.mount(document.body,Layout);
            m.route(t.getById('content'), "/client/list", {
                "/client/list": ClientList,
                "/client/new": ClientNew,
                "/client/view/:id": ClientView,
				"/employee/list": EmployeeList,
                "/employee/new": EmployeeNew,
                "/employee/view/:id": EmployeeView,
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
