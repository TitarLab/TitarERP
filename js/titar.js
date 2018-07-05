define(['models/Localisation'], function(Localisation){

    var Titar = {
		localisation:Localisation,
        global:{
            host:"https://wallet.titarlab.com/",
            siteTitle:"TitarERP",
            logo: "https://wallet.titarlab.com/img/logo.png"
        },
        getById: function(id){
            return document.getElementById(id);
        },
		getCookie:function(name) {
		  var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		  ));
		  return matches ? decodeURIComponent(matches[1]) : undefined;
	  },
	  sort:(list, argument) => {
		  list.sort(function(obj1,obj2){
			  if(typeof obj1[argument] === "number"){
				  return obj1[argument] - obj2[argument];
			  }else{
				  if (obj1[argument].toLowerCase() < obj2[argument].toLowerCase()) return 1;
				  if (obj1[argument].toLowerCase() > obj2[argument].toLowerCase()) return -1;
				  return 0;
			  }

		  });
	  },
        getDate(offset = 0){
            var date;
            var dateNow = new Date();
            dateNow.setDate(dateNow.getDate()+offset);
            date = dateNow.getFullYear();
            date += "-";
            if(dateNow.getMonth()+1 < 10){
                date += "0";
            }
            date += dateNow.getMonth()+1;

            date += "-";
            if(dateNow.getDate() < 10){
                date += "0";
            }
            date += dateNow.getDate();
            return date;
        },
        getTime: function(){
            var time = "";
            var dateNow = new Date();
            if(dateNow.getHours() < 10){
                time += "0";
            }
            time += dateNow.getHours();
            time += ":";
            if(dateNow.getMinutes < 10){
                time += "0";
            }
            time += dateNow.getMinutes();
            return time;
        },
    }

    return Titar;
});
