sap.ui.define([
    'planner/pages/BaseController',
    'sap/ui/core/Theming',

    'planner/pages/app/components/Header',
    'planner/pages/app/components/DatabaseMenuPopover'
], (BaseController, Theming,
    
    Header, DatabaseMenuPopoverLogic) => {
    'use strict';

    return BaseController.extend('planner.pages.app.App', {

        ...Header,
        ...DatabaseMenuPopoverLogic,

        onInit() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            [{id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged},
                {id: this.EVENT.ACTION_REQUESTED, fnc: this._onActionRequested},
                {id: this.EVENT.ACTION_SUCCEEDED, fnc: this._onActionSucceeded},
                {id: this.EVENT.ACTION_FAILED, fnc: this._onActionFailed}
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));

            this._loadFragments();
        },

        _loadFragments() {
            this.DatabaseMenuPopover = this.getFragment('planner.pages.app.components.DatabaseMenuPopover');
        },

        //APPLICATION EVENT HANDLERS
        _onNavChanged(_, sEventId, oData) {
            this.getRouter().navTo(oData.route, oData.parameters);
        },

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
