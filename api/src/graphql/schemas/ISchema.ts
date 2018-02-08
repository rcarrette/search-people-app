import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql/type'

export interface ISchema {
    getSchema(): GraphQLSchema
    getType(): GraphQLObjectType
    getQuery(type: GraphQLObjectType): GraphQLObjectType
    getMutation(type: GraphQLObjectType): GraphQLObjectType
}