sap.ui.define(() => {
    return {
        onPressCreateListTag() {
            this.publish(this.EVENT.TODO.CREATE_LISTTAG, {
                table: this.byId('idTodoTagList'),
                data: { name: 'Новый тег', color: 'None', info: 'Описание' }
            });
        },

        onPressDeleteListTag(oEvent) {
            this.byId('idTodoTagList').setBusy(true);
            this.publish(this.EVENT.TODO.DELETE_LISTTAG, {
                context: oEvent.getParameter('listItem').getBindingContext('todo'),
                finally: () => this.byId('idTodoTagList').setBusy(false)
            });
        }
    };
});