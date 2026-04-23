sap.ui.define(() => {
    'use strict';

    return {
        onPressClosePage() {
            this.getRouter().navTo('todoMaster');
        }
    };
});