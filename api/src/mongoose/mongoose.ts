import * as mongoose from 'mongoose'
import People from './models/people'

class Mongoose {
    private readonly CONNECTION_STRING: String = 'mongodb://localhost:27017/search-people-db'
    private _db

    constructor() {
        this._db = mongoose.connection
    }

    public connect(): void {
        mongoose.connect(this.CONNECTION_STRING)

        this._db.on('error', (err) => {
            console.log(`mongoose server failed to start: ${err}`)
        })

        this._db.once('open', () => {
            console.log(`mongoose server running using ${this.CONNECTION_STRING}`)
        })
    }

    public addPeople(): void {
        let people = new People({
            firstName: 'Romain',
            lastName: 'Carrette',
            age: 26
        })

        people.save()
    }
}

export default new Mongoose()