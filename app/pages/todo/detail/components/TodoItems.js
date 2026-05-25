sap.ui.define(() => {
    'use strict';

    return {

        onPressCreateItem() {
            this.publish(this.EVENT.TODO.CREATE_ITEM, {
                table: this.byId('idTodoItems'),
                data: { name: 'Новый Шаг', priority: 2 }
            });
        },

        onPressEditItems(oEvent) {
            if (!oEvent.getParameter('pressed')) {
                this.publish(this.EVENT.TODOLIST_CHANGED);
            }
        },

        onPressToggleVisibleItems() {
            this.State.setProperty('/showCompletedItems', !this.State.getProperty('/showCompletedItems'));
        },

        async onPressDeleteCompletedItems() {
            const oTable = this.byId('idTodoItems').setBusy(true);
            this.publish(this.EVENT.TODO.DELETE_COMPLETED_ITEMS, {
                contexts: oTable.getBinding('items').getContexts(),
                then: () => this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount()),
                finally: () => oTable.setBusy(false)
            });
        },

        onPressItemSort() {
            this.TableHelper.onPressSort('idTodoItems');
        },

        onPressDeleteItem(oEvent) {
            this.byId('idTodoItems').setBusy(true);
            this.publish(this.EVENT.TODO.DELETE_ITEM, {
                context: oEvent.getParameter('listItem').getBindingContext('todo'),
                then: () => this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount()),
                finally: () => this.byId('idTodoItems').setBusy(false)
            });
        },

        onPressChangeItemStatus(oEvent, iStatus) {
            this.byId('idTodoItems').setBusy(true);
            this.publish(this.EVENT.TODO.UPDATE_ITEM_STATUS, {
                context:  oEvent.getSource().getBindingContext('todo'),
                status: iStatus,
                finally: () => this.byId('idTodoItems').setBusy(false)
            });
        },

    };
});
