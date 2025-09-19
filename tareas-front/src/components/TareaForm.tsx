import { useEffect, useState } from "react";
import type { CreateTareaInput, Tarea } from "../types/tarea";

type Props = {
  initial?: Tarea | null;
  onSubmit: (payload: CreateTareaInput) => Promise<void>;
  submitLabel?: string;
};

export default function TareaForm({ initial, onSubmit, submitLabel = "Guardar" }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completado, setCompletado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setTitulo(initial.titulo);
      setDescripcion(initial.descripcion);
      setCompletado(initial.completado);
    }
  }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!titulo.trim() || !descripcion.trim()) {
      setError("Título y descripción son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ titulo: titulo.trim(), descripcion: descripcion.trim(), completado });
    } catch (err: any) {
      setError(err?.message ?? "Error guardando la tarea");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm text-stone-600">Título</span>
        <input
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-stone-400"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe un título claro…"
        />
      </label>

      <label className="block">
        <span className="text-sm text-stone-600">Descripción</span>
        <textarea
          rows={3}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-stone-400"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles de la tarea…"
        />
      </label>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-stone-900 text-white px-8 py-2 hover:bg-stone-800 disabled:opacity-60 transition ml-80"
      >
        {loading ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}
