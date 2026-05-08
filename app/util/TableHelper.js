sap.ui.define([
    'sap/ui/model/json/JSONModel'
], (JSONModel) => {
    'use strict';

    return {
        setController(oController) {
            this.Controller = oController;
            this.Controller.TableSortDialog = null;
        },

        register(sId, oConfig) {
            this[sId] = { ...oConfig, id: sId };
        },

        async onPressSort(sId) {
            this.Controller.TableSortDialog ??= await this.Controller.getFragment('planner.reuse.TableSortDialog').then(oFragment => {
                oFragment.setModel(new JSONModel({
                    sortOptions: [
                        {key: 'asc', text: 'По возрастанию'},
                        {key: 'desc', text: 'По убыванию'}
                    ]
                }));
                return oFragment;
            });

            this.Controller.TableSortDialog.getModel().setProperty('/tableConfig', this[sId]);
            this.Controller.TableSortDialog.getModel().refresh(true);

            this.Controller.TableSortDialog.open();
        },

        onSort(sId) {
            const sSortOption = this.Controller.byId('idTableHelperSortListOption').getSelectedItem().getBindingContext().getProperty('key');
            const sSortColumn = this.Controller.byId('idTableHelperSortListColumn').getSelectedItem().getBindingContext().getProperty('path');
            this[sId].sort = { path: sSortColumn, order: sSortOption };
            this.Controller.byId(sId).getBinding('items').changeParameters({
                $orderby: `${sSortColumn} ${sSortOption}`
            });
            this.Controller.TableSortDialog.close();
        }

    };
});
