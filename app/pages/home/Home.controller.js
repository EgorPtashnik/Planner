sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/home/components/StartedTodoTile'
], (BaseController,

    StartedTodoTile
) => {
    'use strict';

    return BaseController.extend('planner.pages.home.Home', {

        ...StartedTodoTile,

        onInit() {
            this.init('home');

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
