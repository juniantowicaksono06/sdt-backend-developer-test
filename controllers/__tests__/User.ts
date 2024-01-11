import request, {Response} from 'supertest'
import app, {server} from '../../index'
import Users from '../../models/Users'

beforeAll(done => {
    done()
})

afterAll((done) => {
    server.close()
    done()
})

describe("Test user API", () => {
    test("Test user api post without parameters", async() => {
        const res = await request(app).post('/api/user')
        expect(res.body).toEqual({
            "statusCode": 400,
            "error": "Bad Request",
            "message": "\"first_name\" is required"
        })
    })
    test("Test user api post success", async() => {
        const userData = {
            "first_name": "Ini Nama Depan",
            "last_name": "Ini Nama Belakang",
            "email": "anonimus1234@gmail.com",
            "location": "Surabaya",
            "event": [{
                "event_type": "BIRTHDAY",
                "initial_date": "2009-01-01"
            },{
                "event_type": "ANNIVERSARY",
                "initial_date": "2023-01-01"
            }]
        }
        const response: Response = await request(app).post('/api/user').send(userData).set('Content-Type', 'application/json')
        expect(response.body).toEqual({
            "message": "User created successfully"
        })
        expect(response.status).toBe(201)
        // expect(res.body).toEqual()
    })
    test("Delete Existing Users", async() => {        
        const response: Response = await request(app).delete(`/api/user/8`)
        expect(response.body).toEqual({
            "message": "User deleted successfully"
        })
        expect(response.status).toBe(200)
        // expect(res.body).toEqual()
    })
    test("Delete Latest User", async() => {
        const data = await Users.findOne({
            order: [['user_id', 'DESC']]
        })

        const userId: number = data?.get()['user_id']
        
        const response: Response = await request(app).delete(`/api/user/${userId}`)
        expect(response.body).toEqual({
            "message": "User deleted successfully"
        })
        expect(response.status).toBe(200)
        // expect(res.body).toEqual()
    })
    test("Delete Existing Users without ID", async() => {
        const response: Response = await request(app).delete('/api/user')
        expect(response.status).toBe(404)
        // expect(res.body).toEqual()
    })
})