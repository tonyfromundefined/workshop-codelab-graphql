import { createApp } from './app'

(function main() {
  const app = createApp()
  const isProd = process.env.NODE_ENV === 'production'

  app.listen(3000, () => {
    if (isProd) {
      console.log('[INFO] Codelab Nexus is running on http://localhost:3000 in production mode')
    } else {
      console.log('[INFO] Codelab Nexus is running on http://localhost:3000 in development mode')
    }
  })
})()
