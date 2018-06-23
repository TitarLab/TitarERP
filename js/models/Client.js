define(['mithril','titar'], function(n,t){

    var Client = {
        list:[],
				current:{
					id:0,
					name:"",
					contacts:[],
					note:"",
					status:"",
					lastContact:"",
					commentNew:""
					
				}
    }

    return Client;
});
