import z from "zod"

export const signupSchema=z.object({
    email:z.string().email(),
    name:z.string().optional(),
    password:z.string().min(8)
})

export const signinSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8)
})

export const BlogCreateSchema=z.object({
    title:z.string(),
    content:z.string()
})

export const BlogUpdateSchema=z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
})

export type signupInput=z.infer<typeof signupSchema>;
export type signinInput=z.infer<typeof signinSchema>;
export type BlogCreateInput=z.infer<typeof BlogCreateSchema>;
export type BlogUpdateInput=z.infer<typeof BlogUpdateSchema>;