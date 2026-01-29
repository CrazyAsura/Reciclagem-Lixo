import { IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../../common/enum/roles";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    birthDate: string;
    @IsString()
    gender: string;
    @IsString()
    password: string;
    @IsString()
    confirmPassword: string;
    @IsEnum(ROLE)
    role: ROLE = ROLE.USER;
}
