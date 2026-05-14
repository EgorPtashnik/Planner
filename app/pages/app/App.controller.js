sap.ui.define([
    'planner/pages/BaseController',
    'sap/ui/core/Theming',

    'planner/pages/app/Events',
    'planner/pages/app/components/Header'
], (BaseController, Theming,

    Events, Header
) => {
    'use strict';

    return BaseController.extend('planner.pages.app.App', {
        ...Events,
        ...Header,
        THEME: {
            LIGHT: 'sap_horizon',
            DARK: 'sap_horizon_dark'
        },

        onInit() {
            this.init('app');
            this._setSubscriptions();

            this.getView().addStyleClass(this.getContentDensityClass());
            Theming.attachApplied(() => this.getView().setBusy(false));

            this._applyTheme();
        },

        onFCLStateChange(oEvent) {
            const iMaxColumnsCount = oEvent.getParameter('maxColumnsCount');
            if (iMaxColumnsCount === 1) {
                this.AppConfig.setProperty('/isOnlyOneColumn', true);
            } else {
                this.AppConfig.setProperty('/isOnlyOneColumn', false);
            }
        },

        onSelectNavItem(oEvent) {
            this.getRouter().navTo(oEvent.getSource().getSelectedKey());
        },

        _applyTheme() {
            if (localStorage.getItem('theme') && localStorage.getItem('theme') !== Theming.getTheme()) {
                this.getView().setBusy(true);
                Theming.setTheme(localStorage.getItem('theme') );
                this.AppConfig.setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
            }
        }

    });
});
