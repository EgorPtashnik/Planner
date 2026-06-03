sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged },
                { id: this.EVENT.TODOITEM_CHANGED, fnc: this._onTodoListChanged },
                { id: this.EVENT.TODOLIST_TAG_CHANGED, fnc: this._onTodoListTagChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onTodoListChanged() {
            this.byId('idTodoList').getBinding('items').refresh();
        },

        _onTodoListTagChanged(_, sEventId, oData) {
            this.State.setProperty('/tagCount', this.byId('idTodoTagList').getBinding('items').getCount());
            this.byId('idCreateListDialogTagComboBox')?.getBinding('items').refresh();
            this.byId('idTodoListTagFilter')?.getBinding('items').refresh();

            if (oData.value) {
                this.State.setProperty('/filterBar/ListTag', []);
                this.onChangeTodoListFilter();
            }
        }

    };
});
