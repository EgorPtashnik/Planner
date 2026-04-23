using { Common } from '../db/entity/Common';

service CommonService {
    entity PriorityCode as projection on Common.PriorityCode;
}