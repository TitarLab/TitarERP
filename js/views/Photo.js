define(['mithril','models/Album'], function(n,Album){
    var PhotoView = {
        oninit: function(vnode){
            
        },
        view : function(photo){
            return m("div.filemanager-wrapper",{},[
                m("div.filemanager-panel",[
                    m("img.draggable",{src:"../img/list.png"}),
                    m("img.garbage",{src:"../img/garbage.png"}),
                ]),
                m("div.filemanager-file",[
                    m("img",{src:photo})
                ])
            ])
        }
    }
    return PhotoView;

});