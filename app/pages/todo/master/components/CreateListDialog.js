sap.ui.define(() => {
    'use strict';

    return {

        onCreateList() {
            if (this.ValidationHelper.validateFieldGroup('CreateTodoListFG')) {
                this.CreateListDialog.close();
                const oNewListData = this.State.getProperty('/CreateListDialog');

                this.publish(this.EVENT.TODO.CREATE_LIST, {
                    table: this.byId('idTodoList'),
                    data: oNewListData,
                    then: async oContext => {
                        const sID = await oContext.requestProperty('ID');
                        this.getRouter().navTo('todoDetail', {
                            id: sID,
                            layout: this.LayoutType.TwoColumnsMidExpanded
                        });
                    }
                });
            }
        }

    };
});
