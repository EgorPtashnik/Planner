sap.ui.define(() => {
    'use strict';

    return {

        onChangeTodoListSearch(oEvent) {
            this.byId('idTodoList').getBinding('items').changeParameters({ $search: oEvent.getParameter('value') });
        },

        onChangeTodoListFilter() {
            const sFilters = this._getFilters();
            this.byId('idTodoList').getBinding('items').changeParameters({ $filter: sFilters || undefined });
        },

        _getFilters() {
            const aFilters = [];
            const oFilterBarData = this.State.getProperty('/filterBar');
            if (oFilterBarData.ListTag.length) {
                aFilters.push('(' + oFilterBarData.ListTag.map(sID => `tag_ID eq ${sID}`).join(' or ') + ')');
            }

            if (oFilterBarData.Priority.length) {
                aFilters.push('(' + oFilterBarData.Priority.map(sID => `priority eq ${sID}`).join(' or ') + ')');
            }

            return aFilters.join(' and ');
        }

    };
});
