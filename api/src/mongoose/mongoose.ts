import * as mongoose from 'mongoose'
import People from './models/people'

class Mongoose {
    private readonly CONNECTION_STRING: String = 'mongodb://localhost:27017/search-people-db'
    private _db: mongoose.connection

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

    public async getPeopleAsync(): Promise<any> {
        return People.find({})
            .exec()
    }

    public async addPeopleAsync(): Promise<any> {
        let people = new People({
            firstName: 'Romain',
            lastName: 'Carrette',
            age: 26
        })

        return people.save()
    }

    public async updatePeopleAsync(): Promise<any> {
        return People.findOneAndUpdate(
            { age: 26 },
            { age: 27 })
            .exec()
    }

    public async deletePeopleAsync(): Promise<any> {
        return People.remove({ age: 26 })
            .exec()
    }

    public async clearPeopleAsync(): Promise<any> {
        return People.remove({})
            .exec()
    }
}

export default new Mongoose()