import * as mongoose from 'mongoose'

export abstract class Model {
    public model: mongoose.Model

    constructor(collectionName: String) {
        this.model = mongoose.model(collectionName, this.getSchema())
    }

    protected abstract getSchema(): mongoose.Schema
}