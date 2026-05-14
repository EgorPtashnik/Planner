sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.ACTION_FAILED, fnc: this._onActionFailed }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onActionFailed(_, sEventId, oData) {
            this.MessageHelper.error({ message: oData.error?.message || oData.message || 'Произошла ошибка.' });
        }
    }
});
