sap.ui.define([
	'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
], function(UIComponent, JSONModel, FLib) {
	'use strict';

	return UIComponent.extend('planner.Component', {

		metadata: {
			manifest: 'json'
		},

        init() {
			UIComponent.prototype.init.apply(this, arguments);

            this.setModel(new JSONModel());
            
            const oRouter = this.getRouter();
            oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
            oRouter.initialize();
        },

        _onBeforeRouteMatched(oEvent) {
            let sLayout = oEvent.getParameters().arguments.layout;

            if (!sLayout) {
                sLayout = FLib.LayoutType.OneColumn;
            }

            this.getModel().setProperty("/layout", sLayout);
        }

	});
});