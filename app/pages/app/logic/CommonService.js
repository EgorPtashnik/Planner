sap.ui.define(() => {
    'use strict';

    return {

        downloadDatabase(_, sEventId, oData) {
            const oLink = document.createElement('a');
            oLink.href = '/api/database/download';
            oLink.download = 'db.sqlite';
            oLink.style.display = 'none';
            document.body.appendChild(oLink);
            oLink.click();
            oLink.remove();
        },

        backupDatabase(_, sEventId, oData) {
            this.publish(this.EVENT.OPEN_BUSY_DIALOG, 'Сохраняю данные...');
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/BackupDatabase(...)',
                message: 'Копия сохранена.',
                then: () => this.publish(this.EVENT.CLOSE_BUSY_DIALOG),
                catch: () => this.publish(this.EVENT.CLOSE_BUSY_DIALOG)
            });
        },

        restoreDatabase(_, sEventId, oData) {
            this.publish(this.EVENT.OPEN_BUSY_DIALOG, 'Восстанавливаю данные...');
            this.publish(this.EVENT.ACTION_REQUESTED, {
                model: 'common',
                action: '/RestoreDatabase(...)',
                message: 'Данные восстановлены.',
                then: (_, oAction) => {
                    this.publish(this.EVENT.CLOSE_BUSY_DIALOG);
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
                catch: () => this.publish(this.EVENT.CLOSE_BUSY_DIALOG)
            });
        }

    };
});
