sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateItem() {
            try {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const oContext = this.byId('idTodoItems')
                    .setBusy(true)
                    .getBinding('items').create({
                        name: 'Новый Шаг',
                        startDate: tomorrow.getMilliseconds(),
                        priority: 2
                    });
                await oContext.created();

                this.MessageHelper.toast({ message: 'Шаг создан.' });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

        onPressToggleVisibleItems() {
            this.State.setProperty('/showCompletedItems', !this.State.getProperty('/showCompletedItems'));
        },

        async onPressDeleteItem(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.MessageHelper.toast({ message: 'Шаг удален.' });
                    this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount());
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

    };
});
