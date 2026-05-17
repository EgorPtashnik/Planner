sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/home/Events',
    'planner/pages/home/components/StartedTodoTile'
], (BaseController,

    Events, StartedTodoTile
) => {
    'use strict';

    return BaseController.extend('planner.pages.home.Home', {

        ...Events,
        ...StartedTodoTile,

        onInit() {
            this.init('home');
            this._setSubscriptions();

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
            }
        }

    });
});
