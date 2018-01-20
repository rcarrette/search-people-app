import * as express from 'express'

class Server {
    public express

    constructor() {
        this.express = express()

        this.buildRoutes()
    }

    private buildRoutes(): void {
        const router = express.Router()

        router.get('/api', (req, res) => {
            res.json({
                message: 'Hello world :)'
            })
        })

        this.express.use('/', router)
    }
}

export default new Server().express