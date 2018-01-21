import server from '../src/server'
import * as httpAssert from 'supertest'

const expectedString = 'Hello world :)'

describe('/api http call', () => {
    it(`should return '${expectedString}'`, (done) => {
        httpAssert(server)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: expectedString
            }, done)
    })
})