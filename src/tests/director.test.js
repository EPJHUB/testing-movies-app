const request = require('supertest')
const app = require('../app')

const DIRECTORS_URL = '/directors'

const director = {
    firstName: "Chirstopher",
    lastName: "Nolan",
    nationality: "Ingles",
    image: "https://christopher-nolan-image.com",
    birthday: "7-30-1970"
}

let directorId

//Create
test("POST -> 'DIRECTORS_URL', should return status code 201, and res.body to be defined and res.body.firstName = newBody.firstName", async () => {
    const res = await request(app)
        .post(DIRECTORS_URL)
        .send(director)

        directorId = res.body.id
        
        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(director.firstName)
})

//Get All
test("GET -> 'DIRECTORS_URL', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(DIRECTORS_URL)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

//Get one
test("GET -> 'DIRECTORS_URL/:id', should return status code 200, and res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
        .get(`${DIRECTORS_URL}/${directorId}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(director.firstName)
})

//Update
test("PUT -> 'DIRECTORS_URL/:id', should return status code 200, and res.body to be defined and res.body.firstName = Harrison", async () => {
    const res = await request(app)
        .put(`${DIRECTORS_URL}/${directorId}`)
        .send({
            firstName: "Harrison"
        })

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe("Harrison")
})

//Delete
test("DELETE -> 'DIRECTORS_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${DIRECTORS_URL}/${directorId}`)

        expect(res.status).toBe(204)
})