sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/master/Events',
    
    'planner/controller/arma/sqf/master/component/FilterBar',
    'planner/controller/arma/sqf/master/component/SqfCommands',

    'planner/controller/arma/sqf/master/modal/CreateFunctionDialog',
    'planner/controller/arma/sqf/master/modal/ChangeTagsDialog'
], (BaseController, Events,

    FilterBarLogic, SqfCommandsLogic,

    CreateFunctionDialogLogic, ChangeTagsDialogLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.master.SQFMaster', {

        ...Events,

        ...FilterBarLogic,
        ...SqfCommandsLogic,

        ...CreateFunctionDialogLogic,
        ...ChangeTagsDialogLogic,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.CreateFunctionDialog = null;
            this.ChangeTagsDialog = null;

            this.Config.setData({
                sqfCommandsCount: 0,
                showSqfCommandsDetails: false
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
