sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateTag() {
            try {
                const oContext = this.byId('idSqfTagsList').getBinding('items').create();
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Тег создан.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async _openManageSqfTagsDialog() {
            this.ManageSqfTagsDialog ??= await this.getFragment('planner.view.arma.sqf.master.modal.ManageSqfTagsDialog');

            this.ManageSqfTagsDialog.open();
        }

    };
});
