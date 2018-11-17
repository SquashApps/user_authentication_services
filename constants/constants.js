module.exports = {
  signup: {
    fromEmail: process.env.EMAIL,
    subject: 'Signup Verification Email',
    template: 'Hello, <br />'
          + 'You have signed up in the user authentication service. <br />'
          + 'Click on the below link to verify it\'s you, <br />',
    signature: '<br />Thankyou, <br />'
               + 'Authentication Team',
    verifyApi: 'http://localhost:8080/api/user/verify/',
  },
  oneHourInMilliseconds: 3600000,
  baseString: 'hex',
  httpStatusCode: {
    success: 200,
    error: 500,
    created: 201,
    notFound: 404,
    badRequest: 400,
  },
  responseMessage: {
    successLogin: 'Found user successfully',
    successSignup: 'Signup is successfull. Please check your email for verification',
    successVerify: 'User email verified successfully',
  },
  errorMessage: {
    findUser: 'Error while finding the user',
    password: 'Password is not valid',
    userNotFound: 'User not found or please check your email to verify it\'s you',
    duplicate: 'User might be already signed up or might be an mongo error while saving the user',
    updateToken: 'Error while updating token to user',
    tokenExpire: 'Error while checking for token expiration',
    updateStatus: 'Error while updating verification status to the user',
    expireLink: 'Your link is expired or verified already',
    emailError: 'Error while sending verification email to the user',
    badRequest: 'Please provide the required parameters of the API',
    loginUser: 'Error while logging in',
  },
  emailService: 'gmail',
  replaceTimeStamp: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  emailTokenExpires: 'emailTokenExpires',
};
