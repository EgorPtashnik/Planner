sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/sqf/master/Events'
], (BaseController,

    Events) => {
    'use strict';

    return BaseController.extend('planner.pages.sqf.master.SqfMaster', {

        ...Events,

        onInit() {
            this.init('sqfMaster');
            this._setSubscriptions();
            this._loadFragments();
            this._setTableHelperConfig();

            this.ODataEventsAttached = false;
            this.State.setData()
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');

            if (!this.ODataEventsAttached) {
               
            }
        },

        _loadFragments() {
        },

        _setTableHelperConfig() {
        }

    });
});
