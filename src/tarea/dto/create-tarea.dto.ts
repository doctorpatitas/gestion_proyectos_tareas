import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateTareaDto {
  @ApiProperty({ description: 'Título de la tarea' })
  @IsNotEmpty({ message: 'El título de la tarea no puede estar vacío' })
  @IsString({ message: 'El título de la tarea debe ser una cadena de texto' })
  titulo: string;

  @ApiProperty({ description: 'Descripción de la tarea' })
  @IsNotEmpty({ message: 'La descripción de la tarea no puede estar vacía' })
  @IsString({
    message: 'La descripción de la tarea debe ser una cadena de texto',
  })
  descripcion: string;

  @ApiProperty({ description: 'Fecha límite de la tarea' })
  @IsNotEmpty({ message: 'La fecha límite de la tarea no puede estar vacía' })
  @IsISO8601(
    { strict: false },
    {
      message:
        'La fecha límite de la tarea debe ser una fecha válida en formato ISO 8601',
    },
  )
  fecha_limite: Date;

  @ApiProperty({ description: 'ID del proyecto al que pertenece la tarea' })
  @IsNotEmpty({ message: 'El ID del proyecto no puede estar vacío' })
  @IsInt({ message: 'El ID del proyecto debe ser un número entero' })
  proyecto_id: number;
}
