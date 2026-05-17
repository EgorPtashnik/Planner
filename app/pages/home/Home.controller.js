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

            this.State.setData({
                StartedTodoTile: {
                    showCompleted: false
                }
            });
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'home');
        }

    });
});
