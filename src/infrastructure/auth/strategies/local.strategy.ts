// src/auth/strategies/local.strategy
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../../../application/auth/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../../../domain/models/user.model";
import { ObjectUnsubscribedError } from "rxjs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            userNameField: 'username',
            passwordField: 'password'
        })
    }

    async validate(username: string, password: string) {
        const user: User | null = await this.authService.validateUser(username, password)
        if (!user) throw new UnauthorizedException();
        return user
    }
}