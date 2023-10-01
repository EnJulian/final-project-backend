const  { responseProvider }  = require('../../helper/response');
const moment = require('moment')
const path = require('node:path');
const isUrl = require('is-url');


const validateSignUpApplicantInput = (req, res, next) => {

  try {
    const { email, firstname, lastname, password, phonenumber } = req.body;


    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider( res, null, 'provide a valid email', 400)
    }

    if (typeof firstname !== 'string' || !firstname) {
      return responseProvider( res, null, 'provide a valid firstname', 400)
    }


    if (typeof lastname !== 'string' || !lastname) {
      return responseProvider( res, null, 'provide a valid lastname', 400)
    }


    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider( res, null, 'provide a valid password', 400)
    }

    if (typeof parseInt(phonenumber) !== 'number' || phonenumber.length < 10) {
      return responseProvider( res, null, 'provide a valid phone number', 400)
    }


    return next();
  } catch (error) {
    return next(error);
  }
};


//check image extensions 
function validateImageExtension(imageExtension){

  const allowedExtensions = ['.png', '.jpg', '.jpeg']

  if (allowedExtensions.includes(imageExtension)){
    return true
  }
  return false
}


//todo: refactor repetive validators
//todo: auto populate email, first, last name

const validateApplicationInput = (req, res, next) => {

  try {

    const { 
      // email, firstname,
      // lastname,
      
      address, 
      course, university, 
      cgpa, dob,
      image, cv 
      } = req.body;


    
    // if (typeof email !== 'string' || !email.includes('@')) {
    //   return responseProvider( res, null, 'provide a valid email', 400)
    // }

    // if (typeof firstname !== 'string' || !firstname) {
    //   return responseProvider( res, null, 'provide a valid firstname', 400)
    // }


    // if (typeof lastname !== 'string' || !lastname) {
    //   return responseProvider( res, null, 'provide a valid lastname', 400)
    // }


    if (typeof address !== 'string' || !address) {
      return responseProvider( res, null, 'provide a valid address', 400)
    }

    if (typeof course !== 'string' || !course) {
      return responseProvider( res, null, 'provide a valid course of study', 400)
    }


    if (typeof university !== 'string' || !university) {
      return responseProvider( res, null, 'provide a valid university name', 400)
    }

    if (typeof cgpa !== 'number') {
      return responseProvider( res, null, 'provide a valid cgpa', 400)
    }


    if (!moment(dob, 'DD/MM/YYYY', true).isValid) {
      return responseProvider( res, null, 'provide a valid date of birth', 400)
    }


    //if  (image.split('.').pop() !== 'png') {
   
    //   return responseProvider( res, null, 'provide a valid image', 400)
    // }



    if (validateImageExtension(path.extname(image)) === false) {
      return responseProvider( res, null, 'provide a valid image', 400)
    }

    if (path.extname(cv) !== '.pdf'){
      return responseProvider( res, null, 'provide a valid cv document', 400)
    }


    return next();
  } catch (error) {
    return next(error);
  }
};








const validateApplicantLoginInput = (req, res, next) => {

  try {
    const { email, password } = req.body;


    if (typeof email !== 'string' || !email.includes('@')) {
      return responseProvider( res, null, 'provide a valid email', 400)
    }


    if (typeof password !== 'string' || password.length < 8) {
      return responseProvider( res, null, 'provide a valid password', 400)
    }

    return next();
  } catch (error) {
    return next(error);
  }
};




//TODO check admin create application input
//l ink- check if it is a real link
// date - check if it is a valid date

// change the date format from dd/mm/yy
// to mm/dd/yy for the database


const checkCreateApplicationInputs = (req, res, next) => {

  try{

    const {link, batch_id, closure_date, instructions} = req.body

    console.log(closure_date)

    if(!isUrl(link)){
      return responseProvider( res, null, 'provide a valid url link', 400)
    }

    if(typeof batch_id !== "number"){
      return responseProvider( res, null, 'provide a valid batch Id', 400)
    }
    

    if (!moment(closure_date, 'DD/MM/YYYY', true).isValid) {
      return responseProvider( res, null, 'provide a valid application closure date', 400)
    }


    if(!instructions){
      return responseProvider( res, null, 'provide valid instructions', 400)
    }

    return next();

  } catch (error) {

    return next(error);

  }
};






const validateCreateAssessmentInput = (req, res, next) => {


  try{

    const { batch, question, timer } = req.body

    console.log(closure_date)

    if(!isUrl(link)){
      return responseProvider( res, null, 'provide a valid url link', 400)
    }

    if(typeof batch_id !== "number"){
      return responseProvider( res, null, 'provide a valid batch Id', 400)
    }
    

    if (!moment(closure_date, 'DD/MM/YYYY', true).isValid) {
      return responseProvider( res, null, 'provide a valid application closure date', 400)
    }


    if(!instructions){
      return responseProvider( res, null, 'provide valid instructions', 400)
    }

    return next();

  } catch (error) {

    return next(error);

  }
};

const checkExamsInput = (req, res, next) => {}

const checkApprovalInput = (req, res, next) => {}

const checkBatchIdInput = (req, res, next) => {}

const checkTimerInput = (req, res, next) => {}


module.exports = {
  validateSignUpApplicantInput,  
  validateApplicantLoginInput,
  validateApplicationInput,
  checkCreateApplicationInputs,
  validateCreateAssessmentInput
}
