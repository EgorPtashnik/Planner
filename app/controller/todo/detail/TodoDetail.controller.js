sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.controller.todo.detail.TodoDetail', {

        onInit() {
            this.init();
            [
                { id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
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

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'todoDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        },

        bindView(sID) {
            try {
                this.getView().bindElement({
                    path: `todo>/List(${sID})`,
                    parameters: {
                        $expand: 'items,tag'
                    },
                    events: {
                        dataReceived: () => this.getView().setBusy(false),
                        patchCompleted: () => this.publish(this.EVENT.TODOLIST_CHANGED)
                    }
                });

                if (!this.ODataEventsAttached) {
                    this.ODataEventsAttached = true;
                    this.byId('idTodoItems').getBinding('items').attachDataReceived(oEvent => 
                        this.Config.setProperty('/itemCount', oEvent.getSource().getCount()));
                }

            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.TwoColumnsMidExpanded : this.LayoutType.MidColumnFullScreen);
        },

        async onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        onToggleEditMode(oEvent) {
            if (!oEvent.getParameter('pressed')) {
                this.getView().getBindingContext('todo').refresh();
                this.publish(this.EVENT.TODOLIST_CHANGED);
            }
        },

        async onPressDeleteTodoList() {
            try {
                this.getView().setBusy(true);
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.TODOLIST_CHANGED);
                    this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Список удален.');
                }
            } catch(oError) {
                this.getView().setBusy(false);
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressCreateItem() {
            try {
                const oContext = this.byId('idTodoItems').getBinding('items').create({name: 'Новый Шаг', priority: 2});
                await oContext.created();

                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг создан.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressItemSort() {
            this.TableHelper.onPressSort('idTodoItems');
        },

        onPressToggleVisibleItems() {
            this.Config.setProperty('/showCompletedItems', !this.Config.getProperty('/showCompletedItems'));
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

        async onPressDeleteItem(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Шаг удален.');
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
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

        // APPLICATION EVENTS
        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('todo')) {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                if (oData?.parameters?.id) {
                    this.getView().setBusy(true);
                    this.Config.setProperty('/ID', oData.parameters.id);
                    this.Config.setProperty('/editMode', false);
                    this.bindView(oData.parameters.id);
                }
            }
        },

    });
});
