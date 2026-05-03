sap.ui.define(() => {
    'use strict';

    return {

        async onSettle() {
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
            this.TrainingHistoryDialog ??= await this.getFragment('planner.view.gym.modal.TrainingHistoryDialog');

            this.TrainingHistoryDialog.open();
        }

    }
});
