import 'dotenv/config'
import jwt from '@fastify/jwt'
import  Multipart from '@fastify/multipart';
import fastify from "fastify";
import cors from '@fastify/cors'
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';
import { resolve } from 'node:path';
const app = fastify();

app.register(cors,{
  origin: true,
})

app.register(jwt,{
  secret: 'spacetime',
})
app.register(require('@fastify/static'),{
  root: resolve(__dirname,'../uploads'),
  prefix: '/uploads'
})
app.register(Multipart)
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server runnig on https://localhost:3333");
  });
