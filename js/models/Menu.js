define(['mithril','titar','models/Auth'], function(n,t,Auth){

    var Menu = {

        pages:[
            {href:"#!/client/list",name:t.localisation.dictionary.CLIENTS,onclick:function(){}},
            {href:"#!/employee/list",name:t.localisation.dictionary.EMPLOYEES,onclick:function(){}},
            {href:"#!/project/list",name:t.localisation.dictionary.PROJECTS,onclick:function(){}},
            {href:"#!/task/my",name:t.localisation.dictionary.MY_TASKS,onclick:function(){}},
        ],
		reload:()=>{
			Menu.pages[0].name = t.localisation.dictionary.CLIENTS;
			Menu.pages[1].name = t.localisation.dictionary.EMPLOYEES;
			Menu.pages[2].name = t.localisation.dictionary.PROJECTS;
			Menu.pages[3].name = t.localisation.dictionary.MY_TASKS;
		}
    }

    return Menu;
});
