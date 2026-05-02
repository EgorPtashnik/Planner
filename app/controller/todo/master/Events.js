sap.ui.define(() => {
    'use strict';

    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged}
            ];
                
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onNavChanged(_, sEventId, oData) {
            if (oData.route === 'todoMaster') {
                this.getView().setBusy(true);
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                setTimeout(() => this.getView().setBusy(false));
            }
        },

        _onTodoListChanged() {
            this.byId('idTodoListsList').getBinding('items').refresh();
        }

    }
});
