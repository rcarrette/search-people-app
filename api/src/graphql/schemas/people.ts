import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
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
            fields: {
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
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
                                .catch(err => console.log(err))
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
                        resolve: async (root, args) => {
                            return await mongoose.addPeopleAsync(args)
                                .catch(err => console.log(err))
                        }
                    },
                    update: {
                        type: peopleType,
                        args: {
                            _id: {
                                name: '_id',
                                type: new GraphQLNonNull(GraphQLString)
                            },
                            fieldsToUpdate: {
                                name: 'fieldsToUpdate',
                                type: new GraphQLInputObjectType({
                                    name: 'fieldsToUpdate',
                                    fields: {
                                        firstName: {
                                            type: GraphQLString
                                        },
                                        lastName: {
                                            type: new GraphQLNonNull(GraphQLString)
                                        },
                                        age: {
                                            type: GraphQLInt
                                        }
                                    }
                                })
                            }
                        },
                        resolve: async (root, args) => {
                            return await mongoose.updatePeopleAsync(args)
                                .catch(err => console.log(err))
                        }
                    },
                    delete: {
                        type: peopleType,
                        args: {
                            lastName: {
                                name: 'lastName',
                                type: GraphQLString
                            },
                            age: {
                                name: 'age',
                                type: new GraphQLNonNull(GraphQLInt)
                            }
                        },
                        resolve: async (root, args) => {
                            return await mongoose.deletePeopleAsync(args)
                                .catch(err => console.log(err))
                        }
                    }
                }
            })
        })
    }
}

export default new People()