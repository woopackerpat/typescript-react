import React, { FormEvent, useState } from "react";
import { Todo } from "../@types/todo.types";
import { useTodo } from "../context/TodoContext";

// interface AddFormProps {
//   onAddTodo: (todo: Partial<Todo>) => Promise<void>;
// }

function AddForm() {
  const [title, setTitle] = useState<string>("");

  const { onAddTodo } = useTodo();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddTodo({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex flex-row gap-x-5">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border flex-1 rounded-md outline-none px-3 h-9"
          value={title}
        />
        <button className="bg-blue-500 text-white px-3 rounded-md active:scale-95">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddForm;
