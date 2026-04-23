sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.detailDetail.TodoDetail', {

        onInit() {
            this.init('todoDetailDetail');
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoDetailDetail') {
                this.bindView(oParameters.arguments.item, oParameters.arguments.id);
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                this.byId('idTodoParentNameInput').focus();
            }

            if (!this.getView().getBindingContext('todoService')) {
                this.bindView(oParameters.arguments.item, oParameters.arguments.id);
            }
        },

        bindView(sID, sListID) {
            if (sID && sListID) {
                this.getView().bindElement({
                    path: `todoService>/TodoParent(ID=${sID},list_ID=${sListID})`,
                    parameters: {
                        $expand: 'items'
                    }
                });
            }
        },

        header: {
            async onPressClosePage() {
                const oModel = this.App.getModel('todoService');
                if (oModel.hasPendingChanges()) {
                    await oModel.submitBatch('$auto');
                }

                this.getRouter().navTo('todoDetail', {
                    id: this.AppConfig.getProperty('/detailID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                });
            }
        }

    });
});
