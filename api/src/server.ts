import * as express from 'express'
import mongoose from './mongoose/mongoose'

class Server {
    public express

    constructor() {
        this.express = express()

        this.buildRoutes()
    }

    private buildRoutes(): void {
        const router = express.Router()

        router.get('/', async (req: express.Request, res: express.Response) => {
            let people = await mongoose.getPeopleAsync(),
                personsCount: Number = people.length

            res.json(personsCount > 0 ?
                people :
                'no persons found'
            )
        })

        //router.get for easy testing. TODO add person parameter + must be changed to post + error handling
        router.get('/add', async (req: express.Request, res: express.Response) => {
            let result = await mongoose.addPeopleAsync()

            res.json(result)
        })

        //router.get for easy testing. TODO add person parameter + must be changed to post + error handling
        router.get('/update', async (req: express.Request, res: express.Response) => {
            let result = await mongoose.updatePeopleAsync(),
                message = result &&
                    `person with id '${result._id}' updated` ||
                    'no persons updated'

            res.json(message)
        })

        //router.get for easy testing. TODO add person parameter + must be changed to post + error handling
        router.get('/delete', async (req: express.Request, res: express.Response) => {
            let result = await mongoose.deletePeopleAsync()

            res.json(`${result.n} person(s) deleted`)
        })

        //router.get for easy testing. TODO must be changed to post + error handling
        router.get('/clear', async (req: express.Request, res: express.Response) => {
            let result = await mongoose.clearPeopleAsync()

            res.json(`${result.n} person(s) deleted`)
        })

        this.express.use('/api/people', router)
    }
}

export default new Server().express