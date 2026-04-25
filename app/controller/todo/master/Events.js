sap.ui.define(function() {
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
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
            }
        },

        _onTodoListChanged() {
            this.byId('idTodoList').getBinding('items').refresh();
        }

    }
});
