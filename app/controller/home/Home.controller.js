sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.home.Home', {

        onInit() {
            this.init("home");
        },

        _onRouteMatched() {
            this.getOwnerComponent().getModel().setProperty('/selectedRoute', 'home');
        }

    });
});
