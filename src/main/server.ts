import 'module-alias/register'
import { app } from '@/main/config'
import { env } from '@/helpers'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))