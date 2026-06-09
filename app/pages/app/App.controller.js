sap.ui.define([
    'planner/pages/BaseController',
    'sap/ui/core/Theming',

    'planner/pages/app/Events',
    'planner/pages/app/components/Header',
    'planner/pages/app/components/DatabaseMenuPopover'
], (BaseController, Theming,

    Events, Header, DatabaseMenuPopover
) => {
    'use strict';

    return BaseController.extend('planner.pages.app.App', {
        ...Events,
        ...Header,
        ...DatabaseMenuPopover,
        THEME: {
            LIGHT: 'sap_horizon',
            DARK: 'sap_horizon_dark'
        },

        onInit() {
            this.init('app');
            this._setSubscriptions();
            this._loadFragments();

            this.getView().addStyleClass(this.getContentDensityClass());

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

        _loadFragments() {
            this.DatabaseMenuPopover = this.getFragment('planner.pages.app.components.DatabaseMenuPopover');
            this.BusyDialog = this.getFragment('planner.pages.app.components.BusyDialog');
        },

        _applyTheme() {
            if (localStorage.getItem('theme') && localStorage.getItem('theme') !== Theming.getTheme()) {
                this.publish(this.EVENT.OPEN_BUSY_DIALOG, 'Меняю тему...');
                Theming.setTheme(localStorage.getItem('theme') );
                this.AppConfig.setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
                setTimeout(() => this.publish(this.EVENT.CLOSE_BUSY_DIALOG, 500));
            }
        }

    });
});
