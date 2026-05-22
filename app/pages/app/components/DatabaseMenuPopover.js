sap.ui.define(() => {
    'use strict';

    return {

        onPressDownloadDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.DOWNLOAD_DATABASE, this.DatabaseMenuPopover._button);
        },

        onPressBackupDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.BACKUP_DATABASE, this.DatabaseMenuPopover._button);
        },

        onPressRestoreDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.RESTORE_DATABASE, this.DatabaseMenuPopover._button);
        }

    }
});
