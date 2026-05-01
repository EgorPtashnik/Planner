sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.controller.gym.Gym', {

        onInit() {
            this.init();
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'gym') {
                this.App.getModel().setProperty('/selectedRoute', 'gym');
            }
        }

    });
});
