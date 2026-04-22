sap.ui.define([
    'sap/ui/core/mvc/Controller'
], (Controller) => {
    'use strict';

    return Controller.extend('planner.BaseController', {

        getRouter() {
            return this.getOwnerComponent().getRouter()        
        }
        
    })
});
