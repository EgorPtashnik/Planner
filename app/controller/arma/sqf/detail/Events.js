sap.ui.define(() => {
    'use strict';

    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged}
            ];
                
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('sqf')) {
                this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');
                if (oData?.parameters?.id && this.Config.getProperty('/ID') !== oData.parameters.id) {
                    this.getView().setBusy(true);
                    this.Config.setProperty('/ID', oData.parameters.id);
                    this.bindView(oData.parameters.id);
                }
            }
        }
    }
});
