import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareaService } from './tarea.service.js';
import { CreateTareaDto } from './dto/create-tarea.dto.js';
import { UpdateTareaDto } from './dto/update-tarea.dto.js';
import { CambiarEstadoTareaDto } from './dto/cambiar-estado-tarea.dto.js';
import { FiltrarTareasDto } from './dto/filtrar-tarea.dto.js';

@ApiTags('Tareas/v1')
@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tarea' })
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tareas (filtros opcionales: estado y prioridad)',
  })
  findAll(@Query() filtros: FiltrarTareasDto) {
    return this.tareaService.findAll(filtros);
  }

  @Get('vencidas')
  @ApiOperation({ summary: 'Tareas vencidas que no están completadas' })
  findVencidas() {
    return this.tareaService.findVencidas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tareaService.findOne(id);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar el estado de una tarea' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambiarEstadoDto: CambiarEstadoTareaDto,
  ) {
    return this.tareaService.cambiarEstado(id, cambiarEstadoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTareaDto: UpdateTareaDto,
  ) {
    return this.tareaService.update(id, updateTareaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tareaService.remove(id);
  }
}
