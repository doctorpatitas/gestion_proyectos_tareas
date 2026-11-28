import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProyectoService } from './proyecto.service.js';
import { CreateProyectoDto } from './dto/create-proyecto.dto.js';
import { UpdateProyectoDto } from './dto/update-proyecto.dto.js';

@ApiTags('Proyectos/v1')
@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un proyecto' })
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los proyectos' })
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id/tareas')
  @ApiOperation({ summary: 'Consultar las tareas de un proyecto' })
  findTareas(@Param('id', ParseIntPipe) id: number) {
    return this.proyectoService.findTareas(id);
  }

  @Get(':id/avance')
  @ApiOperation({ summary: 'Porcentaje de avance según tareas completadas' })
  calcularAvance(@Param('id', ParseIntPipe) id: number) {
    return this.proyectoService.calcularAvance(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proyectoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    return this.proyectoService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un proyecto (solo si no tiene tareas sin completar)',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proyectoService.remove(id);
  }
}
