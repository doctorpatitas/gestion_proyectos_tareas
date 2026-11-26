import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { TAREA_ESTADO, TAREA_PRIORIDAD } from '../enum/tarea_estado.js';
import { Proyecto } from '../../proyecto/entities/proyecto.entity.js';

@Entity('tarea')
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'título', type: 'varchar', length: 125 })
    titulo: string;

    @Column({name: 'descripcion', type: 'varchar', length: 300 })
    descripcion: string;

    @Column({name: 'estado', type: 'enum', enum: TAREA_ESTADO, default: TAREA_ESTADO.PENDIENTE })
    estado: TAREA_ESTADO;

    @Column({name: 'prioridad', type: 'enum', enum: TAREA_PRIORIDAD, default: TAREA_PRIORIDAD.MEDIA })
    prioridad: TAREA_PRIORIDAD;

    @Column({name: 'fecha_limite', type: 'date' })
    fecha_limite: Date;

    @Column({name: 'proyecto_id', type: 'int' })
    proyecto_id: number;

    @ManyToOne(() => Proyecto)
    @JoinColumn({ name: 'proyecto_id' })
    proyecto: Proyecto;
}
