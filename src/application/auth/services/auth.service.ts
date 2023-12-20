// src/auth/services/auth.service
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../domain/models/user.model';
import { PayloadToken } from '../../../domain/models/token.model';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable()
export class AuthService implements AuthInterface {
    constructor(private jwtService: JwtService) {

    }

    async validateUser(username: string, password: string) {
        const users: User[] = [
            {
                "id": 1,
                "username": "ana.viveros",
                "password": "123456",
                "role": "admin"
            },
            {
                "id": 2,
                "username": "carlos21",
                "password": "123456",
                "role": "client"
            },
            {
                "id": 3,
                "username": "ai12gomez",
                "password": "123456",
                "role": "client"
            }
        ]

        const user: User | undefined = users.find(x => x.username === username && x.password === password);

        if (user) return user;
        return null;
    }

    generateJWT(user: User) {
        const payload: PayloadToken = { user };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
