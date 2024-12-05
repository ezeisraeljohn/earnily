const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Job = require("../models/job_model");
const User = require("../models/user_model");
const job_detail = require("../utils/job_test_data");
const user_detail = require("../utils/user_test_data");

let token, user_details, job_details, id;

describe("Jobs Endpoints", () => {
  beforeAll(async () => {
    user_details = user_detail();
    job_details = job_detail();
    const data_response = await request(app)
      .post("/api/v1/register")
      .send(user_details);
    id = data_response.body.data.id;

    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: user_details.email, password: user_details.password });

    token = response.body.data.token;
    expect(data_response.body.data.id).toBe(id);
  });

  afterAll(async () => {
    await Job.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("Listing Testing", () => {
    it("Should create a Job", async () => {
      const response = await request(app)
        .post("/api/v1/jobs")
        .send(job_details)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(201);
    });

    it("Should not create a Job with wrong or no auth", async () => {
      const response = await request(app)
        .post("/api/v1/jobs")
        .send(job_details)
        .set("Authorization", "");
      expect(response.status).toBe(401);
      expect(response.body.msg).toBe("No token, authorization denied");
    });

    it("should not create a Job with wrong auth", async () => {
      const response = await request(app)
        .post("/api/v1/jobs")
        .send(job_details)
        .set("Authorization", "eejkkkk;lweaslleseoose;sk");
      expect(response.status).toBe(401);
      expect(response.body.msg).toBe("No token, authorization denied");
    });

    it("should list jobs available", async () => {
      const response = await request(app)
        .get("/api/v1/jobs")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("Details Testing", () => {
    it("Should get a job by its id", async () => {
      const response = await request(app)
        .get(`/api/v1/jobs/${id}`)
        .set("Authorization", `Bearer ${token}`);
      //       expect(response.status).toBe(200);
      expect(response.body.data).toBe(id);
    });

    it("Should get jobs created for a specified user", async () => {
      const response = await request(app)
        .get("/api/v1/jobs/me")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    it("should not allow update a job", async () => {
      const response = await request(app);
    });
  });
});
