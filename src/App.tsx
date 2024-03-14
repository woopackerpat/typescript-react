import { useEffect, useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import Container from "./components/Container";
import Header from "./components/Header";
import List from "./components/List";
import { Todo } from "./@types/todo.types";
import axios from "./config/axios";
import TodoContextProvider from "./context/TodoContext";

function App() {
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

  return (
    <div className="bg-gray-50 h-screen pt-36">
      <TodoContextProvider>
        <Container>
          <Header />
          <AddForm onAddTodo={onAddTodo} />
          <List todos={todos} onDeleteTodo={onDeleteTodo} />
        </Container>
      </TodoContextProvider>
    </div>
  );
}

export default App;
