sap.ui.define(() => {
    'use strict';

    return {
        
        async onPressCreateList() {
            this.CreateListDialog = await this.CreateListDialog;

            this.State.setProperty('/CreateListDialog', {
                name: 'Новый Список',
                info: 'Описание',
                priority: 1,
                tag_ID: null,
                items: [],
                doneItems: []
            });
            
            this.CreateListDialog.open();
        },

        async onPressManageListTags() {
            this.ManageListTagsDialog = await this.ManageListTagsDialog;
            const oTagListBinding = this.byId('idTodoTagList').getBinding('items');
            this.State.setProperty('/tagCount', oTagListBinding.getCount());

            if (!this.ManageListTagsDialog._attached) {
                this.ManageListTagsDialog._attached = true;
                oTagListBinding.attachPatchCompleted(() => this.publish(this.EVENT.TODOLIST_TAG_CHANGED));
            }

            this.ManageListTagsDialog.open();
        },

        onPressTodoListSort() {
            this.TableHelper.onPressSort('idTodoList');
        },

        onPressListItem(oEvent) {
            this.getRouter().navTo('todoDetail', {
                    id: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }

    };
});
