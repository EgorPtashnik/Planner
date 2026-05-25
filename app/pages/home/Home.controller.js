sap.ui.define([
    'planner/pages/BaseController',
    'planner/reuse/AddTrainingDialog',

    'planner/pages/home/Events',
    'planner/pages/home/components/StartedTodoTile',
    'planner/pages/home/components/StartedTodoTable',
    'planner/pages/home/components/TrainingTile'
], (BaseController, AddTrainingDialog,

    Events, StartedTodoTile, StartedTodoTable, TrainingTile
) => {

    'use strict';

    return BaseController.extend('planner.pages.home.Home', {

        ...AddTrainingDialog,

        ...Events,
        ...StartedTodoTile,
        ...StartedTodoTable,
        ...TrainingTile,

        onInit() {
            this.init('home');
            this._setSubscriptions();
            this._loadFragments();

            this.ODataEventsAttached = false;
            this.State.setData({
                StartedTodoTile: {
                    showCompleted: false,
                    allItems: 0,
                    doneItems: 1
                }
            });
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'home');

            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idStartedTodos').getBinding('items').attachDataReceived(oEvent => {
                    const aData = oEvent.getSource().getCurrentContexts().map(oContext => oContext?.getObject());
                    this.State.setProperty('/StartedTodoTile/allItems', aData.length);
                    this.State.setProperty('/StartedTodoTile/doneItems', aData.filter(oItem => oItem?.status >= 2).length);
                });

                this.byId('idHomePage').addStyleClass(this.getView().getModel('device').getProperty('/system/phone') ? 'sapUiNoContentPadding' : 'sapUiResponsiveContnetPadding');
            }
        },

        _loadFragments() {
            this.AddTrainingDialog = this.getFragment('planner.reuse.AddTrainingDialog');
        }

    });
});
