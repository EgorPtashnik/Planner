sap.ui.define(() => {
    'use strict';

    return {

        onPressDownloadDatabase() {
            this.DatabaseMenuPopover.close();
            const oLink = document.createElement('a');
            oLink.href = '/api/database/download';
            oLink.download = 'db.sqlite';
            oLink.style.display = 'none';
            document.body.appendChild(oLink);
            oLink.click();
            oLink.remove();
        },

        onPressBackupDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/BackupDatabase(...)',
                message: 'Копия сохранена.'
            });
        },

        onPressRestoreDatabase() {
            this.DatabaseMenuPopover.close();
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/RestoreDatabase(...)',
                message: 'Данные восстановлены.',
                then: (_, oAction) => {
                    if (oAction.getBoundContext().getObject().value) {
                        this.MessageHelper.success({
                            message: 'Данные восстановлены успешно. Приложение будет перезагружена после подтверждения.',
                            title: 'Успех',
                            actions: 'Перезагрузить',
                            emphasizedAction: 'Перезагрузить',
                            onClose: () => globalThis.location.reload()
                    });
                    }
                }
            });
        }

    }
});
