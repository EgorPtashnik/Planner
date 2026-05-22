using { Todo } from '../db/entity/Todo.cds';

service HomeService {

    view StartedTodo as select from Todo.Item {
        Item.*
    } where
        (status <= 1 and startDate <= $now) or
        date(endDate) = date($now);

}