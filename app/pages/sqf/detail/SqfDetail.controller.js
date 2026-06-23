sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/sqf/detail/Events',
], (BaseController,

    Events) => {
    'use strict';

    return BaseController.extend('planner.pages.sqf.detail.SqfDetail', {

        ...Events,

        onInit() {
            this.init('sqfDetail');
            this._setSubscriptions();
            this._loadFragments();

            this.ODataEventsAttached = false;
            this.State.setData({})
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');
            this._bindView(oEvent.getParameter('arguments').name);
        },

        _bindView(sName) {
            try {
                this.getView().bindElement({
                    path: `arma>/SqfCommand(${sName})`,
                    parameters: {
                        $expand: 'params,examples,tags,related'
                    },
                    events: {
                    }
                });

                if (!this.ODataEventsAttached) {
                    this.ODataEventsAttached = true;
                    this.byId('idTodoItems').getBinding('items')
                        .attachDataReceived(oEvent => this.State.setProperty('/itemCount', oEvent.getSource().getCount()))
                        .attachPatchCompleted(() => this.publish(this.EVENT.TODOITEM_CHANGED))
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        _loadFragments() {
        }

    });
});
