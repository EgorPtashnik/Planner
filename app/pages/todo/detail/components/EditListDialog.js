sap.ui.define(() => {
    'use strict';

    return {

        async onSaveList() {
            this.EditListDialog.close();
            const oNewListData = this.State.getProperty('/EditListDialog');
            this.publish(this.EVENT.TODO.UPDATE_LIST, {
                context: this.getView().setBusy(true).getBindingContext('todo'),
                data: { ...oNewListData, priority: +oNewListData.priority },
                finally: () => this.getView().setBusy(false)
            });
        }
        

    };
});
