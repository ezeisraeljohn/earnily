const request = require("supertest");
const app = require("../../../../server");
const mongoose = require("mongoose");
const User = require("../../../../models/user_model");
const user_detail = require("../../../shared/utils/user_test_data");

let detail;

describe("User Testing", () => {
  beforeAll(async () => {
    detail = user_detail();
  });
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("Creation/Registration Testing", () => {
    //Registers a user
    it("Should create a user", async () => {
      detail.email = "Israel@gmail.com";
      const response = await request(app).post("/api/v1/register").send(detail);
      expect(response.status).toBe(201);
      expect(response.body.data.firstName).toBe("john");
    });

    // This will fail and return a 400 status code
    it("Should not create an existing user", async () => {
      const response = await request(app).post("/api/v1/register").send(detail);
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe("User already exists");
    });

    it("Should not create user without firstname", async () => {
      const { firstName: _, ...detailWithNoFirstName } = detail;
      const response = await request(app)
        .post("/api/v1/register")
        .send(detailWithNoFirstName);
      expect(response.status).toBe(400);
    });
  });

  describe("Login Testing", () => {
    it("Should login the user", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: detail.email,
        password: detail.password,
      });
      expect(response.status).toBe(200);
    });
    it("Should not login with wrong credentials", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: "tyrel@gmail.com",
        password: "Istinatia",
      });
      expect(response.status).toBe(400);
    });
    it("Should not login if the email is not provided", async () => {
      const response = await request(app).post("/api/v1/login").send({
        password: "eesiddls",
      });
      expect(response.status).toBe(400);
    });
    it("Should not login if the password is not provided", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: "ezeisraeljohn@gmail.com",
      });
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe("Invalid Credentials");
    });
    it("Should not take any other type other than a string for the email", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: 133,
        password: 21122,
      });
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe("Invalid Credentials");
    });
  });
});
