sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library',
    'sap/ui/model/json/JSONModel',
    'planner/util/Formatter'
], (Controller, UIComponent, FLib, JSONModel,
    Formatter) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        Formatter,

        init() {
            this.LayoutType = FLib.LayoutType;

            this.App = this.getOwnerComponent();
            this.AppConfig = this.App.getModel();
            this.Config = new JSONModel();
            this.getView().setModel(this.Config, 'config');

            this.getRouter().attachRoutePatternMatched(this._onRouteMatched, this);
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
        }
        
    })
});
