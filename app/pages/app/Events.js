sap.ui.define([
    'planner/pages/app/logic/CommonService',
    'planner/pages/app/logic/TodoService'
], (CommonService, TodoService) => {
    'use strict';

    return {

        _setSubscriptions() {
            [
                { id: this.EVENT.ACTION_REQUESTED, fnc: this._onActionRequested },
                { id: this.EVENT.ACTION_FAILED, fnc: this._onActionFailed },

                { id: this.EVENT.COMMON.DOWNLOAD_DATABASE, fnc: CommonService.downloadDatabase },
                { id: this.EVENT.COMMON.BACKUP_DATABASE, fnc: CommonService.backupDatabase },
                { id: this.EVENT.COMMON.RESTORE_DATABASE, fnc: CommonService.restoreDatabase },

                { id: this.EVENT.TODO.CREATE_LIST, fnc: TodoService.TodoList.create },
                { id: this.EVENT.TODO.DELETE_LIST, fnc: TodoService.TodoList.delete },
                { id: this.EVENT.TODO.UPDATE_LIST, fnc: TodoService.TodoList.update },
                { id: this.EVENT.TODO.CREATE_LISTTAG, fnc: TodoService.TodoListTag.create },
                { id: this.EVENT.TODO.DELETE_LISTTAG, fnc: TodoService.TodoListTag.delete },
                { id: this.EVENT.TODO.CREATE_ITEM, fnc: TodoService.TodoItem.create },
                { id: this.EVENT.TODO.DELETE_ITEM, fnc: TodoService.TodoItem.delete },
                { id: this.EVENT.TODO.DELETE_COMPLETED_ITEMS, fnc: TodoService.TodoItem.deleteCompleted },
                { id: this.EVENT.TODO.UPDATE_ITEM_STATUS, fnc: TodoService.TodoItem.updateStatus }


            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onActionRequested(_, sEventId, oData) {
            const oAction = this.getView().getModel(oData.model).bindContext(oData.action, oData.context);
            Object.entries(oData.parameters || {}).forEach(entry => oAction.setParameter(entry[0], entry[1]));

            return oAction.invoke(oData.group || "$auto")
                .then(oResult => {
                    this.MessageHelper.toast({ message:  oData.message });
                    oData.then?.call(this, oResult, oAction);
                })
                .catch(oError => {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                    oData.catch?.call(this, oError, oAction);
                })
                .finally(() => oAction.destroy());
        },

        _onActionFailed(_, sEventId, oData) {
            this.MessageHelper.error({ message: oData.error?.message || oData.message || 'Произошла ошибка.' });
        }
    }
});
