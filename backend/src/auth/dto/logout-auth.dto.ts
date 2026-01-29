import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { ROLE } from "../../common/enum/roles";

export class LogoutAuthDto {
    @IsString()
    id: string;
    @IsEmail()
    email: string;
    @IsEnum(ROLE)
    role: ROLE;
    @IsBoolean()
    isActive: boolean;
}
