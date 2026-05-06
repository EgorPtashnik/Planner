sap.ui.define(() => {
    'use strict';

    return {

        async onPressAddParameter() {
            try {
                const oContext = this.byId('idSqcCommandParamsList').getBinding('items').create({
                    sort: (this.getView().getBindingContext('arma').getObject().params?.length || 0) + 1
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Параметр добавлен.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);

            }
        }

    };
});
