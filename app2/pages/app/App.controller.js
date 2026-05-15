sap.ui.define([
    'planner/pages/BaseController',
    'sap/ui/core/Theming',

    'planner/pages/app/components/Header',
    'planner/pages/app/components/DatabaseMenuPopover'
], (BaseController, Theming,
    
    Header, DatabaseMenuPopoverLogic) => {
    'use strict';

    return BaseController.extend('planner.pages.app.App', {

        _onActionRequested(_, sEventId, oData) {
            const oAction = this.getView().getModel(oData.model).bindContext(oData.action, oData.context);
            Object.entries(oData.parameters || {}).forEach(entry => oAction.setParameter(entry[0], entry[1]));

            return oAction.invoke(oData.group || "$auto")
                .then(oResult => {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, oData.message);
                    oData.then?.call(this, oResult, oAction);
                })
                .catch(oError => {
                    this.publish(this.EVENT.ACTION_FAILED, oError);
                    oData.catch?.call(this, oError, oAction);
                })
                .finally(() => oAction.destroy());
        },

        _onActionSucceeded(_, sEventId, oData) {
            this.MessageHelper.toast({ message: oData.value });
        },

        _onActionFailed(_, sEventId, oData) {
            this.MessageHelper.error({ message: oData.error?.message || oData.message || 'Произошла ошибка.' });
        }

    });
});
