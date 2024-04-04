import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server"

import app from "@/app";
import UserService from "@/services/v1/user.service";
import QuestionService from "@/services/v1/question.service";

let users: any[] = []
let questions: any[] = []

describe("Question", () => {
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

    describe("get questions route", () => {
        it("should return all questions", async () => {
            const response = await supertest(app).get("/v1/questions");

            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.length).toBeGreaterThan(0);

            for (let question of response.body.data) {
                expect(question._id).toBeDefined();
                expect(question.text).toBeDefined();
            }
        });
    }); 

    describe("create question route", () => {
        describe("given valid question data and authorization", () => {
            it("should return created question", async () => {
                const adminUser = users.find(user => user.role === "admin");

                const response = await supertest(app).post("/v1/questions").set("Authorization", `Bearer ${adminUser.jwt}`).send({
                    text: "What is the capital of France?"
                });

                expect(response.status).toBe(201);
                expect(response.body.data).toBeDefined();
                expect(response.body.data._id).toBeDefined();
                expect(response.body.data.text).toBe("What is the capital of France?");;
            });
        });

        describe("given the authorization is missing", () => {
            it("should return 401", async () => {
                const response = await supertest(app).post("/v1/questions").send({
                    text: "What is the capital of France?"
                });

                expect(response.status).toBe(401);
            });
        });

        describe("given the question text is missing", () => {
            it("should return 400", async () => {
                const adminUser = users.find(user => user.role === "admin");

                const response = await supertest(app).post("/v1/questions").set("Authorization", `Bearer ${adminUser.jwt}`)

                expect(response.status).toBe(400);
                expect(response.body.data).toBeNull();
            });
        });
    });

    describe("get question route", () => {
        describe("given valid question id", () => {
            it("should return question", async () => {
                const response = await supertest(app).get(`/v1/questions/${questions[0]._id}`);

                expect(response.status).toBe(200);
                expect(response.body.data).toBeDefined();
                expect(response.body.data.text).toBe(questions[0].text);
            });
        });

        describe("given invalid question id", () => {
            it("should return 400", async () => {
                const response = await supertest(app).get("/v1/questions/invalid-question-id");

                expect(response.status).toBe(400);
                expect(response.body.data).toBeNull();
            });
        });
    });
});