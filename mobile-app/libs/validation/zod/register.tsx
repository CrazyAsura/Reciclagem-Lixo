import { z } from 'zod';

// Regex Helpers
const phoneBrazilRegex = /^(?:(?:\+|00)?55\s?)?(?:\(?[1-9][0-9]\)?\s?)?(?:9\d{4}[-.\s]?\d{4}|\d{4}[-.\s]?\d{4})$/;

// Função auxiliar de validação de CPF (Mantida a lógica original pois está correta)
function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) digit = 0;
  return digit === parseInt(cpf.charAt(10));
}

export const registerSchema = z.object({
  // Etapa 1: Pessoal
  name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
  cpf: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 11, { message: "CPF incompleto" })
    .refine(isValidCPF, { message: "CPF inválido" }),
  birthDate: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido (DD/MM/AAAA)")
    .refine((val) => {
      const [d, m, y] = val.split('/').map(Number);
      const date = new Date(y, m - 1, d);
      return date.getDate() === d && date.getMonth() === m - 1 && y > 1900 && y < new Date().getFullYear();
    }, "Data inexistente ou inválida"),
  gender: z.enum(["Masculino", "Feminino", "Outro", "Prefiro não informar"], {
    message: "Selecione um gênero", // A propriedade correta para essa sobrecarga é 'message'
  }),

  // Etapa 2: Endereço
  zipCode: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 8, "CEP incompleto"),
  street: z.string().min(3, "Rua inválida").optional(),
  numberResidence: z.string().min(1, "Obrigatório"),
  complement: z.string().max(60).optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().length(2, "UF inválida (ex: SP)"),
  country: z.string().optional(),

  // Etapa 3: Contato
  email: z.string().email("E-mail inválido").max(120),
  ddi: z.string().min(1, "DDI obrigatório"),
  ddd: z.string().min(2, "DDD obrigatório").max(3, "DDD inválido"),
  phone: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length >= 8, "Telefone inválido"),

  // Etapa 4: Segurança
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Falta letra maiúscula")
    .regex(/[a-z]/, "Falta letra minúscula")
    .regex(/[0-9]/, "Falta número")
    .regex(/[^A-Za-z0-9]/, "Falta caractere especial (!@#)"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;