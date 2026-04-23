sap.ui.define([
	'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/f/library',
    'sap/ui/Device'
], function(UIComponent, JSONModel, FLib, Device) {
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
                routes: [
                    {text: 'Dashboard', icon: 'sap-icon://home', key: 'home'},
                    {text: 'Manage Activities', icon: 'sap-icon://activities', key: 'todoMaster'}
                ],
                selectedRoute: 'home'
            }));
            this.setModel(new JSONModel(Device), 'device');
            
            const oRouter = this.getRouter();
            oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
            oRouter.initialize();
        },

        getContentDensityClass() {
            return Device.support.touch ? 'sapUiSizeCozy' : 'sapUiSizeCompact';
        },

        _onBeforeRouteMatched(oEvent) {
            let sLayout = oEvent.getParameters().arguments.layout;

            if (!sLayout) {
                sLayout = FLib.LayoutType.OneColumn;
            }

            this.getModel().setProperty('/layout', sLayout);
        },

	});
});