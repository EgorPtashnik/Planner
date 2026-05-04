sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/master/Events',
    
    'planner/controller/arma/sqf/master/component/FilterBar',
    'planner/controller/arma/sqf/master/component/Footer'
], (BaseController, Events,

    FilterBarLogic, FooterLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.master.SQFMaster', {

        ...Events,

        ...FilterBarLogic,
        ...FooterLogic,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                sqfCommandsCount: 0
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'sqfMaster') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }

            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idSqfCommandsList').getBinding('items').attachDataReceived(oEvent =>
                    oEvent.getSource().getHeaderContext().requestProperty('$count')
                        .then(value => this.Config.setProperty('/sqfCommandsCount', value))).refresh();
            }
        }

    });
});
