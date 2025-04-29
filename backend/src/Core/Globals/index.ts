import { AwilixContainer } from 'awilix'

declare global {
    namespace Express {
        interface Request {
            container: AwilixContainer
        }
    }

    interface String {
        identifier(): string
    }
}

String.prototype.identifier = function (): string {
    return this.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/([^\w]+|\s+)/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/(^-+|-+$)/, '')
        .toLowerCase()
}
