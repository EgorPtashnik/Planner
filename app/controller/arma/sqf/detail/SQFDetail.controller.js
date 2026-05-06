sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/detail/Events',

    'planner/controller/arma/sqf/detail/component/Header',
    'planner/controller/arma/sqf/detail/component/Parameters',
    'planner/controller/arma/sqf/detail/component/Examples'
], (BaseController, Events,

    HeaderLogic, ParametersLogic, ExamplesLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.detail.SQFDetail', {

        ...Events,
        ...HeaderLogic,
        ...ParametersLogic,
        ...ExamplesLogic,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                ID: null,
                editMode: false,

                showSqfCommandParamsDetails: false
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
