sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                // { id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        // _onTodoListChanged() {
        //     this.byId('idTodoList').getBinding('items').refresh();
        // }

    };
});
