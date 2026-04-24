sap.ui.define([
    'sap/ui/core/library'
], (CoreLib) => {
    'use strict';

    const { ValueState } = CoreLib;

    return {
        getPriorityText(iPriorityCode) {
            switch(iPriorityCode) {
                case '1': return 'Низкий';
                case '2': return 'Средний';
                case '3': return 'Высокий';
                case '4': return 'Срочный';
            }
        },
        
        getPriorityState(iPriorityCode) {
            switch(iPriorityCode) {
                case '1': return ValueState.None;
                case '2': return ValueState.Information;
                case '3': return ValueState.Warning;
                case '4': return ValueState.Error;
            }
        },

        getProgressStatusText(iPriorityCode) {
            switch(iPriorityCode) {
                case '0': return 'Создан';
                case '1': return 'Выполняется';
                case '2': return 'Выполнен';
                case '3': return 'Отменен';
            }
        },
        
        getProgressStatusState(iPriorityCode) {
            switch(iPriorityCode) {
                case '0': return ValueState.Information;
                case '1': return ValueState.Warning;
                case '2': return ValueState.Success;
                case '3': return ValueState.Error;
            }
        }
    };
});
