sap.ui.define(() => {
    'use strict';

    return {

        async onAddTraining() {
            try {
                this.AddTrainingDialog.close();
                const oData = this.Config.getProperty('/AddTrainingDialog');
                const oContext = this.TrainingListBinding.create({
                    solo: oData.selectedType === 0,
                    date: oData.date
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Тренировка записана.');
                this._getTotalCost();
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onSelectTrainingHistoryDate(oEvent) {
            this.MessageHelper.confirm({
                message: 'Удалить тренировку?',
                actions: ['Удалить', 'Закрыть'],
                emphasizedAction: 'Удалить',
                onClose: async sAction => {
                    if (sAction === 'Удалить') {
                        try {
                            const sSelectedDate = oEvent.getSource().getSelectedDates()[0].getStartDate().toString();
                            const aSpecialDates = oEvent.getSource().getAggregation('specialDates');
                            const oContext = aSpecialDates.find(oDateRange => oDateRange.getStartDate().toString() === sSelectedDate).getBindingContext('gym');
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
        },
        
        async _openAddTrainingDialog() {
            this.AddTrainingDialog = await this.getFragment('planner.view.gym.modal.AddTrainingDialog');
            this.Config.setProperty('/AddTrainingDialog', {
                selectedType: 0,
                date: new Date()
            });

            this.AddTrainingDialog.open();
        }

    }
});
