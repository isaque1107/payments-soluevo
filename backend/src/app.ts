import cors from 'cors'
import express from 'express'
import routes from '@/API/Routes'
import {
    notFoundMiddleware,
    serverErrorMiddleware
} from '@/API/Middlewares/responseMiddleware'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(serverErrorMiddleware)
app.use(notFoundMiddleware)

export default app
