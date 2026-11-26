import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProyectoModule } from './proyecto/proyecto.module.js';
import { TareaModule } from './tarea/tarea.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env.config.js';
import { envValidationSchema } from './config/env.validation.schema.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      validate: (config) => envValidationSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('database'),
      }),
    }),
    ProyectoModule, 
    TareaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
