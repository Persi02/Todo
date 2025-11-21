import { Plus } from "lucide-react";
import type { Priority } from "../utils/type";

type Props = {
  inputValue: string;
  setInputValue: (v: string) => void;
  selectValue: string;
  setSelectValue: (v: Priority) => void;
  updateTodo: () => void;
};
const DialogEdit: React.FC<Props> = ({
  inputValue,
  setInputValue,
  selectValue,
  setSelectValue,
  updateTodo,
}) => {
  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-11/12 max-w-xl">
        <h3 className="font-bold text-lg my-5">Modifier Tache!</h3>
        <div className="flex gap-3 sm:gap-4">
          <input
            name="input-edit"
            id="input-edit"
            type="text"
            className="input w-full"
            placeholder="Ajouter une tache..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            name="select-edit"
            id="select-edit"
            className="select w-full"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button
            className="btn btn-primary hidden sm:block"
            onClick={updateTodo}
          >
            Ajouter
          </button>
          <button className="btn btn-primary block sm:hidden">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DialogEdit;
