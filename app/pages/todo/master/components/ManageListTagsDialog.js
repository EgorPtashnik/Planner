sap.ui.define(() => {
    return {
        async onPressCreateListTag() {
            try {
                const oContext = this.byId('idTodoTagList').getBinding('items').create({
                    name: 'Новый тег',
                    color: 'None',
                    info: 'Описание'
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Тег создан.');
                this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteListTag(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Тег удален.');
                    this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }
    };
});