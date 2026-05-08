namespace Todo;

using { cuid, managed } from '@sap/cds/common';
using { Aspects.priority, Aspects.baseInfo, Types.ProgressStatus } from '../Reuse';

entity List: cuid, managed, baseInfo, priority {
    items: Composition of many Item on items.list = $self;

    status: ProgressStatus default 0;
    doneItems = items [ status > 1 ];
};

entity ListTag: cuid, managed, baseInfo {
    color: String;
};

entity Item: cuid, managed, baseInfo, priority {
    key list: Association to List;

    status: ProgressStatus default 0;
};
