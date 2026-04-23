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

            if (!this.getView().getBindingContext('todo')) {
                this.bindView(oParameters.arguments.item, oParameters.arguments.id);
            }
        },

        bindView(sID, sListID) {
            if (sID && sListID) {
                this.getView().bindElement({
                    path: `todo>/TodoParent(ID=${sID},list_ID=${sListID})`,
                    parameters: {
                        $expand: 'items,list'
                    }
                });
            }
        },

        async onPressClosePage() {
            const oModel = this.App.getModel('todo');
            if (oModel.hasPendingChanges()) {
                await oModel.submitBatch('$auto');
            }

            this.getRouter().navTo('todoDetail', {
                id: this.AppConfig.getProperty('/detailID'),
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        },

        async onPressCloseAllPages() {
            const oModel = this.App.getModel('todo');
            if (oModel.hasPendingChanges()) {
                await oModel.submitBatch('$auto');
            }

            this.getRouter().navTo('todoMaster');
        },

        onPressDelete() {
            this.onPressClosePage();
            this.getView().getBindingContext('todo').delete();
        }

    });
});
