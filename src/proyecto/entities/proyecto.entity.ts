import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity.js';

@Entity('proyecto')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 125 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 300 })
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fecha_inicio: Date;

  @Column({ name: 'fecha_finalizacion', type: 'date' })
  fecha_finalizacion: Date;

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];
}
