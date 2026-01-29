import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../../common/enum/roles";

export class LoginAuthDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsEnum(ROLE)
    role: ROLE;
    @IsBoolean()
    isActive: boolean;
}
