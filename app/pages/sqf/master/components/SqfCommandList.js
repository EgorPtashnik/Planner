sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateSqfCommand() {
            this.CreateSqfCommandDialog = await this.CreateSqfCommandDialog;

            this.State.setProperty('/CreateSqfCommandDialog', {
                name: null,
                type: 'Функция',
                source: 'EP',
                info: null,
                tags: []
            });

            this.CreateSqfCommandDialog.open();
        },

        async onPressManageSqfMasterData() {
            this.ManageSqfMasterDataDialog = await this.ManageSqfMasterDataDialog;

            this.ManageSqfMasterDataDialog.open();
        }

    };
});
