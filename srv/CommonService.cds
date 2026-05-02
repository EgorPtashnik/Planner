using { Common } from '../db/entity/Common.cds';

service CommonService {
    entity PriorityCode as projection on Common.PriorityCode;

    action BackupDatabase() returns Boolean;
    action RestoreDatabase() returns Boolean;
}