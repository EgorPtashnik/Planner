sap.ui.define(() => {
    'use strict';

    return {

        async onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        onPressToggleCompactView() {
            this.Config.setProperty('/compactView', !this.Config.getProperty('/compactView'));
        },

        async onPressDeleteTodoList() {
            try {
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Список удален.');
                    this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
                    this.publish(this.EVENT.TODOLIST_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

    };
});