import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import mongoose from './mongoose/mongoose'
import PeopleGraphQLSchema from './graphql/schemas/people'

class Server {
    public express

    constructor() {
        this.express = express()

        this.buildRoutes()
    }

    private buildRoutes(): void {
        const router = express.Router()

        //#region MongoDB routes

        this.express.use('/api/people', router)  //base prefix

        //router.get for easy testing. TODO add person parameter + must be changed to post + error handling
        router.get('/update', async (req: express.Request, res: express.Response) => {
            let result = await mongoose.updatePeopleAsync(),
                message = result &&
                    `person with id '${result._id}' updated` ||
                    'no persons updated'

            res.json(message)
        })

        //#endregion

        //#region GraphQL routes

        this.express.use('/graphql', graphqlHTTP({
            schema: PeopleGraphQLSchema,
            graphiql: true  //TODO set value based on env variable
        }))

        //#endregion
    }
}

export default new Server().express