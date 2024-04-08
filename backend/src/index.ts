import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { userroute } from './routes/user'
import { blogRoutes } from './routes/blog'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

app.use('/*',cors());

app.route("/api/v1/user",userroute);
app.route("api/v1/blog",blogRoutes);





export default app
