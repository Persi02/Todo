import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import type { Todo } from "./utils/type";
import FiltreTodo from "./components/FiltreTodo";

const App = () => {
  const saveTodos = localStorage.getItem("todos");
  const initialTodo = saveTodos ? JSON.parse(saveTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="flex justify-center flex-col items-center my-10 sm:my-15">
      <div className="w-full sm:w-2/3 flex justify-end px-5 mb-5">
        <input
          type="checkbox"
          value="abyss"
          className="toggle theme-controller"
        />
      </div>
      <div className="w-full sm:w-2/3 flex flex-col gap-4  bg-base-300 rounded-2xl p-5">
        <AddTodo todos={todos} setTodos={setTodos} />
        <FiltreTodo todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default App;
