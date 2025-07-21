import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Opcional si usas headers
        (req) => {
          return req?.cookies?.access_token; // Aquí lee el token desde la cookie
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tu-secreto-jwt',
    });
  }

  async validate(payload: any) {
    // Aquí validas el usuario
    return { userId: payload.sub, username: payload.username };
  }
}
