import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TAREA_ESTADO } from '../enum/tarea_estado.js';

export class CambiarEstadoTareaDto {
    @ApiProperty({ description: 'Nuevo estado de la tarea', enum: TAREA_ESTADO })
    @IsNotEmpty({ message: 'El estado no puede estar vacío' })
    @IsEnum(TAREA_ESTADO, { message: `El estado debe ser uno de: ${Object.values(TAREA_ESTADO).join(', ')}` })
    estado: TAREA_ESTADO;
}