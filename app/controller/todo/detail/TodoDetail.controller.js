sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.detail.TodoDetail', {

        onInit() {
            this.init('todoDetail');

            this.TodoParentList = this.byId('idTodoParentList');
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoDetail') {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                this.byId('idTodoListNameInput').focus();
                this.bindView(oParameters.arguments.id);
            }

            if (!this.getView().getBindingContext('todoService')) {
                this.bindView(oParameters.arguments.id);
            }

        },

        bindView(sID) {
            if (sID) {
                this.getView().bindElement({
                    path: `todoService>/TodoList(${sID})`,
                    parameters: {
                        $expand: 'items'
                    }
                });
            }
        },

        async onPressClosePage() {
            const oModel = this.App.getModel('todoService');
            if (oModel.hasPendingChanges()) {
                await oModel.submitBatch('$auto');
            }

            this.getRouter().navTo('todoMaster');
        },

        onPressDelete() {
            this.onPressClosePage();
            this.getView().getBindingContext('todoService').delete();
        },

        onPressTodoParentItem(oEvent) {
            this._navToDetailDetail(oEvent.getSource().getBindingContext('todoService').getProperty('ID'));
        },

        async onPressAddTodoParent() {
            const oContext = this.TodoParentList.getBinding('items').create({name: 'Новый Этап'});
            await oContext.created();
            this._navToDetailDetail(oContext.getProperty('ID'));
        },

        _navToDetailDetail(sID) {
            this.getRouter().navTo('todoDetailDetail', {
                id: this.AppConfig.getProperty('/detailID'),
                item: sID,
                layout: this.LayoutType.ThreeColumnsEndExpanded
            });
        }

    });
});
