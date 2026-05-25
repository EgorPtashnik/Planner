sap.ui.define(() => {
    'use strict';

    return {

        onPressToggleVisibleStartedTodos() {
            this.State.setProperty('/StartedTodoTile/showCompleted', !this.State.getProperty('/StartedTodoTile/showCompleted'));
        }

    };
});
