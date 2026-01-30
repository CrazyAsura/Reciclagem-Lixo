import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}