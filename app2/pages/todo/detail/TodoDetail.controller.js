sap.ui.define([
    'planner/pages/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.pages.todo.detail.TodoDetail', {

        onInit() {
            this.init();
            this._setTableHelperConfig();
        },


    });
});
