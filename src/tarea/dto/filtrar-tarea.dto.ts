import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TAREA_ESTADO } from '../enum/tarea_estado.js';
import { TAREA_PRIORIDAD } from '../enum/tarea_estado.js';

export class FiltrarTareasDto {
  @ApiPropertyOptional({
    description: 'Filtrar por estado',
    enum: TAREA_ESTADO,
  })
  @IsOptional()
  @IsEnum(TAREA_ESTADO, {
    message: `El estado debe ser uno de: ${Object.values(TAREA_ESTADO).join(',')}`,
  })
  estado?: TAREA_ESTADO;

  @ApiPropertyOptional({
    description: 'Filtrar por prioridad',
    enum: TAREA_PRIORIDAD,
  })
  @IsOptional()
  @IsEnum(TAREA_PRIORIDAD, {
    message: `La prioridad debe ser una de: ${Object.values(TAREA_PRIORIDAD).join(', ')}`,
  })
  prioridad?: TAREA_PRIORIDAD;
}
