define(['mithril','titar'], function(n,t){

    var Project = {
        list:[],
		current:{
			id:0,
			name:"",
			tagList:[]
			},
		tag:{
			searchList:[],
			new:{
			name:""
			}
		}
    }

    return Project;
});
