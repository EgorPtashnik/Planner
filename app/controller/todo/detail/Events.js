sap.ui.define(function() {
    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.TODOPARENT_CHANGED, fnc: this._onTodoParentChanged}
            ];
                
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('todo')) {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                if (oData?.parameters?.id && this.Config.getProperty('/ID') !== oData.parameters.id) {
                    this.Config.setProperty('/ID', oData.parameters.id);
                    this.bindView(oData.parameters.id);
                }
            }
        },

        _onTodoParentChanged(_, sEventId, oData) {
            this.byId('idTodoParentList').getBinding('items').refresh();
        }
    }
});
