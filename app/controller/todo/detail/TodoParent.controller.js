sap.ui.define([
    'planner/controller/BaseController',

    'planner/controller/todo/detail/component/Header'
], (BaseController, HeaderLogic) => {
    'use strict';

    return BaseController.extend('planner.todo.detail.TodoParent', {

        ...HeaderLogic,

        onInit() {
            this.init('todoDetail');
        },

        _onRouteMatched() {
            this.getOwnerComponent().getModel().setProperty('/selectedRoute', 'todo');
        }

    });
});
