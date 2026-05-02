sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detail/Events',

    'planner/controller/todo/detail/component/Header',
    'planner/controller/todo/detail/component/TodoParents',
], (BaseController, Events,

    HeaderLogic, TodoParentsLogic) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.detail.TodoDetail', {

        ...Events,

        ...HeaderLogic,
        ...TodoParentsLogic,

        onInit() {
            this.init('todoDetail');
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                ID: null,
                compactView: true,

                todoParentCount: 0,
                showTodoParentsSearch: false,
                showTodoParentsDetails: false
            })
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        },

        bindView(sID) {
            try {
                this.getView().bindElement({
                    path: `todo>/TodoList(${sID})`,
                    parameters: {
                        $expand: 'items'
                    },
                    events: {
                        dataReceived: () => this.getView().setBusy(false),
                        patchCompleted: () => this.publish(this.EVENT.TODOLIST_CHANGED)
                    }
                });

                if (!this.ODataEventsAttached) {
                    this.ODataEventsAttached = true;
                    this.byId('idTodoParentsList').getBinding('items').attachDataReceived(oEvent => 
                        this.Config.setProperty('/todoParentCount', oEvent.getSource().getCount()));
                }

            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    });
});
