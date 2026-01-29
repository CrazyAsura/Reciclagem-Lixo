import { PartialType } from '@nestjs/mapped-types';
import { PasswordResetAuthDto } from './password-reset-auth.dto';

export class UpdateAuthDto extends PartialType(PasswordResetAuthDto) {}
