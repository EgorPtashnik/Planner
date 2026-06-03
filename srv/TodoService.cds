using { Todo } from '../db/entity/Todo.cds';

service TodoService {

    entity List as projection on Todo.List;
    entity ListTag as projection on Todo.ListTag;

    entity Item as projection on Todo.Item actions {
        action Move(list_ID: UUID) returns Item;
    };
}