sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library',
    'sap/ui/model/json/JSONModel',

    'planner/utils/Formatter',
    'planner/utils/MessageHelper',
    'planner/utils/TableHelper'
], (Controller, UIComponent, FLib, JSONModel,

    Formatter, MessageHelper, TableHelper
) => {
    'use strict';

    return Controller.extend('planner.pages.BaseController', {

        Formatter,
        MessageHelper,

        EVENT: {
            ACTION_FAILED: 'ACTION_FAILED',

            TODOLIST_CHANGED: 'TODOLIST_CHANGED',
            TODOLIST_TAG_CHANGED: 'TODOLIST_TAG_CHANGED'
        },

        init(sRoute) {
            this.LayoutType = FLib.LayoutType;
            this.TableHelper = new TableHelper();
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
