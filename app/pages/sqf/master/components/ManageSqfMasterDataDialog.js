sap.ui.define(() => {
    'use strict';

    return {

        onPressCreateSqfTag() {
            this.publish(this.EVENT.ARMA.CREATE_SQFTAG, {
                table: this.byId('idSqfTagList')
            });
        },

        onPressDeleteSqfTag(oEvent) {
            this.byId('idSqfTagList').setBusy(true);
            this.publish(this.EVENT.ARMA.DELETE_SQFTAG, {
                context: oEvent.getParameter('listItem').getBindingContext('arma'),
                finally: () => this.byId('idSqfTagList').setBusy(false)
            });

        }

    };
});
