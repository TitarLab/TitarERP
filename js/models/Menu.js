define(['mithril','titar','models/Auth'], function(n,t,Auth){

    var Menu = {

        pages:[
            {href:"#!/client/list",name:t.localisation.dictionary.CLIENTS,onclick:function(){}},
            {href:"#!/employee/list",name:t.localisation.dictionary.EMPLOYEES,onclick:function(){}},
            {href:"#!/project/list",name:t.localisation.dictionary.PROJECTS,onclick:function(){}},
            {href:"#!/task/my",name:t.localisation.dictionary.MY_TASKS,onclick:function(){}},
        ],
		reload:()=>{
			this.pages = pages:[
	            {href:"#!/client/list",name:t.localisation.dictionary.CLIENTS,onclick:function(){}},
	            {href:"#!/employee/list",name:t.localisation.dictionary.EMPLOYEES,onclick:function(){}},
	            {href:"#!/project/list",name:t.localisation.dictionary.PROJECTS,onclick:function(){}},
	            {href:"#!/task/my",name:t.localisation.dictionary.MY_TASKS,onclick:function(){}},
	        ]
		}
    }

    return Menu;
});
