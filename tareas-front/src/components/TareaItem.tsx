import { Link } from "react-router-dom";
import type { Tarea } from "../types/tarea";

type Props = {
  tarea: Tarea;
  onToggle: (id: number, value: boolean) => void;
  onDelete: (id: number) => void;
};

export default function TareaItem({ tarea, onToggle, onDelete }: Props) {
  return (
    <li className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 py-3">
      <input
        type="checkbox"
        className="size-5 accent-stone-900 rounded"
        checked={tarea.completado}
        onChange={(e) => onToggle(tarea.id, e.target.checked)}
        aria-label={`Marcar completada ${tarea.titulo}`}
      />

      <div className="min-w-0">
        <div
          className={`font-medium truncate ${
            tarea.completado ? "line-through text-stone-500" : "text-stone-900"
          }`}
        >
          {tarea.titulo}
        </div>
        <div className="text-sm text-stone-500 truncate">{tarea.descripcion}</div>
      </div>

      <Link
        to={`/tareas/${tarea.id}`}
        className="opacity-70 group-hover:opacity-100 text-stone-600 hover:text-stone-900 px-2 py-1 rounded-md hover:bg-stone-100 transition text-sm"
      >
        Editar
      </Link>
      <button
        onClick={() => onDelete(tarea.id)}
        className="opacity-70 group-hover:opacity-100 text-stone-600 hover:text-red-700 px-2 py-1 rounded-md hover:bg-stone-100 transition text-sm"
      >
        Eliminar
      </button>
    </li>
  );
}
