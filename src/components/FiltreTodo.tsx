import { useState } from "react";
import type { Priority, Todo } from "../utils/type";
import ListTodo from "./ListTodo";
import { CircleCheck } from "lucide-react";
type Props = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
};
const FiltreTodo: React.FC<Props> = ({ todos, setTodos }) => {
  const [filtre, setFiltre] = useState<Priority | "Tous">("Tous");
  let filtreTodos: Todo[] = [];
  if (filtre == "Tous") {
    filtreTodos = todos;
  } else {
    filtreTodos = todos.filter((todo) => todo.priority == filtre);
  }
  const todoCount = todos.length;
  const urgenteCount = todos.filter(
    (todo) => todo.priority == "Urgente"
  ).length;
  const moyenneCount = todos.filter(
    (todo) => todo.priority == "Moyenne"
  ).length;
  const basseCount = todos.filter((todo) => todo.priority == "Basse").length;
  const [selectTodo, setSelectTodo] = useState<Set<number>>(new Set());
  const finishSelected = () => {
    const newTodos = todos.filter((todo) => !selectTodo.has(todo.id));
    setSelectTodo(new Set());
    setTodos(newTodos);
  };
  return (
    <div className="space-y-2 flex-1 h-fit">
      <div className="flex justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            className={`btn btn-soft ${filtre == "Tous" && "btn-primary"}`}
            onClick={() => setFiltre("Tous")}
          >
            Tous({todoCount})
          </button>
          <button
            className={`btn btn-soft ${filtre == "Urgente" && "btn-primary"}`}
            onClick={() => setFiltre("Urgente")}
          >
            Urgente({urgenteCount})
          </button>
          <button
            className={`btn btn-soft ${filtre == "Moyenne" && "btn-primary"}`}
            onClick={() => setFiltre("Moyenne")}
          >
            Moyenne({moyenneCount})
          </button>
          <button
            className={`btn btn-soft ${filtre == "Basse" && "btn-primary"}`}
            onClick={() => setFiltre("Basse")}
          >
            Basse({basseCount})
          </button>
        </div>
        <button
          className="btn btn-primary hidden sm:block"
          disabled={selectTodo.size == 0}
          onClick={() => finishSelected()}
        >
          Finir la selectioner ({selectTodo.size})
        </button>
        <button
          className="btn btn-primary sm:hidden flex items-center gap-2"
          disabled={selectTodo.size == 0}
          onClick={() => finishSelected()}
        >
          <CircleCheck />({selectTodo.size})
        </button>
      </div>
      <ListTodo
        todos={filtreTodos}
        setTodos={setTodos}
        selectTodo={selectTodo}
        setSelectTodo={setSelectTodo}
      />
    </div>
  );
};

export default FiltreTodo;
