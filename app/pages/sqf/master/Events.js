sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.SQF_TAG_CHANGED, fnc: this._onSqfTagChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onSqfTagChanged() {
            this.State.setProperty('/tagCount', this.byId('idSqfTagList').getBinding('items').getCount());
        }

    };
});
