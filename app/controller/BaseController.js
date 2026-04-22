sap.ui.define([
    'sap/ui/core/mvc/Controller'
], (Controller) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        getRouter() {
            return this.getOwnerComponent().getRouter()        
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
