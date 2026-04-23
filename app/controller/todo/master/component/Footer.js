sap.ui.define(() => {
    'use strict';

    return {
        async onPressCreateTodoList() {
            const oContext = this.TodoList.getBinding('items').create({name: 'New Activity List'});
            await oContext.created()
            
            this.getRouter().navTo('todoDetail', {
                id: oContext.getProperty('ID'),
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }
    };
});