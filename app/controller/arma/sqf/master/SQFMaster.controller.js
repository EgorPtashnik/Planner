sap.ui.define([
    'planner/controller/BaseController',

    'planner/controller/arma/sqf/master/modal/CreateFunctionDialog',
    'planner/controller/arma/sqf/master/modal/ChangeTagsDialog'
], (BaseController, CreateFunctionDialogLogic, ChangeTagsDialogLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.master.SQFMaster', {

        ...CreateFunctionDialogLogic,
        ...ChangeTagsDialogLogic,

        onInit() {
            this.init();
            [
                { id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged },
                { id: this.EVENT.SQFCOMMAND_CHANGED, fnc: this._onSqfCommandChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));

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
        },

        onPressCreateSqfCommand() {
            this._openCreateFunctionDialog();
        },

        onPressChangeTags() {
            this._openChangeTagsDialog();
        },

        onPressSqfCommandItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'sqfDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('arma').getProperty('name'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });

        },

        // APPLICATION EVENTS
        _onNavChanged(_, sEventId, oData) {
            if (oData.route === 'sqfMaster') {
                this.getView().setBusy(true);
                this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');
                setTimeout(() => this.getView().setBusy(false));
                this.byId('idSqfCommandsList').getBinding('items').refresh();
            }
        },

        _onSqfCommandChanged() {
            this.byId('idSqfCommandsList').getBinding('items').refresh();
        }

    });
});
