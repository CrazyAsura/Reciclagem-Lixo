import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../../common/enum/roles";

export class EditProfileAuthDto {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsString()
    cpf: string;
    @IsString()
    birthDate: string;
    @IsString() 
    gender: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsEnum(ROLE)
    role: ROLE;
    @IsBoolean()
    isActive: boolean;
}