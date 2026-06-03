import { PriorityType, ProgressStatusType } from './reuse/types.js';

export default class TodoService extends cds.ApplicationService { init(){

    this.after (['CREATE', 'UPDATE', 'DELETE'], this.entities.Item, onAfterUpsertItem);

    this.on('Move', this.entities.Item, onMoveItem);

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

async function onMoveItem(req) {
    const { ID } = req.params[0];
    const { list_ID } = req.data;

    const exists = await SELECT.one.from(this.entities.List).where({ ID: list_ID });
    if (!exists) {
        return req.error(400, `Список не найден.`);
    }

    await UPDATE(Item).set({ list_ID }).where({ ID });
    return SELECT.one.from(this.entities.Item).where({ ID });
};