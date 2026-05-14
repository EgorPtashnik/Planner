sap.ui.define([
    'planner/pages/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.pages.todo.detail.TodoDetail', {

        onInit() {
            this.init();
            this._setTableHelperConfig();

            this.ODataEventsAttached = false;
            this.Config.setData({
                ID: null,
                editMode: false,

                itemCount: 0,
                showDetails: false,
                showCompletedItems: false
            });
        },

        bindView(sID) {
            if (!this.ODataEventsAttached) {
                this.ODataEventsAttached = true;
                this.byId('idTodoItems').getBinding('items').attachDataReceived(oEvent => 
                    this.Config.setProperty('/itemCount', oEvent.getSource().getCount()));
            }
        },

        onPressItemSort() {
            this.TableHelper.onPressSort('idTodoItems');
        },

        async onPressDeleteCompletedItems() {
            try {
                await Promise.all(this.byId('idTodoItems').getBinding('items').getContexts().filter(oContext => oContext.getProperty('status') > 1).map(oContext => oContext.delete()));
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Законченные шаги удалены.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressChangeItemStatus(oEvent, iStatus) {
            oEvent.getSource().getBindingContext('todo').setProperty('status', iStatus);
            this.publish(this.EVENT.TODOLIST_CHANGED);
        },

        _setTableHelperConfig() {
            this.TableHelper.setController(this);
            this.TableHelper.register('idTodoItems', {
                columns: [
                    { label: 'Имя', path: 'name' },
                    { label: 'Приоритет', path: 'priority' },
                    { label: 'Статус', path: 'status'},
                    { label: 'Дата Создания', path: 'createdAt' },
                    { label: 'Дата Обновления', path: 'modifiedAt' }
                ],
                sort: { path: 'createdAt', order: 'desc' }
            });
        },

    });
});
