import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-jwt";

import { ConfigService } from "@nestjs/config";

import { ExtractJwt } from "passport-jwt";
import { validate } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: any) {
    return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        isActive: payload.isActive,
    }
  }
}

