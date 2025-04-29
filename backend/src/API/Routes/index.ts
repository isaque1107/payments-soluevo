import container from '@/Infrastructure/DependencyInjection/container'
import express, { Router } from 'express'
import { loadControllers, scopePerRequest } from 'awilix-express'

const rootPath = container.resolve('rootPath')
const documentationPath = container.resolve('documentationPath')

const routes = Router()

routes.use(express.static(documentationPath))
routes.use(scopePerRequest(container))
routes.use('/api', loadControllers(`${rootPath}/API/Controllers/**/*.*`))

export default routes
