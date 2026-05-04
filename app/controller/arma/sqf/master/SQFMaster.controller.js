sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/master/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.master.SQFMaster', {

        ...Events,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.Config.setData({});
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'sqfMaster') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        }

    });
});
