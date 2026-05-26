sap.ui.define(() => {
    'use strict';

    return {

        onPressRefreshPage() {
            this.MessageHelper.confirm({
                message: 'Перезагрузить приложение?',
                onClose: sAction => sAction === 'ОК' ? globalThis.location.reload() : false
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

        async onPressDatabaseMenu(oEvent) {
            this.DatabaseMenuPopover = await this.DatabaseMenuPopover;
            
            this.DatabaseMenuPopover.openBy(oEvent.getSource());
        },

        onPressOpenRender() {
            const sRenderURL = 'https://dashboard.render.com/project/prj-d7p15eq8qa3s738vk7lg/environment/evm-d7p15eq8qa3s738vk7m0';

            this.URLHelper.redirect(sRenderURL, true);
        }

    };
});
