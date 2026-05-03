sap.ui.define([
    'planner/controller/BaseController',

    'planner/controller/gym/component/Info',
    'planner/controller/gym/modal/AddTrainingDialog'
], (BaseController,

    InfoLogic,

    AddTrainingDialogLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.gym.Gym', {

        ...InfoLogic,
        ...AddTrainingDialogLogic,

        onInit() {
            this.init();

            this.TrainingListBinding = null;
            this.AddTrainingDialog = null;
            
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

        _getTotalCost() {
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'gym',
                action: '/GetTotalCost(...)',
                message: null,
                then: (_, oFunciton) => {
                    this.Config.setProperty('/totalCost', oFunciton.getBoundContext().getObject().value);
                }
            });
        }

    });
});
