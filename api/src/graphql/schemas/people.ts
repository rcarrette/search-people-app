import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql/type'

import PeopleModel from '../../mongoose/models/people'
import { Schema } from './schema'

class People extends Schema {
    getType(): GraphQLObjectType {
        return new GraphQLObjectType({
            name: 'people',
            description: 'people',
            fields: () => ({
                firstName: {
                    type: GraphQLString,
                    description: 'person\'s first name'
                },
                lastName: {
                    type: GraphQLString,
                    description: 'person\'s last name'
                },
                age: {
                    type: GraphQLInt,
                    description: 'person\'s age'
                }
            })
        })
    }

    getSchema(): GraphQLSchema {
        return new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'GetPeopleList',
                fields: {
                    people: {
                        type: new GraphQLList(this.getType()),
                        args: {},
                        resolve: async (root, { params }, source, fieldASTs) => {
                            let projections = this.getProjections(fieldASTs)

                            return await PeopleModel.find({ params }, projections)  //TODO error handling
                        }
                    }
                }
            })
        })
    }
}

export default new People().getSchema()