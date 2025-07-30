import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Clientesesion } from 'src/clientesesion/entities/clientesesion.entity';
import { ClientesesionService } from 'src/clientesesion/clientesesion.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private clientese: ClientesesionService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username); 
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
  async validateClient(username: string, password: string): Promise<any> {
    const client = await this.clientese.findClientByUsername(username);
    if (client && await bcrypt.compare(password, client.password)) {
      const { password, ...result } = client;
      return result;
    }
    return null;
  }
}