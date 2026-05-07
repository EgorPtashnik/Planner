sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/detailDetail/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.detailDetail.TodoDetailDetail', {

        ...Events,

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

        onToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.ThreeColumnsEndExpanded : this.LayoutType.EndColumnFullScreen);
        },

         onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: this.AppConfig.getProperty('/detailID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        onPressToggleCompactView() {
            this.Config.setProperty('/compactView', !this.Config.getProperty('/compactView'));
        },

        onPressCloseAllPages() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        async onPressDeleteTodoParent() {
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
        
        onChangeTodoItemsSearch(oEvent) {
            this.byId('idTodoItemsList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressAddTodoItem() {
            try {
                const oContext = this.byId('idTodoItemsList').getBinding('items').create({name: 'Новый Шаг', priority: 2});
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
        },

        onPressToggleVisibleItems() {
            this.Config.setProperty('/showCompletedTodoItems', !this.Config.getProperty('/showCompletedTodoItems'));
        },

        async onPressDeleteCompletedItems() {
            try {
                await Promise.all(this.byId('idTodoItemsList').getBinding('items').getContexts().filter(oContext => oContext.getProperty('status') > 1).map(oContext => oContext.delete()));
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Законченные шаги удалены.');
                this.publish(this.EVENT.TODOPARENT_CHANGED);
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressChangeTodoItemStatus(oEvent, iStatus) {
            oEvent.getSource().getBindingContext('todo').setProperty('status', iStatus);
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
