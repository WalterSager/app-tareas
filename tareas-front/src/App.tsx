import { Routes, Route, Link, Navigate } from "react-router-dom";
import TareasListPage from "./pages/TareasListPage";
import TareaFormPage from "./pages/TareaFormPage";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-6">
      {/* Header estilo Notion: simple, limpio */}
      <header className="mb-6 border-b border-stone-200">
        <div className="flex items-center justify-between pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Tareas</h1>
            <p className="text-sm text-stone-500">CRUD básico conectado a NestJS</p>
          </div>
          <nav className="flex gap-2 text-sm">
            <Link
              to="/tareas"
              className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 transition"
            >
              Lista
            </Link>
            <Link
              to="/tareas/nueva"
              className="px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition"
            >
              Nueva
            </Link>
          </nav>
        </div>
      </header>

      {/* Rutas */}
      <main className="space-y-6">
        <Routes>
          <Route path="/" element={<Navigate to="/tareas" replace />} />
          <Route path="/tareas" element={<TareasListPage />} />
          <Route path="/tareas/nueva" element={<TareaFormPage mode="create" />} />
          <Route path="/tareas/:id" element={<TareaFormPage mode="edit" />} />
          <Route path="*" element={<div className="text-stone-600">404</div>} />
        </Routes>
      </main>
    </div>
  );
}
