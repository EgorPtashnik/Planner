import { PriorityType, ProgressStatusType } from './reuse/types.js';

export default class TodoService extends cds.ApplicationService { init(){

    this.after (['CREATE', 'UPDATE', 'DELETE'], this.entities.TodoItem, onAfterUpsertTodoItem)

    return super.init()
}};

async function onAfterUpsertTodoItem(_, req) {
    const { TodoParent, TodoItem } = this.entities;

    const oHighestPriorityTodoItem =  await SELECT.one.from (TodoItem)
        .where `parent_ID = ${req.data.parent_ID} and status in (${ProgressStatusType.Created}, ${ProgressStatusType.InProgress})`
        .orderBy `priority desc`;

    await UPDATE (TodoParent)
        .set `priority = ${oHighestPriorityTodoItem?.priority || PriorityType.Low}`
        .where `ID = ${req.data.parent_ID}`;
};