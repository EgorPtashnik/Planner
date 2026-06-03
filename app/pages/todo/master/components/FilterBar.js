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
            let aInfoTexts = [];
            const aFilters = [];
            const oFilterBarData = this.State.getProperty('/filterBar');
            if (oFilterBarData.ListTag.length) {
                aFilters.push('(' + oFilterBarData.ListTag.map(sID => `tag_ID eq ${sID}`).join(' or ') + ')');
                aInfoTexts.push(`Теги: ${this.byId('idTodoListTagFilter').getSelectedItems().map(oItem => oItem.getBindingContext('todo').getProperty('name')).join(',')}`);
            }

            if (oFilterBarData.Priority.length) {
                aFilters.push('(' + oFilterBarData.Priority.map(sID => `priority eq ${sID}`).join(' or ') + ')');
                aInfoTexts.push(`Приоритет: ${this.byId('idTodoListPriorityFilter').getSelectedItems().map(oItem => oItem.getBindingContext('common').getProperty('name')).join(',')}`);
            }

            this.State.setProperty('/infoText', aInfoTexts.join(' // '));
            return aFilters.join(' and ');
        }

    };
});
