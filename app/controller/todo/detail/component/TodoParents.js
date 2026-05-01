sap.ui.define(() => {
    'use strict';

    return {

        // TOOLBAR
        onChangeTodoParentsSearch(oEvent) {
            this.byId('idTodoParentsList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressAddTodoParent() {
            try {
                const oContext = this.byId('idTodoParentsList').getBinding('items').create({name: 'Новый Этап', priority: 1});
                await oContext.created();

                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Этап создан.');
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: 'todoDetailDetail',
                    parameters: {
                        id: this.AppConfig.getProperty('/detailID'),
                        item: oContext.getProperty('ID'),
                        layout: this.LayoutType.ThreeColumnsEndExpanded
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },


        // ITEMS
        onPressTodoParentItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetailDetail',
                parameters: {
                    id: this.AppConfig.getProperty('/detailID'),
                    item: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.ThreeColumnsEndExpanded
                }
            });
        }

    };
});