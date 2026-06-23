sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/sqf/master/Events',
    'planner/pages/sqf/master/components/SqfCommandList',
    'planner/pages/sqf/master/components/ManageSqfMasterDataDialog'
], (BaseController,

    Events, SqfCommandList, ManageSqfMasterDataDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.sqf.master.SqfMaster', {

        ...Events,
        ...SqfCommandList,
        ...ManageSqfMasterDataDialog,

        onInit() {
            this.init('sqfMaster');
            this._setSubscriptions();
            this._loadFragments();
            this._setTableHelperConfig();

            this.ODataEventsAttached = false;
            this.State.setData({
                sqfCommandCount: 0,

                tagCount: 0
            });
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');

            if (!this.ODataEventsAttached) {
               this.ODataEventsAttached = true;
               this.byId('idSqfCommandList').getBinding('items').attachDataReceived(oEvent =>
                    oEvent.getSource().getHeaderContext().requestProperty('$count')
                        .then(value => this.State.setProperty('/sqfCommandCount', value))).refresh();
            }
        },

        _loadFragments() {
            this.CreateSqfCommandDialog = this.getFragment('planner.pages.sqf.master.components.CreateSqfCommandDialog');
            this.ManageSqfMasterDataDialog = this.getFragment('planner.pages.sqf.master.components.ManageSqfMasterDataDialog');
        },

        _setTableHelperConfig() {
        }

    });
});
