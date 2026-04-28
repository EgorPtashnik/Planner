sap.ui.define([
    'planner/controller/BaseController',
    'sap/ui/core/Theming',

    'planner/controller/app/Events'
], (BaseController, Theming, Events) => {
    'use strict';

    return BaseController.extend('planner.App', {

        ...Events,

        THEME: {
            LIGHT: 'sap_horizon',
            DARK: 'sap_horizon_dark'
        },

        onInit() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            this.setSubscriptions();

            Theming.attachApplied(() => this.getView().setBusy(false));
            this._applyTheme();
        },

        onSelectNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getParameter('selectedKey')
            });
        },

        onPressToggleDarkMode() {
            if (localStorage.getItem("theme") === this.THEME.DARK) {
                localStorage.setItem("theme", this.THEME.LIGHT);
            } else {
                localStorage.setItem("theme", this.THEME.DARK);
            }
            this._applyTheme();
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
        },

        _applyTheme() {
            if (localStorage.getItem('theme')) {
                this.getView().setBusy(true);
                Theming.setTheme(localStorage.getItem('theme'));
                this.getOwnerComponent().getModel().setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
            }
        }

    });
});
