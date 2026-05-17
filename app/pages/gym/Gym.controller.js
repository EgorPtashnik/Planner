sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/gym/components/Header',
    'planner/pages/gym/components/AddTrainingDialog',
    'planner/pages/gym/components/TrainingHistoryDialog'
], (BaseController,
    
    Header, AddTrainingDialog, TrainingHistoryDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.gym.Gym', {

        ...Header,
        ...AddTrainingDialog,
        ...TrainingHistoryDialog,

        onInit() {
            this.init('gym');
            this._loadFragments();

            this.TrainingListBinding = null;
            
            this.State.setData({
                totalCost: 0
            });
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'gym');
            this._getTotalCost();

            if (!this.TrainingListBinding) {
                this.TrainingListBinding = this.getView().getModel('gym').bindList('/Training');
            }
        },

        _loadFragments() {
            this.AddTrainingDialog = this.getFragment('planner.pages.gym.components.AddTrainingDialog');
            this.TrainingHistoryDialog = this.getFragment('planner.pages.gym.components.TrainingHistoryDialog');
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
                    this.State.setProperty('/totalCost', oFunciton.getBoundContext().getObject().value);
                    this.byId('idTrainingHistoryCalendar')?.getBinding('specialDates').refresh();
                }
            });
        }

    });
});
