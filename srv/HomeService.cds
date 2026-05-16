using { Todo } from '../db/entity/Todo.cds';

service HomeService {

    view StartedTodo as select from Todo.Item {
        Item.*
    } where startDate <= $now;

}