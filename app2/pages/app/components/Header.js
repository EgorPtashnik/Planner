sap.ui.define(() => {
    'use strict';
    
    return {

        async onOpenDatabaseMenu(oEvent) {
            this.DatabaseMenuPopover = await this.DatabaseMenuPopover;
            this.DatabaseMenuPopover._button = oEvent.getSource();
            
            this.DatabaseMenuPopover.openBy(oEvent.getSource());
        }

    }
});