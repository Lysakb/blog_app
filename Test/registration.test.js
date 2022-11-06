const supertest = require("supertest");
const mongoose = require("mongoose");
const {connectmongodb} = require('../database/database');
const app = require("../app");
const userModel = require("../model/userModel");


const api = supertest(app)

describe('signup and login', ()=>{
    beforeAll(async()=>{
        await connectmongodb()
    })
    afterAll(async()=>{
        await mongoose.connection.close()
    })
    it('it should signup user', async()=>{
       const res = await api.post("/user/signup").send({
        first_name: "Eli",
        last_name: "David",
        email: "Eli@gmail.com",
        password: "Elizabeth"
       }) 
       expect(res.status).toBe(200)
       expect(res.body).toHaveProperty("message")
    })

    it("it should login user", async()=>{
        const res = await api.post("/user/login").send({
            email: "Eli@gmail.com",
            password: "Elizabeth"
        })
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message")
    })
})

