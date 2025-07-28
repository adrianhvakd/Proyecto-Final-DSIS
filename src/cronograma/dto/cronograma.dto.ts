import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CronogramaDto {
  @IsString()
  @IsNotEmpty()
  nombre_evento: string;

  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;

  @IsString()
  fase: string;

  @IsString()
  descripcion?: string;
}
