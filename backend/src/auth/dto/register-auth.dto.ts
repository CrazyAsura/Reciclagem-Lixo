import { IsArray, IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../../common/enum/roles";
import { Address } from "../../address/entities/address.entity";
import { Phone } from "../../phone/entities/phone.entity";

export class RegisterAuthDto {
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
    @IsString()
    confirmPassword: string;
    @IsEnum(ROLE)
    role: ROLE = ROLE.USER;
    @IsBoolean()
    isActive: boolean = true;
    @IsArray()  
    phones: Phone[];
    @IsArray()
    addresses: Address[];
}