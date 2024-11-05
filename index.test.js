// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const Test = require('supertest/lib/test');


describe('./musicians endpoint', () => {
    // Write your tests here
    test("GET Musician endpoint", async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200)
        
        const responseData = JSON.parse(response.text)
        expect(responseData[0]).toHaveProperty("name")
        expect(responseData[0].name).toBe("Mick Jagger")
    })
    

    test("GET Musician endpoint with id param", async () => {
        const response = await request(app).get('/musicians/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id")
        expect(response.body.id).toBe(1)
        expect(response.body).toHaveProperty("name")
        expect(response.body.name).toBe("Mick Jagger")
    })

    test("POST musician endpoint", async () => {
        const newMusician = Musician.create({
            name: "Test",
            instrument: "Test"
        })

        const response = await request(app).post('/musicians').send(newMusician)

        expect(response.statusCode).toBe(201)
        expect(response.body.name).toEqual(newMusician.name)
        expect(response.body.instrument).toEqual(newMusician.instrument)
    })

    test("PUT endpoint", async () => {
        const updatedMusician = await Musician.findByPk(1)
        const data = {
            name: "Test Updated",
            instrument: "Test Updated"
        }

        const response = await request(app).put(`/musicians/${updatedMusician.id}`).send(data)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual(data.name)
        expect(response.body.instrument).toEqual(data.instrument)
    })
    
    test("DELETE endpoint", async () => {
        const response = await request(app).delete(`/musicians/1`)
        expect(response.statusCode).toBe(204)
    })
})
