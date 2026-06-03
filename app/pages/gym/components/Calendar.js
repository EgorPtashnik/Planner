sap.ui.define(() => {
    'use strict';

    return {

        async onPressCalendarItem(oEvent) {
            this.CalendarItemMenuDialog = await this.CalendarItemMenuDialog;

            const oCalendar = oEvent.getSource();
            const sSelectedDate = oCalendar.getSelectedDates()[0].getStartDate().toDateString();
            const aSpecialDates = oCalendar.getAggregation('specialDates');
            const oCalendarItem = aSpecialDates.find(oDateRange => oDateRange.getStartDate().toDateString() === sSelectedDate);

            if (oCalendarItem) {
                const oData = oCalendarItem.getBindingContext('gym').getObject();
                this.State.setProperty('/CalendarItemMenuDialog', {
                    ...oData,
                    context: oCalendarItem.getBindingContext('gym'),
                    date: new Date(oData.date).toLocaleString('ru-RU', {timeZoneName: 'short'}).substring(0, 10)
                });
                this.CalendarItemMenuDialog.open();
            } else {
                this._openAddTrainingDialog(new Date(sSelectedDate));
            }
        },

        async onDeleteCalendarItem() {
            this.CalendarItemMenuDialog.close();
            this.publish(this.EVENT.GYM.DELETE_TRAINING, {
                context: this.State.getProperty('/CalendarItemMenuDialog/context')
            });
        }

    };
});
