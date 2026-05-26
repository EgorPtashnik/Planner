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
                selectedRoute: 'home',
                detailID: null
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
        },

	});
});