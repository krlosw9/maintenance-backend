// src/application/auth/usecases/login.usecase.ts
import { Injectable } from '@nestjs/common';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authService: AuthInterface) { }

  async execute(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.generateJWT(user);
    }
    // Manejar caso de usuario no válido
  }
}
