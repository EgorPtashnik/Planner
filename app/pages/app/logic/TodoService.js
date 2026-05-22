sap.ui.define(() => {
    'use strict';

    return {

        TodoList: {

            async create(_, sEventId, oData = { table: null, data: null, then: null}) {
                try {
                    const oContext = oData.table
                        .setBusy(true)
                        .getBinding('items')
                        .create({ ...oData.data, priority: +oData.data.priority });
                    await oContext.created();
                    this.publish(this.EVENT.TODOLIST_CHANGED);
                    this.MessageHelper.toast({ message: 'Список создан.' });

                    oData.then?.call(this, oContext);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.table.setBusy(false)
                }
            }
        },

        TodoListTag: {

            async create(_, sEventId, oData = { table: null, data: null, then: null }) {
                try {
                    const oContext = oData.table
                        .setBusy(true)
                        .getBinding('items')
                        .create(oData.data);
                    await oContext.created();
                    this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
                    this.MessageHelper.toast({ message: 'Тег создан.' });

                    oData.then?.call(this, oContext);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.table.setBusy(false)
                }
            },

            async delete(_, sEventId, oData = { context: null, then: null }) {
                try {
                    await oData.context.delete();
                    if (oData.context.isDeleted()) {
                        this.MessageHelper.toast({ message: 'Тег удален.' });
                        this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);

                        oData.then?.call(this, oData.context);
                    }
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                }
            }
        }

    };
});
