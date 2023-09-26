const request = require('supertest');
const chai = require('chai');
const app =require('../index');
const {expect} = require('chai');


describe('Testing Express Endpoints', () => {
  it('should test for create user', async () => {
    const addUser = { firstName:"group",lastName:"two",phonenumber:2468103355, email:"grouptwo@gmail.com ", password:"3456789ppp",
    confirmPassword:"3456789ppp" };
    const response = await request(app).post('/api/v1/users/signup') .send(addUser)
      expect(response.status).to.equal(409);
  });

  it('should test for logging in a user', async () => {
    const loginUser = {  email:"grouptwo@gmail.com ", password:"3456789ppp" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(200);
  });

  it('should test for failed log in', async () => {
    const loginUser = {  email:"group2@gmail.com ", password:"3456789pp" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(400);
  });

})