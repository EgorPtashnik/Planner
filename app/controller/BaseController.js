sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent'
], (Controller, UIComponent) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        init(sRouteName) {
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
