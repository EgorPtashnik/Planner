sap.ui.define(() => {
    'use strict';

    return {
        
        // TOOLBAR
        async onPressAddTodoItem() {
            try {
                const oContext = this.byId('idTodoItemsList').getBinding('items').create({name: 'Новый Шаг', priority: 2});
                await oContext.created();

                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг создан.');
                this.publish(this.EVENT.TODOPARENT_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteTodoItem(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг удален.');
                    this.publish(this.EVENT.TODOPARENT_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressToggleVisibleItems() {
            this.Config.setProperty('/showCompletedTodoItems', !this.Config.getProperty('/showCompletedTodoItems'));
        },

        async onPressDeleteCompletedItems() {
            try {
                await Promise.all(this.byId('idTodoItemsList').getBinding('items').getContexts().filter(oContext => oContext.getProperty('status') > 1).map(oContext => oContext.delete()));
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Законченные шаги удалены.');
                this.publish(this.EVENT.TODOPARENT_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        // ITEMS
        async onPressChangeTodoItemStatus(oEvent, iStatus) {
            oEvent.getSource().getBindingContext('todo').setProperty('status', iStatus);
        }

    };
});