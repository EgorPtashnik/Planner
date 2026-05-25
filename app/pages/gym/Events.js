sap.ui.define(() => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.GYMTRAINING_CHANGED, fnc: this._onGymTrainingChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onGymTrainingChanged() {
            this.byId('idTrainingHistoryCalendar').getBinding('specialDates').refresh();

            this._getTotal();
        }

    };
});
