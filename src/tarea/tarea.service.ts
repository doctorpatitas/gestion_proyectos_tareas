import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Not, Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity.js';
import { CreateTareaDto } from './dto/create-tarea.dto.js';
import { UpdateTareaDto } from './dto/update-tarea.dto.js';
import { CambiarEstadoTareaDto } from './dto/cambiar-estado-tarea.dto.js';
import { TAREA_ESTADO } from './enum/tarea_estado.js';
import { ProyectoService } from '../proyecto/proyecto.service.js';
import { FiltrarTareasDto } from './dto/filtrar-tarea.dto.js';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly proyectoService: ProyectoService,
  ) {}

  async create(createTareaDto: CreateTareaDto) {
    await this.proyectoService.findOne(createTareaDto.proyecto_id);

    const tarea = this.tareaRepository.create(createTareaDto);
    return this.tareaRepository.save(tarea);
  }

  async findAll(filtros: FiltrarTareasDto) {
    if (!filtros.prioridad && !filtros.estado)
      throw new BadRequestException('Debes enviar al menos un filtro');

    const condiciones: FindOptionsWhere<Tarea> = {};
    if (filtros.estado) condiciones.estado = filtros.estado;
    if (filtros.prioridad) condiciones.prioridad = filtros.prioridad;

    const tareas = await this.tareaRepository.find({ where: condiciones });
    if (!tareas.length)
      throw new NotFoundException(
        'No se encontraron tareas con los filtros proporcionados',
      );

    return tareas;
  }

  async findVencidas() {
    const hoy = new Date();
    hoy.setUTCHours(0, 0, 0, 0);

    const tareaVencida = await this.tareaRepository.find({
      where: {
        fecha_limite: LessThan(hoy),
        estado: Not(TAREA_ESTADO.COMPLETA),
      },
    });

    if (!tareaVencida.length) {
      throw new NotFoundException('No hay tareas vencidas.');
    }

    return tareaVencida;
  }

  async findOne(id: number) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    if (!tarea) {
      throw new NotFoundException(`La tarea con id ${id} no existe`);
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.findOne(id);

    // Si quieren moverla a otro proyecto, ese proyecto debe existir
    if (
      updateTareaDto.proyecto_id &&
      updateTareaDto.proyecto_id !== tarea.proyecto_id
    ) {
      await this.proyectoService.findOne(updateTareaDto.proyecto_id);
    }

    this.tareaRepository.merge(tarea, updateTareaDto);
    return this.tareaRepository.save(tarea);
  }

  async cambiarEstado(id: number, cambiarEstadoDto: CambiarEstadoTareaDto) {
    const tarea = await this.findOne(id);
    if (tarea.estado === cambiarEstadoDto.estado) {
      throw new BadRequestException(
        `La tarea ya está en estado ${cambiarEstadoDto.estado}`,
      );
    }
    tarea.estado = cambiarEstadoDto.estado;
    return this.tareaRepository.save(tarea);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.tareaRepository.delete(id);
    return { message: `Tarea ${id} eliminada correctamente` };
  }
}
