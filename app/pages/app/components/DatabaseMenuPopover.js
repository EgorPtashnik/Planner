sap.ui.define(() => {
    'use strict';

    return {

        onPressDownloadDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.DOWNLOAD_DATABASE);
        },

        onPressBackupDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.BACKUP_DATABASE);
        },

        onPressRestoreDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.COMMON.RESTORE_DATABASE);
        }

    }
});
