sap.ui.define(() => {
    'use strict';

    return {

        async onCreateList() {
            try {
                this.CreateListDialog.close();
                const oNewListData = this.State.getProperty('/CreateListDialog');
                const oContext = this.byId('idTodoList')
                .setBusy(true)
                .getBinding('items').create({ ...oNewListData, priority: +oNewListData.priority });
                await oContext.created();
                this.MessageHelper.toast({ message: 'Список создан.' });

                this.getRouter().navTo('todoDetail', {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                });

                this.publish(this.EVENT.TODOLIST_CHANGED);
            } catch(oError) {
                console.log(oError);
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoList').setBusy(false);
            }
        }

    };
});
