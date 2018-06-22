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
        }
    }

    return Titar;
});
