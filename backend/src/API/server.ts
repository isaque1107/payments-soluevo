import 'dotenv/config'
import 'tsconfig-paths/register'
import 'module-alias/register'
import 'reflect-metadata'
import '@/Core/Globals'
import 'moment-timezone'

import app from '@/app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
