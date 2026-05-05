sap.ui.define(() => {
    'use strict';

    return {

        // TOOLBAR
        onChangeTodoListsSearch(oEvent) {
            this.byId('idTodoListsList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressCreateTodoList() {
            const oContext = this.byId('idTodoListsList').getBinding('items').create({name: 'Новый Список'});
            await oContext.created();
            this.publish(this.EVENT.ACTION_SUCCEEDED, 'Список создан.');

            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },


        // ITEMS
        onPressTodoListItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

    };
});