import { useEffect, useState } from "react";
import { createTarea, deleteTarea, getTareas, updateTarea } from "../services/tareas.service";
import type { Tarea } from "../types/tarea";
import TareaForm from "../components/TareaForm";
import TareaItem from "../components/TareaItem";

export default function TareasListPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await getTareas();
      setTareas(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? "Error cargando tareas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(payload: { titulo: string; descripcion: string; completado?: boolean }) {
    await createTarea(payload);
    await load();
  }

  async function handleToggle(id: number, value: boolean) {
    await updateTarea(id, { completado: value });
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, completado: value } : t)));
  }

  async function handleDelete(id: number) {
    await deleteTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  const completadas = tareas.filter((t) => t.completado).length;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Card: crear */}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-1">Crear tarea</h2>
        <p className="text-sm text-stone-500 mb-4">Agregá una nueva tarea al listado.</p>
        <TareaForm onSubmit={handleCreate} submitLabel="Crear" />
      </section>

      {/* Card: listado */}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-sm p-5">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-lg font-semibold">Listado</h2>
          <span className="text-sm text-stone-500">
            {completadas}/{tareas.length} completadas
          </span>
        </div>

        {loading && <p className="text-stone-600">Cargando…</p>}
        {error && <p className="text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>}

        {!loading && tareas.length === 0 && (
          <p className="text-stone-600">No hay tareas todavía. Creá la primera a la izquierda 👈</p>
        )}

        {tareas.length > 0 && (
          <ul className="divide-y divide-stone-200">
            {tareas.map((t) => (
              <TareaItem key={t.id} tarea={t} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
