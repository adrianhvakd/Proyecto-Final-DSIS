import { IsBoolean, IsString, Length } from "class-validator";

export class UserNuevoDto {

  @Length(3, 100, { message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.' })
  username: string;
  @Length(6, 100, { message: 'El correo debe tener entre 6 y 20 caracteres.' })
  email: string;
  @Length(3, 50, { message: 'Los nombres deben tener entre 3 y 50 caracteres.' })
  names: string;
  @Length(3, 50, { message: 'Los apellidos deben tener entre 3 y 50 caracteres.' })
  lastNames: string;
  @Length(1, 100, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
  password: string;
  @IsString()
  isActive: boolean;
  @IsString()
  role: string;
}