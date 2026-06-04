sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateSqfCommand() {
            this.CreateSqfCommandDialog = await this.CreateSqfCommandDialog;

            this.CreateSqfCommandDialog.open();
        },

        async onPressManageSqfMasterData() {
            this.ManageSqfMasterDataDialog = await this.ManageSqfMasterDataDialog;

            this.ManageSqfMasterDataDialog.open();
        }

    };
});
