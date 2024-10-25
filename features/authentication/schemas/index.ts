import * as z from 'zod'

// Login schema
export const LoginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Please enter valid email address"
    })
});