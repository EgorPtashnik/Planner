sap.ui.define(function() {
    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged}
            ];
                
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('todo')) {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                if (oData?.parameters?.item && this.Config.getProperty('/ID') !== oData.parameters.item) {
                    this.Config.setData({
                        ID: oData.parameters.item,
                        editTodoItems: false
                    });
                    this.bindView(oData.parameters.item, oData.parameters.id);
                }
            }
        }
    }
});
