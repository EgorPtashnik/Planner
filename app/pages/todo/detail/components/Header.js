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
            this.publish(this.EVENT.TODO.DELETE_LIST, {
                context: this.getView().setBusy(true).getBindingContext('todo'),
                then: () => this.onPressClosePage(),
                finally: () => this.getView().setBusy(false)
            });
        }
    };
});
