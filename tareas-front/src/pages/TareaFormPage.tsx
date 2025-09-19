import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TareaForm from "../components/TareaForm";
import { getTarea, updateTarea, createTarea } from "../services/tareas.service";
import type { Tarea } from "../types/tarea";

type Props = { mode: "create" | "edit" };

export default function TareaFormPage({ mode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && id) {
      (async () => {
        setLoading(true);
        const data = await getTarea(Number(id));
        setTarea(data);
        setLoading(false);
      })();
    }
  }, [mode, id]);

  async function handleSubmit(payload: { titulo: string; descripcion: string; completado?: boolean }) {
    if (mode === "create") {
      await createTarea(payload);
    } else {
      await updateTarea(Number(id), payload);
    }
    navigate("/tareas");
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white shadow-sm p-5">
      <h2 className="text-lg font-semibold mb-1">
        {mode === "create" ? "Nueva tarea" : "Editar tarea"}
      </h2>
      <p className="text-sm text-stone-500 mb-4">
        Completá los campos y guardá los cambios.
      </p>
      {mode === "edit" && loading ? (
        <p className="text-stone-600">Cargando…</p>
      ) : (
        <TareaForm initial={tarea} onSubmit={handleSubmit} submitLabel={mode === "create" ? "Crear" : "Guardar cambios"} />
      )}
    </section>
  );
}
