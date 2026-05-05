sap.ui.define(() => {
    'use strict';

    return {

        async onPressAddParameter() {
            try {
                const oContext = this.byId('idSqcCommandParamsList').getBinding('items').create();
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Параметр добавлен.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);

            }
        }

    };
});
