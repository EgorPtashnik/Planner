sap.ui.define(() => {
    'use strict';

    return {
        
        // TOOLBAR
        onPressCreateSqfCommand() {
            this._openCreateFunctionDialog();
        },

        // ITEMS
        onPressSqfCommandItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'sqfDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('arma').getProperty('name'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });

        }

    };
});
