define(['mithril','titar','controllers/Menu','models/Menu'], function(n,t,MenuController,Menu){
    var MenuView = {
        view: function(){
            return m("ul.uk-navbar-nav",[
                Menu.pages.map(function(page){
                    return m("li",[
                        m("a",{href:page.href},MenuView.menuLi(page))
                    ])
                })

                
            ])
        },
        menuLi:function(page){
            //var img = m('img',{src:page.img});
            var span = m('span',page.name);
            //var badge = null;
            //if(page.badge != null){
             //   badge = m('span',{class:"countMail"},t.global.backlog);
            //}
            var li = [span];
            return li
        }
    }
    return MenuView;
    
});