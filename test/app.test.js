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

  // it('should test for loggedIn admin', async () => {
  //   const superAdmin = {  email:"developer.group2@gmail.com ", password:"123456789" };
  //   const response = await request(app).post('/api/v1/users/login') .send(superAdmin)
  //     expect(response.status).to.equal(404);
  // });


  it('should test for failed log in', async () => {
    const loginUser = {  email:"group2@gmail.com ", password:"3456789pp" };
    const response = await request(app).post('/api/v1/users/login') .send(loginUser)
      expect(response.status).to.equal(404);
  });

  it('should test for Applications', async () => {
    const applicationUser = {  email:"group2@gmail.com ", password:"3456789pp" };
    const response = await request(app).post('/api/v1/users/login') .send(applicationUser)
      expect(response.status).to.equal(404);
  });

  it('should test for created Assessment', async () => {
    const createdAssessment = { application_batch_id:"1", imageUrl:"desktop:/Users/dell/images/birthday.jpg", 
    questions:"What is an example of a nodejs framework: a. development, b.nodemon, c.movie d. painting" };
    const response = await request(app).post('/api/v1/assessment/') .send(createdAssessment)
      expect(response.status).to.equal(400);
  });

  it('should test for taken Assessment ', async () => {
    const takenAssessment = { user_id:"1", application_id:"5", assessment_id:"9", time_spent:"20", 
       "responses":"b.nodemon" };
    const response = await request(app).post('/api/v1/assessment/take') .send(takenAssessment)
      expect(response.status).to.equal(400);
  });


})