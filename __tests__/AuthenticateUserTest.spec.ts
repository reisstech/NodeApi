import { expect, describe, it, beforeAll } from '@jest/globals'

import  createConnection  from '../src/database/index'

import  request  from 'supertest'
import { app } from '../src/app'

describe("Authenticated", () => {
    beforeAll(async () => {
        const connection = await createConnection()
       
        await connection.runMigrations()
    })

    it("should be able to authenticate to the application", async () => {

        const user = {
            name: 'User Test',
            email: 'user-test-auth@testmail.com.br',
            password: '12345'
        }

       await request(app).post('/users').send({
            name: user.name,
            email: user.email,
            password: user.password
           
        })


        const userAuthenticatedToken = await request(app).post('/login').send({
            email: user.email,
            password: user.password
        })
        
        expect(userAuthenticatedToken.body).toHaveProperty('token')

    })
})