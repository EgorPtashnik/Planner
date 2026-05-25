sap.ui.define(() => {
    'use strict';

    return {

        async onAddTraining() {
            this.AddTrainingDialog.close();
            const oNewTrainingData = this.State.getProperty('/AddTrainingDialog');

            this.publish(this.EVENT.GYM.CREATE_TRAINING, {
                data: {
                    solo: oNewTrainingData.selectedType === 0,
                    date: oNewTrainingData.date
                }
            });
        },
        
        async _openAddTrainingDialog(vDate) {
            this.AddTrainingDialog = await this.AddTrainingDialog;
            this.State.setProperty('/AddTrainingDialog', {
                selectedType: 0,
                date: vDate || new Date()
            });

            this.AddTrainingDialog.open();
        }

    }
});
