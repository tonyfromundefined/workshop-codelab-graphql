import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.string('ping', {
      resolve() {
        return 'pong'
      },
    })
  }
})
