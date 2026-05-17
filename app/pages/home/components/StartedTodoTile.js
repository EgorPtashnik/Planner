sap.ui.define(() => {
    'use strict';

    return {

        onPressToggleVisibleStartedTodos() {
            this.State.setProperty('/StartedTodoTile/showCompleted', !this.State.getProperty('/StartedTodoTile/showCompleted'));
        },

        onPressStartedTodoLink(oEvent) {
            this.getRouter().navTo('todoDetail', {
                id: oEvent.getSource().getBindingContext('home').getProperty('list_ID'),
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }

    };
});
