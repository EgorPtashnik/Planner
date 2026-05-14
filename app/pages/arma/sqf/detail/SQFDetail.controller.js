sap.ui.define([
    'planner/pages/BaseController'
], (BaseController) => {
    'use strict';

    return BaseController.extend('planner.pages.arma.sqf.detail.SQFDetail', {

        onInit() {
            this.init();
            [
                { id: this.EVENT.NAV_CHANGED, fnc: this._onNavChanged }
            ].forEach(oEvent => this.subscribe(oEvent.id, oEvent.fnc));

            this.ODataEventsAttached = false;

            this.SourceCodeDialog = null;

            this.Config.setData({
                ID: null,
                editMode: false,
                selectedTags: [],

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
                        $expand: 'type,source,params,examples,tags,related'
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

        async onToggleEditMode(oEvent) {
            if (!oEvent.getParameter('pressed')) {
                await this._updateFunctionTags();
                this.getView().getBindingContext('arma').refresh();
                this.publish(this.EVENT.SQFCOMMAND_CHANGED);
            } else {
                this.Config.setProperty(
                    '/selectedTags',
                    this.getView().getBindingContext('arma').getObject().tags.map(oTag => oTag.tag_ID)
                );
            }
        },

        async onPressSourceCode() {
            this.SourceCodeDialog ??= await this.getFragment('planner.pages.arma.sqf.detail.components.SourceCodeDialog');

            this.SourceCodeDialog.open();
        },

        async onPressDeleteSqfCommand() {
            try {
                this.getView().setBusy(true);
                const oContext = this.getView().getBindingContext('arma');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.SQFCOMMAND_CHANGED);
                    this.publish(this.EVENT.NAV_CHANGED, { route: 'sqfMaster' });
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Функция удалена.');
                }
            } catch(oError) {
                this.getView().setBusy(false);
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
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
        },

        async onPressAddRelated() {
            try {
                const oContext = this.byId('idSqfCommandRelatedList').getBinding('items').create();
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Ссылка добавлена.');
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async onPressDeleteRelated(oEvent) {
            try {
                const oContext = oEvent.getParameter('listItem').getBindingContext('arma');
                await oContext.delete();
                if (oContext.isDeleted()) {
                    this.publish(this.EVENT.ACTION_SUCCEEDED, 'Ссылка удалена.');
                }
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        onPressRelatedItem(oEvent) {
            this.publish(this.EVENT.NAV_CHANGED, {
                route: 'sqfDetail',
                parameters: {
                    id: oEvent.getSource().getBindingContext('arma').getProperty('related'),
                    layout: this.LayoutType.TwoColumnsMidExpanded
                }
            });
        },

        async _updateFunctionTags() {
            const aSelectedTagIDs = this.Config.getProperty('/selectedTags');

            const aDeletePromises = this.byId('idTagsContainer').getTokens()
                .filter(oToken => !aSelectedTagIDs.includes(oToken.getBindingContext('arma').getProperty('tag_ID')))
                .map(oToken => oToken.getBindingContext('arma').delete());
            await Promise.all(aDeletePromises);

            const aNewContexts = aSelectedTagIDs
                .filter(sTagID => !this.byId('idTagsContainer').getTokens().some(oToken => oToken.getBindingContext('arma').getProperty('tag_ID') === sTagID))
                .map(sTagID => this.byId('idTagsContainer').getBinding('tokens').create({tag_ID: sTagID}));

            return await Promise.all(aNewContexts.map(oContext => oContext.created()));
        },

        // APPLICATION EVENTS
        _onNavChanged(_, sEventId, oData) {
            if (oData.route.includes('sqf')) {
                this.AppConfig.setProperty('/selectedRoute', 'sqfMaster');
                if (oData?.parameters?.id) {
                    this.getView().setBusy(true);
                    this.Config.setProperty('/editMode', false);
                    this.Config.setProperty('/ID', oData.parameters.id);
                    this.bindView(oData.parameters.id);
                }
            }
        }
    });
});
