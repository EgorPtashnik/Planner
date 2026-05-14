sap.ui.define([
	'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/f/library',
    'sap/ui/Device',
    "sap/base/i18n/Localization"
], (UIComponent, JSONModel, FLib, Device, Localization) => {
	'use strict';

    const { LayoutType } = FLib;

	return UIComponent.extend('planner.Component', {

		metadata: {
			manifest: 'json'
		},

        init() {
			UIComponent.prototype.init.apply(this, arguments);

            this.setModel(new JSONModel({
                layout: LayoutType.OneColumn,
                isOnlyOneColumn: false,
                sideNavExpanded: false,
                routes: [
                    {text: 'Овервью', icon: 'sap-icon://home', key: 'home'},
                    {text: 'Мои Дела', icon: 'sap-icon://activities', key: 'todoMaster'},
                    {text: 'Тренировки', icon: 'sap-icon://physical-activity', key: 'gym'},
                    {text: 'ArmA: SQF Документация', icon: 'sap-icon://syntax', key: 'sqfMaster'}
                ],
                selectedRoute: 'home',
                detailID: null,
                detailDetailID: null
            }));
            this.setModel(new JSONModel(Device), 'device');
            
            const oRouter = this.getRouter();
            oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
            oRouter.initialize();

            Localization.setLanguage('RU');
        },

        getContentDensityClass() {
            return Device.support.touch ? 'sapUiSizeCozy' : 'sapUiSizeCompact';
        },

        _onBeforeRouteMatched(oEvent) {
            const oParameters = oEvent.getParameters().arguments;
            let sLayout = oParameters.layout;

            if (!sLayout) {
                sLayout = FLib.LayoutType.OneColumn;
            }

            this.getModel().setProperty('/layout', sLayout);

            if (oParameters.id) {
                this.getModel().setProperty('/detailID', oParameters.id);
            }

            if (oParameters.item) {
                this.getModel().setProperty('/detailDetailID', oParameters.item);
            }

            this.getEventBus().publish('NAV_CHANGED', {
                route: oEvent.getParameters().name,
                parameters: oEvent.getParameters().arguments
            })
        },

	});
});