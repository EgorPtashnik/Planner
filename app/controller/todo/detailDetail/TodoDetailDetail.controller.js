sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detailDetail/Events',

    'planner/controller/todo/detailDetail/component/TodoItems',
    'planner/controller/todo/detailDetail/component/Header'
], (BaseController, Events,

    TodoItemsLogic, HeaderLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.detailDetail.TodoDetailDetail', {

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

                todoItemsCount: 0,
                editTodoItems: false,
                showTodoItemsSearch: false,
                showCompletedTodoItems: false,
                showTodoItemsDetails: false
            });
        },

        onAfterRendering() {
            this._setTableHelperConfig();
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
                this.byId('idTodoItemsList').getBinding('items').attachDataReceived(oEvent => this.Config.setProperty('/todoItemsCount', oEvent.getSource().getCount()));
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
                        dataReceived: () => this.getView().setBusy(false),
                        patchCompleted: () => this.publish(this.EVENT.TODOPARENT_CHANGED)
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        _setTableHelperConfig() {
            this.TableHelper.setController(this);
            this.TableHelper.register('idTodoItemsList', {
                columns: [
                    { label: 'Имя', path: 'name' },
                    { label: 'Приоритет', path: 'priority' },
                    { label: 'Статус', path: 'status'},
                    { label: 'Дата Создания', path: 'createdAt' },
                    { label: 'Дата Обновления', path: 'modifiedAt' }
                ],
                sort: { path: 'createdAt', order: 'desc' }
            });
        }

    });
});
