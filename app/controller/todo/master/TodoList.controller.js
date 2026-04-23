sap.ui.define([
    'planner/controller/BaseController',

    'planner/controller/todo/master/component/Footer'
], (BaseController, FooterLogic) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoList', {

        ...FooterLogic,

        onInit() {
            this.init('todoMaster');

            this.TodoList = this.byId('idTodoList')
        },

        _onRouteMatched() {
            this.getOwnerComponent().getModel().setProperty('/selectedRoute', 'todoMaster');
        }

    });
});
