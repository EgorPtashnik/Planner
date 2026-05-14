sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/todo/detail/Events',
    'planner/pages/todo/detail/components/Header',
    'planner/pages/todo/detail/components/TodoItems',
    'planner/pages/todo/detail/components/EditListDialog',
], (BaseController,

    Events, Header, TodoItems, EditListDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.todo.detail.TodoDetail', {

        ...Events,
        ...Header,
        ...TodoItems,
        ...EditListDialog,

        onInit() {
            this.init('todoDetail');
            this._setSubscriptions();
            this._loadFragments();

            this.ODataEventsAttached = false;
            this.State.setData({
                itemCount: 0,
                editItems: false,
                showDetails: false,
                showCompletedItems: false
            })
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
            this._bindView(oEvent.getParameter('arguments').id);
        },

        _bindView(sID) {
            try {
                this.getView().bindElement({
                    path: `todo>/List(${sID})`,
                    parameters: {
                        $expand: 'items,doneItems,tag'
                    },
                    events: {
                        patchCompleted: () => this.publish(this.EVENT.TODOLIST_CHANGED)
                    }
                });

                if (!this.ODataEventsAttached) {
                    this.ODataEventsAttached = true;
                    this.byId('idTodoItems').getBinding('items').attachDataReceived(oEvent => 
                        this.State.setProperty('/itemCount', oEvent.getSource().getCount()));
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        _loadFragments() {
            this.EditListDialog = this.getFragment('planner.pages.todo.detail.components.EditListDialog');
        }

    });
});
