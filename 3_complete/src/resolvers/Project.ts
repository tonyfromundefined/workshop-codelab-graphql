import { objectType } from 'nexus'
import { User } from '../models'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('tagline')
    t.field('contributors', {
      type: 'User',
      list: [false],
      resolve(parent, _args) {
        return User.findByIds(parent.contributorIds)
      },
    })
  },
})
