import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { Payload } from "@common"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig().secret,
        })
    }

    async validate(payload: Payload): Promise<Payload> {
        return payload
    }
}
