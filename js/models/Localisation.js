define(['mithril','titar'], function(n,t){

    var Localisation = {
		list:{
			"pl-PL":"PL",
			"ru-RU":"RU",
			"en-GB":"EN",
		},
        currentLanguage:"ru",
		dictionary:{
			NAME:"NAME",
			STATUS:"STATUS",
			LAST_CONTACT:"LAST_CONTACT",
			NOTE:"NOTE",
			CONTACTS:"CONTACTS",
			CONTACT:"CONTACT",
			MANAGE:"MANAGE",
			SEARCH:"SEARCH",
			EDIT:"EDIT",
			TODAY:"TODAY",
			YESTERDAY:"YESTERDAY",
			SITE:"SITE",
			LOGIN:"LOGIN",
			PASSWORD:"PASSWORD",
			SAVE:"SAVE",
			BACK:"BACK",

			CLIENT_NAME:"CLIENT_NAME",
			CLIENT_NEW:"CLIENT_NEW",
			CLIENT_EDIT:"CLIENT_EDIT",
			CLIENT_DELETE:"CLIENT_DELETE",
			CLIENT_UPDATE_LAST_CONTACT:"CLIENT_UPDATE_LAST_CONTACT",
			CLIENT:"CLIENT",
			CLIENTS:"CLIENTS",

			PROJECT:"PROJECT",
			PROJECTS:"PROJECTS",
			PROJECT_NEW:"PROJECT_NEW",
			PROJECT_DELETE:"PROJECT_DELETE",

			TASK:"TASK",
			TASKS:"TASKS",
		}
    }

    return Localisation;
});
