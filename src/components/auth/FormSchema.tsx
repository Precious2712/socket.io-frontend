import * as z from 'zod';

export const signupFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    gender: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

export const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type signupForm = z.infer<typeof signupFormSchema>
export type loginForm = z.infer<typeof loginFormSchema>