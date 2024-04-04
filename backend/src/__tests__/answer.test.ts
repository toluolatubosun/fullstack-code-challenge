import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server"

import app from "@/app";
import UserService from "@/services/v1/user.service";
import QuestionService from "@/services/v1/question.service";

let users: any[] = []
let questions: any[] = []

describe("Answer", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        users = await UserService.initUsers();
        questions = await QuestionService.initQuestions();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("create answer route", () => {
        describe("given valid answer data and authorization", () => {
            it("should return created answer", async () => {
                const adminUser = users.find(user => user.role === "admin");
                const question = questions[0];

                const response = await supertest(app).post("/v1/answers").set("Authorization", `Bearer ${adminUser.jwt}`).send({
                    text: "Paris",
                    user_ref: adminUser._id,
                    question_ref: question._id,
                });

                expect(response.status).toBe(201);
                expect(response.body.data).toBeDefined();
                expect(response.body.data._id).toBeDefined();
                expect(response.body.data.text).toBe("Paris");
            });
        });

        describe("given the authorization is missing", () => {
            it("should return 401", async () => {
                const response = await supertest(app).post("/v1/answers").send({
                    text: "Paris",
                    user_ref: users[0]._id,
                    question_ref: questions[0]._id,
                });

                expect(response.status).toBe(401);
            });
        });

        describe("given the answer text is missing", () => {
            it("should return 400", async () => {
                const adminUser = users.find(user => user.role === "admin");
                const question = questions[0];

                const response = await supertest(app).post("/v1/answers").set("Authorization", `Bearer ${adminUser.jwt}`).send({
                    user_ref: adminUser._id,
                    question_ref: question._id,
                });

                expect(response.status).toBe(400);
            });
        });
    });

    describe("get answers by question route", () => {
        it("should return all answers by question", async () => {
            const adminUser = users.find(user => user.role === "admin");
            const question = questions[0];

            const response = await supertest(app).get(`/v1/answers/question/${question._id}`).set("Authorization", `Bearer ${adminUser.jwt}`);

            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.length).toBeGreaterThan(0);

            for (let answer of response.body.data) {
                expect(answer._id).toBeDefined();
                expect(answer.text).toBeDefined();
            }
        });
    });
});