sap.ui.define([
    'planner/controller/BaseController',

    'planner/controller/gym/modal/AddTrainingDialog'
], (BaseController,
    AddTrainingDialogLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.gym.Gym', {
        ...AddTrainingDialogLogic,

        onInit() {
            this.init();

            this.TrainingListBinding = null;

            this.AddTrainingDialog = null;
            this.TrainingHistoryDialog = null;
            
            this.Config.setData({
                totalCost: 0
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'gym') {
                this.App.getModel().setProperty('/selectedRoute', 'gym');
                this._getTotalCost();

                if (!this.TrainingListBinding) {
                    this.TrainingListBinding = this.getView().getModel('gym').bindList('/Training');
                }
            }
        },

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
        },

        onPressAddTraining() {
            this._openAddTrainingDialog();
        },

        _getTotalCost() {
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'gym',
                action: '/GetTotalCost(...)',
                message: null,
                then: (_, oFunciton) => {
                    this.Config.setProperty('/totalCost', oFunciton.getBoundContext().getObject().value);
                    this.byId('idTrainingHistoryCalendar')?.getBinding('specialDates').refresh();
                }
            });
        }

    });
});
