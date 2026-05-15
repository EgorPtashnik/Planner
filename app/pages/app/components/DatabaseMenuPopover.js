sap.ui.define(() => {
    'use strict';

    return {

        onPressDownloadDatabase() {
            this.DatabaseMenuPopover.close();
            this.DatabaseMenuPopover._button.setBusy(true);
            const oLink = document.createElement('a');
            oLink.href = '/api/database/download';
            oLink.download = 'db.sqlite';
            oLink.style.display = 'none';
            document.body.appendChild(oLink);
            oLink.click();
            oLink.remove();
            this.DatabaseMenuPopover._button.setBusy(false);
        },

        onPressBackupDatabase() {
            this.DatabaseMenuPopover.close();
            const oButton = this.DatabaseMenuPopover._button.setBusy(true);
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/BackupDatabase(...)',
                message: 'Копия сохранена.',
                then: () => oButton.setBusy(false),
                catch: () => oButton.setBusy(false)
            });
        },

        onPressRestoreDatabase() {
            this.DatabaseMenuPopover.close();
            const oButton = this.DatabaseMenuPopover._button.setBusy(true);
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/RestoreDatabase(...)',
                message: 'Данные восстановлены.',
                then: (_, oAction) => {
                    oButton.setBusy(false);
                    if (oAction.getBoundContext().getObject().value) {
                        this.MessageHelper.success({
                            message: 'Данные восстановлены успешно. Приложение будет перезагружена после подтверждения.',
                            title: 'Успех',
                            actions: 'Перезагрузить',
                            emphasizedAction: 'Перезагрузить',
                            onClose: () => globalThis.location.reload()
                        });
                    }
                },
                catch: () => oButton.setBusy(false)
            });
        }

    }
});
