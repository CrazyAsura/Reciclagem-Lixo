import { IsString } from "class-validator";

export class CreateAddressDto{
    @IsString()
    id: string;
    @IsString()
    zipCode: string;
    @IsString()
    number: string;
    @IsString()
    complement?: string;
    @IsString()
    street: string;
    @IsString() 
    neighborhood: string;
    @IsString( {message: 'O campo cidade é obrigatório'} )
    city: string;
    @IsString( {message: 'O campo estado é obrigatório'} )
    state: string;
    @IsString( {message: 'O campo país é obrigatório'} )
    country: string;
}
