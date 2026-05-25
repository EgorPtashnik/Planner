sap.ui.define(() => {
    'use strict';

    return {

        onPressTrainingTile() {
            this.getRouter().navTo('gym');
        },

        onPressAddTraining() {
            this._openAddTrainingDialog();
        }

    };
});
