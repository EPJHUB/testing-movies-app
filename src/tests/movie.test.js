require("../models");
const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const MOVIES_URL = "/movies";

const movie = {
  name: "Interestelar",
  image: "https://interestelar-image.com/image",
  synopsis: "Lorem",
  releaseYear: 2016,
};

let movieId;

//Create
test("POST -> 'MOVIES_URL', should return status code 201, and res.body to be defined and res.body.name = newBody.name", async () => {
  const res = await request(app).post(MOVIES_URL).send(movie);

  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

//Get All
test("GET -> 'MOVIES_URL', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app).get(MOVIES_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

//Get one
test("GET -> 'MOVIES_URL/:id', should return status code 200, and res.body to be defined and res.body.name = movie.name", async () => {
  const res = await request(app).get(`${MOVIES_URL}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

//Update
test("PUT -> 'MOVIES_URL/:id', should return status code 200, and res.body to be defined and res.body.name = movie.name", async () => {
  const res = await request(app).put(`${MOVIES_URL}/${movieId}`).send({
    name: "Karate Kid",
  });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe("Karate Kid");
});

//Set actor
test("POST -> 'MOVIES_URL/:id/actors', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
  const actor = await Actor.create({
    firstName: "Huge",
    lastName: "Jackman",
    nationality: "USA",
    image: "https://lobezno-image.com",
    birthday: "6-7-1952",
  });

  const res = await request(app)
    .post(`${MOVIES_URL}/${movieId}/actors`)
    .send([actor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(actor.id);

  await actor.destroy();
});

//Set director
test("POST -> 'MOVIES_URL/:id/directors', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
  const director = await Director.create({
    firstName: "Chirstopher",
    lastName: "Nolan",
    nationality: "Ingles",
    image: "https://christopher-nolan-image.com",
    birthday: "7-30-1970",
  });

  const res = await request(app)
    .post(`${MOVIES_URL}/${movieId}/directors`)
    .send([director.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(director.id);

  await director.destroy();
});

//Set genres
test("POST -> 'MOVIES_URL/:id/genres', should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
    const genre = await Genre.create({
        name: "Terror"
    });
  
    const res = await request(app)
      .post(`${MOVIES_URL}/${movieId}/genres`)
      .send([genre.id]);
  
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].id).toBe(genre.id);
  
    await genre.destroy();
  });

//Delete
test("DELETE -> 'MOVIES_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${MOVIES_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
