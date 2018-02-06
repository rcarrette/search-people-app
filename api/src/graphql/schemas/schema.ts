import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql/type'

export abstract class Schema {
    protected abstract getType(): GraphQLObjectType
    protected abstract getSchema(): GraphQLSchema

    //generate projection object for mongoose.
    //projections are provided by mongoose and it helps in optimizing our query to fetch only the fields that we truely need.
    protected getProjections(fieldASTs): any {
        return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
            projections[selection.name.value] = true;

            return projections;
        }, {});
    }
}