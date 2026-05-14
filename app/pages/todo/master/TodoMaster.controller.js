sap.ui.define([
    'planner/pages/BaseController',
    'planner/pages/todo/master/components/FilterBar',
    'planner/pages/todo/master/components/TodoList',
    'planner/pages/todo/master/components/ManageListTagsDialog'
], (BaseController, FilterBar, TodoList, ManageListTagsDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.todo.master.TodoMaster', {

        ...FilterBar,
        ...TodoList,
        ...ManageListTagsDialog,

        onInit() {
            this.init();
            [
                { id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged },
                { id: this.EVENT.TODOLIST_CHANGED, fnc: this._onTodoListChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
            this._setTableHelperConfig();

            this.ODataEventsAttached = false;
            this.Config.setData({
                listCount: 0,
                tagCount: 0,
                showDetails: false,
                filterBar: {
                    ListTag: [],
                    Priority: []
                }
            });

            this.ManageListTagsDialog = null;
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
                this.byId('idTodoList').getBinding('items').attachDataReceived(oEvent =>
                    oEvent.getSource().getHeaderContext().requestProperty('$count')
                        .then(value => this.Config.setProperty('/listCount', value))).refresh();
            }
        },

        _setTableHelperConfig() {
            this.TableHelper.setController(this);
            this.TableHelper.register('idTodoTagList', {
                columns: [
                    { label: 'Имя', path: 'name' },
                    { label: 'Описание', path: 'info' },
                    { label: 'Дата Создания', path: 'createdAt' },
                    { label: 'Дата Обновления', path: 'modifiedAt' }
                ],
                sort: { path: 'createdAt', order: 'desc' }
            });
            this.TableHelper.register('idTodoList', {
                columns: [
                    { label: 'Имя', path: 'name' },
                    { label: 'Приоритет', path: 'priority' },
                    { label: 'Дата Создания', path: 'createdAt' },
                    { label: 'Дата Обновления', path: 'modifiedAt' }
                ],
                sort: { path: 'createdAt', order: 'desc' }
            });
        },

        // APPLICATION EVENTS
        _onNavChanged(_, sEventId, oData) {
            if (oData.route === 'todoMaster') {
                this.getView().setBusy(true);
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                setTimeout(() => this.getView().setBusy(false));
            }
        },

        _onTodoListChanged() {
            this.byId('idTodoList').getBinding('items').refresh();
        }
    });
});
