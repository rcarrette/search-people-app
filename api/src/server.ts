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

        router.get('/', (req, res) => {
            res.json({
                message: 'search-people-app api'
            })
        })

        //router.get for easy testing. TODO must be changed to post + handle result + add mocha test
        router.get('/add', (req, res) => {
            mongoose.addPeople()

            // let result = mongoose.addPeople()

            // let x = result
        })

        this.express.use('/api/people', router)
    }
}

export default new Server().express