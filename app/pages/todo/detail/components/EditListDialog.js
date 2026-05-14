sap.ui.define(() => {
    'use strict';

    return {

        async onSaveList() {
            try {
                this.EditListDialog.close();
                const oNewListData = this.State.getProperty('/EditListDialog');
                const oContext = this.getView()
                    .setBusy(true)
                    .getBindingContext('todo');
                await Promise.all([
                    oContext.setProperty('name', oNewListData.name),
                    oContext.setProperty('info', oNewListData.info),
                    oContext.setProperty('priority', +oNewListData.priority),
                    oContext.setProperty('tag_ID', oNewListData.tag_ID)
                ]);
                this.MessageHelper.toast({ message: 'Список изменен.' });
                this.publish(this.EVENT.TODOLIST_TAG_CHANGED);
            } catch(oError) {
                console.log(oError);
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.getView().setBusy(false);
            }
        }
        

    };
});
