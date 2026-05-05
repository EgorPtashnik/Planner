sap.ui.define(() => {
    'use strict';

    return {

        onPressFooterNavItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: oEvent.getSource().getBindingContext().getProperty('key')
            });
        }

    }
});
