sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.TODOLIST_CHANGED, fnc: this._refreshStartedTodos },
                { id: this.EVENT.TODOITEM_CHANGED, fnc: this._refreshStartedTodos },
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _refreshStartedTodos() {
            this.byId('idStartedTodos').getBinding('items').refresh();
        }
    };
});
