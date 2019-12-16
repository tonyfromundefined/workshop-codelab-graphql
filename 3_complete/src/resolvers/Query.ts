import { queryType, stringArg } from 'nexus'
import { Project } from '../models'

export const Query = queryType({
  definition(t) {
    t.string('ping', {
      resolve() {
        return 'pong'
      },
    })

    t.field('getProject', {
      type: 'Project',
      nullable: true,
      args: {
        name: stringArg({
          required: true,
        }),
      },
      resolve(_parent, args) {
        return Project.findByName(args.name)
      },
    })
  },
})
