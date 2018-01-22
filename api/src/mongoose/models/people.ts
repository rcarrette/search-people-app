import * as mongoose from 'mongoose'

class People {
    private _schema: mongoose.Schema

    public model

    constructor() {
        this._schema = this.getSchema()

        this.model = mongoose.model('people', this._schema)
    }

    private getSchema(): mongoose.Schema {
        if (this._schema == null)
            this._schema = new mongoose.Schema({
                firstName: String,
                lastName: String,
                age: Number
            }, { collection: 'people' })

        return this._schema
    }
}

export default new People().model