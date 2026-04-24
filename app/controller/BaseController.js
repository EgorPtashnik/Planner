sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library',
    'sap/ui/model/json/JSONModel',
    'planner/controller/EventCatalog',

    'planner/util/Formatter'
], (Controller, UIComponent, FLib, JSONModel, EVENT,
    Formatter) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        EVENT,
        Formatter,

        init(sRouteName) {
            this.LayoutType = FLib.LayoutType;

            this.App = this.getOwnerComponent();
            this.AppConfig = this.App.getModel();
            this.Config = new JSONModel();
            this.getView().setModel(this.Config, 'config');

            this.getRouter().getRoute(sRouteName).attachPatternMatched(this._onRouteMatched, this);
        },

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        getContentDensityClass() {
            return this.App.getContentDensityClass();
        },

        getFragment(sPath) {
            return this.loadFragment({name: sPath}).then(oFragment => {
                oFragment.addStyleClass(this.getContentDensityClass());
                return oFragment;
            });
        },
        
        //Event Bus Methods
        subscribe(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().subscribe(sEventId, fnFunction, this);
        },
        
        subscribeOnce(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().subscribe(sEventId, fnFunction, this);
        },

        publish(sEventId, vData) {
            const oData = typeof vData === 'object' ? vData : {value: vData};
            this.getOwnerComponent().getEventBus().publish(sEventId, oData);
        },

        unsubscribe(sEventId, fnFunction) {
            this.getOwnerComponent().getEventBus().unsubscribe(sEventId, fnFunction, this);
        }
        
    })
});
