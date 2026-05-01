sap.ui.define(() => {
    return {

        onPressToggleDarkMode() {
            if (localStorage.getItem('theme') === this.THEME.DARK) {
                localStorage.setItem('theme', this.THEME.LIGHT);
            } else {
                localStorage.setItem('theme', this.THEME.DARK);
            }
            this._applyTheme();
        },

        async onOpenDatabaseMenu(oEvent) {
            this.DatabaseMenu ??= await this.getFragment('planner.view.app.modal.DatabaseMenuPopover');

            this.DatabaseMenu.openBy(oEvent.getSource());
        }

    }
});
