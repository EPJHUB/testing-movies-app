const request = require('supertest');
const app = require('../app');

const ACTORS_URL = "/actors";

const actor = {
    firstName: "Liam",
    lastName: "Neson",
    nationality: "USA",
    image: "https://liam-neson-image.com",
    birthday: "6-7-1952"
}

let actorId;

//Create
test('POST -> ACTORS_URL should return status code 201, res.body to be defined, res.body.firstName = newBody.name', async () => {
    const res = await request(app)
        .post(ACTORS_URL)
        .send(actor)
    
    actorId = res.body.id;

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

//Get All
test('GET -> ACTORS_URL should return status code 200, res.body to be defined, res.body.length = 1', async () => {
    const res = await request(app)
        .get(ACTORS_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Get One
test('GET -> ACTORS_URL/:id should return status code 200, res.body to be defined, res.body.firstName = actor.firstName', async () => {
    const res = await request(app)
        .get(`${ACTORS_URL}/${actorId}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

//Update
test("PUT -> 'ACTORS_URL/:id', should return status code 200, and res.body to be defined and res.body.name = Peter", async () => {
    const res = await request(app)
        .put(`${ACTORS_URL}/${actorId}`)
        .send({
            firstName: "Peter"
        })

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe("Peter")
})

//Delete
test("DELETE -> 'ACTORS_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${ACTORS_URL}/${actorId}`)

        expect(res.status).toBe(204)
})

