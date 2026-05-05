sap.ui.define(() => {
    'use strict';

    return {

        onToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.TwoColumnsMidExpanded : this.LayoutType.MidColumnFullScreen);
        },

        onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'sqfMaster' });
        }

    };
});
