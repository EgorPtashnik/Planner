sap.ui.define(() => {
    'use strict';
    
    return {

        SqfTag: {
            async create(_, sEventId, oData = { table: null, then: null }) {
                try {
                    const oContext = oData.table
                        .setBusy(true)
                        .getBinding('items')
                        .create();
                    await oContext.created();
                    this.publish(this.EVENT.SQF_TAG_CHANGED, true);
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
                        this.publish(this.EVENT.SQF_TAG_CHANGED, true);
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

        SqfCommand: {
        },

        SqfCommandParam: {},

        SqfCommandExample: {},

        SqfCommandRelated: {}

    };
});
