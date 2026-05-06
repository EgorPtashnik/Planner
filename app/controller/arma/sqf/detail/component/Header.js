sap.ui.define(() => {
    'use strict';

    return {

        onToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.TwoColumnsMidExpanded : this.LayoutType.MidColumnFullScreen);
        },

        onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'sqfMaster' });
        },

        onToggleEditMode(oEvent) {
            if (!oEvent.getParameter('pressed')) {
                this.bindView(this.Config.getProperty('/ID'));
                this.publish(this.EVENT.SQFCOMMAND_CHANGED);
            }
        },

        async onPressSourceCode() {
            this.SourceCodeDialog ??= await this.getFragment('planner.view.arma.sqf.detail.modal.SourceCodeDialog');

            this.SourceCodeDialog.open();
        }

    };
});
