import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { BlogCreateSchema,BlogUpdateSchema } from "@aman-dps1005/blogging_common1";


export const blogRoutes=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
    Variables:{
      userId:string
    }
}>();



blogRoutes.use("/*",async (c,next)=>{
  const jwt=c.req.header('authorization');
  if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

  const token=jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

  c.set("userId", payload.id);
  await next();

})


blogRoutes.get('/bulk',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const posts=await prisma.post.findMany({});

  return c.json(posts);
})


blogRoutes.get('/:id', async (c) => {
	const id= c.req.param('id')
  console.log(id);
	
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const post =await prisma.post.findFirst({
    where:{
      id:id
    }
  })

  if(post ){
    return c.json(post)
  }
  else{
    c.status(404)
    return c.text("post not found");
  }
})

blogRoutes.post('/', async(c) => {
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())


  const body=await c.req.json();
  const {success}=BlogCreateSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"invalid input for blog"
    })
  }

  try{

    const post =await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        published:true,
        authorId:c.get('userId')

      }
    }) 

    if(post){
      return c.json(post.id)
    }
    else{
      return c.status(403)
    }

  }
  catch(err){
    c.status(404)
    c.json({message:"post not created"})
  }

})

blogRoutes.put('/',async  (c) => {
  const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();

  const {success}=BlogUpdateSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"invalid input to update blog"
    })
  }

	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

/*blogRoutes.put("/delete",async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

  const deleted=await prisma.post.deleteMany({
    where:{
    }
  })
  console.log(deleted);
  return c.text("deleted");
})*/