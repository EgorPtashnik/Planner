sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detailDetail/Events',

    'planner/controller/todo/detailDetail/component/TodoItems',
    'planner/controller/todo/detailDetail/component/Header'
], (BaseController, Events,

    TodoItemsLogic, HeaderLogic
) => {
    'use strict';

    return BaseController.extend('planner.todo.detailDetail.TodoDetailDetail', {

        ...Events,

        ...TodoItemsLogic,
        ...HeaderLogic,

        onInit() {
            this.init('todoDetailDetail');
            this.setSubscriptions();

            this.ODataEventsAttached = false;
            
            this.Config.setData({
                ID: null,
                compactView: true,

                editTodoItems: false,
                showCompletedTodoItems: false
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoDetailDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }

            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idTodoItemsList').getBinding('items').attachPatchCompleted(() => this.publish(this.EVENT.TODOPARENT_CHANGED));
            }
        },

        bindView(sID, sListID) {
            try {
                this.getView().bindElement({
                    path: `todo>/TodoParent(ID=${sID},list_ID=${sListID})`,
                    parameters: {
                        $expand: 'items,list'
                    },
                    events: {
                        patchCompleted: () => this.publish(this.EVENT.TODOPARENT_CHANGED)
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    });
});
