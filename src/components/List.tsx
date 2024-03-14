import ListItem from "./ListItem";
import { Todo } from "../@types/todo.types";

interface ListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => Promise<void>;
}

function List({ todos, onDeleteTodo }: ListProps) {
  return (
    <div className="my-6 flex flex-col gap-y-3">
      {todos.map((el) => (
        <ListItem todo={el} onDeleteTodo={onDeleteTodo} />
      ))}
    </div>
  );
}

export default List;
