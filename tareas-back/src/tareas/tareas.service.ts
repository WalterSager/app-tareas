import { Injectable, NotFoundException } from '@nestjs/common';
import { Tarea } from './tarea.model';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareasService {
    private tareas: Tarea[] = [];
    private nextId = 1;

    findAll(): Tarea[] {
        return this.tareas;
    }

    findOne(id: number): Tarea {
    const tarea = this.tareas.find(t => t.id === id);
    if (!tarea) throw new NotFoundException(`Tarea ${id} no encontrada`);
    return tarea;
  }


    create(dto: CreateTareaDto): Tarea {
        const nueva: Tarea = {
            id: this.nextId++,
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            completada: dto.completada ?? false,
        };
        this.tareas.push(nueva);
        return nueva;
    }

    update(id: number, dto: UpdateTareaDto): Tarea {
    const tarea = this.findOne(id);
    // merge controlado (sólo campos presentes)
    if (dto.titulo !== undefined) tarea.titulo = dto.titulo;
    if (dto.descripcion !== undefined) tarea.descripcion = dto.descripcion;
    if (dto.completada !== undefined) tarea.completada = dto.completada;
    return tarea;
  }

  remove(id: number): void {
    const idx = this.tareas.findIndex(t => t.id === id);
    if (idx === -1) throw new NotFoundException(`Tarea ${id} no encontrada`);
    this.tareas.splice(idx, 1);
  }


    findCompleted(): Tarea[] {
        return this.tareas.filter(tarea => tarea.completada);
    }
}
