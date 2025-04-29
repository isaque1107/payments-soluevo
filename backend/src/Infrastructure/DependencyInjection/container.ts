import database from '@/Infrastructure/Database/config'
import path from 'path'
import {
    asClass,
    asFunction,
    asValue,
    AwilixContainer,
    createContainer,
    InjectionMode,
    Lifetime
} from 'awilix'
import { PaymentQueue } from '../Queues/PaymentQueue'
import PaymentRepository from '../Database/Repositories/PaymentRepository'

const rootPath = path.resolve(path.dirname(__filename), '..', '..')

const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC
})

container.register({
    rootPath: asValue(rootPath),
    documentationPath: asValue(`${rootPath}/API/Documentation`)
})


container.loadModules(
    [`${rootPath}/Infrastructure/Database/Repositories/**/*.*`],
    {
        formatName: 'camelCase',
        resolverOptions: {
            register: asClass,
            lifetime: Lifetime.SINGLETON
        }
    }
)


container.loadModules([`${rootPath}/Application/**/*.*`], {
    formatName: 'camelCase',
    resolverOptions: {
        register: asClass,
        lifetime: Lifetime.SCOPED
    }
})


container.register({
    database: asValue(database),
    inMemoryQueue: asClass(PaymentQueue).singleton()
})


export default container
