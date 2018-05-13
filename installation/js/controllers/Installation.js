define(['mithril','titar','models/Installation'
], function(n, t, Installation){

    var InstallationController = {
        process:function(){
					let config = Installation;
					m.request({
							method: "POST",
							url:"../installation/installator.php",
							data:{config},
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){

							}else{

							}
					});
				}
    }

    return InstallationController;
});
