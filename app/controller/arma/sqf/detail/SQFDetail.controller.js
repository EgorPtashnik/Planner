sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/detail/Events',

    'planner/controller/arma/sqf/detail/component/Header'
], (BaseController, Events,

    HeaderLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.detail.SQFDetail', {

        ...Events,
        ...HeaderLogic,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                ID: null,
                editMode: false
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'sqfDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        },

        bindView(sID) {
            try {
                this.getView().bindElement({
                    path: `arma>/SqfCommand('${sID}')`,
                    parameters: {
                        $expand: 'type,source,params,examples'
                    },
                    events: {
                        dataReceived: () => this.getView().setBusy(false)
                    }
                });

            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    });
});
