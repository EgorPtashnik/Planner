sap.ui.define(() => {
    'use strict';

    return {

        onCreateItem() {
            if (this.ValidationHelper.validateFieldGroup('CreateTodoItemFG')) {
                this.CreateItemDialog.close();
                const oNewItemData = this.State.getProperty('/CreateItemDialog');
                this.publish(this.EVENT.TODO.CREATE_ITEM, {
                    table: this.byId('idTodoItems'),
                    data: {
                        ...oNewItemData,
                        priority: +oNewItemData.priority,
                        startDate: this.Formatter.getCDSDate(oNewItemData.startDate)
                    }
                });
            }
        }

    };
});
