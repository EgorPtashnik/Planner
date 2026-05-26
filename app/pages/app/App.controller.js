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
            const sSelectedKey = oEvent?.getSource?.().getSelectedKey() || oEvent;

            switch(sSelectedKey) {
                case 'arma': this._openNestedNavPopover(oEvent.getParameter('item')); break;
                default: this.getRouter().navTo(sSelectedKey);
            }
        },

        _loadFragments() {
            this.DatabaseMenuPopover = this.getFragment('planner.pages.app.components.DatabaseMenuPopover');
            this.NestedNavPopover = this.getFragment('planner.pages.app.components.NestedNavPopover');
        },

        _applyTheme() {
            if (localStorage.getItem('theme') && localStorage.getItem('theme') !== Theming.getTheme()) {
                this.getView().setBusy(true);
                Theming.setTheme(localStorage.getItem('theme') );
                this.AppConfig.setProperty('/darkMode', localStorage.getItem('theme') === this.THEME.DARK);
            }
        },

        async _openNestedNavPopover(oControl) {
            this.NestedNavPopover = await this.NestedNavPopover;

            this.State.setProperty('/NestedNavPopover', {
                title: oControl.getText(),
                items: this._getNestedNavItems(oControl.getKey())
            });

            this.NestedNavPopover.openBy(oControl);
        },

        _getNestedNavItems(sKey) {
            switch(sKey) {
                case 'arma': return [
                    {icon: 'sap-icon://syntax', text: 'SQF Документация', key: 'sqf'},
                    {icon: 'sap-icon://share-2', text: 'Редактор Сценариев', key: 'sqf'}
                ];
                default:
                    return []
            }
        }


    });
});
