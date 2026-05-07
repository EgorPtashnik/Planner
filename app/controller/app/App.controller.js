sap.ui.define([
    'planner/controller/BaseController',
    'sap/ui/core/Theming',

    'planner/controller/app/Events',
    'planner/controller/app/modal/DatabaseMenuPopover'
], (BaseController, Theming, Events,
    
    DatabaseMenuPopoverLogic) => {
    'use strict';

    return BaseController.extend('planner.controller.App', {

        ...Events,
        ...DatabaseMenuPopoverLogic,

        THEME: {
            LIGHT: 'sap_horizon',
            DARK: 'sap_horizon_dark'
        },

        onInit() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            this.setSubscriptions();

            Theming.attachApplied(() => this.getView().setBusy(false));
            this._applyTheme();

            this.DatabaseMenuPopover = null;
        },

        onFCLStateChange(oEvent) {
            const iMaxColumnsCount = oEvent.getParameter('maxColumnsCount');
            if (iMaxColumnsCount === 1) {
                this.getOwnerComponent().getModel().setProperty('/isOnlyOneColumn', true);
            } else {
                this.getOwnerComponent().getModel().setProperty('/isOnlyOneColumn', false);
            }
        },

        onSelectNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getParameter('selectedKey')
            });
        },

        onPressToggleDarkMode() {
            if (localStorage.getItem('theme') === this.THEME.DARK) {
                localStorage.setItem('theme', this.THEME.LIGHT);
            } else {
                localStorage.setItem('theme', this.THEME.DARK);
            }
            this._applyTheme();
        },

        async onOpenDatabaseMenu(oEvent) {
            this.DatabaseMenuPopover ??= await this.getFragment('planner.view.app.modal.DatabaseMenuPopover');

            this.DatabaseMenuPopover.openBy(oEvent.getSource());
        },

        onPressFooterNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getSource().getBindingContext().getProperty('key')
            });
        },

        _applyTheme() {
            if (localStorage.getItem('theme') && localStorage.getItem('theme') !== Theming.getTheme()) {
                this.getView().setBusy(true);
                Theming.setTheme(localStorage.getItem('theme') );
                this.getOwnerComponent().getModel().setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
            }
        }

    });
});
