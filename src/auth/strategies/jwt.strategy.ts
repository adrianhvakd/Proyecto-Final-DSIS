// 4. JWT STRATEGY (src/auth/jwt.strategy.ts)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu-secreto-jwt', // Cambiar por variable de entorno
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}