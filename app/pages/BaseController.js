sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library',
    'sap/m/library',
    'sap/ui/model/json/JSONModel',

    'planner/utils/Formatter',
    'planner/utils/MessageHelper',
    'planner/utils/TableHelper',
    'planner/utils/ValidationHelper'
], (Controller, UIComponent, FLib, MLib, JSONModel,

    Formatter, MessageHelper, TableHelper, ValidationHelper
) => {
    'use strict';

    return Controller.extend('planner.pages.BaseController', {

        Formatter,
        MessageHelper,

        EVENT: {
            ACTION_REQUESTED: 'ACTION_REQUESTED',
            ACTION_FAILED: 'ACTION_FAILED',
            OPEN_BUSY_DIALOG: 'OPEN_BUSY_DIALOG',
            CLOSE_BUSY_DIALOG: 'CLOSE_BUSY_DIALOG',

            TODOLIST_CHANGED: 'TODOLIST_CHANGED',
            TODOLIST_TAG_CHANGED: 'TODOLIST_TAG_CHANGED',
            TODOITEM_CHANGED: 'TODOITEM_CHANGED',

            GYMTRAINING_CHANGED: 'GYMTRAINING_CHANGED',

            COMMON: {
                DOWNLOAD_DATABASE: 'DOWNLOAD_DATABASE',
                BACKUP_DATABASE: 'BACKUP_DATABASE',
                RESTORE_DATABASE: 'RESTORE_DATABASE'
            },

            TODO: {
                CREATE_LIST: 'CREATE_LIST',
                DELETE_LIST: 'DELETE_LIST',
                UPDATE_LIST: 'UPDATE_LIST',
                CREATE_LISTTAG: 'CREATE_LISTTAG',
                DELETE_LISTTAG: 'DELETE_LISTTAG',
                CREATE_ITEM: 'CREATE_ITEM',
                DELETE_ITEM: 'DELETE_ITEM',
                UPDATE_ITEM: 'UPDATE_ITEM',
                DELETE_COMPLETED_ITEMS: 'DELETE_COMPLETED_ITEMS',
                UPDATE_ITEM_STATUS: 'UPDATE_ITEM_STATUS',
                MOVE_ITEM: 'MOVE_ITEM',
            },

            GYM: {
                CREATE_TRAINING: 'CREATE_TRAINING',
                DELETE_TRAINING: 'DELETE_TRAINING',
                SETTLE: 'SETTLE',
                GET_TOTAL_COST: 'GET_TOTAL_COST'
            }
        },

        init(sRoute) {
            this.LayoutType = FLib.LayoutType;
            this.URLHelper = MLib.URLHelper;

            this.TableHelper = new TableHelper();
            this.ValidationHelper = new ValidationHelper(this);
            this.App = this.getOwnerComponent();
            this.AppConfig = this.App.getModel();
            this.State = new JSONModel();
            this.getView().setModel(this.State, 'state');

            if (sRoute !== 'app') {
                this.getRouter().getRoute(sRoute).attachPatternMatched(this._onRouteMatched, this);
            }
        },

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        getContentDensityClass() {
            return this.getOwnerComponent().getContentDensityClass();
        },

        getFragment(sPath) {
            return this.loadFragment({name: sPath}).then(oFragment => {
                oFragment.addStyleClass(this.getContentDensityClass());
                return oFragment;
            });
        },

        createJSONModel() {
            return new JSONModel();
        },

        onPressCloseDialog(oEvent) {
            oEvent.getSource().getParent().close();
        },

        subscribe(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().subscribe(sEventId, fnFunction, this);
        },
        
        subscribeOnce(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().subscribe(sEventId, fnFunction, this);
        },

        unsubscribe(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().unsubscribe(sEventId, fnFunction, this);
        },

        publish(vEvent, vData) {
            if (typeof vEvent === 'array') {
                vEvent.forEach(oEvent => this.publish(oEvent.id, oEvent.fnc));
            } else {
                const oData = typeof vData === 'object' ? vData : {value: vData};
                this.getOwnerComponent().getEventBus().publish(vEvent, oData);
            }
        },

    });
});
