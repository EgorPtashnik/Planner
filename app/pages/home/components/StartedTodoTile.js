sap.ui.define(() => {
    'use strict';

    return {

        onPressToggleVisibleStartedTodos() {
            this.State.setProperty('/StartedTodoTile/showCompleted', !this.State.getProperty('/StartedTodoTile/showCompleted'));
            this.byId('idStartedTodos').getBinding('items').changeParameters({
                $filter: this.State.getProperty('/StartedTodoTile/showCompleted') ? undefined : 'status le 1'
            })
        },

        onPressStartedTodoLink(oEvent) {
            this.getRouter().navTo('todoDetail', {
                id: oEvent.getSource().getBindingContext('home').getProperty('list_ID'),
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }

    };
});
