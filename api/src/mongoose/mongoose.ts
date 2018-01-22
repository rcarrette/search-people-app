import * as mongoose from 'mongoose'

class Mongoose {
    private readonly connectionString: String = 'mongodb://localhost:27017/search-people-db'
    private db

    constructor() {
        this.db = mongoose.connection
    }

    public connect(): void {
        mongoose.connect(this.connectionString)

        this.db.on('error', (err) => {
            console.log(`mongoose server failed to start: ${err}`)
        })

        this.db.once('open', () => {
            console.log(`mongoose server running using ${this.connectionString}`)
        })
    }
}

export default new Mongoose()