import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service.js';
import { ProyectoController } from './proyecto.controller.js';
import { Proyecto } from './entities/proyecto.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
