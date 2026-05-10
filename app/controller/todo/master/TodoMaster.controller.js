sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/todo/master/ManageTagsDialog'
], (BaseController, ManageTagsDialog) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.master.TodoMaster', {

        ...ManageTagsDialog,

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
                filterBar: {
                    ListTag: []
                }
            });

            this.ManageTagsDialog = null;
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

        onChangeTodoListSearch(oEvent) {
            this.byId('idTodoList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        onChangeTodoListFilter() {
            const sFilters = this._getFilters();
            this.byId('idTodoList').getBinding('items').changeParameters({ $filter: sFilters || undefined });
        },

        async onPressCreateList() {
            const oContext = this.byId('idTodoList').getBinding('items').create({
                name: 'Новый Список',
                priority: 1,
                items: [],
                doneItems: []
            });
            await oContext.created();
            this.publish(this.EVENT.ACTION_SUCCEEDED, 'Дело создано.');

            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: oContext.getProperty('ID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        onPressManageTags() {
            this._openManageTagsDialog();
        },

        onPressTodoListSort() {
            this.TableHelper.onPressSort('idTodoList');
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

        _getFilters() {
            const aFilters = [];
            const oFilterBarData = this.Config.getProperty('/filterBar');
            if (oFilterBarData.ListTag.length) {
                aFilters.push('(' + oFilterBarData.ListTag.map(sID => `tag_ID eq ${sID}`).join(' or ') + ')');
            }

            if (oFilterBarData.Priority.length) {
                aFilters.push('(' + oFilterBarData.Priority.map(sID => `priority eq ${sID}`).join(' or ') + ')');
            }

            return aFilters.join(' and ');
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
