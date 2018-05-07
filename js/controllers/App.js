define(['mithril','titar','controllers/Auth','views/Layout',
'views/Client/List','views/Client/New', 'views/Client/View',
'views/Employee/List','views/Employee/New', 'views/Employee/View',
'views/Project/List','views/Project/New', 'views/Project/View', 'views/Project/TaskList',
'views/Task/My/List'
], function(n, t, AuthController, Layout,
ClientList, ClientNew, ClientView,
EmployeeList, EmployeeNew, EmployeeView,
ProjectList, ProjectNew, ProjectView, ProjectTaskList,
TaskMyListView){

    var App = {
        init:function(){

        },
        start:function(){
            //if(AuthController.checkStatus() == false){
                //m.mount(document.body,AuthController.getView());
            //}else{
                App.init();
                App.normalStart();
                //test();
           // }
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
								"/task/my": TaskMyListView,
            });
        }
    }

    return App;
});
