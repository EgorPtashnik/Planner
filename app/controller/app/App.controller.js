sap.ui.define([
    'planner/controller/BaseController',
    'sap/ui/core/Theming',

    'planner/controller/app/Events',
    'planner/controller/app/component/Header',
    'planner/controller/app/modal/DatabaseMenuPopover'
], (BaseController, Theming, Events,
    
    HeaderLogic, FooterLogic,
    
    DatabaseMenuPopoverLogic) => {
    'use strict';

    return BaseController.extend('planner.controller.App', {

        ...Events,

        ...HeaderLogic,
        ...FooterLogic,

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
            this.MobileNavMenuPopover = null;
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
            if (localStorage.getItem('theme') && localStorage.getItem('theme') !== Theming.getTheme()) {
                this.getView().setBusy(true);
                Theming.setTheme(localStorage.getItem('theme') );
                this.getOwnerComponent().getModel().setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
            }
        }

    });
});
