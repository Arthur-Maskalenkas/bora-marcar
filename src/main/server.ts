import 'module-alias/register'
import { app, env } from '@/main/config'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))