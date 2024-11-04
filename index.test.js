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
    test("Musician endpoint", async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200)
        
        const responseData = JSON.parse(response.text)
        expect(responseData[0]).toHaveProperty("name")
        expect(responseData[0].name).toBe("Mick Jagger")
    })
    




    
})
