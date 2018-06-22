define(['mithril','titar'], function(n, t){

    var App2 = {
		setLanguage(language){
			m.request({
					method: "POST",
					url:"../localisation/"+language+".json",
					data:{},
					withCredentials:true,
			}).then(function(report){
				t.localisation.dictionary = report;
				t.localisation.currentLanguage = t.localisation.list[language];
			});
		}
    }

    return App2;
});
