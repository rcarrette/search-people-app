import * as mongoose from 'mongoose'
import { Model } from './model'

const COLLECTION_NAME: String = 'people'

class People extends Model {
    constructor() {
        super(COLLECTION_NAME)
    }

    getSchema(): mongoose.Schema {
        return new mongoose.Schema({
            firstName: String,
            lastName: String,
            age: Number
        }, { collection: COLLECTION_NAME })
    }
}

export default new People().model