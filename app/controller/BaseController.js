sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library',
    'sap/ui/model/json/JSONModel'
], (Controller, UIComponent, FLib, JSONModel) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

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
        }
        
    })
});
