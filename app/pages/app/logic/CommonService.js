sap.ui.define(() => {
    'use strict';

    return {

        downloadDatabase(_, sEventId, oButton) {
            oButton.setBusy(true);
            const oLink = document.createElement('a');
            oLink.href = '/api/database/download';
            oLink.download = 'db.sqlite';
            oLink.style.display = 'none';
            document.body.appendChild(oLink);
            oLink.click();
            oLink.remove();
            oButton.setBusy(false);
        },

        backupDatabase(_, sEventId, oButton) {
            oButton.setBusy(true);
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/BackupDatabase(...)',
                message: 'Копия сохранена.',
                then: () => oButton.setBusy(false),
                catch: () => oButton.setBusy(false)
            });
        },

        restoreDatabase(_, sEventId, oButton) {
            oButton.setBusy(true);
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

    };
});
