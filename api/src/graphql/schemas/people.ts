import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql/type'

import mongoose from '../../mongoose/mongoose'
import { Schema } from './schema'

class People extends Schema {
    getType(): GraphQLObjectType {
        return new GraphQLObjectType({
            name: 'people',
            description: 'people',
            fields: {
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
            }
        })
    }
    getSchema(): GraphQLSchema {
        let peopleType = this.getType()

        return new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'peopleQuery',
                fields: {
                    people: {
                        type: new GraphQLList(peopleType),
                        args: {
                            firstName: {
                                name: 'firstName',
                                type: GraphQLString
                            },
                            lastName: {
                                name: 'lastName',
                                type: GraphQLString
                            },
                            age: {
                                name: 'age',
                                type: GraphQLInt
                            }
                        },
                        resolve: async (root, args, source, fieldASTs) => {
                            let projections = this.getProjections(fieldASTs)

                            return await mongoose.getPeopleAsync(args, projections)
                        }
                    }
                }
            }),
            mutation: new GraphQLObjectType({
                name: 'peopleMutation',
                fields: {
                    add: {
                        type: peopleType,
                        args: {
                            firstName: {
                                name: 'firstName',
                                type: new GraphQLNonNull(GraphQLString)
                            },
                            lastName: {
                                name: 'lastName',
                                type: new GraphQLNonNull(GraphQLString)
                            },
                            age: {
                                name: 'age',
                                type: new GraphQLNonNull(GraphQLInt)
                            }
                        },
                        resolve: async (root, args, source, fieldASTs) => {
                            return await mongoose.addPeopleAsync(args)
                        }
                    },
                    //TODO add other mutations here (update, delete, etc.)
                }
            })
        })
    }
}

export default new People().getSchema()