import { Address } from "./address";
import { Phone } from "./phone";

export type User = {
    id: string;
    name: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: Phone;
    address: Address;
}