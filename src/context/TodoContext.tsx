import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo } from "../@types/todo.types";
import axios from "../config/axios";

interface TodoContextValue {}

const TodoContext = createContext<TodoContextValue | null>(null);

interface TodoContextProps {
  children: ReactNode;
}

function TodoContextProvider({ children }: TodoContextProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todo");

      setTodos(res.data.todos);
    } catch (err) {
      alert("Fetch unsuccessful");
    }
  };

  const onAddTodo = async (todo: Partial<Todo>) => {
    if (!todo.title) {
      return alert("Title is required");
    }

    await axios.post("/todo", todo);
    fetchTodos();
  };

  const onDeleteTodo = async (id: number) => {
    await axios.delete(`/todo/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const value = {};

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoContextProvider;

export const useTodo = () => {
  const ctx = useContext(TodoContext);

  if (!ctx) {
    throw new Error("useTodo must be used within a TodoContextProvider");
  }

  return ctx;
};
