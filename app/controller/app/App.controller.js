sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/app/Events'
], (BaseController, Events) => {
    'use strict';

    return BaseController.extend('planner.App', {

        ...Events,

        onInit() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            this.setSubscriptions();
        },

        onSelectNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getParameter('selectedKey')
            });
        },

        onPressFooterNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getSource().getBindingContext().getProperty('key')
            });
        },

        onFCLStateChange(oEvent) {
            const iMaxColumnsCount = oEvent.getParameter('maxColumnsCount');
            if (iMaxColumnsCount === 1) {
                this.getOwnerComponent().getModel().setProperty('/isOnlyOneColumn', true);
            } else {
                this.getOwnerComponent().getModel().setProperty('/isOnlyOneColumn', false);
            }
        }

    });
});
