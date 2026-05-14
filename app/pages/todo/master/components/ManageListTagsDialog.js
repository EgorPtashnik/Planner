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
                    this._updateTagCount();
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },
        
        async _openManageListTagsDialog() {
            this.ManageListTagsDialog ??= await this.getFragment('planner.pages.todo.master.components.ManageListTagsDialog').then(oFragment => {
                this.byId('idTodoTagList').getBinding('items').attachDataReceived(() => this._updateTagCount());
                return oFragment;
            });

            this.ManageListTagsDialog.open();
        },

        _updateTagCount() {
            this.Config.setProperty('/tagCount', this.byId('idTodoTagList').getBinding('items').getCount());
        }
    };
});