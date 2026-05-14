sap.ui.define(() => {
    'use strict';

    return {

        onPressToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.TwoColumnsMidExpanded : this.LayoutType.MidColumnFullScreen);
        },

        onPressClosePage() {
            this.getRouter().navTo('todoMaster');
        },

        async onPressEditTodoList() {
            this.EditListDialog = await this.EditListDialog;
            const oViewContext = this.getView().getBindingContext('todo');

            this.State.setProperty('/EditListDialog', {
                name: oViewContext.getProperty('name'),
                info: oViewContext.getProperty('info'),
                priority: oViewContext.getProperty('priority'),
                tag_ID: oViewContext.getProperty('tag_ID'),
            });
            this.EditListDialog.open();
        },

        async onPressDeleteTodoList() {
            try {
                this.getView().setBusy(true);
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.TODOLIST_CHANGED);
                    this.onPressClosePage();
                    this.MessageHelper.toast({ message: 'Список удален.' });
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.getView().setBusy(false);
            }
        }
    };
});
