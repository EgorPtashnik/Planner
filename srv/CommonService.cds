using { Common } from '../db/entity/Common.cds';

service CommonService {
    entity PriorityCode as projection on Common.PriorityCode;
}