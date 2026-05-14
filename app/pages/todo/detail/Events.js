sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
            //     { id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged },
                { id: this.EVENT.TODOLIST_TAG_CHANGED, fnc: this._onTodoListTagChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onTodoListTagChanged() {
            this.getView().getBindingContext('todo').refresh();
            this.byId('idEditListDialogTagComboBox')?.getBinding('items').refresh();
        }

    };
});
