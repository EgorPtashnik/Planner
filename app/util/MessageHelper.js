sap.ui.define([
    'sap/m/MessageToast',
    'sap/m/MessageBox'
], (MessageToast, MessageBox) => {

    const sContentDensity = sap.ui.getCore().getComponent('planner').getContentDensityClass();

    return {
        toast({
            message = '',
            duration = 3000,
            width= '15em',
            autoClose = true,
            animationDuration = 1000
        }) {
            if (message){
                MessageToast.show(message, {
                    duration, width, autoClose, animationDuration
                });
            }
        },

        error({
            message = '',
            title = 'Ошибка',
            onClose = null,
            actions = 'Закрыть',
            emphasizedAction = null,
            initialFocus = 'Закрыть',
            details = null
        }) {
            MessageBox.error(message, {
                title, onClose, actions, emphasizedAction, initialFocus, details,
                styleClass: sContentDensity
            });
        },

        success({
            message = '',
            title = 'Успех',
            onClose = null,
            actions = 'Закрыть',
            emphasizedAction = null,
            initialFocus = null,
            details = null
        }) {
            MessageBox.success(message, {
                title, onClose, actions, emphasizedAction, initialFocus, details,
                styleClass: sContentDensity
            });
        },

        confirm({
            message = '',
            title = 'Подтверждение',
            onClose = null,
            actions = ['ОК', 'Закрыть'],
            emphasizedAction = 'ОК',
            initialFocus = 'ОК',
            details = null
        }) {
            MessageBox.confirm(message, {
                title, onClose, actions, emphasizedAction, initialFocus, details,
                styleClass: sContentDensity
            });
        }
    };

});