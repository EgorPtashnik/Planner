using { Gym } from '../db/entity/Gym.cds';

service GymService {

    entity Training as projection on Gym.Training;

    view TrainingCost as select from Gym.Training {
        key ID,
        solo,
        case
            when solo = true then 50
            else 90
        end as cost : Integer
    } where paid = false;

    function GetTotalCost() returns Integer;
    action Settle() returns Boolean;

}