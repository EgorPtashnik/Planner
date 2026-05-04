sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/detail/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.detail.SQFDetail', {

        ...Events,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.Config.setData({});
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'sqfDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        }

    });
});
