sap.ui.define([
    'planner/controller/BaseController',
    'planner/controller/arma/sqf/detail/Events'
], (BaseController, Events,

    HeaderLogic, ParametersLogic, ExamplesLogic
) => {
    'use strict';

    return BaseController.extend('planner.controller.arma.sqf.detail.SQFDetail', {

        ...Events,

        onInit() {
            this.init();
            this.setSubscriptions();

            this.ODataEventsAttached = false;

            this.SourceCodeDialog = null;

            this.Config.setData({
                ID: null,
                editMode: false,

                showSqfCommandParamsDetails: false
            });
        },

        _onRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters();
            if (oParameters.name === 'sqfDetail') {
                this.publish(this.EVENT.NAV_CHANGED, {
                    route: oParameters.name,
                    parameters: oParameters.arguments
                });
            }
        },

        bindView(sID) {
            try {
                this.getView().bindElement({
                    path: `arma>/SqfCommand('${sID}')`,
                    parameters: {
                        $expand: 'type,source,params,examples,tags'
                    },
                    events: {
                        dataReceived: () => this.getView().setBusy(false)
                    }
                });

            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onToggleFullScreen(bIsFullScreen) {
            this.AppConfig.setProperty('/layout', bIsFullScreen ? this.LayoutType.TwoColumnsMidExpanded : this.LayoutType.MidColumnFullScreen);
        },

        onPressClosePage() {
            this.publish(this.EVENT.NAV_CHANGED, { route: 'sqfMaster' });
        },

        onToggleEditMode(oEvent) {
            if (!oEvent.getParameter('pressed')) {
                this.bindView(this.Config.getProperty('/ID'));
                this.publish(this.EVENT.SQFCOMMAND_CHANGED);
            }
        },

        async onPressSourceCode() {
            this.SourceCodeDialog ??= await this.getFragment('planner.view.arma.sqf.detail.modal.SourceCodeDialog');

            this.SourceCodeDialog.open();
        },

        async onPressAddParameter() {
            try {
                const oContext = this.byId('idSqfCommandParamsList').getBinding('items').create({
                    sort: (this.getView().getBindingContext('arma').getObject().params?.length || 0) + 1
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Параметр добавлен.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteParameter(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('arma');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Параметр удален.');
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressAddExample() {
            try {
                const oContext = this.byId('idSqfCommandExamplesList').getBinding('items').create({
                    text: `<strong>Текст</strong>
<code>Код</code>`
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Пример добавлен.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteExample(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('arma');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Пример\Заметка удален.');
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        }

    });
});
