sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detail/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.detail.TodoDetail', {

        ...Events,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.Config.setData({
                ID: null,
                compactView: true,

                todoParentCount: 0,
                showTodoParentsSearch: false,
                showTodoParentsDetails: false
            });
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
        },

        async onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        onPressToggleCompactView() {
            this.Config.setProperty('/compactView', !this.Config.getProperty('/compactView'));
        },

        async onPressDeleteTodoList() {
            try {
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Список удален.');
                    this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
                    this.publish(this.EVENT.TODOLIST_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onChangeTodoParentsSearch(oEvent) {
            this.byId('idTodoParentsList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressAddTodoParent() {
            try {
                const oContext = this.byId('idTodoParentsList').getBinding('items').create({
                    name: 'Новый Этап',
                    priority: 1
                });
                await oContext.created();

                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Этап создан.');
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: 'todoDetailDetail',
                    parameters: {
                        id: this.AppConfig.getProperty('/detailID'),
                        item: oContext.getProperty('ID'),
                        layout: this.LayoutType.ThreeColumnsEndExpanded
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressTodoParentItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetailDetail',
                parameters: {
                    id: this.AppConfig.getProperty('/detailID'),
                    item: oEvent.getSource().getBindingContext('todo').getProperty('ID'),
                    layout: this.LayoutType.ThreeColumnsEndExpanded
                }
            });
        }

    });
});
