sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.detail.TodoParent', {

        onInit() {
            this.init('todoDetail');
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'todoMaster');

            this.bindView(oEvent.getParameters().arguments.id);
            this.byId('idTodoListNameInput').focus();
        },

        bindView(sID) {
            this.getView().bindElement({
                path: `todoService>/TodoList(${sID})`,
                parameters: {
                    $expand: 'items'
                }
            });
        },

        async onPressClosePage() {
            const oModel = this.App.getModel('todoService');
            if (oModel.hasPendingChanges()) {
                await oModel.submitBatch('$auto');
            }

            this.getRouter().navTo('todoMaster');
        },

    });
});
