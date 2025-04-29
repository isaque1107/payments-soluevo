import * as dotenv from 'dotenv'
import { Knex } from 'knex'
import 'tsconfig-paths/register'

dotenv.config({ path: '../../../.env' })

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: ':memory:'
    },
    useNullAsDefault: true
};

export default config
