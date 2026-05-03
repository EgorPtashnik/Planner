export default class GymService extends cds.ApplicationService { init(){

    this.on (this.actions.GetTotalCost, onGetTotalCost);
    this.on (this.actions.Settle, onSettle);

    return super.init()
}};

async function onGetTotalCost(req) {
    let iTotalCost = 0;
    const aAllTrainingCosts = await SELECT.from(this.entities.TrainingCost);
    aAllTrainingCosts.forEach(oTraining => iTotalCost += oTraining.cost);
    return iTotalCost;
};

async function onSettle(req) {
    await UPDATE (this.entities.Training) .set `paid = true`;
    return true;
};
