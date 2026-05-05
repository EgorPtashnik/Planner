sap.ui.define(() => {
    'use strict';

    return {

        async onCreateFunction() {
            try {
                this.CreateFunctionDialog.close();
                const oData = this.Config.getProperty('/CreateFunctionDialog');
                const oContext = this.byId('idSqfCommandsList').getBinding('items').create({
                    name: oData.name,
                    info: oData.info,
                    syntax: 'Синтаксис функции',
                    sourceCode: 'Исходный код',
                    type_code: oData.type_code,
                    source_code: oData.source_code,
                    params: [],
                    examples: []
                });
                await oContext.created();
                this.publish(this.EVENT.ACTION_SUCCEEDED, 'Функция добавлена.');

                this.publish(this.EVENT.NAV_CHANGED, {
                    route: 'sqfDetail',
                    parameters: {
                        id: oContext.getProperty('name'),
                        layout: this.LayoutType.TwoColumnsMidExpanded
                    }
                });
            } catch(oError) {
                this.publish(this.EVENT.ACTION_FAILED, oError);
            }
        },

        async _openCreateFunctionDialog() {
            this.CreateFunctionDialog ??= await this.getFragment('planner.view.arma.sqf.master.modal.CreateFunctionDialog');

            this.Config.setProperty('/CreateFunctionDialog', {
                name: 'EP_fnc_newFunction',
                info: '',
                type_code: 2,
                source_code: 3
            });

            this.CreateFunctionDialog.open();
        }

    };
});
