import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server"

import app from "@/app";
import UserService from "@/services/v1/user.service";
import QuestionService from "@/services/v1/question.service";

describe("User", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        await UserService.initUsers();
        await QuestionService.initQuestions();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("login user route", () => {
        describe("given valid user credentials", () => {
            it("should return user and token", async () => {
                const response = await supertest(app).post("/v1/users/login").send({
                    password: "password",
                    email: "adminuser@mail.com",
                });

                expect(response.status).toBe(200);
                expect(response.body.data.user).toBeDefined();
                expect(response.body.data.token).toBeDefined();
                expect(response.body.data.user.email).toBe("adminuser@mail.com");
            });
        });

        describe("given invalid user credentials", () => {
            it("should return 401 and null data", async () => {
                const response = await supertest(app).post("/v1/users/login").send({
                    password: "wrong_password",
                    email: "adminuser@mail.com",
                }).expect(401);
    
                expect(response.status).toBe(401);
                expect(response.body.data).toBeNull();
            });
        });
    });

    describe("get users route", () => {
        it("should return all users", async () => {
            const response = await supertest(app).get("/v1/users");

            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.length).toBeGreaterThan(0);

            for (let user of response.body.data) {
                expect(user._id).toBeDefined();
                expect(user.name).toBeDefined();
                expect(user.role).toBeDefined();
                expect(user.email).toBeDefined();
            }
        });
    });
});
