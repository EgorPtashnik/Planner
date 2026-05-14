sap.ui.define([
    'planner/pages/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.pages.home.Home', {

        onInit() {
            this.init('home');
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'home') {
                this.App.getModel().setProperty('/selectedRoute', 'home');
            }
        }

    });
});
