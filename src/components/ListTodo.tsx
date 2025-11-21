import { Construction, SquarePen, Trash } from "lucide-react";
import type { Priority, Todo } from "../utils/type";
import { closeModal, showModal } from "../utils/utils";
import DialogEdit from "./DialogEdit";
import { useState } from "react";
type Props = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  selectTodo: Set<number>;
  setSelectTodo: (v: Set<number>) => void;
};
const ListTodo: React.FC<Props> = ({
  todos,
  setTodos,
  selectTodo,
  setSelectTodo,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<Priority>("Moyenne");
  const [idEdit, setIdEdit] = useState<number>(0);
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectTodo);
    if (selectTodo.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectTodo(newSelected);
  };

  const addValueEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setInputValue(todo.text);
      setSelectValue(todo.priority);
      setIdEdit(id);
      showModal();
    }
  };
  const updateTodo = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === idEdit) {
        return {
          ...todo,
          text: inputValue,
          priority: selectValue,
        };
      }
      return todo;
    });
    setTodos(newTodos);
    setInputValue("");
    setSelectValue("Moyenne");
    setIdEdit(0);
    closeModal();
  };
  return (
    <>
      {todos.length > 0 ? (
        <ul className="divide-y divide-primary/30">
          {todos.map((todo) => (
            <li key={todo.id} className="capitalize py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={selectTodo.has(todo.id)}
                    onChange={() => toggleSelect(todo.id)}
                  />
                  <span className="text-md font-bold">{todo.text}</span>
                  <span
                    className={`badge badge-sm ${
                      todo.priority == "Urgente"
                        ? "badge-error"
                        : todo.priority == "Moyenne"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {todo.priority}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    className="btn btn-sm btn-primary btn-soft"
                    onClick={() => addValueEdit(todo.id)}
                  >
                    <SquarePen className="w-4 h-4" />
                  </button>

                  <button
                    className="btn btn-sm btn-error btn-soft"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </li>
          ))}
          <DialogEdit
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            updateTodo={() => updateTodo()}
          />
        </ul>
      ) : (
        <div className="flex justify-center items-center flex-col p-5">
          <div className="">
            <Construction className="w-40 h-40 text-primary" strokeWidth={1} />
            <p>Aucune tache en cours</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ListTodo;
