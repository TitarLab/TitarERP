define(['mithril','titar'], function(n,t){

    var Task = {
        list:[],
				current:{
					id:0,
					name:"",
				},
				categoryElems:[],
				tempCategoryId:0,
				status:{
					searchList:[],
					new:{
						name:""
					}
				}
    }

    return Task;
});
