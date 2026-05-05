sap.ui.define(() => {
    'use strict';

    return {
        
        async onPressCreateSqfCommand() {
            try {
                const oContext = this.byId('idSqfCommandsList').getBinding('items').create({
                    name: 'Новая Функция',
                    type: {},
                    source: {}
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Функция добавлена.');

                this.publish(this.EVENT.NAV_CHANGED, {
                    route: 'sqfDetail',
                    parameters: {
                        id: oContext.getProperty('ID'),
                        layout: this.LayoutType.TwoColumnsMidExpanded
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    };
});
