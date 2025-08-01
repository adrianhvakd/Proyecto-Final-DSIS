import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; 
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ClientesesionModule } from 'src/clientesesion/clientesesion.module';

import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'tu-secreto-jwt',
      signOptions: { expiresIn: '1d' },
    }),ClientesesionModule,ConfigModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  controllers: [AuthController],
})
export class AuthModule {}