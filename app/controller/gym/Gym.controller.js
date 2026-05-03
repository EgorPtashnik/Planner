sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.controller.gym.Gym', {

        onInit() {
            this.init();
            
            this.Config.setData({
                totalCost: 0
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'gym') {
                this.App.getModel().setProperty('/selectedRoute', 'gym');
                this._getTotalCost();
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
