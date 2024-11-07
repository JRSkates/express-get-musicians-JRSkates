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

    it("POST should return a 400 error if 'name' is empty", async () => {
        const response = await request(app).post("/musicians").send({
            name: "",
            instrument: "Drums",
        });
        expect(response.statusCode).toBe(400);

        const responseData = JSON.parse(response.text);
        expect(responseData).toEqual(
            {
                error: [
                  {
                    type: 'field',
                    value: '',
                    msg: 'Name is required',
                    path: 'name',
                    location: 'body'
                  },
                  {
                    type: 'field',
                    value: '',
                    msg: 'Name cannot be whitespace',
                    path: 'name',
                    location: 'body'
                  }
                ]
            }
        );
    });

    it("POST should return a 400 error if 'instrument' is empty", async () => {
        const response = await request(app).post("/musicians").send({
            name: "John Doe",
            instrument: "",
        });
        expect(response.statusCode).toBe(400);
        const responseData = JSON.parse(response.text);
        console.log(responseData)
        expect(responseData).toEqual(
            {
                error: [
                  {
                    type: 'field',
                    value: '',
                    msg: 'Instrument is required',
                    path: 'instrument',
                    location: 'body'
                  },
                  {
                    type: 'field',
                    value: '',
                    msg: 'Instrument cannot be whitespace',
                    path: 'instrument',
                    location: 'body'
                  }
                ]
            }
        );
    });
    
    it("POST should create a new musician when all fields are valid", async () => {
        const newMusician = {
            name: "John Doe",
            instrument: "Guitar",
        };
        const response = await request(app).post("/musicians").send(newMusician);
        expect(response.statusCode).toBe(201);
        console.log(response.body);
        expect(response.body.id).toEqual(4)
        expect(response.body.name).toEqual("John Doe");
        expect(response.body.instrument).toEqual("Guitar");
        
        const getResponse = await request(app).get("/musicians");
        expect(getResponse.body.length).toBe(4);
    });
    

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
