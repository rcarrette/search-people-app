import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql/type'

export interface Schema {
    getSchema(): GraphQLSchema
    getType(): GraphQLObjectType
    getQuery(type: GraphQLObjectType): GraphQLObjectType
    getMutation(type: GraphQLObjectType): GraphQLObjectType
}