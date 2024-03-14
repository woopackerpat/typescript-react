import ListItem from "./ListItem";
import { Todo } from "../@types/todo.types";
import { useTodo } from "../context/TodoContext";

// interface ListProps {
//   todos: Todo[];
//   onDeleteTodo: (id: number) => Promise<void>;
// }

function List() {
  const { todos, onDeleteTodo } = useTodo();

  return (
    <div className="my-6 flex flex-col gap-y-3">
      {todos.map((el) => (
        <ListItem todo={el} onDeleteTodo={onDeleteTodo} />
      ))}
    </div>
  );
}

export default List;
