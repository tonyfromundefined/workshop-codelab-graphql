import { ApolloServer } from 'apollo-server-express'
import express, { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import fs from 'fs'
import { GraphQLNamedType } from 'graphql'
import { makeSchema } from 'nexus'
import path from 'path'
import * as resolvers from './resolvers'
import { TypegenConfigSourceModule } from 'nexus/dist/core'

/**
 * 서버 어플리케이션을 생성합니다
 */
export function createApp() {
  const app = express()
  const apollo = createApolloServer()

  apollo.applyMiddleware({
    app,
  })

  return app
}

/**
 * GraphQL 서버를 생성합니다
 */
function createApolloServer() {
  const schema = makeSchema({
    types: {
      scalars: {},
      resolvers,
    },
    outputs: {
      schema: path.resolve(__dirname, './generated', 'schema.graphql'),
      typegen: path.resolve(__dirname, './generated', 'nexus.ts'),
    },
    typegenAutoConfig: {
      sources: createTypegenConfigSources(),
      contextType: 'Context',
    },
  })

  const server = new ApolloServer({
    schema,
    context({ req, res }): Context {
      return { req, res }
    },
  })

  return server
}
declare global {
  export interface Context {
    req: Request<ParamsDictionary>
    res: Response,
  }
}

/**
 * Nexus.js의 objectType과 models 내에 내 model 타입과 연결합니다
 */
function createTypegenConfigSources() {
  const sources: TypegenConfigSourceModule[] = []
  const modelFilenames = fs.readdirSync(path.resolve(__dirname, './models'))

  for (const filename of modelFilenames) {
    sources.push({
      alias: path.parse(filename).name,
      source: path.resolve(__dirname, './models', filename),
      typeMatch(type: GraphQLNamedType) {
        return new RegExp(`(?:class|interface|type)\\s+(${type.name})\\W`)
      },
    })
  }

  return sources
}
