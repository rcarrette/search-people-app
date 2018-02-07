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

    public async getPeopleAsync(args: any, projections: any): Promise<any> {
        return People.find(args, projections)
            .exec()
    }

    public async addPeopleAsync(args: any): Promise<any> {
        let people = new People({
            firstName: args.firstName,
            lastName: args.lastName,
            age: args.age
        })

        return people.save()
    }

    public async updatePeopleAsync(): Promise<any> {
        return People.findOneAndUpdate(
            { age: 26 },
            { age: 27 })
            .exec()
    }

    public async deletePeopleAsync(args: any): Promise<any> {
        return People.remove(args)
            .exec()
    }

    public async clearPeopleAsync(): Promise<any> {
        return People.remove({})
            .exec()
    }
}

export default new Mongoose()