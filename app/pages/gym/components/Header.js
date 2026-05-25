sap.ui.define(() => {
    'use strict';

    return {

        onPressAddTraining() {
             this._openAddTrainingDialog();
        },

        async onPressSettle() {
            this.publish(this.EVENT.GYM.SETTLE);
        }

    };
});
