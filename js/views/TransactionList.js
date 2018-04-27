define(['mithril','controllers/Transaction','models/Transaction'], function(n,TransactionController,Transaction){
    var TransactionListView = {
        oninit: function(){
            TransactionController.init.default();
        },
        view : function(){
            return m('div');
        },
    }
    return TransactionListView;

});