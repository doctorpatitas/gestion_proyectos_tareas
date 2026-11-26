import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity.js';
import { CreateProyectoDto } from './dto/create-proyecto.dto.js';
import { UpdateProyectoDto } from './dto/update-proyecto.dto.js';
import { TAREA_ESTADO } from '../tarea/enum/tarea_estado.js';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    this.validarFechas(createProyectoDto.fecha_inicio, createProyectoDto.fecha_finalizacion);
    const proyecto = this.proyectoRepository.create(createProyectoDto);
    return this.proyectoRepository.save(proyecto);
  }

  findAll() {
    return this.proyectoRepository.find();
  }

  async findOne(id: number) {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) {
      throw new NotFoundException(`El proyecto con id ${id} no existe`);
    }
    return proyecto;
  }

  async findTareas(id: number) {
    const proyecto = await this.buscarConTareas(id);
    return proyecto.tareas;
  }

  async calcularAvance(id: number) {
    const proyecto = await this.buscarConTareas(id);
    const total = proyecto.tareas.length;
    const completadas = proyecto.tareas.filter(
      (tarea) => tarea.estado === TAREA_ESTADO.COMPLETA,
    ).length;
    const porcentaje = total === 0 ? 0 : Number(((completadas / total) * 100).toFixed(2));

    return {
      proyecto_id: proyecto.id,
      total_tareas: total,
      tareas_completadas: completadas,
      porcentaje_avance: porcentaje,
    };
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    const proyecto = await this.findOne(id);
    const inicio = updateProyectoDto.fecha_inicio ?? proyecto.fecha_inicio;
    const fin = updateProyectoDto.fecha_finalizacion ?? proyecto.fecha_finalizacion;
    this.validarFechas(inicio, fin);

    this.proyectoRepository.merge(proyecto, updateProyectoDto);
    return this.proyectoRepository.save(proyecto);
  }

  async remove(id: number) {
    const proyecto = await this.buscarConTareas(id);
    const sinCompletar = proyecto.tareas.filter(
      (tarea) => tarea.estado !== TAREA_ESTADO.COMPLETA,
    );
    if (sinCompletar.length > 0) {
      throw new ConflictException(
        `No se puede eliminar el proyecto: tiene ${sinCompletar.length} tarea(s) sin completar`,
      );
    }
    await this.proyectoRepository.delete(id);
    return { message: `Proyecto ${id} eliminado correctamente` };
  }

  // ---------- helpers privados ----------

  private async buscarConTareas(id: number) {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: { tareas: true },
    });
    if (!proyecto) {
      throw new NotFoundException(`El proyecto con id ${id} no existe`);
    }
    return proyecto;
  }

  private validarFechas(inicio: Date | string, fin: Date | string) {
    if (new Date(fin) < new Date(inicio)) {
      throw new BadRequestException(
        'La fecha de finalización no puede ser anterior a la fecha de inicio',
      );
    }
  }
}