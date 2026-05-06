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
            if (oData.route === 'sqfMaster') {
                this.getView().setBusy(true);
                this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');
                setTimeout(() => this.getView().setBusy(false));
            }
        }
    }
});
