sap.ui.define([
    'planner/pages/BaseController',

    'planner/pages/todo/master/Events',
    'planner/pages/todo/master/components/FilterBar',
    'planner/pages/todo/master/components/TodoList',
    'planner/pages/todo/master/components/CreateListDialog',
    'planner/pages/todo/master/components/ManageListTagsDialog'
], (BaseController,

    Events, FilterBar, TodoList, CreateListDialog, ManageListTagsDialog) => {
    'use strict';

    return BaseController.extend('planner.pages.todo.master.TodoMaster', {

        ...Events,
        ...FilterBar,
        ...TodoList,
        ...CreateListDialog,
        ...ManageListTagsDialog,

        onInit() {
            this.init('todoMaster');
            this._setSubscriptions();
            this._loadFragments();
            this._setTableHelperConfig();

            this.ODataEventsAttached = false;
            this.State.setData({
                listCount: 0,
                showCompletedLists: false,
                tagCount: 0,
                filterBar: {
                    ListTag: [],
                    Priority: []
                }
            })
        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'todoMaster');

            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idTodoList').getBinding('items').attachDataReceived(oEvent =>
                    oEvent.getSource().getHeaderContext().requestProperty('$count')
                        .then(value => this.State.setProperty('/listCount', value))).refresh();
            }
        },

        _loadFragments() {
            this.CreateListDialog = this.getFragment('planner.pages.todo.master.components.CreateListDialog');
            this.ManageListTagsDialog = this.getFragment('planner.pages.todo.master.components.ManageListTagsDialog');
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
        }

    });
});
