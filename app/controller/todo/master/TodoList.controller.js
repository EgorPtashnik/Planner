sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoList', {

        onInit() {
            this.init('todoMaster');

            this.TodoList = this.byId('idTodoList')
        },

        _onRouteMatched() {
            this.AppConfig.setProperty('/selectedRoute', 'todoMaster');

            this.TodoList?.getBinding('items')?.refresh();
        },

        async onPressCreateTodoList() {
            const oContext = this.TodoList.getBinding('items').create({name: 'New Activity List'});
            await oContext.created();
            this._navToDetail(oContext.getProperty('ID'));
        },

        onPressTodoListItem(oEvent) {
            this._navToDetail(oEvent.getSource().getBindingContext('todoService').getProperty('ID'));
        },

        _navToDetail(sID) {
            this.getRouter().navTo('todoDetail', {
                id: sID,
                layout: this.LayoutType.TwoColumnsMidExpanded
            });
        }

    });
});
