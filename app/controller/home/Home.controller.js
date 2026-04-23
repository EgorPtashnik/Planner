sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.home.Home', {

        onInit() {
            this.init('home');
        },

        _onRouteMatched() {
            this.App.getModel().setProperty('/selectedRoute', 'home');
        }

    });
});
