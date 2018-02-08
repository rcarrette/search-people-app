import * as graphql from 'graphql'
import * as chai from 'chai'
import * as sinon from 'sinon'
import People from '../../../src/graphql/schemas/people'

const expect = chai.expect
const type = People.getType()
const query = People.getQuery(type)
const mutation = People.getMutation(type)

describe('People type fields', () => {
    let typeFields = type.getFields()

    it('Should have a firstName field of type String', () => {
        expect(typeFields).to.have.property('firstName')
        expect(typeFields.firstName.type).to.deep.equals(graphql.GraphQLString)
    })

    it('Should have a lastName field of type String', () => {
        expect(typeFields).to.have.property('lastName')
        expect(typeFields.lastName.type).to.deep.equals(graphql.GraphQLString)
    })

    it('Should have an age field of type Int', () => {
        expect(typeFields).to.have.property('age')
        expect(typeFields.age.type).to.deep.equals(graphql.GraphQLInt)
    })
})