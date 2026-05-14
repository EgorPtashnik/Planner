sap.ui.define(() => {
    return {
        async onPressCreateListTag() {
            try {
                const oContext = this.byId('idTodoTagList')
                    .setBusy(true)
                    .getBinding('items').create({
                        name: 'Новый тег',
                        color: 'None',
                        info: 'Описание'
                    });

                await oContext.created();
                this.MessageHelper.toast({ message: 'Тег создан.' });
                this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            } finally {
                this.byId('idTodoTagList').setBusy(false);
            }
        },

        async onPressDeleteListTag(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.MessageHelper.toast({ message: 'Тег удален.' });
                    this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }
    };
});