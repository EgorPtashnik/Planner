sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.detail.TodoParent', {

        onInit() {
            this.init('todoDetail');
        },

        onPressClosePage() {
            this.getRouter().navTo('todoMaster');
        },

        _onRouteMatched() {
            this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
        }

    });
});
