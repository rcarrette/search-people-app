import server from './server'
import mongoose from './mongoose/mongoose'

const port = process.env.PORT || 3000

mongoose.connect()

server.listen(port, (err) => {
    return console.log(err ?
        `express server failed to start: ${err}` :
        `express server running on port ${port}`)
})