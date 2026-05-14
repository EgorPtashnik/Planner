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

        onPressManageListTags() {
            this._openManageListTagsDialog();
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
