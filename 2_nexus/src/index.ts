import { createApp } from './app'

const isProd = process.env.NODE_ENV === 'production'

function main() {
  const app = createApp()

  app.listen(3000, () => {
    if (isProd) {
      console.log('[\x1B[36mINFO\x1B[0m] Server is running on http://localhost:3000 in production mode')
    } else {
      console.log('[\x1B[36mINFO\x1B[0m] Server is running on http://localhost:3000 in development mode')
    }
  })
}

main()
