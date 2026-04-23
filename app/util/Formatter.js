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
        }
    };
});
