import { z } from 'zod';

export const passwordResetSchema = z.object({
        email: z.string().email({ message: "Endereço de email invalido." }),
        password: z.string().min(8, { message: "Senha curta, deve ter no mínimo 8 caracteres." }),
        confirmPassword: z.string().min(8, { message: "Confirmação de senha curta, deve ter no mínimo 8 caracteres." }),
}).refine((data) => data.password === data.confirmPassword, 
    {
        message: "As senhas não coincidem.",
    })

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>