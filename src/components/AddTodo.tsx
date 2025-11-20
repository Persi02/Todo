import { useState } from "react";
import type { Priority, Todo } from "../utils/type";
import { Plus } from "lucide-react";
type Props = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
};
const AddTodo = ({ todos, setTodos }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<Priority>("Moyenne");

  const addTodo = () => {
    if (inputValue.trim() == "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      priority: selectValue,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInputValue("");
  };

  return (
    <div className="flex gap-3 sm:gap-4">
      <input
        name="input-todo"
        id="input-todo"
        type="text"
        className="input w-full"
        placeholder="Ajouter une tache..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <select
        name="select-todo"
        id="select-todo"
        className="select w-full"
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value as Priority)}
      >
        <option value="Urgente">Urgente</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>
      <button className="btn btn-primary hidden sm:block" onClick={addTodo}>
        Ajouter
      </button>
      <button className="btn btn-primary block sm:hidden" onClick={addTodo}>
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AddTodo;
