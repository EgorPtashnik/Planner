sap.ui.define(() => {
    'use strict';

    return {

        onDeleteItem() {
            this.ManageItemDialog.close();

            this.byId('idTodoItems').setBusy(true);
            this.publish(this.EVENT.TODO.DELETE_ITEM, {
                context: this.State.getProperty('/ManageItemDialog/context'),
                then: () => this.State.setProperty('/itemCount', this.byId('idTodoItems').getBinding('items').getCount()),
                finally: () => this.byId('idTodoItems').setBusy(false)
            });
        },

        async onSaveItem(bToCreate) {
            if (this.ValidationHelper.validateFieldGroup('ManageTodoItemFG')) {
                this.ManageItemDialog.close();
                const oNewItemData = this.State.getProperty('/ManageItemDialog');
                if (bToCreate) {
                    this.publish(this.EVENT.TODO.CREATE_ITEM, {
                        table: this.byId('idTodoItems'),
                        data: {
                            name: oNewItemData.name,
                            info: oNewItemData.info,
                            priority: +oNewItemData.priority,
                            startDate: this.Formatter.getCDSDate(oNewItemData.startDate)
                        }
                    });
                } else {
                    this.publish(this.EVENT.TODO.UPDATE_ITEM, {
                        context: this.State.getProperty('/ManageItemDialog/context'),
                        table: this.byId('idTodoItems'),
                        data: {
                            name: oNewItemData.name,
                            info: oNewItemData.info,
                            priority: +oNewItemData.priority,
                            startDate: this.Formatter.getCDSDate(oNewItemData.startDate),
                            list_ID: oNewItemData.list_ID
                        }
                    });
                }
            }
        },

        async _openManageItemDialog(bToCreate, oContext) {
            this.ManageItemDialog = await this.ManageItemDialog;

            this.State.setProperty('/ManageItemDialog', bToCreate ?
            {
                toCreate: true,
                name: '',
                info: '',
                startDate: null,
                priority: 2
            } :
            {
                toCreate: false,
                context: oContext,
                name: oContext.getProperty('name'),
                info: oContext.getProperty('info'),
                startDate: oContext.getProperty('startDate') ? new Date(oContext.getProperty('startDate')) : null,
                priority: oContext.getProperty('priority'),
                list_ID: oContext.getProperty('list_ID')
            });

            this.ValidationHelper.resetFieldGroup('ManageTodoItemFG');
            this.ManageItemDialog.open();
        }
    };
});
