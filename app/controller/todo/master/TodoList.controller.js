sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoList', {

        onInit() {
            this.init("todo");
        },

        _onRouteMatched() {
            this.getOwnerComponent().getModel().setProperty('/selectedRoute', 'todo');
        }

    });
});
