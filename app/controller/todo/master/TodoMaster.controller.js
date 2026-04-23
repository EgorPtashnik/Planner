sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoLTodoMaster', {

        onInit() {
            this.init('todoMaster');

            this.TodoList = this.byId('idTodoList');
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoMaster') {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
            }

            this.TodoList?.getBinding('items')?.refresh();
        },

        onPressListItem(oEvent) {
            this._navToDetail(oEvent.getSource().getBindingContext('todo').getProperty('ID'));
        },

        async onPressCreate() {
            const oContext = this.TodoList.getBinding('items').create({name: 'Новый Список'});
            await oContext.created();
            this._navToDetail(oContext.getProperty('ID'));
        },

        _navToDetail(sID) {
            this.getRouter().navTo('todoDetail', {
                id: sID,
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }

    });
});
