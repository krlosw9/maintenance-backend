// src/app.module
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true,
    validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required()
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}