sap.ui.define([
    'sap/m/MessageToast'
], (MessageToast) => {

    return {
        toast({
            message = '',
            duration = 3000,
            width= '15em',
            autoClose = true,
            animationDuration = 1000
        }) {
            MessageToast.show(message, {
                duration, width, autoClose, animationDuration
            });
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
                title, onClose, actions, emphasizedAction, initialFocus, details
            });
        }
    };

});
