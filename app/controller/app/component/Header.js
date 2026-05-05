sap.ui.define(() => {
    'use strict';

    return {

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
