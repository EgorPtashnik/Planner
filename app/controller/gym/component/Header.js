sap.ui.define(() => {
    'use strict';

    return {
        
        async onPressTrainingHistory() {
            this.TrainingHistoryDialog ??= await this.getFragment('planner.view.gym.modal.TrainingHistoryDialog');

            this.TrainingHistoryDialog.open();
        }

    }
});
