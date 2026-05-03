sap.ui.define(() => {
    'use strict';

    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.ACTION_REQUESTED, fnc: this._onActionRequested},
                {id: this.EVENT.ACTION_SUCCEEDED, fnc: this._onActionSucceeded},
                {id: this.EVENT.ACTION_FAILED, fnc: this._onActionFailed}
            ];
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },


        _onNavChanged(_, sEventId, oData) {
            this.getRouter().navTo(oData.route, oData.parameters);
        },

        _onActionRequested(_, sEventId, oData) {
            const oAction = this.getView().getModel(oData.model).bindContext(oData.action, oData.context);
            Object.entries(oData.parameters || {}).forEach(entry => oAction.setParameter(entry[0], entry[1]));

            return oAction.invoke(oData.group || "$auto")
                .then(oResult => {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, oData.message);
                    oData.then?.call(this, oResult, oAction);
                })
                .catch(oError => {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                    oData.catch?.call(this, oError, oAction);
                })
                .finally(() => oAction.destroy());
        },

        _onActionSucceeded(_, sEventId, oData) {
            this.MessageHelper.toast({ message: oData.value });
        },

        _onActionFailed(_, sEventId, oData) {
            this.MessageHelper.error({ message: oData.error?.message || oData.message || 'Произошла ошибка.' });
        },



    }
});
