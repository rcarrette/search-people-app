import * as mongoose from 'mongoose'

class People {
    public model: mongoose.Model

    constructor() {
        this.model = mongoose.model('people', this.getSchema())
    }

    private getSchema(): mongoose.Schema {
        return new mongoose.Schema({
            firstName: String,
            lastName: String,
            age: Number
        }, { collection: 'people' })
    }
}

export default new People().model