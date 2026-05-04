sap.ui.define(() => {
    'use strict';

    return {

        async onPressMobileNavMenu(oEvent) {
            this.MobileNavMenuPopover ??= await this.getFragment('planner.view.app.modal.MobileNavMenuPopover');

            this.MobileNavMenuPopover.openBy(oEvent.getSource());
        },

        onPressMobileNavItem(oEvent) {
            this.MobileNavMenuPopover.close();
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getSource().getBindingContext().getProperty('key')
            });
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
        }

    }
});
