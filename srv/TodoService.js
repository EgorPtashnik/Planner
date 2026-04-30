import { PriorityType } from './reuse/types.js';

export default class TodoService extends cds.ApplicationService { init(){
    const { TodoItem } = this.entities;
    this.after (['CREATE', 'UPDATE', 'DELETE'], TodoItem, onAfterUpsertTodoItem)

    return super.init()
}};

async function onAfterUpsertTodoItem(_, req) {
    const { TodoParent, TodoItem } = this.entities;

    const oHighestPriorityTodoItem =  await SELECT.one.from (TodoItem)
        .where `parent_ID = ${req.data.parent_ID}`
        .orderBy `priority desc`;

    await UPDATE (TodoParent)
        .set `priority = ${oHighestPriorityTodoItem?.priority || PriorityType.Medium}`
        .where `ID = ${req.data.parent_ID}`;
};