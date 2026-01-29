import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Endereço de email invalido." }),
    password: z.string().min(8, { message: "Senha curta, deve ter no mínimo 8 caracteres." }),
});

export type loginSchema = z.infer<typeof loginSchema>