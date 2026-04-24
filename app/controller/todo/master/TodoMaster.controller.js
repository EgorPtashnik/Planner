sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/master/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.todo.master.TodoLTodoMaster', {

        ...Events,

        onInit() {
            this.init('todoMaster');
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                todoListCount: 0
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
        },

        onPressListItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        async onPressCreate() {
            const oContext = this.byId('idTodoList').getBinding('items').create({name: 'Новый Список'});
            await oContext.created();

            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        }

    });
});
