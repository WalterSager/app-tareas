import {  Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get('completadas') // opcional
  findCompleted() {
    return this.tareasService.findCompleted();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTareaDto) {
    return this.tareasService.create(dto); // 201 por defecto
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTareaDto,
  ) {
    return this.tareasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // No Content
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tareasService.remove(id);
  }
}
