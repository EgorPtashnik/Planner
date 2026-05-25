sap.ui.define(() => {
    'use strict';

    return {

        onPressStartedTodoLink(oEvent) {
            this.getRouter().navTo('todoDetail', {
                id: oEvent.getSource().getBindingContext('home').getProperty('list_ID'),
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }
    };
});
