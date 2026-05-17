sap.ui.define(() => {
    'use strict';

    return {

        async onPressSettle() {
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'gym',
                action: '/Settle(...)',
                message: 'Тренировки обновлены.',
                then: (_, oAction) => {
                    this._getTotalCost();
                }
            });
        },

        async onPressTrainingHistory() {
            this.TrainingHistoryDialog = await this.TrainingHistoryDialog;

            this.TrainingHistoryDialog.open();
        }

    };
});
