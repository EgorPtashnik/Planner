sap.ui.define(() => {
    'use strict';

    return {

        setSubscriptions() {
            const aEvents = [
                {id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.TODOPARENT_CHANGED, fnc: this._onTodoParentChanged}
            ];
                
            aEvents.forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));
        },

        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('todo')) {
                this.AppConfig.setProperty('/selectedRoute', 'todoMaster');
                if (oData?.parameters?.item && this.Config.getProperty('/ID') !== oData.parameters.item) {
                    this.getView().setBusy(true);
                    this.Config.setProperty('/ID', oData.parameters.item);
                    this.Config.setProperty('/editTodoItems', false);
                    this.bindView(oData.parameters.item, oData.parameters.id);
                }
            }
        },

        _onTodoParentChanged(_, sEventId, oData) {
            this.getView().getBindingContext('todo')?.refresh();
        }
    }
});
