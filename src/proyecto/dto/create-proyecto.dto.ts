import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateProyectoDto {
    @ApiProperty({ description: 'Nombre del proyecto' })
    @IsNotEmpty({ message: 'El nombre del proyecto no puede estar vacío' })
    @IsString({ message: 'El nombre del proyecto debe ser una cadena de texto' })
    nombre: string;

    @ApiProperty({ description: 'Descripción del proyecto' })
    @IsNotEmpty({ message: 'La descripción del proyecto no puede estar vacía' })
    @IsString({ message: 'La descripción del proyecto debe ser una cadena de texto' })
    descripcion: string;

    @ApiProperty({ description: 'Fecha de inicio del proyecto' })
    @IsNotEmpty({ message: 'La fecha de inicio del proyecto no puede estar vacía' })
    @IsISO8601({ strict: false }, { message: 'La fecha de inicio del proyecto debe ser una fecha válida en formato ISO 8601' })
    fecha_inicio: Date;

    @ApiProperty({ description: 'Fecha de finalización del proyecto' })
    @IsNotEmpty({ message: 'La fecha de finalización del proyecto no puede estar vacía' })
    @IsISO8601({ strict: false }, { message: 'La fecha de finalización del proyecto debe ser una fecha válida en formato ISO 8601' })
    fecha_finalizacion: Date;
}
