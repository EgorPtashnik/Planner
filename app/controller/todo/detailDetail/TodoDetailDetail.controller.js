sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detailDetail/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.todo.detailDetail.TodoDetailDetail', {

        ...Events,

        onInit() {
            this.init('todoDetailDetail');
            this.setSubscriptions();
            
            this.Config.setData({
                ID: null,
                editTodoItems: false
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
        },

        async onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: this.AppConfig.getProperty('/detailID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        async onPressCloseAllPages() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        async onPressDelete() {
            try {
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Этап удален.');
                    this.publish(this.EVENT.NAV_CHANGED, {
                        route: 'todoDetail',
                        parameters: {
                            id: this.AppConfig.getProperty('/detailID'),
                            layout: this.LayoutType.TwoColumnsMidExpanded
                        }
                    });
                    this.publish(this.EVENT.TODOPARENT_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressAddTodoItem() {
            try {
                const oContext = this.byId('idTodoItemList').getBinding('items').create({name: 'Новый Шаг', priority: 2});
                await oContext.created();

                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг создан.');
                this.publish(this.EVENT.TODOPARENT_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteTodoItem(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг удален.');
                    this.publish(this.EVENT.TODOPARENT_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    });
});
