sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged },
                { id: this.EVENT.TODOITEM_CHANGED, fnc: this._onTodoListChanged },
                { id: this.EVENT.GYMTRAINING_CHANGED, fnc: this._onGymTrainingChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onTodoListChanged() {
            this.byId('idStartedTodos').getBinding('items').refresh();
        },

        _onGymTrainingChanged() {
            this.byId('idTrainingTileHeader').getBindingContext('gym').refresh();
        }
    };
});
