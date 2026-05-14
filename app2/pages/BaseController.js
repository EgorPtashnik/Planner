sap.ui.define([
    'sap/ui/core/mvc/Controller',

    'planner/util/TableHelper'
], (Controller, 
    
    TableHelper) => {
    'use strict';

    return Controller.extend('planner.pages.BaseController', {

        init() {
        },
        

        async onPressCopy(sValue) {
            try {
                await navigator.clipboard.writeText(sValue);
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Сохранено в буфер обмена.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_SUCCEEDED, oError);
            }
        }

    });
});
