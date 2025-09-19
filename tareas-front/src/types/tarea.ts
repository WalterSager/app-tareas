export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completado: boolean;
}

export type CreateTareaInput = Pick<Tarea, 'titulo' | 'descripcion'> & Partial<Pick<Tarea, 'completado'>>;
export type UpdateTareaInput = Partial<Pick<Tarea, 'titulo' | 'descripcion' | 'completado'>>;
