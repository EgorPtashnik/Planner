namespace Common;

using { sap.common.CodeList } from '@sap/cds/common';
using { Types.Priority } from '../Reuse';

entity PriorityCode: CodeList  {
    key code: Priority
}
