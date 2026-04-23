sap.ui.define([
    'planner/controller/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.App', {

        onInit() {
            this.getView().addStyleClass(this.getContentDensityClass());
        },

        onSelectNavItem(oEvent) {
            this.getRouter().navTo(oEvent.getParameter("selectedKey"));
        },

        onPressFooterNavItem(oEvent) {
            this.getRouter().navTo(oEvent.getSource().getBindingContext().getProperty("key"));
        }

    });
});
