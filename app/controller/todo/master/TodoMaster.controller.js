sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/master/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.master.TodoMaster', {

        ...Events,

        onInit() {
            this.init('todoMaster');
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                todoListCount: 0,
                showTodoListsSearch: false
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoMaster') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }

            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idTodoListsList').getBinding('items').attachDataReceived(oEvent =>
                    oEvent.getSource().getHeaderContext().requestProperty('$count')
                        .then(value => this.Config.setProperty('/todoListCount', value))).refresh();
            }
        },

        onChangeTodoListsSearch(oEvent) {
            this.byId('idTodoListsList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressCreateTodoList() {
            const oContext = this.byId('idTodoListsList').getBinding('items').create({name: 'Новый Список'});
            await oContext.created();
            this.publish(this.EVENT.ACTION_SUCCEEDED, 'Список создан.');

            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        onPressTodoListItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

    });
});
