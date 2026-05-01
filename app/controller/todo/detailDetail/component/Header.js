sap.ui.define(() => {
    'use strict';

    return {

        onToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.ThreeColumnsEndExpanded : this.LayoutType.EndColumnFullScreen);
        },

         onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'todoDetail',
                parameters: {
                    id: this.AppConfig.getProperty('/detailID'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        onPressToggleCompactView() {
            this.Config.setProperty('/compactView', !this.Config.getProperty('/compactView'));
        },

        onPressCloseAllPages() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'todoMaster' });
        },

        async onPressDeleteTodoParent() {
            try {
                const oContext = this.getView().getBindingContext('todo');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Этап удален.');
                    this.publish(this.EVENT.NAV_CHANGED, {
                        route: 'todoDetail',
                        parameters: {
                            id: this.AppConfig.getProperty('/detailID'),
                            layout: this.LayoutType.TwoColumnsMidExpanded
                        }
                    });
                    this.publish(this.EVENT.TODOPARENT_CHANGED);
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    };
});