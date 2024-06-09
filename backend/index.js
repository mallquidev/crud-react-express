import express from 'express'
import {PORT} from './config.js'
//imp router
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(indexRoutes)

app.listen(PORT)
console.log(`Server is running port ${PORT}`)
