sap.ui.define([
    'planner/pages/BaseController',
    'planner/reuse/AddTrainingDialog',

    'planner/pages/gym/Events',
    'planner/pages/gym/components/Header',
    'planner/pages/gym/components/Calendar'
], (BaseController, AddTrainingDialog,
    
    Events, Header, Calendar) => {
    'use strict';

    return BaseController.extend('planner.pages.gym.Gym', {

        ...AddTrainingDialog,

        ...Events,
        ...Header,
        ...Calendar,

        onInit() {
            this.init('gym');
            this._setSubscriptions();
            this._loadFragments();
            
            this.State.setData({
                total: 0
            });

        },

        _onRouteMatched(oEvent) {
            this.AppConfig.setProperty('/selectedRoute', 'gym');
            this._getTotal();
        },

        _loadFragments() {
            this.AddTrainingDialog = this.getFragment('planner.reuse.AddTrainingDialog');
            this.CalendarItemMenuDialog = this.getFragment('planner.pages.gym.components.CalendarItemMenuDialog');
        },

        _getTotal() {
            this.publish(this.EVENT.GYM.GET_TOTAL_COST, {
                then: iTotal => this.State.setProperty('/total', iTotal)
            });
        }

    });
});
