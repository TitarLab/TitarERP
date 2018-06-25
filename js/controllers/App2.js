define(['mithril','titar','models/Menu'], function(n, t, Menu){

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
				Menu.reload();
				document.cookie = "language="+language+"; path=/; expires=" + new Date(new Date().getTime() + 60 * 10000000).toUTCString();
			});
		}
    }

    return App2;
});
