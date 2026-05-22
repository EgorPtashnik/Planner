sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateItem() {
            try {
                const oContext = this.byId('idTodoItems')
                    .setBusy(true)
                    .getBinding('items').create({
                        name: 'Новый Шаг',
                        priority: 2
                    });
                await oContext.created();

                this.MessageHelper.toast({ message: 'Шаг создан.' });
                this.publish(this.EVENT.TODOITEM_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

        onPressToggleVisibleItems() {
            this.State.setProperty('/showCompletedItems', !this.State.getProperty('/showCompletedItems'));
        },

        async onPressDeleteCompletedItems() {
            try {
                await Promise.all(
                    this.byId('idTodoItems')
                        .setBusy(true)
                        .getBinding('items').getContexts()
                        .filter(oContext => oContext.getProperty('status') > 1)
                        .map(oContext => oContext.delete())
                );
                this.MessageHelper.toast({ message: 'Законченные шаги удалены.' });
                this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount());
                this.publish(this.EVENT.TODOITEM_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

        onPressItemSort() {
            this.TableHelper.onPressSort('idTodoItems');
        },

        async onPressDeleteItem(oEvent) {
            try {
                this.byId('idTodoItems').setBusy(true);
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.MessageHelper.toast({ message: 'Шаг удален.' });
                    this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount());
                    this.publish(this.EVENT.TODOITEM_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

        onPressChangeItemStatus(oEvent, iStatus) {
            try {
                this.byId('idTodoItems').setBusy(true);
                const oContext = oEvent.getSource().getBindingContext('todo');
                oContext.setProperty('status', iStatus);
                if (iStatus > 1) {
                    oContext.setProperty('endDate', new Date().toISOString().slice(0, 10));
                }
                this.publish(this.EVENT.TODOLIST_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

    };
});
