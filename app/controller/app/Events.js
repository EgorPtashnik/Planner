sap.ui.define([
    'sap/m/MessageToast',
    'sap/m/MessageBox'
], function(MessageToast) {
    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.ACTION_SUCCEEDED, fnc: this._onActionSucceeded},
                {id: this.EVENT.ACTION_FAILED, fnc: this._onActionFailed}
            ];
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },


        _onNavChanged(_, sEventId, oData) {
            this.getRouter().navTo(oData.route, oData.parameters);
        },

        _onActionSucceeded(_, sEventId, oData) {
            MessageToast.show(oData.value);
        },

        _onActionFailed(_, sEventId, oData) {
            MessageBox.error(oData.error.message);
        }

    }
});
