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
                oEvent.getSource().getBindingContext('todo').setProperty('status', iStatus);
                this.publish(this.EVENT.TODOLIST_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoItems').setBusy(false);
            }
        },

    };
});
