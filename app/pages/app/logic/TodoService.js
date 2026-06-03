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
                    oData.table.setBusy(false);
                    oData.finally?.call(this);
                }
            },

            async delete(_, sEventId, oData = { context: null, then: null }) {
                try {
                    await oData.context.delete();
                    if (oData.context.isDeleted()) {
                        this.publish(this.EVENT.TODOLIST_CHANGED);
                        this.MessageHelper.toast({ message: 'Список удален.' });

                        oData.then?.call(this, oData.context);
                    }
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            },

            async update(_, sEventId, oData = { context: null, data: null, then: null }) {
                try {
                    await Promise.all(Object.entries(oData.data)
                        .map(entry => oData.context.setProperty(entry[0], entry[1])));
                    this.MessageHelper.toast({ message: 'Список изменен.' });
                    this.publish(this.EVENT.TODOLIST_TAG_CHANGED);
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
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
                    oData.finally?.call(this);
                }
            },

            async delete(_, sEventId, oData = { context: null, then: null }) {
                try {
                    await oData.context.delete();
                    if (oData.context.isDeleted()) {
                        this.publish(this.EVENT.TODOLIST_TAG_CHANGED, true);
                        this.MessageHelper.toast({ message: 'Тег удален.' });

                        oData.then?.call(this, oData.context);
                    }
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            }
        },

        TodoItem: {
            async create(_, sEventId, oData= { table: null, data: null, then: null }) {
                try {
                    const oContext = oData.table
                        .setBusy(true)
                        .getBinding('items')
                        .create(oData.data);
                    await oContext.created();
                    this.publish(this.EVENT.TODOITEM_CHANGED);
                    this.MessageHelper.toast({ message: 'Шаг создан.' });

                    oData.then?.call(this, oContext);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.table.setBusy(false);
                    oData.finally?.call(this);
                }
            },

            async delete(_, sEventId, oData = { context: null, then: null }) {
                try {
                    await oData.context.delete();
                    if (oData.context.isDeleted()) {
                        this.publish(this.EVENT.TODOITEM_CHANGED);
                        this.MessageHelper.toast({ message: 'Шаг удален.' });

                        oData.then?.call(this, oData.context);
                    }
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            },

            async deleteCompleted(_, sEventId, oData = { contexts: [], then: null }) {
                try {
                    await Promise.all(oData.contexts
                        .filter(oContext => oContext.getProperty('status') > 1)
                        .map(oContext => oContext.delete())
                    );
                    this.publish(this.EVENT.TODOITEM_CHANGED);
                    this.MessageHelper.toast({ message: 'Законченные шаги удалены.' });

                    oData.then?.call(this);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            },

            async updateStatus(_, sEventId, oData = { context: null, status: null, then: null }) {
                try {
                    oData.context.setProperty('status', oData.status);
                    if (oData.status > 1) {
                        oData.context.setProperty('endDate', new Date().toISOString().slice(0, 10));
                    }
                    this.publish(this.EVENT.TODOLIST_CHANGED);

                    oData.then?.call(this);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            }
        }

    };
});
