using { Todo } from '../db/entity/Todo';

service TodoService {

  entity TodoList as projection on Todo.TodoList;
  entity TodoParent as projection on Todo.TodoParent;
  entity TodoItem as projection on Todo.TodoItem;

}