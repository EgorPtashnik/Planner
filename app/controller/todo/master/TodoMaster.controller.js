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
                variant: 'Все'
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

        onPressManageTags() {
            this._openManageTagsDialog();
        },

        onChangeTodoListSearch(oEvent) {
            this.byId('idTodoList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        async onPressCreateList() {
            const oContext = this.byId('idTodoList').getBinding('items').create({name: 'Новый Список'});
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
