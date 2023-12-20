// src/application/auth/interfaces/auth.interface.ts
import { User } from '../../../domain/models/user.model';

export interface AuthInterface {
  validateUser(username: string, password: string): Promise<User | null>;
  generateJWT(user: User): { access_token: string };
}
