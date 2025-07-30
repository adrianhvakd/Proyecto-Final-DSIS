import { PartialType } from '@nestjs/mapped-types';
import { CreateClientesesionDto } from './create-clientesesion.dto';

export class UpdateClientesesionDto extends PartialType(CreateClientesesionDto) {}
