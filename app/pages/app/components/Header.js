sap.ui.define(() => {
    'use strict';

    return {

        onPressToggleDarkMode() {
            if (localStorage.getItem('theme') === this.THEME.DARK) {
                localStorage.setItem('theme', this.THEME.LIGHT);
            } else {
                localStorage.setItem('theme', this.THEME.DARK);
            }
            this._applyTheme();
        }

    };
});
