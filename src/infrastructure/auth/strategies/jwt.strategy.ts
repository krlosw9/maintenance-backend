// src/auth/strategies/jwt.strategy
import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadToken } from "../../../domain/models/token.model";
import { ConfigType } from "@nestjs/config";
import config from "src/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.JWT_SECRET,
            ignoreExpiration: false
        });
    }

    validate(payload: PayloadToken) {
        return payload
    }
}