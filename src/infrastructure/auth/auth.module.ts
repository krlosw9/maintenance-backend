// src/infrastructure/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../../application/auth/services/auth.service';
import { AuthController } from '../../infrastructure/auth/auth.controller'; // Ajusta la ruta según tu estructura
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import config from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JWT_SECRET,
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
