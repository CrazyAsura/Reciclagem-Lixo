import { useMutation } from "@tanstack/react-query"
import { authService } from "@/libs/services/auth";
import { RegisterSchema } from "@/libs/validation/zod/register";
import { loginSchema } from "@/libs/validation/zod/login";

export const useRegisterAuthQuery = () => {
    return useMutation({
        mutationFn: (data: RegisterSchema) => {
            return authService.register(data);
        }
    })
}

export const useLoginAuthQuery = () => {
    return useMutation({
        mutationFn: (data: loginSchema) => {
            return authService.login(data);
        }   
    })
}

export const useLogoutAuthQuery = () => {
    return useMutation({
        mutationFn: (data: { id: string; email: string; role: string; isActive: boolean }) => {
            return authService.logout(data);
        }
    })
}

export const useProfileAuthQuery = () => {
    return useMutation({
        mutationFn: (id: string) => {
            return authService.getProfile(id);
        }
    })
}
