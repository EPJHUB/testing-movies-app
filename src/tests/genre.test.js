const request = require('supertest')
const app = require('../app')

const GENRES_URL = '/genres'

const genre = {
    name: "Pop"
}

let genreId

//Create
test("POST -> 'GENRES_URL', should return status code 201, and res.body to be defined and res.body.name = newBody.name", async () => {
    const res = await request(app)
        .post(GENRES_URL)
        .send(genre)

        genreId = res.body.id

        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

//Get All
test("GET -> 'GENRES_URL', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(GENRES_URL)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

//Get one
test("GET -> 'GENRES_URL/:id', should return status code 200, and res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
        .get(`${GENRES_URL}/${genreId}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

//Update
test("PUT -> 'GENRES_URL/:id', should return status code 200, and res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
        .put(`${GENRES_URL}/${genreId}`)
        .send({
            name: "pop latino"
        })

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe("pop latino")
})

//Delete
test("DELETE -> 'GENRES_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${GENRES_URL}/${genreId}`)

        expect(res.status).toBe(204)
})