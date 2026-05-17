sap.ui.define(() => {
    'use strict';

    return {

        onSelectTrainingHistoryDate(oEvent) {
            this.MessageHelper.confirm({
                message: 'Удалить тренировку?',
                actions: ['Удалить', 'Закрыть'],
                emphasizedAction: 'Удалить',
                onClose: async sAction => {
                    if (sAction === 'Удалить') {
                        try {
                            const sSelectedDate = oEvent.getSource().getSelectedDates()[0].getStartDate().toDateString();
                            const aSpecialDates = oEvent.getSource().getAggregation('specialDates');
                            const oContext = aSpecialDates.find(oDateRange => oDateRange.getStartDate().toDateString() === sSelectedDate).getBindingContext('gym');
                            await oContext.delete();
                            if (oContext.isDeleted()) {
                                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Тренировка удалена.');
                                this._getTotalCost();
                            }
                        } catch(oError) {
                            this.publish(this.EVENT.ACTION_FAILED, oError);
                        }
                    }
                }
            });
        }

    };
});
