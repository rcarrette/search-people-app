import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import People from './graphql/schemas/people'

class Server {
    public express

    constructor() {
        this.express = express()

        this.buildRoutes()
    }

    private buildRoutes(): void {
        const router = express.Router()

        //#region GraphQL routes

        this.express.use('/graphql', graphqlHTTP({
            schema: People.getSchema(),
            graphiql: false  //TODO set value based on env variable
        }))

        //#endregion
    }
}

export default new Server().express