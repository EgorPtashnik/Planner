namespace Todo;

using { cuid, managed } from '@sap/cds/common';
using { Aspects.priority, Aspects.baseInfo, Types.ProgressStatus } from '../Reuse';

entity TodoList: cuid, managed, baseInfo {
    items: Composition of many TodoParent on items.list = $self;
};


entity TodoParent: cuid, managed, baseInfo, priority {
    key list: Association to TodoList;

    status: ProgressStatus default 0;
    doneItems = items[status=2];

    items: Composition of many TodoItem on items.parent = $self;
};


entity TodoItem: cuid, managed, baseInfo, priority {
    key parent: Association to TodoParent;

    status: ProgressStatus default 0;
};
