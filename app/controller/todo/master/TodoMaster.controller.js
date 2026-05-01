sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/master/Events',

    'planner/controller/todo/master/component/TodoLists'
], (BaseController, Events,

    TodoListsLogic
) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoLTodoMaster', {

        ...Events,
        ...TodoListsLogic,

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
        }

    });
});
