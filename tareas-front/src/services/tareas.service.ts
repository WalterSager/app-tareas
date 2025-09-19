import { api } from './api';
import type { Tarea, CreateTareaInput, UpdateTareaInput } from '../types/tarea';

const resource = '/tareas';

export async function getTareas(): Promise<Tarea[]> {
  const { data } = await api.get<Tarea[]>(resource);
  return data;
}

export async function getTarea(id: number): Promise<Tarea> {
  const { data } = await api.get<Tarea>(`${resource}/${id}`);
  return data;
}

export async function createTarea(payload: CreateTareaInput): Promise<Tarea> {
  const { data } = await api.post<Tarea>(resource, payload);
  return data;
}

export async function updateTarea(id: number, payload: UpdateTareaInput): Promise<Tarea> {
  const { data } = await api.put<Tarea>(`${resource}/${id}`, payload);
  return data;
}

export async function deleteTarea(id: number): Promise<void> {
  await api.delete(`${resource}/${id}`);
}
