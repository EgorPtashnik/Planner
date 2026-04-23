sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'sap/f/library'
], (Controller, UIComponent, FLib) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        init(sRouteName) {
            this.LayoutType = FLib.LayoutType;

            this.getRouter().getRoute(sRouteName).attachPatternMatched(this._onRouteMatched, this);
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
        }
        
    })
});
