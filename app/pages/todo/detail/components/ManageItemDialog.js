sap.ui.define(() => {
    'use strict';

    return {

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
                    try {
                        const oContext = this.State.getProperty('/ManageItemDialog/context');
                        await Promise.all([
                            oContext.setProperty('name', oNewItemData.name),
                            oContext.setProperty('info', oNewItemData.info),
                            oContext.setProperty('priority', +oNewItemData.priority),
                            oContext.setProperty('startDate', this.Formatter.getCDSDate(oNewItemData.startDate))
                        ]);
                        this.publish(this.EVENT.TODOITEM_CHANGED);
                    } catch(oError) {
                        this.publish(this.EVENT.ACTION_FAILED, oError);
                    }
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
                startDate: new Date(oContext.getProperty('startDate')),
                priority: oContext.getProperty('priority')
            });

            this.ValidationHelper.resetFieldGroup('ManageTodoItemFG');
            this.ManageItemDialog.open();
        }
    };
});
