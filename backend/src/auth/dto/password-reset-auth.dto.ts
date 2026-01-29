import { IsEmail, IsString } from "class-validator";

export class PasswordResetAuthDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    confirmPassword: string;
}
