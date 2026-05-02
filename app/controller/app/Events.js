sap.ui.define(() => {
    'use strict';

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
            this.MessageHelper.toast({ message: oData.value });
        },

        _onActionFailed(_, sEventId, oData) {
            this.MessageHelper.error({ message: oData.error.message });
        }

    }
});
