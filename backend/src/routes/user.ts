import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinSchema,signupSchema } from "@aman-dps1005/blogging_common1";



export const userroute=new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }  
}>()

userroute.post('/signup', async (c) => {

    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body=await c.req.json();
    const {success}=signupSchema.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        message:"invalid inputs"
      })
    }

    try{
      const user=await prisma.user.create({
        data:{
          email:body.email,
          name:body.name,
          password:body.password
        }
      })
  
      const payload={
        id:user.id,
        name:user.name
      }
      const token=await sign(payload,c.env.JWT_SECRET);
  
      return c.json({token,name:user.name})
    }
    catch(err){
      return c.status(403);
    }
      
  })
  
userroute.post('/signin', async (c) => {
    const prima=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body=await c.req.json();
    const {success}=signinSchema.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"invalid inputs"
      })
    }
  
    const user=await prima.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
  
    if(!user){
      c.status(403)
      return c.json({message:"user not found"});
    }
    const payload={
      id:user.id,
      name:user.name
    }
  
    const token=await sign(payload,c.env.JWT_SECRET);
  
    return c.json({message:token,name:user.name});
  })

userroute.get("/:id",async (c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const id=c.req.param("id");

  const user=await prisma.user.findFirst({
    where:{
      id:id
    }
  })

  if(!user){
    c.status(403);
    return c.text("user not found");
  }
  
  return c.json({"username":user.name});

})