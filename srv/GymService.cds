using { Gym } from '../db/entity/Gym.cds';

service GymService {

    entity Training as projection on Gym.Training;

    view TrainingCost as select from Gym.Training {
        solo,
        case
            when solo = true then 45
            else 80
        end as cost : Integer
    };

}