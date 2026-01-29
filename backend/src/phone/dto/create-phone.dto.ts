import { IsString } from "class-validator";

export class CreatePhoneDto {
    @IsString()
    id: string;
    @IsString()
    ddi: string;
    @IsString()
    ddd: string;
    @IsString()
    number: string;
}
