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
            this[sId] = this.Controller.byId(sId);
            this[sId]._tableHelperConfig = { ...oConfig, id: sId };
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

            this.Controller.TableSortDialog.getModel().setProperty('/tableConfig', this[sId]._tableHelperConfig);
            this.Controller.TableSortDialog.getModel().refresh(true);

            this.Controller.TableSortDialog.open();
        },

        onSort(sId) {
            const sSortOption = this.Controller.byId('idTableHelperSortListOption').getSelectedItem().getBindingContext().getProperty('key');
            const sSortColumn = this.Controller.byId('idTableHelperSortListColumn').getSelectedItem().getBindingContext().getProperty('path');
            this[sId]._tableHelperConfig.sort = { path: sSortColumn, order: sSortOption };
            this[sId].getBinding('items').changeParameters({
                $orderby: `${sSortColumn} ${sSortOption}`
            });
            this.Controller.TableSortDialog.close();
        }

    };
});
