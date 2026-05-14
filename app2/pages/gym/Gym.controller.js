sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/gym/components/AddTrainingDialog',
    'planner/pages/gym/components/TrainingHistoryDialog'
], (BaseController, AddTrainingDialog, TrainingHistoryDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.gym.Gym', {

        ...AddTrainingDialog,
        ...TrainingHistoryDialog,

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

        onPressTrainingHistory() {
            this._openTrainingHistoryDialog();
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
