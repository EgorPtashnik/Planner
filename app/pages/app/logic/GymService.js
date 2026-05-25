sap.ui.define(() => {
    'use strict';
    
    return {

        Training: {
            async create(_, sEventId, oData = { data: null, then: null}) {
                try {
                    const oContext = this.getView().getModel('gym').bindList('/Training').create(oData.data);
                    await oContext.created();
                    this.publish(this.EVENT.GYMTRAINING_CHANGED);
                    this.MessageHelper.toast({ message: 'Тренировка добавлена.' });

                    oData.then?.call(this, oContext);

                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            },

            async delete(_, sEventId, oData = { context: null, then: null }) {
                try {
                    await oData.context.delete();
                    if (oData.context.isDeleted()) {
                        this.publish(this.EVENT.GYMTRAINING_CHANGED);
                        this.MessageHelper.toast({ message: 'Тренировка удалена.' });

                        oData.then?.call(this, oData.context);
                    }
                } catch(oError) {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                } finally {
                    oData.finally?.call(this);
                }
            }
        },

        async settle(_, sEventId, oData) {
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'gym',
                action: '/Settle(...)',
                message: 'Тренировки обновлены.',
                then: (_, oAction) => {
                    this.publish(this.EVENT.GYMTRAINING_CHANGED);

                    oData.then?.call(this, oAction);
                }
            });
        },

        async getTotalCost(_, sEventId, oData) {
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'gym',
                action: '/GetTotalCost(...)',
                message: null,
                then: (_, oFunction) => {
                    oData.then?.call(this, oFunction.getBoundContext().getObject().value);
                }
            });
        }

    };
});
