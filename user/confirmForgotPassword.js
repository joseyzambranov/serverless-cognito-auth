// user/confirmForgotPassword.js

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const { username, verificationCode, newPassword } = JSON.parse(event.body);

  const params = {
    ClientId: process.env.client_id,
    Username: username,
    ConfirmationCode: verificationCode,
    Password: newPassword,
  };

  try {
    await cognito.confirmForgotPassword(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Password recovery process completed successfully' }),
    };
  } catch (error) {
    console.error('Error confirming forgot password:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error confirming forgot password' }),
    };
  }
};
