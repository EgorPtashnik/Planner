import { PriorityType, ProgressStatusType } from './reuse/types.js';

export default class TodoService extends cds.ApplicationService { init(){

    this.after (['CREATE', 'UPDATE', 'DELETE'], this.entities.Item, onAfterUpsertItem)

    return super.init()
}};

async function onAfterUpsertItem(_, req) {
    const oHighestProgressItem = await SELECT.one.from (this.entities.Item)
        .where `list_ID = ${req.data.list_ID} and status in (${ProgressStatusType.Created}, ${ProgressStatusType.InProgress})`
        .orderBy `status desc`;

    await UPDATE (this.entities.List)
        .set `status = ${oHighestProgressItem ? oHighestProgressItem.status : ProgressStatusType.Completed}`
        .where `ID = ${req.data.list_ID}`;
};