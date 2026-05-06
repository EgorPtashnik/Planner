sap.ui.define(() => {
    'use strict';

    return {

        async onPressAddExample() {
            try {
                const oContext = this.byId('idSqfCommandExamplesList').getBinding('items').create({
                    text: `<strong>Текст</strong>
<code>Код</code>`
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Пример добавлен.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteExample(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('arma');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Пример\Заметка удален.');
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    };
});
