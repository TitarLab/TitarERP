define([], function(){

    var Titar = {
        global:{
            host:"https://wallet.titarlab.com/",
            siteTitle:"TitarCRM",
            logo: "https://wallet.titarlab.com/img/logo.png"
        },
        getById: function(id){
            return document.getElementById(id);
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
