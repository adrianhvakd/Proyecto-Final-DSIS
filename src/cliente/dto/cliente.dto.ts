import { IsOptional, IsString, Length } from "class-validator";
import { ignoreElements } from "rxjs";

export class ClienteDto{

    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
    nombre: string;
    @Length(3, 50, { message: 'Los apellidos deben tener entre 10 y 50 caracteres.' })
    apellidos: string;
    @Length(3, 20, { message: 'El código de vivienda debe tener entre 3 y 20 caracteres.' })
    codVivienda: string;
    @IsOptional()
    pagoImpuesto: boolean;
    
}