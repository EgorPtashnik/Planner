sap.ui.define(() => {
    'use strict';

    return {

        async onPressCreateList() {
            const oContext = this.byId('idTodoList').getBinding('items').create({
                name: 'Новый Список',
                priority: 1,
                items: [],
                doneItems: []
            });
            await oContext.created();
            this.publish(this.EVENT.ACTION_SUCCEEDED, 'Дело создано.');

            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        async onPressManageListTags() {
            this.ManageListTagsDialog = await this.ManageListTagsDialog;
            if (!this.ManageListTagsDialog._odataAttached) {
                this.ManageListTagsDialog._odataAttached = true;
                this.byId('idTodoTagList').getBinding('items').attachPatchCompleted(() => this.publish(this.EVENT.TODOLIST_TAG_CHANGED));
            }

            this.publish(this.EVENT.TODOLIST_TAG_CHANGED);
            this.ManageListTagsDialog.open();
        },

        onPressTodoListSort() {
            this.TableHelper.onPressSort('idTodoList');
        },

        onPressListItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

    };
});
