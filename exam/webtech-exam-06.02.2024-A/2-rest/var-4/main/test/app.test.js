const request = require('supertest')
const app = require('./../app')

beforeAll((done) => {
    request(app).get('/create').send()
        .then(() => {
            done()
        })
})

describe('Test get /people', () => {
    test('Request works without any query parameter and returns a code of 200 and body containing all records', (done) => {
        request(app).get('/people')
            .send()
            .expect(200)
            .then(res => {
                expect(JSON.parse(res.text).length).toBe(10)
                done()
            })
    })

    test('If an invalid field is sent as a sort field a 400 code is returned with the body {"message":"cannot sort on non existent field"}', (done) => {
        request(app).get('/people?sortField=a&sortOrder=ASC')
            .send()
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ message: 'cannot sort on non existent field' })
                done()
            })
    })

    test('If an invalid sort order is send a 400 code is returned with the body {"message":"sort order must be one of asc and desc"}', (done) => {
        request(app).get('/people?sortField=name&sortOrder=ANY')
            .send()
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ message: 'sort order must be one of asc and desc' })
                done()
            })
    })

    test('Request works ascending sort order and and a sort field and returns a code of 200 and body containing all matching records', (done) => {
        request(app).get('/people?sortField=name&sortOrder=ASC')
            .send()
            .expect(200)
            .then(res => {
                expect(JSON.parse(res.text)[0].name).toBe('name 0')
                done()
            })
    })

    test('Request works descending sort order and and a sort field and returns a code of 200 and body containing all matching records', (done) => {
        request(app).get('/people?sortField=name&sortOrder=DESC')
            .send()
            .expect(200)
            .then(res => {
                expect(JSON.parse(res.text)[0].name).toBe('name 9')
                done()
            })
    })
})



